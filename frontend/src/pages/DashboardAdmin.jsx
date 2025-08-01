import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Button } from '@mui/material';
import OverviewTable from '../components/Overview/OverviewTable';
import EthnicGroupsTable from '../components/EthnicGroups/EthnicGroupsTable';
import EconomyTable from '../components/Economy/EconomyTable';
import VillagesTable from '../components/Villages/VillagesTable';
import EducationHealthcareTable from '../components/EducationHealthcare/EducationHealthcareTable';
import SchoolsTable from '../components/Schools/SchoolsTable';
import InfrastructureTable from '../components/Infrastructure/InfrastructureTable';
import DigitalTechnologyTable from '../components/DigitalTechnology/DigitalTechnologyTable';

const DashboardAdmin = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box p={4} sx={{ mt: 7, minHeight: '600px' }}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">📊 HỆ THỐNG THỐNG KÊ XÃ - QUẢN TRỊ</Typography>
      </Box>

      <Tabs value={tab} onChange={(e, val) => setTab(val)} variant="scrollable" scrollButtons="auto">
        <Tab label="1. Tổng quan" />
        <Tab label="2. Dân tộc" />
        <Tab label="3. Kinh tế" />
        <Tab label="4. Thôn / HTX" />
        <Tab label="5. Y tế - GD" />
        <Tab label="6. Trường học" />
        <Tab label="7. CS Hạ tầng" />
        <Tab label="8. Công nghệ số" />
      </Tabs>

      <Box mt={4}>
        {tab === 0 && (
          <>
            <OverviewTable />
          </>
        )}
        {tab === 1 && (
          <>
            <EthnicGroupsTable />
          </>
        )}
        {tab === 2 && (
          <>
            <EconomyTable />
          </>
        )}
        {tab === 3 && (
          <>
            <VillagesTable />
          </>
        )}
        {tab === 4 && (
          <>
            <EducationHealthcareTable />
          </>
        )}
        {tab === 5 && (
          <>
            <SchoolsTable />
          </>
        )}
        {tab === 6 && (
          <>
            <InfrastructureTable />
          </>
        )}
        {tab === 7 && (
          <>
            <DigitalTechnologyTable />
          </>
        )}
      </Box>
    </Box>
  );
};

export default DashboardAdmin;
