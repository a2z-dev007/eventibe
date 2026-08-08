/** Parse guest capacity from package suitable_for or venue_configuration */
export function extractCapacity(v: {
  package_details?: Array<{ suitable_for?: string }>;
  venue_configuration?: number | null;
}): number | undefined {
  const suitableFor = v.package_details?.[0]?.suitable_for;
  if (suitableFor) {
    const rangeMatch = suitableFor.match(/(\d+)[–-]\s*(\d+)/);
    if (rangeMatch?.[2]) return parseInt(rangeMatch[2], 10);

    const toMatch = suitableFor.match(/(\d+)\s*to\s*(\d+)/i);
    if (toMatch?.[2]) return parseInt(toMatch[2], 10);

    const singleMatch = suitableFor.match(/(\d+)/);
    if (singleMatch) return parseInt(singleMatch[1], 10);
  }

  const config = Number(v.venue_configuration);
  if (!isNaN(config) && config > 0) return config;

  return undefined;
}
