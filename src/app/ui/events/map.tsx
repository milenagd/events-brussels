"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./map.css";

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -20],
});

const generatePulsatingMarker = function (radius: number, color: string) {
  const cssStyle = `
    width: ${radius}px;
    height: ${radius}px;
    background: ${color};
    color: ${color};
    box-shadow: 0 0 0 ${color};
  `;
  return L.divIcon({
    html: `<div style="${cssStyle}" class="pulse"></div>`,
    className: "",
    iconSize: [25, 51],
    popupAnchor: [0, -20],
  });
};

export default function MapEvents(props: {
  locations: { id: number; lat: number; lon: number; title: string }[];
}) {
  const [selectedMarker, setSelectedMarker] = useState(0);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <>
      <MapContainer
        center={[50.8503, 4.3517]}
        zoom={12}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {props.locations.map(({ lat, lon: lng, title, id }, index) => (
          <Marker
            key={index}
            position={[lat, lng]}
            icon={
              selectedMarker === id
                ? generatePulsatingMarker(20, "blue")
                : defaultIcon
            }
            eventHandlers={{
              click: () => {
                setSelectedMarker(id);
                const params = new URLSearchParams(searchParams);
                params.set("location", title);
                replace(`${pathname}?${params.toString()}`);
              },
              popupclose: () => {
                setSelectedMarker(0);
                const params = new URLSearchParams(searchParams);
                params.delete("location");
                replace(`${pathname}?${params.toString()}`);
              },
            }}
          >
            <Popup>{title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
