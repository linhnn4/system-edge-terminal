import { TIMEZONE_OPTIONS } from "./constants";

export const pad = (n, width = 2, z) => {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const TIMEZONE_TO_REGION = {
  "America/New_York": "us-east-1",
  "America/Chicago": "us-east-2",
  "America/Denver": "us-west-2",
  "America/Los_Angeles": "us-west-2",
  "America/Anchorage": "us-west-2",
  "Pacific/Honolulu": "us-west-2",
  "America/Halifax": "us-east-1",
  "America/Argentina/Buenos_Aires": "us-east-1",
  "Europe/London": "eu-west-2",
  "Europe/Berlin": "eu-central-1",
  "Europe/Athens": "eu-central-1",
  "Europe/Moscow": "eu-central-1",
  "Asia/Dubai": "ap-southeast-1",
  "Asia/Karachi": "ap-southeast-1",
  "Asia/Kolkata": "ap-southeast-1",
  "Asia/Dhaka": "ap-southeast-1",
  "Asia/Bangkok": "ap-southeast-1",
  "Asia/Singapore": "ap-southeast-1",
  "Asia/Tokyo": "ap-northeast-1",
  "Australia/Sydney": "ap-southeast-2",
  "Pacific/Auckland": "ap-southeast-2",
};

export const getDefaultTimezone = () => {
  const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const match = TIMEZONE_OPTIONS.find((opt) => opt.value === browserTz);
  if (match) return match.value;

  // Fallback: match by UTC offset
  const offsetMin = new Date().getTimezoneOffset();
  const offsetHours = -offsetMin / 60;
  const closest = TIMEZONE_OPTIONS.reduce((prev, curr) => {
    const prevOffset = getOffsetFromLabel(prev.label);
    const currOffset = getOffsetFromLabel(curr.label);
    return Math.abs(currOffset - offsetHours) <
      Math.abs(prevOffset - offsetHours)
      ? curr
      : prev;
  });
  return closest.value;
};

const getOffsetFromLabel = (label) => {
  const match = label.match(/UTC([+-]\d{1,2}):?(\d{2})?/);
  if (!match) return 0;
  const hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) / 60 : 0;
  return hours + (hours < 0 ? -minutes : minutes);
};

export const getRegionByTimezone = (tz) => {
  if (TIMEZONE_TO_REGION[tz]) return TIMEZONE_TO_REGION[tz];

  // Fallback: pick region by rough geographic match from label offset
  const option = TIMEZONE_OPTIONS.find((opt) => opt.value === tz);
  const offsetHours = option ? getOffsetFromLabel(option.label) : 0;
  if (offsetHours <= -4) return "us-west-2";
  if (offsetHours <= 0) return "eu-west-1";
  if (offsetHours <= 3) return "eu-central-1";
  if (offsetHours <= 8) return "ap-southeast-1";
  if (offsetHours <= 10) return "ap-northeast-1";
  return "ap-southeast-2";
};

export const getDefaultRegion = () => {
  return getRegionByTimezone(getDefaultTimezone());
};
