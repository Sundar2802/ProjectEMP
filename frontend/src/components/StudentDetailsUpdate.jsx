import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Container, FormControl, MenuItem, TextField, Typography } from '@mui/material';
import userservice from '../services/userservice';
import { usercontext } from './Usercontext';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const StudentDetailsUpdate = () => {
    const [user,setuser]=useContext(usercontext);
    const navigate=useNavigate();
    const [isValid,setisValid]=useState(true);
    const [classes,setClasses]=useState([{value:'',label:''}]);
    const [depts,setDepts]=useState([{value:'',label:''}]);
    const [student, setstudent] = useState({
        student_id: null,
        reg_no:'',
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
    const HandleUpdate = async()=>{
        if(!student.reg_no || !student.student_department_id || !student.student_class_id){
            toast.warn("Please fill the mandatory fields");
            setisValid(false);
            return;
        }
       try{
          await userservice.updateStudentDetails(student,user.instituteName,user.id);
          toast.success("Updated Successfully");
          navigate("/profileSettings");
       }catch(error){
        console.log(error);
       }       

       console.log(student);
    }
    useEffect(() => {
        const fetchStudentDetails =async()=>{
            try{
                const response=await userservice.getStudentDetailsById(user.instituteName,user.id);
                console.log(response);
                setstudent(response[0]);
            }catch(error){
                console.log(error);
                throw(error);
            }
        }
        const fetchDepts = async () =>{
            try{
                const response=await userservice.existingDepartments(user.instituteName);
                console.log(response.data);
                const depts=response.data;
                setDepts(depts.map(d => ({ value: d.department_Id,label:d.department_Id})));
            }catch(error){
                console.log(error);
                throw(error);
            }
        }
        fetchStudentDetails();
        fetchDepts();
    },[]);

    useEffect(() => {
        const fetchClasses = async () =>{
            try{
                const response=await userservice.fetchClasses(user.instituteName, student.student_department_id);
                console.log(response);
                setClasses(response.map(c => ({ value: c.class_id, label:c.class_id })));
                // response.map(c => (console.log(c.class_id)));
            }catch(error){
                console.log(error);
                throw(error);
            }
        }
        if(student.student_department_id)
        fetchClasses();
    }, [student.student_department_id])
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
                            onChange={(e) => setstudent({ ...student, student_id: e.target.value })}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                              }}
                            style={{ width: '45%' }}
                             />
                        <TextField
                            required
                            value={student.reg_no}
                            label="reg_no"
                            onChange={(e) => setstudent({ ...student, reg_no: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }}
                            error={!isValid}
                            helperText={!isValid && !student.reg_no ? 'Reg no is Required' : ''}
                             />

                        <TextField
                            disabled
                            required
                            value={student.student_name}
                            label="student_name"
                            onChange={(e) => setstudent({ ...student, student_name: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }}
                             />
                        <TextField
                            disabled
                            required
                            value={student.student_email}
                            label="student_email"
                            onChange={(e) => setstudent({ ...student,student_email:e.target.value })}
                            variant="outlined"
                            InputLabelProps={student.student_email ? { shrink: true } : undefined}
                            style={{ width: '45%' }} />
                        <TextField
                            
                            value={student.student_department_id}
                            label="student_department_id"
                            onChange={(e) => setstudent({ ...student, student_department_id: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} 
                            error={!isValid}
                            helperText={!isValid && !student.student_department_id ? 'Department Id is Required' : ''}
                            InputLabelProps={student.student_department_id ? { shrink: true } : undefined}
                            select
                            >
                                {depts.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        <TextField
                            
                            value={student.student_gender}
                            label="student_gender"
                            onChange={(e) => setstudent({ ...student, student_gender: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            type='date'
                            value={student.student_dob}
                            label="student_dob"
                            onChange={(e) => setstudent({ ...student, student_dob: e.target.value })}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                              }}
                            style={{ width: '45%' }} />
                        <TextField
                            
                            value={student.student_phone_no}
                            label="stuent_phone_no"
                            onChange={(e) => setstudent({ ...student, student_phone_no: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            
                            value={student.student_address}
                            label="student_address"
                            onChange={(e) => setstudent({ ...student, student_address: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            
                            value={student.student_specializations}
                            label="student_specializations"
                            onChange={(e) => setstudent({ ...student, student_specializations: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            required
                            value={student.student_class_id}
                            label="student_class_id"
                            onChange={(e) => setstudent({ ...student, student_class_id: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} 
                            error={!isValid}
                            helperText={!isValid && !student.student_class_id? 'Class Id is Required' : ''}
                            select
                            InputLabelProps={{
                                shrink: true,
                              }}
                            >
                                {classes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        <TextField
                            type='date'
                            value={student.student_doj}
                            label="student_doj"
                            onChange={(e) => setstudent({ ...student, student_doj: e.target.value })}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                              }}
                            style={{ width: '45%' }} />
                        <Button fullWidth variant="contained" color="primary" style={{ marginTop: '40px', width: '30%' }} onClick={HandleUpdate}>Update</Button>
                    </Box>
                </FormControl>
            </Container>
            <ToastContainer/>
        </>
    )
}

export default StudentDetailsUpdate;