import IconNotificationError from "@/assets/svgs/notification-error.svg?react";
import IconNotificationInfo from "@/assets/svgs/notification-info.svg?react";
import IconNotificationSuccess from "@/assets/svgs/notification-success.svg?react";
import IconNotificationWarning from "@/assets/svgs/notification-warning.svg?react";

const iconStyle = { width: 20, height: 20 };

const baseStyles = {
  root: {
    backgroundColor: "#4F46E5",
    padding: "0.75rem 1rem",
    borderRadius: "0.375rem 0.375rem 0 0",
  },
  title: { color: "#ffffff", fontWeight: "bold", marginBottom: 0 },
  description: { color: "#cbd5e1" },
  icon: { alignSelf: "flex-start", marginTop: 2 },
};

const presets = {
  info: {
    icon: <IconNotificationInfo style={iconStyle} />,
    styles: baseStyles,
  },
  success: {
    icon: <IconNotificationSuccess style={iconStyle} />,
    styles: {
      ...baseStyles,
      root: { ...baseStyles.root, backgroundColor: "#10B981" },
    },
  },
  warning: {
    icon: <IconNotificationWarning style={iconStyle} />,
    styles: {
      ...baseStyles,
      root: { ...baseStyles.root, backgroundColor: "#F97316" },
    },
  },
  error: {
    icon: <IconNotificationError style={iconStyle} />,
    styles: {
      ...baseStyles,
      root: { ...baseStyles.root, backgroundColor: "#DC2626" },
    },
  },
};

/** @type {import('antd/es/notification/interface').NotificationInstance | null} */
let _instance = null;

/** Called once from <AppNotificationProvider> to register the context-aware instance */
export const setNotificationInstance = (instance) => {
  _instance = instance;
};

/** Get the registered notification instance (throws if not yet registered) */
const getInstance = () => {
  if (!_instance) {
    console.warn(
      "Notification instance not registered yet. Calls will be ignored.",
    );
  }
  return _instance;
};

/**
 * Standalone notification service — works anywhere (inside or outside React).
 * Uses the context-aware App.useApp() instance registered at app startup.
 */
const notificationService = {
  info: (args) => getInstance()?.info({ ...presets.info, ...args }),
  success: (args) => getInstance()?.success({ ...presets.success, ...args }),
  warning: (args) => getInstance()?.warning({ ...presets.warning, ...args }),
  error: (args) => getInstance()?.error({ ...presets.error, ...args }),
  open: (args) => getInstance()?.open(args),
  destroy: (key) => getInstance()?.destroy(key),
};

export default notificationService;
