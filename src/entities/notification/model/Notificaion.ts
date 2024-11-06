export interface Notification {
  id: string;
  message: string;
}

export function removeFromNotifications(notificationList: Notification[], index: number) {
  return notificationList.filter((_, i) => i !== index);
}
