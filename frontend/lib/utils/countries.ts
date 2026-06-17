
import countries from "world-countries";
export const DEFAULT_COUNTRY = "US";

type CountryOption = {
  label: string;
  value: string;
};

export const countryOptions: CountryOption[] = countries
  .map((c) => ({
    label: c.name.common,
    value: c.cca2,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));
