export interface Notification {
  id: number;
  message: string;
  type: 'alert' | 'warning' | 'info' | 'confirm';
  timeout?: number;
}

export const getNotificationId = (notifications: Notification[]): number => {
  let id = 0;

  for (let index = 0; index < notifications.length; index++) {
    const n = notifications[index];
    if (n.id > id) {
      id = n.id;
    }
  }

  return id + 1;
};

export const getNotificationTimeout = (type: string): number => {
  switch (type) {
    case 'alert':
      return 5000;
    case 'warning':
      return 3000;
    case 'confirm':
      return 2000;
    case 'info':
      return 2000;
  }
  return 0;
};
