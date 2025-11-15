import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface RSVPFormData {
  name: string;
  email: string;
  attending: string;
  guests: string;
  message: string;
}

const RSVPForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResponse, setLastResponse] = useState<{ notify: boolean; notify_method?: string | null; message?: string } | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RSVPFormData>();

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:3000/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error('RSVP submit failed', json);
        toast.error(json.error || 'Failed to submit RSVP. Please try again.');
        setLastResponse(null);
      } else {
        console.log('RSVP Data sent:', json);
        // Show success toast; include notify method if available
        const notifyMethodLabel = json.notify_method ? `Notification via ${json.notify_method.toUpperCase()}` : '';
        const description = json.description || "You'll receive a confirmation shortly.";

        if (json.notify) {
          toast.success(json.message || "Thank you for your response! We can't wait to celebrate with you.", {
            description: `${description} ${notifyMethodLabel}`.trim()
          });
        } else {
          toast.success(json.message || "Thank you for your response! We recorded your RSVP.", {
            description: `${description} ${notifyMethodLabel}`.trim()
          });
        }

        setLastResponse({ notify: !!json.notify, notify_method: json.notify_method ?? null, message: description });
        reset();
      }
    } catch (err) {
      console.error('RSVP submit error', err);
      toast.error('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 px-4 bg-muted/30">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-5xl font-playfair font-bold text-center mb-8 text-primary">
          RSVP
        </h2>
        
        <p className="text-center text-lg mb-12 text-muted-foreground">
          Please let us know if you'll be joining us for our special day
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-8 rounded-2xl shadow-lg">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Your name"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Will you attend? *</Label>
            <RadioGroup defaultValue="yes">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" {...register("attending", { required: true })} />
                <Label htmlFor="yes" className="cursor-pointer">Yes, I'll be there!</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" {...register("attending", { required: true })} />
                <Label htmlFor="no" className="cursor-pointer">Sorry, I can't make it</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <Input
              id="guests"
              type="number"
              min="1"
              {...register("guests")}
              placeholder="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Special Message (Optional)</Label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder="Share your wishes or dietary requirements..."
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit RSVP"}
          </Button>
        </form>
        {lastResponse && (
          <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800">
            <p className="font-medium">Thanks — your RSVP was received.</p>
            <p className="text-sm mt-1">
              {lastResponse.message}
              {lastResponse.notify_method ? (
                <span> Notification method: <strong>{lastResponse.notify_method.toUpperCase()}</strong></span>
              ) : (
                <span> No notification was sent automatically.</span>
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RSVPForm;
