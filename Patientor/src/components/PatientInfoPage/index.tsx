import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from '@mui/material';

import type { Patient, Entry } from "../../types";

import patientService from "../../services/patients";
import DiagnosisServices from '../../services/diagnoses';

import ListEntries from "./ListEntries";
import AddEntryModal from "../AddEntryModal";
import { myError } from "../../utils";

//interface Props {}

const PatientInfoPage = () => {
  const id = useParams().id || 'none';
  const [patient, setPatient] = useState<Patient>();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string>();
  const [icdMap, setIcdMap] = useState(new Map());

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setModalError(undefined);
  };

  const submitNewEntry = async (values: Entry) => {
    try {
      void await patientService.addEntry(id, values);
      const p = await patientService.getById(id);
      setPatient(p);
      setModalOpen(false);
    } catch (e: unknown) {
      setModalError(myError(e));
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const p = await patientService.getById(id);
        setPatient(p);
        const icd = await DiagnosisServices.getAll();
        const hash = new Map(icd.map(e => [e.code, e.name]));
        setIcdMap(hash);
      } catch (e) {
        setErrorMsg(myError(e));
      }
    };
    void fetch();
    // eslint-disable-next-line
  }, [])


  if (!id || !patient) {
    return (<h2>{errorMsg}</h2>);
  }

  return (
    <div className="App">
      <Box>
        <Typography align="left" variant="h5">
          <p><strong><em>{patient.name}</em><>&nbsp;</>
            {patient.gender === 'male'
              ? (<>&#9794;</>)
              : patient.gender === 'female'
                ? (<>&#9792;</>)
                : (<>&#9893;</>)
            }
          </strong></p>
          SSN: {patient?.ssn && (<>{patient.ssn}</>)}
          <div>Occupation: {patient.occupation}</div>
          <p>Patient records&nbsp;
            <Button style={{ marginLeft: 10 }} variant="contained" onClick={() => openModal()}>
              Add New Record
            </Button>
          </p>
        </Typography>
        {patient.entries && patient.entries.length > 0 ? (
          <ListEntries entries={patient.entries} icdMap={icdMap} />
        ) : (
          <>No patient records to show</>
        )}
        <p>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={modalError}
            onClose={closeModal}
            icdMap={icdMap}
          />
        </p>
      </Box>
    </div>
  );
};

export default PatientInfoPage;
