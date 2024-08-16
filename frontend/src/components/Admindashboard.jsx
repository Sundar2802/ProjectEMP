import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { motion } from 'framer-motion';
import './styles/adminDashboard.css';
import { usercontext } from './Usercontext';
import { Outlet, useNavigate } from 'react-router-dom';

const Admindashboard = () => {
  const navigate=useNavigate();
  const[user,setuser]=useContext(usercontext);
  const adminActions = [
    {
      title: 'Manage Teachers',
      description: 'Manage and add new teachers to the platform.',
      operation:'ManageTeachers'
    },
    {
      title: 'Manage Students',
      description: 'View and manage student information.',
      operation:'ManageStudents'
    },
    {
      title: 'Add Announcements',
      description: 'Create and publish school-wide announcements.',
      operation: 'AddAnnouncement'
    },
    
    {
      title: 'Manage Classes/Departments',
      description: 'Add and manage different classes or departments.',
      operation:'DepartmentsandClasses'
    },
    {
      title: 'Create Circular',
      description: 'Design and distribute circulars to students and staff.',
    },
    {
      title: 'Messages/Notifications',
      description: 'Send and view messages or notifications.',
    },
  ];

  return (
    <>
      <Container maxWidth="lg" className="dashboard-container" style={{marginTop:'100px'}}>
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" component="h2" gutterBottom className="section-title">
              Welcome, {user.name}!
              
            </Typography>
            <Typography variant="h6" component="p" className="welcome-message">
              Here are your tasks for today. Manage your school effectively and ensure everything runs smoothly.
            </Typography>
          </motion.div>
        <Box py={5} textAlign="center">

          <Grid container spacing={4} justifyContent="center">
            {adminActions.map((action, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="action-card">
                    <CardContent style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center',gap:'20px'}}>
                      <Typography variant="h5" component="h3" color={'black'}>
                        {action.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {action.description}
                      </Typography>
                      <Button variant="contained" color="secondary" className="action-button" onClick={() => {
                        navigate(action.operation)
                      }}>
                        Go
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Outlet/>
    </>
  );
};

export default Admindashboard;
