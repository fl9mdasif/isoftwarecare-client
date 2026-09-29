import { Icon } from "./Icon";

/**
 * The office location, from the agency's own Google Maps share link. Kept
 * local to this component rather than in lib/site.ts, which is being edited
 * by hand elsewhere — a second edit point for the same value would only add
 * another place for the two to drift apart.
 *
 * MAP_LINK is the exact place the team shared; MAP_QUERY is what it resolves
 * to ("Mirpur Tower, Dhaka") and drives the embed, since a share.google short
 * link cannot be framed directly — Google's redirect breaks inside an iframe.
 */
const MAP_LINK = "https://share.google/BxKlhI4fCKEC2qvEJ";
const MAP_QUERY = "Mirpur Tower, Dhaka, Bangladesh";

/**
 * No API key, no JS: the classic query-based `output=embed` iframe. It only
 * ever needs to be correct once and never breaks on a token expiring.
 *
 * Google's embed renders on a white base map with no dark option available
 * without the paid, JS-driven Maps API, so the dark theme gets the invert/
 * hue-rotate trick (.map-card iframe in globals.css) rather than shipping a
 * bright white rectangle on a near-black page.
 */
export function LocationMap() {
  return (
    <div className="map-card">
      <iframe
        src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
        title="Our office location on Google Maps"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="map-open">
        <Icon name="external" strokeWidth={2} />
        Open in Google Maps
      </a>
    </div>
  );
}
