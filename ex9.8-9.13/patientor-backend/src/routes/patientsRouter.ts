import express from 'express';
import patientService from '../services/patientService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_request, response)=>{
  console.log('Fetching all patients!');
  response.json(patientService.getNoneSeneitivePatientEntries());
});

export default patientsRouter;