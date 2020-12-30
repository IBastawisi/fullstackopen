import diagnosiData from '../../data/diagnosis.json';
import { Diagnosis } from '../types';

const diagnosis: Diagnosis[] = diagnosiData as Diagnosis[];

const getEntries = (): Diagnosis[] => {
  return diagnosis;
};

export default {
  getEntries
};