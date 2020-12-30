import { Patient, Diagnosis } from "../types";
import { Action } from "./reducer";

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload
  };
};

export const setDiagnosisList = (payload: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload
  };
};
