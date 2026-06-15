export const normalizeDob = (value?: string | null): Date => {
  const fallbackDate = new Date(2000, 0, 1);

  if (!value) return fallbackDate;

  if (value.startsWith("01.01.0001")) return fallbackDate;

  const parsed = new Date(value);

  if (isNaN(parsed.getTime())) return fallbackDate;

  return parsed;
};

export const toIsoDate = (date: Date | null): string | null => {
  if (!date) return null;

  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  ).toISOString();
};