import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntryWithoutId } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_request, response)=>{
  console.log('Fetching all patients!');
  response.json(patientService.getNoneSeneitivePatients());
});

patientsRouter.get('/:id', (request, response)=> {
  const patient = patientService.findById(request.params.id);

  if(patient){
    response.json(patient);
  }else{
    response.status(404).end();
  }
});

patientsRouter.get('/:id/entries', (request, response)=>{
  const patient = patientService.findById(request.params.id);

  if(patient && patient.entries){
    response.json(patient.entries);
  }else{
    response.status(404).end();
  }
});

patientsRouter.post('/', (request, response)=>{

  try{
    const newPatientEntry = toNewPatient(request.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    response.json(addedEntry);
  }catch(e){
    response.status(400).send(e.message);
  }
});

patientsRouter.post('/:id/entries', (request, response)=>{
  console.log("have you been here");
  const patientId = request.params.id;
  console.log("1. Did you get the id", patientId);

  try{
    const newEntry = toNewEntryWithoutId(request.body);
    const addedEntry = patientService.addEntry(patientId, newEntry);
    response.json(addedEntry);
  }catch(e){
    response.status(400).send(e.message);
  }
});

export default patientsRouter;