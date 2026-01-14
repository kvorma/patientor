import { useState, type SyntheticEvent } from "react";

import { InputLabel, MenuItem, Select, Grid, Button, type SelectChangeEvent } from '@mui/material';
import { Dayjs } from 'dayjs';
import { dayjs2iso } from "../../utils";
import { type PatientNew, Gender } from "../../types";

import { MyDatePicker, MyTextField } from "../Utils";


interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientNew) => void;
}

interface GenderOption {
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
  value: v, label: v.toString()
}));

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [ssn, setSsn] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null);
  const [gender, setGender] = useState(Gender.Other);

  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const gender = Object.values(Gender).find(g => g.toString() === value);
      if (gender) {
        setGender(gender);
      }
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      occupation,
      ssn,
      dateOfBirth: dayjs2iso(dateOfBirth),
      gender
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <MyTextField id="name" lb="Name" ph="" val={name} set={setName} />
        <MyTextField id="ssn" lb="Social security number" ph="123456-789A" val={ssn} set={setSsn} />
        <MyDatePicker lb="Date of birth" val={dateOfBirth} set={setDateOfBirth} />
        <MyTextField id="occupation" lb="Occupation" ph="" val={occupation} set={setOccupation} />
        <InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
        <Select
          label="Gender"
          id='gender'
          fullWidth
          value={gender}
          onChange={onGenderChange}
        >
          {genderOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >
              {option.label
              }</MenuItem>
          )}
        </Select>

        <Grid>
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

export default AddPatientForm;