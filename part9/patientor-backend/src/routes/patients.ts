import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
  const newEntry = toNewPatientEntry(req.body);
  const addedEntry = patientService.addPatient(newEntry);
  res.json(addedEntry);
});

export default router;