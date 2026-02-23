export type FeatureFlagScope = "site" | "page" | "section" | "service";

export type FeatureFlag = {
  key: string;
  enabled: boolean;
  scope: FeatureFlagScope;
};

export const featureFlags: FeatureFlag[] = [
  { key: "site.public", enabled: true, scope: "site" },
  { key: "page.home", enabled: true, scope: "page" },
  { key: "page.book", enabled: true, scope: "page" },
  { key: "page.service", enabled: true, scope: "page" },

  { key: "service.jeep", enabled: true, scope: "service" },
  { key: "service.bikes", enabled: false, scope: "service" },
  { key: "service.hiking", enabled: false, scope: "service" },
  { key: "service.tours", enabled: false, scope: "service" },
  { key: "service.stargazing", enabled: false, scope: "service" },
  { key: "service.picnic", enabled: false, scope: "service" },

  { key: "journey.morning", enabled: true, scope: "section" },
  { key: "journey.biking", enabled: true, scope: "section" },
  { key: "journey.hiking", enabled: true, scope: "section" },
  { key: "journey.sunset", enabled: true, scope: "section" },
  { key: "journey.night", enabled: true, scope: "section" },
];

export function isFlagEnabled(key: string) {
  const flag = featureFlags.find((f) => f.key === key);
  return Boolean(flag?.enabled);
}
