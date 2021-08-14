interface IPushNotificationProvider {
  send({ title, name, document, color }): Promise<void>;
}

export { IPushNotificationProvider };
