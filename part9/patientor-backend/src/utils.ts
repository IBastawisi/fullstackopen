/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, NewEntry, EntryType, HealthCheckRating } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const parseString = (string: any): string => {
  if (!string || !isString(string)) {
    throw new Error('Incorrect or missing string: ' + string);
  }
  return string;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};
const parseEntryType = (entryType: any): EntryType => {
  if (!entryType || !isEntryType(entryType)) {
    throw new Error('Incorrect or missing entryType: ' + entryType);
  }
  return entryType;
};
const isDiagnosisCode = (param: any): param is string[] => {
  return Array.isArray(param) && !param.map(s => isString(s)).find(b => b == false);
};
const parseDiagnosisCode = (diagnosisCode: any): string[] => {
  if (diagnosisCode && !isDiagnosisCode(diagnosisCode)) {
    throw new Error('Incorrect DiagnosisCode: ' + diagnosisCode);
  }
  return diagnosisCode;
};

const isHealthRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
const parseHealthRating = (healthRating: any): HealthCheckRating => {
  if (healthRating && !isHealthRating(healthRating)) {
    throw new Error('Incorrect HealthRating: ' + healthRating);
  }
  return healthRating;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: []
  };

  return newEntry;
};

const toNewEntry = (object: any): NewEntry => {
  const newEntry: NewEntry = {
    type: parseEntryType(object.type),
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes)
  };

  switch (newEntry.type) {
    case EntryType.HealthCheck:
      newEntry.healthCheckRating = parseHealthRating(object.healthCheckRating);
      break;

    case EntryType.OccupationalHealthcare:
      newEntry.employerName = object.employerName ? parseString(object.employerName) : undefined,
        newEntry.sickLeave = object.sickLeave ? {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate),
        } : undefined;

      break;

    case EntryType.Hospital:
      newEntry.discharge = object.discharge ? {
        date: parseDate(object.discharge.date),
        criteria: parseString(object.discharge.criteria),
      } : undefined;
      break;

    default:
      break;
  }

  return newEntry;
};

export default { toNewPatientEntry, toNewEntry };