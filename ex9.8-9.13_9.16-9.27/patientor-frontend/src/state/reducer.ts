import { State } from "./state";
import { Diagnosis, Patient } from "../types";


export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      }; 
      case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
              {}
            ),
          ...state.diagnoses
          }
        };
    default:
      return state;
  }
};

export const setDiagnosisList = (diagnosisListFromApi:Diagnosis[]) =>{
  const newAction : Action = ({
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisListFromApi
  });
  return newAction;
};

export const setPatientList = (patientListFromApi:Patient[]) =>{
  const newAction : Action = ({
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  });
  return newAction;
};

export const addPatientList = (newPatient : Patient) => {
  const newAction : Action = ({
    type: "ADD_PATIENT",
    payload: newPatient
  });
  return newAction;
};
