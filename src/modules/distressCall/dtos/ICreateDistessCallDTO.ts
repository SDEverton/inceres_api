interface ICreateDistessCallDTO {
  id?: string;
  lat: number;
  lng: number;
  user_id: string;
  activid: boolean;
  token_channel: string;
}

export { ICreateDistessCallDTO };