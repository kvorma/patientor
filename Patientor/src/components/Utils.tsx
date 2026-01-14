import { TextField, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import { OutlinedInput, Checkbox, ListItemText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import { Type, Rating } from "../types";

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
  );
};

interface DateProps {
  lb: string;
  val: Dayjs | null;
  set: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

export const MyDatePicker = (props: DateProps) => {
  return (
    <DatePicker label={props.lb} value={props.val} onChange={(newValue) => props.set(newValue)} />
  );

};

interface IcdProps {
  val: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
  icdMap: Map<string, string>
}

export const MyIcdPicker = (props: IcdProps) => {
  const icdList = Array.from(props.icdMap.entries());
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="icd">Choose ICD codes</InputLabel>
        <Select
          labelId="icd"
          id="icd"
          multiple
          value={props.val}
          onChange={props.onChange}
          input={<OutlinedInput label="icd" fullWidth />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {icdList.map(([code, name]) => (
            <MenuItem key={code} value={code}>
              <Checkbox checked={props.val.includes(code)} />
              <ListItemText primary={code} secondary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );

};


interface MyProps {
  id: string;
  lb: string;
  ph: string;
  val: string;
  set: React.Dispatch<React.SetStateAction<string>>
}

export const MyTextField = (props: MyProps) => {
  return (
    <TextField
      id={props.id}
      label={props.lb}
      placeholder={props.ph}
      fullWidth
      value={props.val}
      onChange={({ target }) => props.set(target.value)}
    />
  );
};

interface HospitalProps {
  date: Dayjs | null;
  desc: string;
  setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
}

export const HospitalFields = (props: HospitalProps) => {
  return (
    <div>
      <MyDatePicker lb="Date discharged" val={props.date} set={props.setDate} />
      <MyTextField id="criteria" lb="Criteria" ph="patient healed" val={props.desc} set={props.setDesc} />
    </div>
  );
};

interface OccupationalProps {
  employer: string;
  sickStart: Dayjs | null;
  sickEnd: Dayjs | null;
  setEmployer: React.Dispatch<React.SetStateAction<string>>;
  setSickStart: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setSickEnd: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

export const OccupationalFields = (props: OccupationalProps) => {
  return (
    <div>
      <MyTextField id="employer" lb="Employer" ph="Spam works" val={props.employer} set={props.setEmployer} />
      <MyDatePicker lb="Sick leave start" val={props.sickStart} set={props.setSickStart} />
      <MyDatePicker lb="Sick leave end" val={props.sickEnd} set={props.setSickEnd} />
    </div>
  );
};

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
        <FormControlLabel value="0" control={<Radio />} label="Healthy" />
        <FormControlLabel value="1" control={<Radio />} label="Low Risk" />
        <FormControlLabel value="2" control={<Radio />} label="High Risk" />
        <FormControlLabel value="3" control={<Radio />} label="CriticalRisk" />
      </RadioGroup>
    </FormControl>
  );
};

