import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/system';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { usercontext } from '../Usercontext';
import userservice from '../../services/userservice';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  boxShadow: theme.shadows[2],
}));

const CardContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[6],
  },
}));

const ButtonPrimary = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 'bold',
  padding: theme.spacing(1, 3),
}));

const ButtonSecondary = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  padding: theme.spacing(1, 3),
}));

const allClasses = [
  {
    id: 1,
    name: 'Mathematics',
    teacherId: 1,
    studentsCount: 30,
    notes: ['Chapter 1: Algebra', 'Chapter 2: Geometry'],
    students: ['John Doe', 'Jane Smith'],
  },
  {
    id: 2,
    name: 'Science',
    teacherId: 2,
    studentsCount: 25,
    notes: ['Chapter 1: Physics', 'Chapter 2: Chemistry'],
    students: ['Alice Brown', 'Bob Johnson'],
  },
];

const Teacherdashboard = () => {
  const [user, setUser] = useContext(usercontext);
  const [classes, setClasses] = useState([]);
  const [faculty, setFaculty] = useState({});
  const [thisAnc, setThisAnc] = useState([{}]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [open, setOpen] = useState(false);
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', teacherId: 1, studentsCount: 0 });
  const [newNote, setNewNote] = useState('');
  const [newStudent, setNewStudent] = useState('');
  const navigate = useNavigate();
  const [yourClass, setYourClass] = useState({
    class_id: null,
    class_name: '',
    class_incharge: '',
    faculty_in_charge_id: null,
    department_id: null,
  });

  useEffect(() => {
    const fetchYourClass = async () => {
      try {
        const urclass = await userservice.getYourClass(user.instituteName, user.id);
        console.log(urclass);
        if (urclass.length > 0) setYourClass(urclass[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchYourClass();
  }, []);

  useEffect(() => {
    const getResponse = async () => {
      const response = await userservice.fetchFacultyByUserId(
        user.id,
        user.instituteName
      );
      setFaculty(response[0]);
    };
    getResponse();
  }, []);

  useEffect(() => {
    const getAnnouncement = async () => {
      const response = await userservice.fetchAnnouncements(user.instituteName);
      const filterAnnouncement = () => {
        const filtered = response
          .filter((announcement) => {
            if (announcement.role !== 'all' && announcement.role !== 'staff') {
              return false;
            }
            if (announcement.access_group === 'Departments') {
              return (
                announcement.dept_id === 0 ||
                announcement.dept_id === faculty.faculty_department_id
              );
            } else if (announcement.access_group === 'Class') {
              return (
                announcement.class_id === 0 ||
                (announcement.dept_id === faculty.faculty_department_id &&
                  announcement.class_id === faculty.faculty_class_id)
              );
            } else {
              return true;
            }
          })
          .sort((one, two) => two.announcement_id - one.announcement_id);
        return filtered;
      };
      setThisAnc(filterAnnouncement());
    };
    getAnnouncement();
  }, [faculty]);

  useEffect(() => {
    setClasses(allClasses.filter((cls) => cls.teacherId === 1));
  }, []);

  const handleClassClick = (cls) => {
    setSelectedClass(cls === selectedClass ? null : cls);
  };

  const handleAddNote = (classId) => {
    const updatedClasses = classes.map((cls) => {
      if (cls.id === classId) {
        return { ...cls, notes: [...cls.notes, newNote] };
      }
      return cls;
    });
    setClasses(updatedClasses);
    setNewNote('');
    toast.success('Note added successfully!');
  };

  const handleCreateClass = () => {
    const newClassId = classes.length + 1;
    const createdClass = { ...newClass, id: newClassId, studentsCount: 0, notes: [], students: [] };
    setClasses([...classes, createdClass]);
    setOpen(false);
    setNewClass({ name: '', teacherId: 1, studentsCount: 0 });
    toast.success('Class created successfully!');
  };

  const handleAddStudent = () => {
    const updatedClasses = classes.map((cls) => {
      if (cls.id === selectedClass.id) {
        return { ...cls, students: [...cls.students, newStudent], studentsCount: cls.studentsCount + 1 };
      }
      return cls;
    });
    setClasses(updatedClasses);
    setNewStudent('');
    setOpenStudentDialog(false);
    toast.success('Student added successfully!');
  };

  const handleMarkAttendance = () => {
    navigate('/attendance');
  };

  const handleViewClass = () => {
    navigate('/YourClass', {
      state: {
        instituteName: user.instituteName,
        class_id: yourClass.class_id,
      },
    });
  };

  return (
    <Box sx={{ mt: 5, mx: 3 }}>
      <StyledBox>
        <Typography variant="h3" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Manage your classes, mark attendance, and stay updated with messages from the admin.
        </Typography>
      </StyledBox>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Your Class
            </Typography>
            <CardContainer>
              <CardContent>
                <Typography variant="h5">
                  {yourClass.class_name ? yourClass.class_name : 'Not Assigned'}
                </Typography>
                <Typography color="textSecondary">
                  Department ID: {yourClass.department_id ? yourClass.department_id : 'N/A'}
                </Typography>
              </CardContent>
              <CardActions>
                <ButtonPrimary size="small" onClick={yourClass.class_name ? handleViewClass : null}>
                  View Class
                </ButtonPrimary>
              </CardActions>
            </CardContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
              Created Classes
            </Typography>
            <Grid container spacing={3}>
              {classes.map((cls) => (
                <Grid item xs={12} sm={6} key={cls.id}>
                  <CardContainer>
                    <CardContent>
                      <Typography variant="h6">{cls.name}</Typography>
                      <Typography color="textSecondary">
                        Students: {cls.studentsCount}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <ButtonSecondary size="small" onClick={() => handleClassClick(cls)}>
                        View Materials
                      </ButtonSecondary>
                      <ButtonSecondary size="small" onClick={() => setOpenStudentDialog(true)}>
                        Add Student
                      </ButtonSecondary>
                      <ButtonSecondary size="small" onClick={() => handleAddNote(cls.id)}>
                        Add Note
                      </ButtonSecondary>
                    </CardActions>
                  </CardContainer>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={5} textAlign="center">
        <ButtonPrimary onClick={() => setOpen(true)}>Create New Class</ButtonPrimary>
        <ButtonSecondary onClick={handleMarkAttendance} sx={{ ml: 2 }}>
          Mark Attendance
        </ButtonSecondary>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Class</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Class Name"
            type="text"
            fullWidth
            value={newClass.name}
            onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <ButtonSecondary onClick={() => setOpen(false)}>Cancel</ButtonSecondary>
          <ButtonPrimary onClick={handleCreateClass}>Create</ButtonPrimary>
        </DialogActions>
      </Dialog>

      <Dialog open={openStudentDialog} onClose={() => setOpenStudentDialog(false)}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Student Name"
            type="text"
            fullWidth
            value={newStudent}
            onChange={(e) => setNewStudent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <ButtonSecondary onClick={() => setOpenStudentDialog(false)}>Cancel</ButtonSecondary>
          <ButtonPrimary onClick={handleAddStudent}>Add</ButtonPrimary>
        </DialogActions>
      </Dialog>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </Box>
  );
};

export default Teacherdashboard;
