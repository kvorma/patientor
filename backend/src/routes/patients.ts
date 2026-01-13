import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import patients from '../services/patients';

import { ZPatient, Patient, PatientNew, ZEntry, Entry } from '../types/types';

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    console.log('parsing new patient:', req.body);
    ZPatient.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    console.log('parsing new entry:', req.params.id, req.body);
    ZEntry.parse(req.body)
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    console.error('reporting zoderror:', error.issues)
    res.status(400).json(z.prettifyError(error));
  } else {
    next(error);
  }
};

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query?.full) {
    res.send(patients.getFullEntries());
  } else {
    res.send(patients.getEntries());
  }
});

router.get('/:id', (req, res) => {
  const pat = patients.getFullEntry(req.params.id)
  if (pat === null) {
    res.sendStatus(404);
  } else {
    res.send(pat);
  }
})

router.post('/', newPatientParser,
  (req: Request<unknown, unknown, PatientNew>, res: Response<Patient>) => {
    const added: Patient = patients.addPatient(req.body);
    res.json(added);
  });

router.post('/:id/entry', newEntryParser,
  (req: Request<any, any, Entry>, res: Response<Entry>) => {
    const id = req.params.id;
    console.log('POST', req.params, req.body)
    const added = patients.addEntry(id, req.body);
    if (added) {
      res.json(added);
    } else {
      res.sendStatus(404)
    }
  });


router.use(errorMiddleware);


export default router;
