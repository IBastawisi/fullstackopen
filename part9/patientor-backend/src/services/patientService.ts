import patientData from '../../data/patients';
import { Patient, NewPatientEntry, Entry, NewEntry } from '../types';
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

const addEntry = (id: string, entry: NewEntry): Entry => {

  const newEntry: Entry = {
    id: uuidv1(),
    ...entry
  };

  const patient = findById(id);
  patient?.entries.push(newEntry);
  return newEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

export default {
  getEntries,
  addPatient,
  findById,
  addEntry
};