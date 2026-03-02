const { VITE_API_BASE_URL, VITE_WS_BASE_URL } = import.meta.env;

export const API_URL = VITE_API_BASE_URL;
export const WS_URL = VITE_WS_BASE_URL;

export const TIMEZONE_OPTIONS = [
  { label: '(UTC-12:00) International Date Line West', value: 'Etc/GMT+12' },
  { label: '(UTC-11:00) Midway Island, Samoa', value: 'Pacific/Midway' },
  { label: '(UTC-10:00) Hawaii', value: 'Pacific/Honolulu' },
  { label: '(UTC-09:00) Alaska', value: 'America/Anchorage' },
  { label: '(UTC-08:00) Pacific Time (US & Canada)', value: 'America/Los_Angeles' },
  { label: '(UTC-07:00) Mountain Time (US & Canada)', value: 'America/Denver' },
  { label: '(UTC-06:00) Central Time (US & Canada)', value: 'America/Chicago' },
  { label: '(UTC-05:00) Eastern Time (US & Canada)', value: 'America/New_York' },
  { label: '(UTC-04:00) Atlantic Time (Canada)', value: 'America/Halifax' },
  { label: '(UTC-03:00) Buenos Aires', value: 'America/Argentina/Buenos_Aires' },
  { label: '(UTC+00:00) UTC', value: 'UTC' },
  { label: '(UTC+00:00) London', value: 'Europe/London' },
  { label: '(UTC+01:00) Berlin, Paris, Rome', value: 'Europe/Berlin' },
  { label: '(UTC+02:00) Athens, Bucharest', value: 'Europe/Athens' },
  { label: '(UTC+03:00) Moscow', value: 'Europe/Moscow' },
  { label: '(UTC+04:00) Dubai', value: 'Asia/Dubai' },
  { label: '(UTC+05:00) Karachi', value: 'Asia/Karachi' },
  { label: '(UTC+05:30) India Standard Time', value: 'Asia/Kolkata' },
  { label: '(UTC+06:00) Dhaka', value: 'Asia/Dhaka' },
  { label: '(UTC+07:00) Bangkok, Hanoi, Jakarta', value: 'Asia/Bangkok' },
  { label: '(UTC+08:00) Beijing, Singapore', value: 'Asia/Singapore' },
  { label: '(UTC+09:00) Tokyo, Seoul', value: 'Asia/Tokyo' },
  { label: '(UTC+10:00) Sydney', value: 'Australia/Sydney' },
  { label: '(UTC+11:00) Solomon Islands', value: 'Pacific/Guadalcanal' },
  { label: '(UTC+12:00) Auckland, Wellington', value: 'Pacific/Auckland' },
];

export const REGION_OPTIONS = [
  { label: 'US East (N. Virginia)', value: 'us-east-1' },
  { label: 'US East (Ohio)', value: 'us-east-2' },
  { label: 'US West (Oregon)', value: 'us-west-2' },
  { label: 'Europe (Frankfurt)', value: 'eu-central-1' },
  { label: 'Europe (Ireland)', value: 'eu-west-1' },
  { label: 'Europe (London)', value: 'eu-west-2' },
  { label: 'Asia Pacific (Singapore)', value: 'ap-southeast-1' },
  { label: 'Asia Pacific (Tokyo)', value: 'ap-northeast-1' },
  { label: 'Asia Pacific (Sydney)', value: 'ap-southeast-2' },
];