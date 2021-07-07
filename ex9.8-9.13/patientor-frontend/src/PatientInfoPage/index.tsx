import { useParams  } from "react-router";
import { Patient,Gender,Entry, Diagnosis } from "../types";
import React, { useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Icon } from 'semantic-ui-react';

const GenderIcon = ({gender}:{gender: Gender})=>{
  switch(gender){
    case "male":
      return <Icon name='mars'/>;
    case "female":
      return <Icon name='venus'/>;
    default:
      return <Icon name='neuter'/>;
  }
};

const ShowEntry = ({entry, diagnosesEntry}:{entry:Entry, diagnosesEntry: Diagnosis[] | undefined}) =>{

  if(!diagnosesEntry){
    return null;
  }

  return(
    <div>
      {entry.date} <i>{entry.description}</i>
      {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnosesEntry.find(n=>n.code === code)?.name}</li>)}
    </div>
  );
};

const PatientInfoPage = () =>{
  const [ {patients},dispatch ] = useStateValue();
  const [ diagnosesEntry, setDiagnosesEntry ] = useState<Diagnosis[] | undefined>();

  const { id } = useParams<{ id:string}>();

  const findPatient = Object.values(patients).find((patient: Patient) => patient.id === id);
  
  if(!findPatient){
    return <div>Wrong Patient Id!</div>;
  }

  if(!findPatient.ssn || !findPatient.entries){ 
    try{
      const data = async() => {
        const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        findPatient.ssn = response.data.ssn;
        findPatient.entries = response.data.entries;
        dispatch({ type: "ADD_PATIENT", payload: findPatient });
      };
      void data();
    }catch(e){
      console.log("Cannot find the ssn info of the patient!");
    }
  }

  if(!diagnosesEntry){
    try{
      const getData = async() => {
        const returnedData = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        setDiagnosesEntry(returnedData.data);
      };
      void getData();
    }catch(e){
      console.log("Cannot find diagnoses data!");
    }
  }

  if(!findPatient.entries){
    return null;
  }

  return (
    <div>
      <h1>{findPatient.name} <GenderIcon gender = {findPatient.gender}/></h1>
      <p>ssn: {findPatient.ssn}</p>
      <p>occupation: {findPatient.occupation}</p>
      <h3>entries</h3>
      {(findPatient.entries).map(entry => <ShowEntry key={entry.id} entry={entry} diagnosesEntry = {diagnosesEntry}/>)}
    </div>
  );

};

export default PatientInfoPage;