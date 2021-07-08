import React from 'react';
import { Entry, HealthCheckRating, Patient } from "../types";
import { Message, Icon } from 'semantic-ui-react';
import { useStateValue } from "../state";

const EntryDetails = ({entry}:{entry:Entry}) =>{
  const [{ diagnoses },] = useStateValue();

  if(!Object.values(diagnoses)){
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
          {entry.diagnosisCodes?.map(code => <li key={code}>{code} {Object.values(diagnoses).find(n=>n.code === code)?.name}</li>)}
          <Icon color={setIconColor(entry.healthCheckRating)} name='heart'/>
        </Message>
      );
    case "Hospital":
      return (
        <Message>
          <Message.Header>{entry.date} <Icon name='medkit'/></Message.Header> 
          <p><i>{entry.description}</i></p>
          {entry.diagnosisCodes?.map(code => <li key={code}>{code} {Object.values(diagnoses).find(n=>n.code === code)?.name}</li>)}
        </Message>
      );
    default:
      return (
        <Message>
          <Message.Header>{entry.date} <Icon name='treatment'/> {entry.employerName}</Message.Header> 
          <p><i>{entry.description}</i></p>
          {entry.diagnosisCodes?.map(code => <li key={code}>{code} {Object.values(diagnoses).find(n=>n.code === code)?.name}</li>)}
        </Message>
      );
  }
};

const EntriesDetails = ({findPatient}:{findPatient:Patient}) =>{

  return (
    <div>
      {(findPatient.entries).map(entry => <EntryDetails key={entry.id} entry={entry}/>)}
    </div>
  );
};

export default EntriesDetails;