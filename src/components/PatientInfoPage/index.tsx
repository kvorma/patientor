import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { Patient } from "../../types";

import patientService from "../../services/patients";

import ListEntries from "./ListEntries";

//interface Props {}

const PatientInfoPage = () => {
  const id = useParams().id || 'none'
  const [patient, setPatient] = useState<Patient>()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)


  useEffect(() => {
    const fetch = async () => {
      try {
        const p = await patientService.getById(id);
        setPatient(p);
      } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) {
          if (error.status === 404) {
            setErrorMsg(error.message + ': ' + error.response?.data)
          } else {
            setErrorMsg(error.message)
          }
        } else {
          setErrorMsg('internal error')
        }
      }
    }
    void fetch()
  }, [])

  const openModal = () => {
    console.log('*click*')

  }

  if (!id || !patient) {
    return (<h2>{errorMsg}</h2>)
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
        </Typography>
        {patient.entries ? (
          <ListEntries entries={patient.entries} />
        ) : (
          <>No patient records to show</>
        )}
        <p>
          <Button variant="contained" onClick={() => openModal()}>
            Add New Record
          </Button>
        </p>
      </Box>
    </div>
  );
};

export default PatientInfoPage;
