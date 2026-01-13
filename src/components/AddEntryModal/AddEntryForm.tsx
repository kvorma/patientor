import { useState, SyntheticEvent } from "react";

import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material'

import { Entry, Type, Rating } from "../../types";

interface EventProps {
  value: Type;
  onChange: () => void;
}

const EventType ({ value, onChange }: EventProps) => {
  return (
    <FormControl>
      <InputLabel style={{ marginTop: 20 }}>Event Type</InputLabel>
      <Select
        label="Event Type"
        fullWidth
        value={value}
        onChange={onChange}
      >
        {Object.keys(Type).map(option =>
          <MenuItem
            key={option}
            value={option}
          >
            {option.toString()}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}


interface Props {
  onCancel: () => void;
  onSubmit: (values: Entry) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [icd, setIcd] = useState('');
  const [rating, setRating] = useState(0);
  const [eventType, setEventType] = useState(Type.HealthCheck);

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
    onSubmit({
      type: Type.HealthCheck,
      description: description,
      date: date,
      specialist: specialist,
      diagnosisCodes: diagnosisCodes,
      healthCheckRating: rating,
    });
  };

  const onRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;

    setRating(Number(value))
    console.log('rating: ', value)
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Event Type</InputLabel>
        <Select
          label="Event Type"
          fullWidth
          value={eventType}
          onChange={onTypeChange}
        >
          {/*typeOptions.map(option =>*/}
          {Object.keys(Type).map(option =>
            <MenuItem
              key={option}
              value={option}
            >
              {option.toString()}
            </MenuItem>
          )}
        </Select>

        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist name"
          placeholder="Dr. Pepper"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="ICD10 codes"
          placeholder="X99.äh, Y99.ky"
          fullWidth
          value={icd}
          onChange={({ target }) => setIcd(target.value)}
        />
        {eventType === Type.HealthCheck &&
          <FormControl>
            <FormLabel id="rating">Health Rating</FormLabel>
            <RadioGroup
              row
              name="rating"
              value={rating}
              onChange={onRatingChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="Healthy" />
              <FormControlLabel value="2" control={<Radio />} label="Low Risk" />
              <FormControlLabel value="3" control={<Radio />} label="High Risk" />
              <FormControlLabel value="4" control={<Radio />} label="CriticalRisk" />
            </RadioGroup>
          </FormControl>
        }
        <Grid>
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