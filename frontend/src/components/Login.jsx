import React, { useContext, useEffect, useState } from 'react';
import { Container, TextField, Button, MenuItem, Typography, Box, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import './styles/login.css';
import userservice from '../services/userservice';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { usercontext } from './Usercontext';


const roles = [
  { value: 'student', label: 'Student' },
  { value: 'faculty', label: 'Faculty' },
  { value: 'admin', label: 'Admin' },
];
const Login = () => {
  const[user,setuser]=useContext(usercontext);
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const [isValid, setValid] = useState(true);
  const [userr, setUserr] = useState({
    email: '',
    password: '',
    role: ''
  })
  const [verified,setVerified]=useState(false);
  let v=false;
  
  const handleRoleChange = (event) => {
    setUserr({...userr, role: event.target.value});
  };
  
  const handleLogin = async () => {
    if(!userr.role || !userr.email || !userr.password){
      toast.warn('All fields required', {
        autoClose: 2500
      });
      setValid(false);
      return;
    } 
    setLoading(true);
    setTimeout(async () => {
        let response = await userservice.checkUser(userr.email, userr.password, userr.role);
        // console.log(response);
        setLoading(false);
        if(response.data){
          console.log(response.data)
            setuser({email:response.data.email,
            id:response.data.id,
            instituteName:response.data.instituteName,
            name:response.data.name,
            password:response.data.password,
            role:response.data.role}); 
            toast.success("Welcome to EduManage", {
              autoClose: 150
            });

            navigate('/RequestUnderProcessing');
        }
        else{
          toast.error("Incorrect Username / Password");  
        }
    }, 2000);
    
        
  };
  
  return (
    <motion.div
      className="login-page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration:
         0.8, ease: 'easeOut' }}
    >
      <Container maxWidth="sm" style={{marginTop:'100px'}}>
        <Box className="login-box" p={4} boxShadow={3} borderRadius={2}>
          <Typography variant="h4" gutterBottom padding={'0 0 20px 10px'}>
            Login
          </Typography>
          <TextField
            fullWidth
            select
            label="Select Role"
            value={userr.role}
            onChange={handleRoleChange}
            margin="normal"
            variant="outlined"
            error = {!isValid && !userr.role}
            helperText = {!isValid && !userr.role ? 'Role required' : ''}
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Email"
            value={userr.email}
            onChange={(e) => setUserr({...userr, email: e.target.value})}
            margin="normal"
            variant="outlined"
            error = {!isValid && !userr.email}
            helperText = {!isValid && !userr.email ? 'Email required' : ''}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={userr.password}
            onChange={(e) => setUserr({...userr, password: e.target.value})}
            margin="normal"
            variant="outlined"
            error = {!isValid && !userr.password}
            helperText = {!isValid && !userr.password ? 'Password required' : ''}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            style={{ marginTop: '40px' }}
          >
            {loading ? <CircularProgress size={24} style={{ color: 'white', opacity: 1 }}/> : 'Login'}
          </Button>
          <Stack direction="row" justifyContent="end" gap="10px" margin={'20px'} >
            <Typography color={'black'}>doesn't have account? </Typography>
              <Link to='/register'><Typography color={'blue'}>Signup</Typography></Link>
          </Stack>
        </Box>
        <ToastContainer/>
      </Container>
    </motion.div>
  );
};

export default Login;