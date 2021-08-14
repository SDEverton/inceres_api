interface IVideoCallProvider {
  createToken(document: string): Promise<string>;
}

export { IVideoCallProvider };
