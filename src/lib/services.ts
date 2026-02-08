export type ServiceType = "VEHICLE" | "BIKE" | "TOUR" | "PICNIC";

export type Service = {
  id: string;
  type: ServiceType;
  title: string;
  short: string;
  active: boolean;
  priceFromUsd: number;
};

export const services: Service[] = [
  {
    id: "jeep-wrangler",
    type: "VEHICLE",
    title: "Jeep Wrangler Overland",
    short: "St. George pickup + optional LAS delivery. Easy for beginners.",
    active: true,
    priceFromUsd: 180,
  },
  {
    id: "bike-rental",
    type: "BIKE",
    title: "E-Bike Rental",
    short: "Coming soon.",
    active: false,
    priceFromUsd: 79,
  },
  {
    id: "sunset-picnic",
    type: "PICNIC",
    title: "Sunset Picnic Setup",
    short: "Coming soon.",
    active: false,
    priceFromUsd: 149,
  },
];
