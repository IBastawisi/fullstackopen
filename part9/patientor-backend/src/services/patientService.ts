import patientData from '../../data/patients';
import { Patient, NewPatientEntry } from '../types';
import { v1 as uuidv1 } from 'uuid';

const patients = patientData;

const getEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
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

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

export default {
  getEntries,
  addPatient,
  findById
};