interface ICreateNotesDTO {
  id?: string;
  description: string;
  file?: string;
  type_file?: string;
  user_id: string;
  file_url?(): string;
}

export { ICreateNotesDTO };
