import patientsData from "../../data/patients";

import { PatientEntry, NonSensitivePatientEntry } from "../types";

const patients: Array<PatientEntry> = patientsData as Array<PatientEntry>;

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

export default {
  getPatientEntries,
  getNoneSeneitivePatientEntries
};