export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
} 

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string,
  gender: Gender,
  occupation: string,
}
