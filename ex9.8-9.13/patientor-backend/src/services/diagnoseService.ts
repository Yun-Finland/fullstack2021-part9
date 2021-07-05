import diagnosesData from "../../data/diagnoses";

import { DiagnoseEntry } from "../types";

const diagnoses: Array<DiagnoseEntry> = diagnosesData;

const getDiagnoseEntries = ():Array<DiagnoseEntry> => {
  return diagnoses;
};

export default {
  getDiagnoseEntries
};