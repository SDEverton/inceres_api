interface IUserResponseDTO {
  email: string;
  name: string;
  id: string;
  document: string;
  cell_phone: string;
  avatar: string;
  avatar_url(): string;
}

export { IUserResponseDTO };
