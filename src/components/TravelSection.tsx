// TravelSection.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Hotel, Plane } from "lucide-react";

export interface TravelSectionProps {
  /** Name or address of the venue. Example: "Heritage Gardens, New Delhi" */
  venueName: 'Radha Palace, Aggarwal Fun City Mall, CBD Ground, near Karkardooma Court, Shahdara, New Delhi, Delhi 110032';
  eventVenueName:" Hotel Sunshine Park, D-1, Chander Nagar Opp, Vivek Vihar,Sahibabad- 20101";
}

/**
 * TravelSection (TypeScript)
 *
 * - Uses only Google Maps URL/embed parameters (no API key required).
 * - Shows venue map, hotels near map and helpful links (directions, airports).
 */
const TravelSection: React.FC<TravelSectionProps> = ({ venueName, eventVenueName }) => {
  const venue = (venueName || "").trim()
    || "Radha Palace, Aggarwal Fun City Mall, CBD Ground, near Karkardooma Court, Shahdara, New Delhi, Delhi 110032";

  const eventVenue = (eventVenueName || "").trim() 
    || " Hotel Sunshine Park, D-1, Chander Nagar Opp, Vivek Vihar,Sahibabad- 20101";

  const encodedVenue = encodeURIComponent(venue);
  const encodedEventVenue = encodeURIComponent(eventVenue);

  // URLs for venue
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedVenue}`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedVenue}`;
  // const hotelsSearchUrl = `https://www.google.com/maps/search/hotels+near+${encodedVenue}`;
  // const hotelsEmbedSrc = `https://www.google.com/maps?q=hotels+near+${encodedVenue}&output=embed`;
  const venueEmbedSrc = `https://www.google.com/maps?q=${encodedVenue}&output=embed`;
  const airportsSearchUrl = `https://www.google.com/maps/search/airport+near+${encodedVenue}`;
  const directionsFromAirportUrl = `https://www.google.com/maps/dir/?api=1&origin=airport&destination=${encodedVenue}`;

  // URLs for eventVenue
  const eventMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedEventVenue}`;
  const eventDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedEventVenue}`;
  // const eventHotelsSearchUrl = `https://www.google.com/maps/search/hotels+near+${encodedEventVenue}`;
  // const eventVenueEmbedSrc = `https://www.google.com/maps?q=${encodedEventVenue}&output=embed`;
  const eventvenueEmbedSrc = `https://www.google.com/maps?q=${encodedEventVenue}&output=embed`;
  // const eventairportsSearchUrl = `https://www.google.com/maps/search/airport+near+${encodedEventVenue}`;
  // const eventdirectionsFromAirportUrl = `https://www.google.com/maps/dir/?api=1&origin=airport&destination=${encodedEventVenue}`;

  

  return (
    <section id="travel" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-playfair font-bold text-center mb-16 text-primary">
          & Venues &amp; 
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Venue Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                <CardTitle>Enagement & Sangeet </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="font-semibold text-lg">{eventVenue}</p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={eventMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Open in Google Maps →
                </a>

                <a
                  href={eventDirectionsUrl}
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
                  src={eventvenueEmbedSrc}
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
                <MapPin className="h-6 w-6 text-primary" />
                <CardTitle>Wedding Ceremony </CardTitle>
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
        </div>

        {/* Getting There Card */}
        {/* <Card>
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
          {/* </CardContent>
        </Card> */} */
      </div>
    </section>
  );
};

export default TravelSection;
