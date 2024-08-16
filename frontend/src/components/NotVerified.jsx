import React, { useContext, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './styles/notverified.css'; 
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Teacherdashboard from './facultydashboard/Teacherdashboard';
import userservice from '../services/userservice';
import { usercontext } from './Usercontext';
import { Verified } from '@mui/icons-material';
import Admindashboard from './Admindashboard';
import Studentdashboard from './Studentdashboard';

const NotVerified = () => {
  const [user] = useContext(usercontext);
  const [isVerified, setVerified] = useState(false);

  async function requestProcessing() {
    const response = await userservice.manageTeacher(user.instituteName);
    console.log(response);
    response.data.forEach(faculty => {
      if(faculty.faculty_email === user.email){
        setVerified(true);
        return;
      }
    });

    const response1 = await userservice.getStudents(user.instituteName);
    response1.forEach(student => {
      if(student.student_email === user.email){
        setVerified(true);
        return;
      }
    })
  }
  

  useEffect(() => {
   requestProcessing();
  }, []);

  if(user.role === 'admin'){
    return <Admindashboard/>
  }
  else if(isVerified && user.role === 'faculty'){
    return <Teacherdashboard/>
  }else if(isVerified && user.role === 'student'){
    return <Studentdashboard/>
  }
  else{
    return (
      <Container maxWidth="sm" style={{ marginTop: '200px' }}>
        <Paper elevation={5} className="request-sent-paper">
          <Box textAlign="center">
            <CheckCircleOutlineIcon className="success-icon" />
            <Typography variant="h4" gutterBottom>
              Request Sent
            </Typography>
            <Typography variant="body1" gutterBottom>
              Your request has been sent to the admin. Please wait for approval.
            </Typography>
            <Typography variant="body1">
              If you face any issues, please contact your admin.
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  }
};

export default NotVerified;
