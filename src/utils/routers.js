import IconBarChart from "@/assets/svgs/bar-chart.svg?react";
import IconBenchMark from "@/assets/svgs/bench-mark.svg?react";
import IconCube from "@/assets/svgs/cube.svg?react";
import IconGrid from "@/assets/svgs/grid.svg?react";
import IconShare from "@/assets/svgs/share.svg?react";

export const ROUTERS = {
  DASHBOARD: "/",
  IMPORT_DATA: "/import-data",
  TRADES: "/trades",
  SYSTEM: "/system",
  BENCHMARKS: "/bench-marks",
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
    key: "bench-marks",
    name: "Benchmarks",
    path: ROUTERS.BENCHMARKS,
    icon: IconBenchMark,
  },
];

export default ROUTERS_CONFIG;
