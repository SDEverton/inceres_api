interface IRequestHttp {
  clinic: {
    id: number;
  };
  physician: {
    id: number;
  };
  patient: {
    id: number;
  };
  text: string;
}

interface IRequest {
  clinic_id?: number;
  physician_id: number;
  patient_id: number;
  text: string;
}

interface IPhysician {
  id: number;
  name: string;
  crm: string;
}

interface IClinic {
  id: number;
  name: string;
}

interface IPatient {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface IResponse {
  data: {
    id: string;
    clinic: {
      id: number;
    };
    physician: {
      id: number;
    };
    patient: {
      id: number;
    };
    text: string;
  };
}

export { IResponse, IClinic, IPatient, IPhysician, IRequest, IRequestHttp };
