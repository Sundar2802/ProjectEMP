import React, { useContext, useEffect, useState } from 'react'
import { usercontext } from '../Usercontext'
import userservice from '../../services/userservice';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Chip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const ManageStudents = () => {
  const navigate=useNavigate();
    const[user]=useContext(usercontext);
    const[res,setres]=useState([{id:'',name:'',email:'',instituteName:''}]);
    
    const handleStudent = () => {
      navigate('/admin/ManagableStudents')
    }
    const columns=[
        {field:'id',headerName:'Id',flex:1},
        {field:'name',headerName:'Studentname',flex:1},
        {field:'email',headerName:'Email',flex:1},
        {field:'Accept/Reject',headerName:'Accept/Reject',flex:1,renderCell:(param) => 
        <>
        <Chip onClick={() => handleAccept(param)} label='Accept' color='success' style={{marginRight:'20px'}}/>
        <Chip label='Reject' color='error' onClick={() => removeRow(param)} />
          </>},
    ]
    const handleAccept = async(param) =>{
       const result = await userservice.addStudents(param.row);
       await userservice.updateVerifyStatus(param.row);
       
       if(!result){
        toast.warn("Student already exists");
       }else{
        toast.success("Student added successfully");
       }
       removeRow(param);
    }

    const removeRow = (param) => {
      const newRes = res.filter((row) => row.id !== param.row.id);
      setres(newRes);
    }

    const response = async() => {
        try{
          const result = await userservice.manageteachersandstudents(user.instituteName,"student");
          setres(result);
        }catch(error){
          console.log(error);
          throw error;
        }
    }

    useEffect(()=>{
        response();
        console.log(res);
    },[])

  return (
    <>
    <Box marginTop='100px'>
    <Box display={'flex'} justifyContent={'space-between'}>
    <Typography variant='h4' padding={'20px'}>ManageStudents</Typography>
    <Button variant='contained' style={{height: '40px', margin: '20px 40px 30px'}} onClick={(handleStudent)}>Students</Button>
    </Box>
    <Box padding={'30px'}>
        <DataGrid 
        stikyHeader
            rows={res}
            columns={columns}
            initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20]}
        />
        </Box>
    </Box>
    <ToastContainer/>
    </>
  )
}

export default ManageStudents;