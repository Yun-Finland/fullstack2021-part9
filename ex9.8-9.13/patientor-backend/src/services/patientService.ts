import patientsData from "../../data/patients";
import { v1 as uuid } from 'uuid';

import { 
  PatientEntry, 
  NonSensitivePatientEntry,
  NewPatientEntry
} from "../types";

const patients: Array<PatientEntry> = patientsData;

const getPatientEntries = ():Array<PatientEntry> => {
  return patients;
};

const getNoneSeneitivePatientEntries = (): Array<NonSensitivePatientEntry> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  })); 
};

const findById = (id: string):PatientEntry | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry) : PatientEntry => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuid();
  const newPatient = {
    id,
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatientEntries,
  getNoneSeneitivePatientEntries,
  findById,
  addPatient
};