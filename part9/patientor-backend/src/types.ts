export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type NewPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum EntryType {
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
  HealthCheck = 'HealthCheck'
}

interface BaseEntry {
  type: EntryType;
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge?: {
    date: string,
    criteria: string,
  }}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName?: string;
  sickLeave?: {
    startDate: string,
    endDate: string,
  }
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating?: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntry = {
  type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  discharge?: {
    date: string,
    criteria: string,
  },
  employerName?: string;
  sickLeave?: {
    startDate: string,
    endDate: string,
  },
  healthCheckRating?: HealthCheckRating;
};