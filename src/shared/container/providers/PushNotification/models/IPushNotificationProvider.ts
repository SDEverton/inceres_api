interface IPushNotificationProvider {
  send({ title, name, document, color, icon }): Promise<void>;
}

export { IPushNotificationProvider };
