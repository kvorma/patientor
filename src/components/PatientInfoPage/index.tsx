import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from '@mui/material';

import { Patient, Entry } from "../../types";

import patientService from "../../services/patients";

import ListEntries from "./ListEntries";
import AddEntryModal from "../AddEntryModal";
import { myError } from "../../utils";

//interface Props {}

const PatientInfoPage = () => {
  const id = useParams().id || 'none'
  const [patient, setPatient] = useState<Patient>()
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setModalError(undefined);
  };

  const submitNewEntry = async (values: Entry) => {
    try {
      void await patientService.addEntry(id, values)
      const p = await patientService.getById(id);
      setPatient(p)
      setModalOpen(false)
    } catch (e: unknown) {
      setModalError(myError(e))
    }
  }

  useEffect(() => {
    const fetch = async () => {
      console.log('getbyid()')
      try {
        const p = await patientService.getById(id);
        setPatient(p);
      } catch (e) {
        setErrorMsg(myError(e))
      }
    }
    void fetch()
  }, [])


  if (!id || !patient) {
    return (<h2>{errorMsg}</h2>)
  }
  console.log('PatientInfoPage().refresh')
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
          <ListEntries entries={patient.entries} />
        ) : (
          <>No patient records to show</>
        )}
        <p>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={modalError}
            onClose={closeModal}
          />
        </p>
      </Box>
    </div>
  );
};

export default PatientInfoPage;
