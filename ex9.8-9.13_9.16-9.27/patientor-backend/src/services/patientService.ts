import patients from "../../data/patients";
import { v1 as uuid } from 'uuid';

import { 
  Patient, 
  NonSensitivePatient,
  NewPatient,
  EntryWithoutId,
  Entry
} from "../types";

const getPatientEntries = ():Array<Patient> => {
  return patients;
};

const getNoneSeneitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  })); 
};

const findById = (id: string):Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const addPatient = (entry: NewPatient) : Patient => {
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

const addEntry = (patientId : string, entry: EntryWithoutId) : Entry => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const patient = findById(patientId);

  if(!patient){
    throw new Error("Cannot find the Patient");
  }

  const id = uuid();
  const newEntry = {
    id,
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatientEntries,
  getNoneSeneitivePatients,
  findById,
  addPatient,
  addEntry
};