const {
  VITE_API_BASE_URL,
  VITE_WS_BASE_URL,
  VITE_RECAPTCHA_SITE_KEY,
  VITE_SCORING_API_BASE_URL,
  VITE_CTRADER_CLIENT_ID,
  VITE_CTRADER_REDIRECT_URI,
} = import.meta.env;

export const API_URL = VITE_API_BASE_URL;
export const WS_URL = VITE_WS_BASE_URL;
export const RECAPTCHA_SITE_KEY = VITE_RECAPTCHA_SITE_KEY;
export const SCORING_API_URL = VITE_SCORING_API_BASE_URL;
export const CONFIG_RESET_TIME = 1.5 * 60 * 1000; // 1.5 minutes in milliseconds

// cTrader Open API
export const CTRADER_AUTH_URL = "https://openapi.ctrader.com/apps/auth";
export const CTRADER_CLIENT_ID = VITE_CTRADER_CLIENT_ID;
export const CTRADER_REDIRECT_URI = VITE_CTRADER_REDIRECT_URI;

export const TIMEZONE_OPTIONS = [
  { label: "UTC", value: "UTC" },
  // Americas
  { label: "America/New_York", value: "America/New_York" },
  { label: "America/Chicago", value: "America/Chicago" },
  { label: "America/Denver", value: "America/Denver" },
  { label: "America/Los_Angeles", value: "America/Los_Angeles" },
  { label: "America/Phoenix", value: "America/Phoenix" },
  { label: "America/Anchorage", value: "America/Anchorage" },
  { label: "America/Honolulu", value: "America/Honolulu" },
  { label: "America/Toronto", value: "America/Toronto" },
  { label: "America/Vancouver", value: "America/Vancouver" },
  { label: "America/Mexico_City", value: "America/Mexico_City" },
  { label: "America/Bogota", value: "America/Bogota" },
  { label: "America/Lima", value: "America/Lima" },
  { label: "America/Santiago", value: "America/Santiago" },
  { label: "America/Sao_Paulo", value: "America/Sao_Paulo" },
  {
    label: "America/Argentina/Buenos_Aires",
    value: "America/Argentina/Buenos_Aires",
  },
  { label: "America/Halifax", value: "America/Halifax" },
  // Europe
  { label: "Europe/London", value: "Europe/London" },
  { label: "Europe/Dublin", value: "Europe/Dublin" },
  { label: "Europe/Lisbon", value: "Europe/Lisbon" },
  { label: "Europe/Paris", value: "Europe/Paris" },
  { label: "Europe/Berlin", value: "Europe/Berlin" },
  { label: "Europe/Rome", value: "Europe/Rome" },
  { label: "Europe/Madrid", value: "Europe/Madrid" },
  { label: "Europe/Amsterdam", value: "Europe/Amsterdam" },
  { label: "Europe/Brussels", value: "Europe/Brussels" },
  { label: "Europe/Zurich", value: "Europe/Zurich" },
  { label: "Europe/Stockholm", value: "Europe/Stockholm" },
  { label: "Europe/Vienna", value: "Europe/Vienna" },
  { label: "Europe/Warsaw", value: "Europe/Warsaw" },
  { label: "Europe/Prague", value: "Europe/Prague" },
  { label: "Europe/Helsinki", value: "Europe/Helsinki" },
  { label: "Europe/Bucharest", value: "Europe/Bucharest" },
  { label: "Europe/Athens", value: "Europe/Athens" },
  { label: "Europe/Istanbul", value: "Europe/Istanbul" },
  { label: "Europe/Moscow", value: "Europe/Moscow" },
  { label: "Europe/Kyiv", value: "Europe/Kyiv" },
  // Africa
  { label: "Africa/Cairo", value: "Africa/Cairo" },
  { label: "Africa/Lagos", value: "Africa/Lagos" },
  { label: "Africa/Johannesburg", value: "Africa/Johannesburg" },
  { label: "Africa/Nairobi", value: "Africa/Nairobi" },
  { label: "Africa/Casablanca", value: "Africa/Casablanca" },
  // Middle East & Asia
  { label: "Asia/Jerusalem", value: "Asia/Jerusalem" },
  { label: "Asia/Riyadh", value: "Asia/Riyadh" },
  { label: "Asia/Dubai", value: "Asia/Dubai" },
  { label: "Asia/Tehran", value: "Asia/Tehran" },
  { label: "Asia/Karachi", value: "Asia/Karachi" },
  { label: "Asia/Kolkata", value: "Asia/Kolkata" },
  { label: "Asia/Dhaka", value: "Asia/Dhaka" },
  { label: "Asia/Bangkok", value: "Asia/Bangkok" },
  { label: "Asia/Jakarta", value: "Asia/Jakarta" },
  { label: "Asia/Ho_Chi_Minh", value: "Asia/Ho_Chi_Minh" },
  { label: "Asia/Singapore", value: "Asia/Singapore" },
  { label: "Asia/Manila", value: "Asia/Manila" },
  { label: "Asia/Shanghai", value: "Asia/Shanghai" },
  { label: "Asia/Hong_Kong", value: "Asia/Hong_Kong" },
  { label: "Asia/Taipei", value: "Asia/Taipei" },
  { label: "Asia/Seoul", value: "Asia/Seoul" },
  { label: "Asia/Tokyo", value: "Asia/Tokyo" },
  // Australia & Pacific
  { label: "Australia/Perth", value: "Australia/Perth" },
  { label: "Australia/Adelaide", value: "Australia/Adelaide" },
  { label: "Australia/Brisbane", value: "Australia/Brisbane" },
  { label: "Australia/Sydney", value: "Australia/Sydney" },
  { label: "Australia/Melbourne", value: "Australia/Melbourne" },
  { label: "Pacific/Auckland", value: "Pacific/Auckland" },
  { label: "Pacific/Fiji", value: "Pacific/Fiji" },
  { label: "Pacific/Guam", value: "Pacific/Guam" },
];

export const REGION_OPTIONS = [
  { label: "None", value: "none" },
  { label: "US East", value: "us-east" },
  { label: "US West", value: "us-west" },
  { label: "EU West", value: "eu-west" },
  { label: "EU Central", value: "eu-central" },
  { label: "Asia Pacific Southeast", value: "ap-southeast" },
  { label: "Asia Pacific Northeast", value: "ap-northeast" },
];
