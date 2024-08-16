import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, MenuItem, Typography, Box, Stack, FormControl } from '@mui/material';
import { motion } from 'framer-motion';
import './styles/login.css';
import userservice from '../services/userservice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate,Link } from 'react-router-dom';

const roles = [
  { value: 'student', label: 'Student' },
  { value: 'faculty', label: 'Faculty' },
  { value: 'admin', label: 'Admin' },
];


const Signup = () => {
  const [institutes, setInstitutes] = useState([{value: '', label: ''}]);
  const navigate=useNavigate();
  const [depts, setDepts] = useState([]);
  const[loading,setLoading]=useState(false);
  const [isValid, setValid] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    instituteName: '',
    role: ''
  });
  const [verifyUser,setVerifyUser]=useState({
    email:'',
    verified:false
  });

  const ins = async () => {
    try {
      const i = await userservice.getInstitutes();
      console.log(i);
      setInstitutes(i.map(instituteName => ({ value: instituteName, label: instituteName })));
      
    } catch (error) {
      console.error('Error fetching institutes:', error);
    }
  }; 
  
  const getDepts = async () => {
    try{
      const res = await userservice.existingDepartments();
      setDepts(res);
    }
    catch(error){
      console.error(error.message);
    }
  }

  useEffect(() => {
    ins();
  }, []);

  const handleRoleChange = (event) => {
    setUser({ ...user, role: event.target.value });
  };

  const handleinstitutechange = (event) =>{
    setUser({...user,instituteName:event.target.value});
  }

  const handleLogin = async () => {
    if (!user.name || !user.email || !user.password || !user.instituteName || !user.role) {
      toast.error('All fields are required.');
      setValid(false);
      return;
    }

    try {
      console.log("here");
      setLoading(true);
      setTimeout(async () => {
      let response = await userservice.postUser(user);
      let response1=await userservice.verifyUser(verifyUser,user.instituteName);
      console.log(response1);
      console.log(response.data);
      setLoading(false);
      if(response.data){
        toast.success('Account created successfully! Please Login to your account.',{
          autoClose:500
      });
      setTimeout(() => {
        navigate("/login")
      },2000)
    }
      else
        toast.error('Account already exists with given email');
    },2000); 
  }
  catch (error) {
      console.error(error);
      toast.error('Failed to create account.');
    }
  };

  const handleDeptChange = () => {

  }

  return (
    <motion.div
      className="login-page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Container maxWidth="sm" style={{ marginTop: '100px', height: 'fit-content' }}>
        <FormControl required>
          <Box className="login-box" p={4} boxShadow={3} borderRadius={2}>
            <Typography variant="h4" gutterBottom padding={'0 0 20px 10px'}>
              Register
            </Typography>
            <TextField
              required
              fullWidth
              select
              label="Select Role"
              value={user.role}
              onChange={handleRoleChange}
              margin="normal"
              variant="outlined"
              error={!isValid && !user.role}
              helperText={!isValid && !user.role ? 'Role is required' : ''}
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              fullWidth
              label="Name"
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}

              margin="normal"
              variant="outlined"
              error={!isValid && !user.name}
              helperText={!isValid && !user.name ? 'Name is required' : ''}
            />
            <TextField
              fullWidth
              required
              label="Email"
              value={user.email}
              onChange={(e) => {setUser({ ...user, email: e.target.value });setVerifyUser({...verifyUser,email:e.target.value})}}
              margin="normal"
              variant="outlined"
              error={!isValid && !user.email}
              helperText={!isValid && !user.email ? 'Email is required' : ''}
            />
            <TextField
              fullWidth
              required
              label="Password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              margin="normal"
              variant="outlined"
              error={!isValid && !user.password}
              helperText={!isValid && !user.password ? 'Password is required' : ''}
            />
            {user.role==='admin' ? <TextField
              fullWidth
              required
              label="Institute Name"
              value={user.instituteName}
              onChange={(e) => setUser({ ...user, instituteName: e.target.value })}
              margin="normal"
              variant="outlined"
              error={!isValid && !user.instituteName}
              helperText={!isValid && !user.instituteName ? 'Institute name is required' : ''}
            /> : <TextField
            required
            fullWidth
            select
            label="Select Institute"
            value={user.instituteName}
            onChange={handleinstitutechange}    // need to handle institute names
            margin="normal"
            variant="outlined"
            error={!isValid && !user.instituteName}
            helperText={!isValid && !user.role ? 'Institute is required' : ''}
          >
            {institutes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              style={{ marginTop: '40px' }}
            >
              {loading ? <CircularProgress size={24} style={{ color: 'white', opacity: 1 }}/> : 'Create Account'}
            </Button>
            <Stack direction="row" justifyContent="end" gap="10px" margin={'20px'}>
              <Typography color={'black'}>Already have an account?</Typography>
              <Link to='/login'><Typography color={'blue'}>Login</Typography></Link>
            </Stack>
          </Box>
        </FormControl>
        <ToastContainer />
      </Container>
    </motion.div>
  );
};

export default Signup;
