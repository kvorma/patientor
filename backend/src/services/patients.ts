import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients';
import { Patient, PatientPub, PatientNew, Entry } from '../types/types';

const getFullEntries = (): Patient[] => {
  return patientData;
};

const getEntries = (): PatientPub[] => {
  return getFullEntries().map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const getFullEntry = (id: string): Patient | null => {
  const patient = patientData.find(item => item.id === id)
  if (patient) {
    return patient
  } else {
    // throw new Error('patient not found');
    return null;
  }
}


const addPatient = (entry: PatientNew): Patient => {
  const patient: Patient = { ...entry, id: uuid(), entries: [] };
  patientData.push(patient);
  return patient;
};

const addEntry = (patientId: string, entry: Entry): Entry | undefined => {
  console.log('addEntry:', patientId, entry)
  const patientRef = patientData.find(p => p.id === patientId)
  if (patientRef) {
    entry.id = uuid();
    if (!patientRef.entries) {
      patientRef.entries = [entry]
    } else {
      patientRef.entries.push(entry)
    }
    return entry;
  }
  return undefined;
}

export default { addEntry, addPatient, getEntries, getFullEntries, getFullEntry };
