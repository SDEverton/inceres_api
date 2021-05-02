interface ICreatePrescriptionsDTO {
  id?: string;
  clinic_id?: number;
  physician_id: number;
  patient_id: number;
  text: string;
}

export { ICreatePrescriptionsDTO };
