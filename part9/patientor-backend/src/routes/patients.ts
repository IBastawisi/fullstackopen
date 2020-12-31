import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  const newEntry = utils.toNewPatientEntry(req.body);
  const addedEntry = patientService.addPatient(newEntry);
  res.json(addedEntry);
});

router.post('/:id/entries', (req, res) => {
  const newEntry = utils.toNewEntry(req.body);
  const addedEntry = patientService.addEntry(req.params.id, newEntry);
  res.json(addedEntry);
});

export default router;