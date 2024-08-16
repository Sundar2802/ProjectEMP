import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box, Container, Paper } from '@mui/material';
import FetchStudentbyClass from './FetchStudentbyClass';
import { useLocation } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const location = useLocation();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AssignedClass = () => {
  const location = useLocation();
  const { instituteName, class_id } = location.state || {};
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '100px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="assigned class tabs" 
            fullWidth
            variant="fullWidth"
            centered
          >
            <Tab label="Manage Students" {...a11yProps(0)} />
            <Tab label= "Manage Requests" {...a11yProps(1)} />
            <Tab label="Track Attendance" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <FetchStudentbyClass instituteName={instituteName} class_id={class_id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <ManageRequests /> */}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* <TrackAttendance /> */}
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AssignedClass;
