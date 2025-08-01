import { Grid, Paper, Typography } from '@mui/material';
import ChartExporter from './ChartExporter';

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

const ExportChart = ({ year }) => {
  return (
    <Grid container spacing={3} sx={{justifyContent: 'center'}}>
      {tableGroups.map((group, idx) => (
        <Grid item xs={12} md={6} key={idx}>
          <Paper sx={{ p: 3, boxShadow: 3}}>
            <Typography variant="h6" gutterBottom>{group.title.toUpperCase()}</Typography>
            {group.items.map(({ key, label }) => (
              <ChartExporter key={key} endpoint={key} label={label} year={year} />
            ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ExportChart;
