import IconBankNote from "@/assets/svgs/bank-note.svg?react";
import IconBarChart from "@/assets/svgs/bar-chart.svg?react";
import IconBell from "@/assets/svgs/bell.svg?react";
import IconBenchMark from "@/assets/svgs/bench-mark.svg?react";
import IconBriefCase from "@/assets/svgs/brief-case.svg?react";
import IconCoach from "@/assets/svgs/coach.svg?react";
import IconCpuChip from "@/assets/svgs/cpu-chip.svg?react";
import IconCube from "@/assets/svgs/cube.svg?react";
import IconGitBranch from "@/assets/svgs/git-branch.svg?react";
import IconGrid from "@/assets/svgs/grid.svg?react";
import IconSettings from "@/assets/svgs/settings.svg?react";
import IconShare from "@/assets/svgs/share.svg?react";
import IconShield from "@/assets/svgs/shield.svg?react";
import IconUserCircle from "@/assets/svgs/user-circle.svg?react";

export const ROUTERS = {
  DASHBOARD: "/",
  IMPORT_DATA: "/import-data",
  TRADES: "/trades",
  SYSTEM: "/system",
  BENCHMARKS: "/benchmarks",
  COACH: "/coach",
  SETTINGS: {
    BASE: "/settings",
    PROFILE: "/settings/profile",
    WORKSPACE: "/settings/workspace",
    AI_COACH: "/settings/ai-coach",
    DATE_INTEGRATIONS: "/settings/date-integrations",
    NOTIFICATION: "/settings/notification",
    SECURITY: "/settings/security",
    BILLING: "/settings/billing",
  },
  CREATE_WORKSPACE: "/create-workspace",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFICATION: "/verification",
  VERIFICATION_FORGOT: "/verification-forgot",
};

const ROUTERS_CONFIG = [
  {
    key: "import-data",
    name: "Import Data",
    path: ROUTERS.IMPORT_DATA,
    icon: IconShare,
  },
  {
    key: "dashboard",
    name: "Dashboard",
    path: ROUTERS.DASHBOARD,
    icon: IconGrid,
  },
  {
    key: "trades",
    name: "Trades",
    path: ROUTERS.TRADES,
    icon: IconBarChart,
  },
  {
    key: "system",
    name: "System",
    path: ROUTERS.SYSTEM,
    icon: IconCube,
  },
  {
    key: "benchmarks",
    name: "Benchmarks",
    path: ROUTERS.BENCHMARKS,
    icon: IconBenchMark,
  },
  {
    key: "coach",
    name: "Coach",
    path: ROUTERS.COACH,
    icon: IconCoach,
  },
  {
    key: "settings",
    name: "Settings",
    path: ROUTERS.SETTINGS.BASE,
    icon: IconSettings,
    childrens: [
      {
        key: "profile",
        name: "Profile",
        path: ROUTERS.SETTINGS.PROFILE,
        icon: IconUserCircle,
      },
      {
        key: "workspace",
        name: "Workspace",
        path: ROUTERS.SETTINGS.WORKSPACE,
        icon: IconBriefCase,
      },
      {
        key: "ai-coach",
        name: "AI Coach",
        path: ROUTERS.SETTINGS.AI_COACH,
        icon: IconCpuChip,
      },
      {
        key: "date-integrations",
        name: "Date & Integrations",
        path: ROUTERS.SETTINGS.DATE_INTEGRATIONS,
        icon: IconGitBranch,
      },
      {
        key: "notification",
        name: "Notification",
        path: ROUTERS.SETTINGS.NOTIFICATION,
        icon: IconBell,
      },
      {
        key: "security",
        name: "Security",
        path: ROUTERS.SETTINGS.SECURITY,
        icon: IconShield,
      },
      {
        key: "billing",
        name: "Billing",
        path: ROUTERS.SETTINGS.BILLING,
        icon: IconBankNote,
      },
    ],
  },
];

export default ROUTERS_CONFIG;
