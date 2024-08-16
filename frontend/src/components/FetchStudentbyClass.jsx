import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Card, CardContent, CardHeader, Avatar, Grid, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import userservice from '../services/userservice';

const FetchStudentbyClass = ({ instituteName, class_id }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await userservice.getStudentsByClass(instituteName, class_id);
        console.log(response);
        setStudents(response);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [instituteName, class_id]);

  const handleRowClick = (params) => {
    setSelectedStudent(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  const columns = [
    { field: 'student_id', headerName: 'Student ID', width: 150 },
    { field: 'reg_no', headerName: 'Reg No', width: 150 },
    { field: 'student_name', headerName: 'Student Name', width: 200 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={students}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        getRowId={(row) => row.student_id}
        onRowClick={handleRowClick}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Student Profile</DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>
                    {selectedStudent.student_name.charAt(0)}
                  </Avatar>
                }
                title={selectedStudent.student_name}
                subheader={`Reg No: ${selectedStudent.reg_no}`}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1"><strong>Student ID:</strong> {selectedStudent.student_id}</Typography>
                    <Typography variant="body1"><strong>Department ID:</strong> {selectedStudent.student_department_id}</Typography>
                    <Typography variant="body1"><strong>Gender:</strong> {selectedStudent.student_gender}</Typography>
                    <Typography variant="body1"><strong>Date of Birth:</strong> {selectedStudent.student_dob}</Typography>
                    <Typography variant="body1"><strong>Class ID:</strong> {selectedStudent.student_class_id}</Typography>
                    <Typography variant="body1"><strong>Date of Joining:</strong> {selectedStudent.student_doj}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1"><EmailIcon /> {selectedStudent.student_email}</Typography>
                    <Typography variant="body1"><PhoneIcon /> {selectedStudent.student_phone_no}</Typography>
                    <Typography variant="body1"><HomeIcon /> {selectedStudent.student_address}</Typography>
                    <Typography variant="body1"><SchoolIcon /> {selectedStudent.student_specializations}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FetchStudentbyClass;
