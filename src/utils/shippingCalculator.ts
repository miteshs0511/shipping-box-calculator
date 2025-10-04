import { Country } from "../types/Box";

const parseEnvMultiplier = (key: string, fallback: number): number => {
  const env = import.meta.env as Record<string, string | boolean | undefined>;
  const raw = env[key] as string | undefined;
  if (raw !== undefined) {
    const num = parseFloat(raw);
    if (!Number.isFinite(num)) {
      // warn in dev to catch misconfiguration early
      if ((env as any).DEV) {
        // eslint-disable-next-line no-console
        console.warn(
          `[shippingCalculator] Invalid env value for ${key}="${raw}" — falling back to ${fallback}`
        );
      }
      return fallback;
    }
    return num;
  }
  return fallback;
};

const countryMultipliers: Record<Country, number> = {
  Sweden: parseEnvMultiplier("VITE_MULTIPLIER_SWEDEN", 7.35),
  China: parseEnvMultiplier("VITE_MULTIPLIER_CHINA", 11.53),
  Brazil: parseEnvMultiplier("VITE_MULTIPLIER_BRAZIL", 15.63),
  Australia: parseEnvMultiplier("VITE_MULTIPLIER_AUSTRALIA", 50.09),
};

export const calculateShippingCost = (weight: number, country: Country): number => {
  const w = Number.isFinite(+weight) ? +weight : 0;
  return +(w * countryMultipliers[country]);
};

export const getCountryMultiplier = (country: Country): number => {
  return countryMultipliers[country];
};

export const getCountries = (): { label: string; value: Country }[] => {
  return (Object.keys(countryMultipliers) as Country[]).map((c) => ({
    label: `${c} (${countryMultipliers[c].toFixed(2)} INR)`,
    value: c,
  }));
};
