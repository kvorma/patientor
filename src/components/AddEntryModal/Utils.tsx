import { TextField, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material'

import { Type, Rating } from "../../types";

interface EventProps {
  value: Type;
  onChange: (event: SelectChangeEvent<string>) => void;
}

export const EventTypeField = ({ value, onChange }: EventProps) => {
  return (
    <FormControl>
      <InputLabel style={{ marginTop: 0 }}>Event Type</InputLabel>
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

interface MyProps {
  lb: string;
  ph: string;
  val: string
  set: React.Dispatch<React.SetStateAction<string>>
}

export const MyTextField = (props: MyProps) => {
  return (
    <TextField
      label={props.lb}
      placeholder={props.ph}
      fullWidth
      value={props.val}
      onChange={({ target }) => props.set(target.value)}
    />
  )
}

interface HospitalProps {
  date: string;
  desc: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
}

export const HospitalFields = (props: HospitalProps) => {
  return (
    <div>
      <MyTextField lb="Date discharged" ph="YYYY-MM-DD" val={props.date} set={props.setDate} />
      <MyTextField lb="Reason" ph="patient healed" val={props.desc} set={props.setDesc} />
    </div>
  )
}

interface OccupationalProps {
  employer: string;
  sickStart: string;
  sickEnd: string;
  setEmployer: React.Dispatch<React.SetStateAction<string>>;
  setSickStart: React.Dispatch<React.SetStateAction<string>>;
  setSickEnd: React.Dispatch<React.SetStateAction<string>>;
}

export const OccupationalFields = (props: OccupationalProps) => {
  return (
    <div>
      <MyTextField lb="Employer" ph="Spam works" val={props.employer} set={props.setEmployer} />
      <MyTextField lb="Sick leave start" ph="YYYY-MM-DD" val={props.sickStart} set={props.setSickStart} />
      <MyTextField lb="Sick leave end" ph="YYYY-MM-DD" val={props.sickEnd} set={props.setSickEnd} />
    </div>
  )
}

interface HealthProps {
  value: Rating
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export const HealthCheckFields = (props: HealthProps) => {
  return (
    <FormControl>
      <FormLabel id="rating">Health Rating</FormLabel>
      <RadioGroup
        row
        name="rating"
        value={props.value}
        onChange={props.onChange}
      >
        <FormControlLabel value="1" control={<Radio />} label="Healthy" />
        <FormControlLabel value="2" control={<Radio />} label="Low Risk" />
        <FormControlLabel value="3" control={<Radio />} label="High Risk" />
        <FormControlLabel value="4" control={<Radio />} label="CriticalRisk" />
      </RadioGroup>
    </FormControl>
  )
}

