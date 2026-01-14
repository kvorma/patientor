//import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import type { Entry } from "../../types";
//import DiagnosisServices from '../../services/diagnoses'
import CareEventCard from './CareEventCard';

interface Props {
  entries: Entry[];
  icdMap: Map<string, string>;
}

const ListEntries = ({ entries, icdMap }: Props) => {

  if (entries.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography align="left" variant="h6">
        {entries.length > 0 && entries.map(e => (
          <div key={e.id}>
            <CareEventCard entry={e} icdMap={icdMap} />
          </div>
        ))}
      </Typography>
    </Box>
  );
};

export default ListEntries;
