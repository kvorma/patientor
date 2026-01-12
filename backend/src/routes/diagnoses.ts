import express from 'express';
import diagnoses from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoses.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
