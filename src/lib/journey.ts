export type JourneySceneId = "morning" | "biking" | "hiking" | "sunset" | "night";

export type JourneyScene = {
  id: JourneySceneId;
  title: string;
  copy: string;
  icon: string;
  gradient: string;
  textColor: string;
  featureFlagKey: string;
  enabled: boolean;
  assignedServiceIds?: string[];
  fallbackPolicy: "hide" | "primaryService";
};

export const journeyScenes: JourneyScene[] = [
  {
    id: "morning",
    title: "Quiet Morning",
    copy:
      "Start with slow coffee, open views, and cool air before the sun climbs. Ease into the day before the adventure begins.",
    icon: "☕️",
    gradient: "linear-gradient(to bottom,#F9F1E6 0%,#F5D0A9 100%)",
    textColor: "#4A3B32",
    featureFlagKey: "journey.morning",
    enabled: true,
    fallbackPolicy: "primaryService",
  },
  {
    id: "biking",
    title: "Time for Bikes",
    copy:
      "Warm light fills the valley. It’s the perfect time for bikes and scenic loops before the midday heat.",
    icon: "🚲",
    gradient: "linear-gradient(to bottom,#F5D0A9 0%,#E6AE49 100%)",
    textColor: "#3D2C1D",
    featureFlagKey: "journey.biking",
    enabled: true,
    fallbackPolicy: "primaryService",
  },
  {
    id: "hiking",
    title: "Canyon Heart",
    copy:
      "Midday heat. Orange sand and towering arches. This is where hikes and hidden trails take over.",
    icon: "🥾",
    gradient: "linear-gradient(to bottom,#E6AE49 0%,#C04E28 100%)",
    textColor: "#261109",
    featureFlagKey: "journey.hiking",
    enabled: true,
    fallbackPolicy: "primaryService",
  },
  {
    id: "sunset",
    title: "Sunset Chase",
    copy:
      "We drive into the best view. The sky turns crimson and violet as the desert cools.",
    icon: "🚙",
    gradient: "linear-gradient(to bottom,#C04E28 0%,#762A34 50%,#2E1A36 100%)",
    textColor: "#F9F1E6",
    featureFlagKey: "journey.sunset",
    enabled: true,
    fallbackPolicy: "primaryService",
  },
  {
    id: "night",
    title: "Billions of Stars",
    copy:
      "Utah is one of the best places on Earth to see the Milky Way. Quiet, dark, and unforgettable.",
    icon: "✨",
    gradient: "linear-gradient(to bottom,#2E1A36 0%,#050505 100%)",
    textColor: "#FFFFFF",
    featureFlagKey: "journey.night",
    enabled: true,
    fallbackPolicy: "primaryService",
  },
];

