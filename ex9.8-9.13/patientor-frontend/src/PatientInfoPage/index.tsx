import { useParams  } from "react-router";
import { Patient } from "../types";
import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";

const PatientInfoPage = () =>{
  const [ {patients},dispatch ] = useStateValue();
  const { id } = useParams<{ id:string}>();

  const findPatient = Object.values(patients).find((patient: Patient) => patient.id === id);
  
  if(!findPatient){
    return <div>Wrong Patient Id!</div>;
  }
  
  if(!findPatient.ssn){ 
    try{
      const data = async() => {
        const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        findPatient.ssn = response.data.ssn;
        dispatch({ type: "ADD_PATIENT", payload: findPatient });
      };
      void data();
    }catch(e){
      console.log("Cannot find the ssn of the patient!");
    }
  }

  return (
    <div>
      <h1>{findPatient.name}</h1>
      <p>ssn: {findPatient.ssn}</p>
      <p>occupation: {findPatient.occupation}</p>
    </div>
  );

};

export default PatientInfoPage;