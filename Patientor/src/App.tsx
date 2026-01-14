import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import { myError } from "./utils";
import { type Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfoPage from "./components/PatientInfoPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const patients = await patientService.getAll();
        setPatients(patients);
      } catch (err) {
        setErrorMsg(myError(err));
      }
    };
    void fetchPatientList();
  }, []);

  if (errorMsg) {
    return (
      <h2>Cannot connect to database: {errorMsg}</h2>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Router>
          <Container>
            <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
              <Button style={{ marginRight: 20 }} component={Link} to="/" variant="contained" color="primary">
                Home
              </Button>
              Patientor
            </Typography>
            <Divider hidden />
            <Routes>
              <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
              <Route path="/patients/:id" element={<PatientInfoPage />} />
            </Routes>
          </Container>
        </Router>
      </div>
    </LocalizationProvider >
  );
};

export default App;
