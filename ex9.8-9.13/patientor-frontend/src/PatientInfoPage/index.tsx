import { useParams  } from "react-router";
import { Patient,Gender, Entry, EntryWithoutId } from "../types";
import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Icon, Container } from 'semantic-ui-react';
import  EntriesDetails from "../components/EntriesDetails";
import { ChooseEntryForm } from "../components/ChooseEntryForm";
import { useStateValue, addPatientList } from "../state";

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

const PatientInfoPage = () =>{
  const [ {patients, }, dispatch ] = useStateValue();
 
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const { id } = useParams<{ id:string}>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const findPatient = Object.values(patients).find((patient: Patient) => patient.id === id);
  
  if(!findPatient){
    return null;
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
      console.log("Cannot find the ssn or entries info of the patient!");
    }
  }

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const {data:newEntry} = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      findPatient.entries.concat(newEntry);
      dispatch(addPatientList(findPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <Container>
      <h1>{findPatient.name} <GenderIcon gender = {findPatient.gender}/></h1>
      <p>ssn: {findPatient.ssn}</p>
      <p>occupation: {findPatient.occupation}</p>
      <h3>Entries</h3>
      {findPatient.entries
        ?<EntriesDetails findPatient = {findPatient} />
        : null 
      }
      <h3>Add a new entry</h3>
      <ChooseEntryForm 
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        openModal={openModal}
      />
    </Container>
  );
};

export default PatientInfoPage;