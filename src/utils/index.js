import { TIMEZONE_OPTIONS } from "./constants";

export const pad = (n, width = 2, z) => {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const TIMEZONE_TO_REGION = {
  UTC: "none",
  // Americas
  "America/New_York": "us-east",
  "America/Chicago": "us-east",
  "America/Denver": "us-west",
  "America/Los_Angeles": "us-west",
  "America/Phoenix": "us-west",
  "America/Anchorage": "us-west",
  "America/Honolulu": "us-west",
  "America/Toronto": "us-east",
  "America/Vancouver": "us-west",
  "America/Mexico_City": "us-east",
  "America/Bogota": "us-east",
  "America/Lima": "us-east",
  "America/Santiago": "us-east",
  "America/Sao_Paulo": "us-east",
  "America/Argentina/Buenos_Aires": "us-east",
  "America/Halifax": "us-east",
  // Europe
  "Europe/London": "eu-west",
  "Europe/Dublin": "eu-west",
  "Europe/Lisbon": "eu-west",
  "Europe/Paris": "eu-west",
  "Europe/Berlin": "eu-central",
  "Europe/Rome": "eu-central",
  "Europe/Madrid": "eu-west",
  "Europe/Amsterdam": "eu-west",
  "Europe/Brussels": "eu-west",
  "Europe/Zurich": "eu-central",
  "Europe/Stockholm": "eu-central",
  "Europe/Vienna": "eu-central",
  "Europe/Warsaw": "eu-central",
  "Europe/Prague": "eu-central",
  "Europe/Helsinki": "eu-central",
  "Europe/Bucharest": "eu-central",
  "Europe/Athens": "eu-central",
  "Europe/Istanbul": "eu-central",
  "Europe/Moscow": "eu-central",
  "Europe/Kyiv": "eu-central",
  // Africa
  "Africa/Cairo": "eu-central",
  "Africa/Lagos": "eu-west",
  "Africa/Johannesburg": "eu-central",
  "Africa/Nairobi": "eu-central",
  "Africa/Casablanca": "eu-west",
  // Middle East & Asia
  "Asia/Jerusalem": "eu-central",
  "Asia/Riyadh": "ap-southeast",
  "Asia/Dubai": "ap-southeast",
  "Asia/Tehran": "ap-southeast",
  "Asia/Karachi": "ap-southeast",
  "Asia/Kolkata": "ap-southeast",
  "Asia/Dhaka": "ap-southeast",
  "Asia/Bangkok": "ap-southeast",
  "Asia/Jakarta": "ap-southeast",
  "Asia/Ho_Chi_Minh": "ap-southeast",
  "Asia/Singapore": "ap-southeast",
  "Asia/Manila": "ap-southeast",
  "Asia/Shanghai": "ap-northeast",
  "Asia/Hong_Kong": "ap-southeast",
  "Asia/Taipei": "ap-northeast",
  "Asia/Seoul": "ap-northeast",
  "Asia/Tokyo": "ap-northeast",
  // Australia & Pacific
  "Australia/Perth": "ap-southeast",
  "Australia/Adelaide": "ap-southeast",
  "Australia/Brisbane": "ap-southeast",
  "Australia/Sydney": "ap-southeast",
  "Australia/Melbourne": "ap-southeast",
  "Pacific/Auckland": "ap-southeast",
  "Pacific/Fiji": "ap-southeast",
  "Pacific/Guam": "ap-southeast",
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
