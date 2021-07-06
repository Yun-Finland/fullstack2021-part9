import { NewPatientEntry, Gender } from "./types";

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

const parseBirthday = (birthday: unknown):string => {
  if(!birthday || !isString(birthday) || !isDate(birthday)){
    throw new Error('Incorrect or missing date');
  }
  return birthday;
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

type Fields = {name: unknown, ssn: unknown, dateOfBirth: unknown, occupation: unknown, gender:unknown };

const toNewPatientEntry = ({name, ssn, dateOfBirth, occupation, gender} : Fields) : NewPatientEntry => {
  const newEntry:NewPatientEntry ={
    name: parseStringField(name),
    ssn: parseStringField(ssn),
    dateOfBirth: parseBirthday(dateOfBirth),
    occupation: parseStringField(occupation),
    gender: parseGender(gender),
    entries: []
  };

  return newEntry;
};

export default toNewPatientEntry;