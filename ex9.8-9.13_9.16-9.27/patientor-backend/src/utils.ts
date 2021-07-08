import { NewPatient, Gender, HealthCheckRating, EntryWithoutId, BaseEntry, CheckType } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringField = (stringData: unknown): string => {
  if(!stringData || !isString(stringData)){
    throw new Error('Incorrect or missing data.');
  }

  return stringData;
};

const isDate = (date:string): boolean => {
  return Boolean(Date.parse(date));
};

const parsedate = (date: unknown):string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date');
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)){
    throw new Error('Wrong Gender Info');
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param: any) :param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating:unknown): HealthCheckRating =>{
  if(!rating || !isRating(rating)){
    throw new Error("Wrong Rating Info");
  }
  return rating;
};

type Fields = {name: unknown, ssn: unknown, dateOfBirth: unknown, occupation: unknown, gender:unknown };

export const toNewPatient = ({name, ssn, dateOfBirth, occupation, gender} : Fields) : NewPatient => {
  const newEntry:NewPatient ={
    name: parseStringField(name),
    ssn: parseStringField(ssn),
    dateOfBirth: parsedate(dateOfBirth),
    occupation: parseStringField(occupation),
    gender: parseGender(gender),
    entries: []
  };

  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntryWithoutId = (object:any): EntryWithoutId =>{
  const newEntryBase: Omit<BaseEntry, "id"> = {
    description: parseStringField(object.description),
    date: parsedate(object.date),
    specialist: parseStringField(object.specialist),
  };

  if(object.diagnosisCodes){
    newEntryBase.diagnosisCodes = object.diagnosisCodes as Array<string>;
  }

  switch(object.type){
    case 'HealthCheck':
      return {
        ...newEntryBase,
        type: CheckType.HealthyCheck,
        healthCheckRating: parseRating(object.healthCheckRating)
      };

    case 'OccupationalHealthcare':
      const tempObj : EntryWithoutId = {
        ...newEntryBase,
        type: CheckType.OccupationalCheck,
        employerName: parseStringField(object.employerName)       
      };
      if(object.sickLeave){
        tempObj.sickLeave = {
          startDate: parsedate(object.sickLeave.startDate),
          endDate: parsedate(object.sickLeave.endDate)
        }; 
      }
      return tempObj;

    default:
      return {
        ...newEntryBase,
        type: CheckType.Hospital,
        discharge:{
          date: parsedate(object.discharge.date),
          criteria: parseStringField(object.discharge.criteria)
        }
      };
  }
};
