import patientData from '../../data/patients.json';
import { Patient, NewPatientEntry } from '../types';
import { v1 as uuidv1 } from 'uuid';

const patients: Patient[] = patientData as Patient[];

const getEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {

const newPatientEntry = {
  id: uuidv1(),
  ...entry
};

patients.push(newPatientEntry);
return newPatientEntry;
};
export default {
  getEntries,
  addPatient
};