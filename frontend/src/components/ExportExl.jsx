import { Grid, Paper, Typography, Button, CircularProgress } from '@mui/material';
import exportToExcel from '../utils/exportToExcel';
import api from '../services/api';
import { useState } from 'react';

const tableGroups = [
  {
    title: 'I. Tổng quan',
    items: [
      { key: 'overview', label: 'Chỉ số tổng quan' },
      { key: 'ethnic-groups', label: 'Dân số theo dân tộc' }
    ]
  },
  {
    title: 'II. Kinh tế',
    items: [
      { key: 'economy', label: 'Kinh tế' },
      { key: 'villages', label: 'Thôn & HTX' }
    ]
  },
  {
    title: 'III. Y tế – Giáo dục',
    items: [
      { key: 'education-healthcare', label: 'Y tế & Giáo dục' },
      { key: 'schools', label: 'Trường học' }
    ]
  },
  {
    title: 'IV. Cơ sở hạ tầng',
    items: [
      { key: 'infrastructure', label: 'Cơ sở hạ tầng' }
    ]
  },
  {
    title: 'V. Công nghệ số',
    items: [
      { key: 'digital-technology', label: 'Ứng dụng công nghệ số' }
    ]
  }
];

const ExportExl = ({ year }) => {
  const [loadingKey, setLoadingKey] = useState(null);

  const handleExport = async (key, label) => {
    setLoadingKey(key);
    try {
      const res = await api.get(`/${key}/${year}`);
      exportToExcel(res.data, `${label.replace(/\./g, '')}_${year}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingKey(null);
    }
  };

  return (
    <Grid container spacing={3}>
      {tableGroups.map((group, idx) => (
        <Grid item xs={12} md={6} key={idx}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>{group.title}</Typography>
            {group.items.map(({ key, label }) => (
              <Paper
                key={key}
                sx={{
                  p: 2, display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center',
                  border: '1px solid #ddd', my: 1
                }}
              >
                <Typography>{label}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleExport(key, label)}
                  disabled={loadingKey === key}
                >
                  {loadingKey === key ? <CircularProgress size={20}/> : 'Tải Excel'}
                </Button>
              </Paper>
            ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ExportExl;
