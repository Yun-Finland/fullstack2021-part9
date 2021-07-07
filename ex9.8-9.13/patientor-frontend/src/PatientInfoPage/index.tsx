import { useParams  } from "react-router";
import { Patient,Gender,Entry, Diagnosis, HealthCheckRating } from "../types";
import React, { useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Icon, Message } from 'semantic-ui-react';

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

const EntryDetails = ({entry, diagnosesEntry}:{entry:Entry, diagnosesEntry: Diagnosis[] | undefined}) =>{

  if(!diagnosesEntry){
    return null;
  }

  const setIconColor = (rating: HealthCheckRating)=>{
    switch(rating){
      case 0:
        return "green";
      case 1:
        return "orange";
      case 2:
        return "yellow";
      default:
        return "red";
    }
  };

  switch(entry.type){
    case "HealthCheck":
      return (
        <Message>
          <Message.Header>{entry.date} <Icon name='user doctor'/></Message.Header> 
          <p><i>{entry.description}</i></p>
          {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnosesEntry.find(n=>n.code === code)?.name}</li>)}
          <Icon color={setIconColor(entry.healthCheckRating)} name='heart'/>
        </Message>
      );
    case "Hospital":
      return (
        <Message>
          <Message.Header>{entry.date} <Icon name='medkit'/></Message.Header> 
          <p><i>{entry.description}</i></p>
          {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnosesEntry.find(n=>n.code === code)?.name}</li>)}
        </Message>
      );
    default:
      return (
        <Message>
          <Message.Header>{entry.date} <Icon name='treatment'/> {entry.employerName}</Message.Header> 
          <p><i>{entry.description}</i></p>
          {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnosesEntry.find(n=>n.code === code)?.name}</li>)}
        </Message>
      );
  }

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
      {(findPatient.entries).map(entry => <EntryDetails key={entry.id} entry={entry} diagnosesEntry = {diagnosesEntry}/>)}
    </div>
  );

};

export default PatientInfoPage;