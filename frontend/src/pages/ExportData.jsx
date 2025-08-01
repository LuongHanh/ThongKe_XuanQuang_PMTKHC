import { useState } from 'react';
import { Box, TextField, Typography, Divider } from '@mui/material';
import ExportExl from '../components/ExportExl';
import ExportChart from '../components/ExportChart';

const ExportData = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <Box p={4} sx={{mt: 7, minHeight: '600px'}}>
      <Typography variant="h5" align="center" gutterBottom>
        📦 XUẤT DỮ LIỆU THEO NĂM
      </Typography>

      <Box display="flex" justifyContent="center" my={2}>
        <TextField
          label="Nhập năm"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      <ExportExl year={year} />

      <Divider sx={{ my: 4}} />

      <ExportChart year={year} />
    </Box>
  );
};

export default ExportData;
