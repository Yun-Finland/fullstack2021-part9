import express from 'express';

const patientsRouter = express.Router();

import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

patientsRouter.get('/', (_request, response)=>{
  console.log('Fetching all patients!');
  response.json(patientService.getNoneSeneitivePatientEntries());
});

patientsRouter.get('/:id', (request, response)=> {
  const patient = patientService.findById(request.params.id);

  if(patient){
    response.json(patient);
  }else{
    response.status(404).end();
  }
});

patientsRouter.post('/', (request, response)=>{
  try{
    const newPatientEntry = toNewPatientEntry(request.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    response.json(addedEntry);
  }catch(e){
    response.status(400).send(e.message);
  }
});


export default patientsRouter;