interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  phone: string;
  id?: string;
  cell_phone: string;
  birth_date: string;
  document: string;
  avatar?: string;
}

export { ICreateUserDTO };
