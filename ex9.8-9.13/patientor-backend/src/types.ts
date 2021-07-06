export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
} 

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<string>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" =2,
  "CriticalRisk"=3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating
}

export interface OccupationalHealthCareEntry extends BaseEntry{
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string,
    endDate: string,
  }
}

export interface HospitalEntry extends BaseEntry{
  type: "Hospital",
  discharge: {
    date: string,
    criteria:string,
  }
}

export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;

export type NewPatientEntry = Omit<PatientEntry, "id">;


