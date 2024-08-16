import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Container, FormControl, TextField, Typography } from '@mui/material';
import userservice from '../services/userservice';
import { usercontext } from './Usercontext';
import { useNavigate } from 'react-router-dom';
const StudentDetails = () => {
    const [user, setuser] = useContext(usercontext);
    const navigate = useNavigate();
    const [student, setstudent] = useState({
        student_id: null,
        reg_no: '',
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
    const HandleEdit = () => {
        navigate("/EditDetails");
    }
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
    }, [])

    const handleupdate = () => {
        console.log(student)
    }
    return (
        <>
            <Container style={{ marginTop: '100px', height: 'fit-content', display: 'flex', justifyContent: 'center', width: '100vw' }}>
                <FormControl required style={{ width: '100%' }}>
                    <Box className="login-box" p={4} boxShadow={5} borderRadius={2} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
                        <Typography variant="h4" gutterBottom padding={'0 0 20px 10px'} style={{ width: '100%', textAlign: 'center' }}>
                            Your Details
                        </Typography>
                        <TextField
                            disabled
                            required
                            value={student.student_id}
                            label="student_id"
                            InputLabelProps={student.student_id ? { shrink: true } : undefined}

                            onChange={(e) => setstudent({ ...student, student_id: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            disabled
                            required
                            value={student.reg_no}
                            label="reg_no"
                            InputLabelProps={student.reg_no ? { shrink: true } : undefined}
                            onChange={(e) => setstudent({ ...student, reg_no: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />

                        <TextField
                            disabled
                            required
                            value={student.student_name}
                            label="student_name"
                            onChange={(e) => setstudent({ ...student, student_name: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            disabled
                            required
                            value={student.student_email}
                            label="student_email"
                            onChange={(e) => setstudent({ ...student, student_email: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            disabled
                            value={student.student_department_id}
                            label="student_department_id"
                            InputLabelProps={student.student_department_id ? { shrink: true } : undefined}
                            onChange={(e) => setstudent({ ...student, student_department_id: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            disabled
                            value={student.student_gender}
                            label="student_gender"
                            onChange={(e) => setstudent({ ...student, student_gender: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            disabled
                            value={student.student_dob}
                            label="student_dob"
                            onChange={(e) => setstudent({ ...student, student_dob: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            disabled
                            value={student.student_phone_no}
                            label="stuent_phone_no"
                            onChange={(e) => setstudent({ ...student, student_phone_no: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            disabled
                            value={student.student_address}
                            label="student_address"
                            onChange={(e) => setstudent({ ...student, student_address: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            disabled
                            value={student.student_specializations}
                            label="student_specializations"
                            onChange={(e) => setstudent({ ...student, student_specializations: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            disabled
                            required
                            value={student.student_class_id}
                            label="student_class_id"
                            InputLabelProps={student.student_class_id ? { shrink: true } : undefined}

                            onChange={(e) => setstudent({ ...student, student_class_id: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            disabled
                            value={student.student_doj}
                            label="student_doj"
                            onChange={(e) => setstudent({ ...student, student_doj: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <Button fullWidth variant="contained" color="primary" style={{ marginTop: '40px', width: '30%' }} onClick={HandleEdit}>Edit</Button>
                    </Box>
                </FormControl>
            </Container>
        </>
    )
}

export default StudentDetails;