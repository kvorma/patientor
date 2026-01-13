import { useState, SyntheticEvent } from "react";
import { Grid, Button, SelectChangeEvent } from '@mui/material';

import { Entry, Type } from "../../types";
import { EventTypeField, MyTextField, HospitalFields, OccupationalFields, HealthCheckFields } from './Utils'


interface Props {
  onCancel: () => void;
  onSubmit: (values: Entry) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [icd, setIcd] = useState('');
  const [rating, setRating] = useState(0);
  const [eventType, setEventType] = useState(Type.HealthCheck);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeDesc, setDischargeDesc] = useState('');
  const [employer, setEmployer] = useState('');
  const [sickStart, setSickStart] = useState('');
  const [sickEnd, setSickEnd] = useState('');

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(Type).find(g => g.toString() === value);
      if (type) {
        setEventType(type);
        console.log('eventType', type, typeof type)
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const diagnosisCodes: string[] = icd.split(',')
    switch (eventType) {
      case Type.HealthCheck:
        onSubmit({
          type: Type.HealthCheck,
          description: desc,
          date: date,
          specialist: specialist,
          diagnosisCodes: diagnosisCodes,
          healthCheckRating: rating,
        });
        break;
      case Type.Hospital:
        onSubmit({
          type: Type.Hospital,
          description: desc,
          date: date,
          specialist: specialist,
          diagnosisCodes: diagnosisCodes,
          discharge: { date: dischargeDate, criteria: dischargeDesc }
        });
        break;
      case Type.OccupationalHealthcare:
        onSubmit({
          type: Type.OccupationalHealthcare,
          description: desc,
          date: date,
          specialist: specialist,
          diagnosisCodes: diagnosisCodes,
          employerName: employer,
          sickLeave: { startDate: sickStart, endDate: sickEnd }
        });
    }
  };

  const onRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;

    setRating(Number(value))
    console.log('rating: ', value)
  };
  console.log('AddEntryForm().refresh')
  return (
    <div>
      <form onSubmit={addEntry}>
        <EventTypeField value={eventType} onChange={onTypeChange} />
        <MyTextField lb="Date" ph="YYYY-MM-DD" val={date} set={setDate} />
        <MyTextField lb="Specialist" ph="Dr. Pepper" val={specialist} set={setSpecialist} />
        <MyTextField lb="Description" ph="It Was a Dark and Stormy Night ..." val={desc} set={setDesc} />
        <MyTextField lb="ICD Codes" ph="X99.äh, Y99.ky" val={icd} set={setIcd} />
        {eventType === Type.HealthCheck &&
          <HealthCheckFields value={rating} onChange={onRatingChange} />
        }
        {eventType === Type.Hospital &&
          <HospitalFields date={dischargeDate} desc={dischargeDesc}
            setDate={setDischargeDate} setDesc={setDischargeDesc} />
        }
        {eventType === Type.OccupationalHealthcare &&
          <OccupationalFields employer={employer} sickStart={sickStart} sickEnd={sickEnd}
            setEmployer={setEmployer} setSickStart={setSickStart} setSickEnd={setSickEnd} />
        }
        <Grid style={{ marginTop: 10 }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;