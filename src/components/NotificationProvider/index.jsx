import { setNotificationInstance } from "@/services/notificationService";
import { App } from "antd";
import { useEffect } from "react";

/** Registers the context-aware notification instance from App.useApp() */
const NotificationProvider = () => {
  const { notification } = App.useApp();

  useEffect(() => {
    setNotificationInstance(notification);
  }, [notification]);

  return null;
};

export default NotificationProvider;
