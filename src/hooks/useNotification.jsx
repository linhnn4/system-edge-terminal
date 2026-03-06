import IconNotificationError from "@/assets/svgs/notification-error.svg?react";
import IconNotificationInfo from "@/assets/svgs/notification-info.svg?react";
import IconNotificationSuccess from "@/assets/svgs/notification-success.svg?react";
import IconNotificationWarning from "@/assets/svgs/notification-warning.svg?react";

import { App } from "antd";

const infoStyles = {
  root: {
    backgroundColor: "#4F46E5",
    padding: "0.75rem 1rem",
    borderRadius: "0.375rem 0.375rem 0 0",
  },
  title: { color: "#ffffff", fontWeight: "bold", marginBottom: 0 },
  description: { color: "#cbd5e1" },
  icon: { alignSelf: "flex-start", marginTop: 2 },
};

const errorStyles = {
  ...infoStyles,
  root: { ...infoStyles.root, backgroundColor: "#DC2626" },
};

const successStyles = {
  ...infoStyles,
  root: { ...infoStyles.root, backgroundColor: "#10B981" },
};

const warningStyles = {
  ...infoStyles,
  root: { ...infoStyles.root, backgroundColor: "#F97316" },
};

const useNotification = () => {
  const { notification } = App.useApp();

  const iconInfo = <IconNotificationInfo style={{ width: 20, height: 20 }} />;
  const iconSuccess = (
    <IconNotificationSuccess style={{ width: 20, height: 20 }} />
  );
  const iconWarning = (
    <IconNotificationWarning style={{ width: 20, height: 20 }} />
  );
  const iconError = <IconNotificationError style={{ width: 20, height: 20 }} />;

  const infos = { icon: iconInfo, styles: infoStyles };
  const errors = { icon: iconError, styles: errorStyles };
  const successes = { icon: iconSuccess, styles: successStyles };
  const warnings = { icon: iconWarning, styles: warningStyles };

  return {
    ...notification,
    info: (args) => notification.info({ ...infos, ...args }),
    success: (args) => notification.success({ ...successes, ...args }),
    warning: (args) => notification.warning({ ...warnings, ...args }),
    error: (args) => notification.error({ ...errors, ...args }),
  };
};

export default useNotification;
