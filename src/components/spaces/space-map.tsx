"use client";

import { divIcon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import type { SpaceCard } from "@/server/spaces/search";

const markerIcon = divIcon({
  className: "space-map-marker",
  html: '<span aria-hidden="true"></span>',
  iconSize: [28, 36],
  iconAnchor: [14, 34],
});

export function SpaceMap({
  spaces,
  selectedId,
  onSelect,
}: {
  spaces: SpaceCard[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <MapContainer
        center={[39, 35]}
        zoom={5}
        scrollWheelZoom={false}
        className="h-[420px] w-full rounded-2xl"
        aria-label="Reklam alanlarının haritası"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> katkıcıları'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {spaces.map((space) => (
          <Marker
            key={space.id}
            position={[space.lat, space.lng]}
            icon={markerIcon}
            eventHandlers={{ click: () => onSelect(space.id) }}
            title={space.title}
            keyboard
            alt={`${space.title}${selectedId === space.id ? ", seçili" : ""}`}
          />
        ))}
      </MapContainer>
    </div>
  );
}
