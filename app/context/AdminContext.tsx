"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

export type AdminNotification = {
  id: string;
  title: string;
  message: string;
  type: string;
};

type AdminContextType = {
  notifications: AdminNotification[];
  unreadCount: number;
  setNotifications: (items: AdminNotification[]) => void;
  markAllAsRead: () => void;
};

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<
    AdminNotification[]
  >([]);

  const [readIds, setReadIds] = useState<string[]>([]);

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) => !readIds.includes(notification.id)
      ).length,
    [notifications, readIds]
  );

  const markAllAsRead = () => {
    setReadIds(notifications.map((notification) => notification.id));
  };

  return (
    <AdminContext.Provider
      value={{
        notifications,
        unreadCount,
        setNotifications,
        markAllAsRead,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used inside AdminProvider");
  }

  return context;
}