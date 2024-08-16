import React, { useContext, useState, useEffect } from 'react';
import userservice from '../services/userservice';
import { Box, Typography, Paper, Grid, Button, Card, CardContent, CardActions } from '@mui/material';
import { styled } from '@mui/system';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'; // Importing recharts
import Chatbot from './chatbot/Chatbot'; 
import { usercontext } from './Usercontext';
import { useNavigate } from 'react-router-dom';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
  boxShadow: theme.shadows[3],
  textAlign: 'center',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  minHeight: '200px', // Ensuring minimum height for consistency
}));

const ClassCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  minHeight: '150px', // Ensure a minimum height for consistency
}));

const AnnouncementCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const ChatbotIcon = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  boxShadow: theme.shadows[4],
}));

const Studentdashboard = () => {
  const [user, setuser] = useContext(usercontext);
  const [thisAnc, setThisAnc] = useState([]);

  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(null);
  const [student, setstudent] = useState({
    student_id: null,
    reg_no: null,
    student_name: '',
    student_email: '',
    student_department_id: null,
    student_gender: '',
    student_dob: '',
    student_phone_no: '',
    student_address: '',
    student_specializations: '',
    student_class_id: null,
    student_doj: ''
  });
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const classes = [
    {
      id: 1,
      name: "Mathematics",
      teacher: "Mr. John",
      notes: ["Chapter 1: Algebra", "Chapter 2: Geometry"],
    },
    {
      id: 2,
      name: "Science",
      teacher: "Ms. Smith",
      notes: ["Chapter 1: Physics", "Chapter 2: Chemistry"],
    },
    {
      id: 3,
      name: "History",
      teacher: "Mr. Brown",
      notes: ["Chapter 1: Ancient Civilizations", "Chapter 2: Middle Ages"],
    },
  ];

  const grades = [
    { subject: "Mathematics", grade: "A" },
    { subject: "Science", grade: "A-" },
    { subject: "History", grade: "B+" },
  ];

  // Convert grades data for bar chart
  const barChartData = grades.map((item) => ({
    subject: item.subject,
    grade: item.grade === "A" ? 4 : item.grade === "A-" ? 3.7 : 3.3 // Convert grades to numeric values
  }));

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await userservice.getStudentDetailsById(user.instituteName, user.id);
        console.log(response);
        setstudent(response[0]);
      } catch (error) {
        console.log(error);
        throw (error);
      }
    }
    fetchStudentDetails();
  }, [user.instituteName, user.id]);

  useEffect(() => {
    const getAnnouncement = async () => {
      const response = await userservice.fetchAnnouncements(user.instituteName);
      const filterAnnouncement = () => {
        const filtered = response.filter((announcement) => {
          if (announcement.role !== "all" && announcement.role !== "students") {
            return false;
          }

          if (announcement.access_group === "Departments") {
            return (
              announcement.dept_id === 0 ||
              announcement.dept_id === student.student_department_id
            );
          } else if (announcement.access_group === "Class") {
            return (
              announcement.class_id === 0 ||
              (announcement.dept_id === student.student_department_id &&
                announcement.class_id === student.student_class_id)
            );
          } else {
            return true;
          }
        }).sort((one, two) => two.announcement_id - one.announcement_id);
        return filtered;
      };
      setThisAnc(filterAnnouncement());
    };
    getAnnouncement();
  }, [student, user.instituteName]);

  const handleClassClick = (className) => {
    setSelectedClass(className === selectedClass ? null : className);
  };

  const handleJoinClass = () => {
    navigate("/profileSettings");
  }

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };

  return (
    <div style={{ padding: '25px', paddingTop: '125px', backgroundColor: '#f5f5f5' }}>
      <StyledBox>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="h6">
          Manage your classes, attendance, grades, and access important announcements.
        </Typography>
      </StyledBox>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              Your Class
            </Typography>
            <ClassCard>
              <CardContent>
                <Typography variant="h6" textAlign="center">
                  {student.student_class_id ? `Class ID: ${student.student_class_id}` : 'Not Joined'}
                </Typography>
                <Typography color="textSecondary">
                  {student.student_department_id ? `Dept ID: ${student.student_department_id}` : 'Not Joined'}
                </Typography>
              </CardContent>
              <CardActions>
                {student.student_class_id ? (
                  <Button variant="contained" color="primary" size="small">
                    View Class
                  </Button>
                ) : (
                  <Button variant="contained" color="secondary" size="small" onClick={handleJoinClass}>
                    Join Class
                  </Button>
                )}
              </CardActions>
            </ClassCard>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              Joined Classes
            </Typography>
            <Grid container spacing={2}>
              {classes.map((cls) => (
                <Grid item xs={12} sm={6} key={cls.id}>
                  <ClassCard>
                    <CardContent>
                      <Typography variant="h6">{cls.name}</Typography>
                      <Typography>Teacher: {cls.teacher}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleClassClick(cls.name)}>
                        View Materials
                      </Button>
                    </CardActions>
                    {selectedClass === cls.name && (
                      <Box sx={{ padding: 2 }}>
                        {cls.notes.map((note, index) => (
                          <Typography key={index} variant="body2">
                            {note}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </ClassCard>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              Grades
            </Typography>
            <BarChart
              width={500}
              height={300}
              data={barChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="grade" fill="#8884d8" />
            </BarChart>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              Announcements
            </Typography>
            {thisAnc.map((announcement) => (
              <AnnouncementCard key={announcement.announcement_id}>
                <CardContent>
                  <Typography variant="h6">{announcement.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {announcement.description}
                  </Typography>
                </CardContent>
              </AnnouncementCard>
            ))}
          </StyledPaper>
        </Grid>
      </Grid>

      <ChatbotIcon onClick={toggleChatbot}>
        {chatbotOpen ? <Chatbot /> : 'Chat'}
      </ChatbotIcon>
    </div>
  );
};

export default Studentdashboard;
