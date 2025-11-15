// TravelSection.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Hotel, Plane } from "lucide-react";

export interface TravelSectionProps {
  /** Name or address of the venue. Example: "Heritage Gardens, New Delhi" */
  venueName: 'Radha Palace, Aggarwal Fun City Mall, CBD Ground, near Karkardooma Court, Shahdara, New Delhi, Delhi 110032';
}

/**
 * TravelSection (TypeScript)
 *
 * - Uses only Google Maps URL/embed parameters (no API key required).
 * - Shows venue map, hotels near map and helpful links (directions, airports).
 */
const TravelSection: React.FC<TravelSectionProps> = ({ venueName }) => {
  const venue = (venueName || "").trim() || "Radha Palace, Aggarwal Fun City Mall, CBD Ground, near Karkardooma Court, Shahdara, New Delhi, Delhi 110032";
  const encodedVenue = encodeURIComponent(venue);

  // Derived URLs
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedVenue}`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedVenue}`;
  const hotelsSearchUrl = `https://www.google.com/maps/search/hotels+near+${encodedVenue}`;
  const hotelsEmbedSrc = `https://www.google.com/maps?q=hotels+near+${encodedVenue}&output=embed`;
  const venueEmbedSrc = `https://www.google.com/maps?q=${encodedVenue}&output=embed`;
  const airportsSearchUrl = `https://www.google.com/maps/search/airport+near+${encodedVenue}`;
  const directionsFromAirportUrl = `https://www.google.com/maps/dir/?api=1&origin=airport&destination=${encodedVenue}`;

  return (
    <section id="travel" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-playfair font-bold text-center mb-16 text-primary">
          Travel &amp; Stay
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Venue Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                <CardTitle>Venue Location</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="font-semibold text-lg">{venue}</p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Open in Google Maps →
                </a>

                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Get Directions →
                </a>
              </div>

              <div className="w-full h-64 rounded-lg overflow-hidden border mt-3">
                <iframe
                  title="venue-map"
                  src={venueEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </CardContent>
          </Card>

          {/* Hotels Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Hotel className="h-6 w-6 text-primary" />
                <CardTitle>Nearby Hotels</CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground mb-4">
                Hotels near <strong>{venue}</strong> (auto-generated)
              </p>

              <a
                href={hotelsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View Hotels on Google Maps →
              </a>

              <div className="w-full h-64 mt-4 rounded-lg overflow-hidden border">
                <iframe
                  title="hotels-map"
                  src={hotelsEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Getting There Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Plane className="h-6 w-6 text-primary" />
              <CardTitle>Getting There</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground mb-4">
              For guests coming by air, you can search for nearby airports and open
              directions from an airport directly.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={airportsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Find Nearby Airports →
              </a>

              <a
                href={directionsFromAirportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Directions from Airport →
              </a>
            </div>

            {/* <p className="mt-4 text-sm text-muted-foreground">
              Note: This component intentionally avoids Maps APIs so no API key is required.
              If you later want travel times, ratings, photos, or autocomplete, those features
              require a Google Maps API key (or another provider).
            </p> */}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TravelSection;
