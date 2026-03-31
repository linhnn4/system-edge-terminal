import { TIMEZONE_OPTIONS, TIMEZONE_TO_REGION } from "@/configs/timezone";

export const pad = (n, width = 2, z) => {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

export const getDefaultTimezone = () => {
  const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const match = TIMEZONE_OPTIONS.find((opt) => opt.value === browserTz);
  if (match) return match.value;
  return "UTC";
};

export const getRegionByTimezone = (tz) => {
  if (TIMEZONE_TO_REGION[tz]) return TIMEZONE_TO_REGION[tz];

  // Fallback: guess region from timezone prefix
  if (tz.startsWith("America/")) return "us-east";
  if (tz.startsWith("Europe/")) return "eu-west";
  if (tz.startsWith("Asia/")) return "ap-southeast";
  if (tz.startsWith("Australia/") || tz.startsWith("Pacific/"))
    return "ap-southeast";
  return "none";
};

export const getDefaultRegion = () => {
  return getRegionByTimezone(getDefaultTimezone());
};
