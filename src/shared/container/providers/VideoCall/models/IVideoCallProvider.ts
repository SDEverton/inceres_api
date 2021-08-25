interface IVideoCallProvider {
  createToken(document: string, uid: number): Promise<string>;
}

export { IVideoCallProvider };
