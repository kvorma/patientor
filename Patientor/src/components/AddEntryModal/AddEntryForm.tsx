import { useState, type SyntheticEvent } from "react";
import { Grid, Button, type SelectChangeEvent } from '@mui/material';

import { type Entry, Type } from "../../types";
import { dayjs2iso } from "../../utils";
import { EventTypeField, MyIcdPicker, MyTextField, MyDatePicker, HospitalFields, OccupationalFields, HealthCheckFields } from '../Utils';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  onCancel: () => void;
  onSubmit: (values: Entry) => void;
  icdMap: Map<string, string>
}

const AddEntryForm = ({ onCancel, onSubmit, icdMap }: Props) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [desc, setDesc] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [icd, setIcd] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [eventType, setEventType] = useState(Type.HealthCheck);
  const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(dayjs());
  const [dischargeDesc, setDischargeDesc] = useState('');
  const [employer, setEmployer] = useState('');
  const [sickStart, setSickStart] = useState<Dayjs | null>(dayjs());
  const [sickEnd, setSickEnd] = useState<Dayjs | null>(null);

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(Type).find(g => g.toString() === value);
      if (type) {
        setEventType(type);
      }
    }
  };

  const onIcdChange = (event: SelectChangeEvent<typeof icd>) => {
    const value = event.target.value;
    setIcd(typeof value === 'string' ? value.split(',') : value);
  };


  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const diagnosisCodes: string[] = icd;
    switch (eventType) {
      case Type.HealthCheck:
        onSubmit({
          type: Type.HealthCheck,
          description: desc,
          date: dayjs2iso(date),
          specialist: specialist,
          diagnosisCodes: diagnosisCodes,
          healthCheckRating: rating,
        });
        break;
      case Type.Hospital:
        onSubmit({
          type: Type.Hospital,
          description: desc,
          date: dayjs2iso(date),
          specialist: specialist,
          diagnosisCodes: diagnosisCodes,
          discharge: {
            date: dayjs2iso(dischargeDate),
            criteria: dischargeDesc
          }
        });
        break;
      case Type.OccupationalHealthcare:
        onSubmit({
          type: Type.OccupationalHealthcare,
          description: desc,
          date: dayjs2iso(date),
          specialist: specialist,
          diagnosisCodes: diagnosisCodes,
          employerName: employer,
          sickLeave: {
            startDate: dayjs2iso(sickStart),
            endDate: dayjs2iso(sickEnd),
          }
        });
    }
  };

  const onRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <EventTypeField value={eventType} onChange={onTypeChange} />
        <MyDatePicker lb="Date" val={date} set={setDate} />
        <MyTextField id="specialist" lb="Specialist" ph="Dr. Pepper" val={specialist} set={setSpecialist} />
        <MyTextField id="description" lb="Description" ph="It Was a Dark and Stormy Night ..." val={desc} set={setDesc} />
        <MyIcdPicker val={icd} onChange={onIcdChange} icdMap={icdMap} />
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
          <Grid>
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
          <Grid>
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