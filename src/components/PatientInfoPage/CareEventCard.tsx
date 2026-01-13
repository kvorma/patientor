
import { Typography, Card, CardContent } from '@mui/material';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
//import PersonalInjuryIcon from '@mui/icons-material/PersonalInjury';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import HealthRatingBar from "../HealthRatingBar";

import { Entry, Type } from "../../types";

interface FullProps {
  entry: Entry;
  icdMap: Map<string, string>
}

interface EProps {
  entry: Entry;
}

const EventEntry = ({ entry }: EProps) => {
  switch (entry.type) {
    case Type.Hospital: return (
      <Typography align="left" variant="h5">
        <>
          {entry.date}&nbsp;
          <LocalHospitalIcon />
          {entry.discharge && (
            <p>discharged on {entry.discharge.date}: {entry.discharge.criteria}</p>
          )}
        </>
      </Typography>
    )
    case Type.OccupationalHealthcare: return (
      <Typography align="left" variant="h5">
        {entry.date}&nbsp;
        <WorkIcon />&nbsp;{entry.employerName}
        {entry.sickLeave && (
          <p>on sick leave from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</p>
        )}
      </Typography>
    )
    case Type.HealthCheck: return (
      <Typography align="left" variant="h5">
        {entry.date}&nbsp;
        <MedicalServicesIcon />
        <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
      </Typography>
    )
    default: return (<Typography variant='h4'>Internal error</Typography>)
  }
}

const ListEntries = ({ entry, icdMap }: FullProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <EventEntry entry={entry} />
        <Typography variant="body2" >
          <em>{entry.description}</em>
        </Typography>
        {entry.diagnosisCodes && entry.diagnosisCodes.map(icd => (
          <div key={icd}>{icd}&nbsp;{icdMap.get(icd)}</div>
        ))}
        <Typography variant="body2">
          Diagnose by {entry.specialist}
        </Typography>
      </CardContent>
    </Card >
  )
}

export default ListEntries;
