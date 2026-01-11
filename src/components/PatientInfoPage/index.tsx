import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, setRef, Typography } from '@mui/material';
import axios from 'axios';
import { Patient } from "../../types";

import patientService from "../../services/patients";
import patients from "../../services/patients";

interface Props {
}

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



  if (!id || !patient) {
    return (<h2>{errorMsg}</h2>)
  }

  return (
    <div className="App">
      <Box>
        <Typography align="left" variant="h4">
          <p>
            {patient.name}<>&nbsp;</>
            {patient.gender === 'male'
              ? (<>&#9794;</>)
              : patient.gender === 'female'
                ? (<>&#9792;</>)
                : (<>&#9893;</>)
            }
          </p>
        </Typography>
        <Typography align="left" variant="h6">
          {patient?.ssn || 1 && (<>SSN: {patient.ssn}</>)}
          <div>Occupation: {patient.occupation}</div>
        </Typography>
      </Box>
    </div>
  );
};

export default PatientInfoPage;
