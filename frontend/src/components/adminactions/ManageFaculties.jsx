import React, { useContext, useEffect, useState } from 'react'
import { usercontext } from '../Usercontext';
import userservice from '../../services/userservice';
import { Box, Button, Chip , Typography} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'


const ManageFaculties = () => {
  const navigate = useNavigate();
  const [user]=useContext(usercontext);
  const [res,setres]=useState([{id:'',name: '', email: '', instituteName: ''}]);
 
  const handleFaculty = () => {
    navigate('/admin/ManagableFacuties')
  }
  const columns = [
    {field:'id',headerName:'Id',flex:1},
    {field:'name',headerName:'Facultyname',flex:1},
    {field:'email',headerName:'Email',flex:1},
    {field:'acceptorreact', headerName:'Accept/React', flex:1, renderCell: (param)=>
      <>
      <Chip onClick={() => handleAccept(param)}label='Accept' color='success'  style={{marginRight:'20px'}} />
      <Chip label='Reject' onClick={() => removeRow(param)} color='error' />
      </>
    },
  ]
  const handleAccept = async (param) => {
    console.log(param.row);
    const result = await userservice.addTeachers(param.row);
    await userservice.updateVerifyStatus(param.row);

    if(!result){
      toast.warn("faculty already exists");
    }else{
      toast.success("faculty added successfully");
    }
    removeRow(param);
  }

  const removeRow = (param) => {
    const newRes = res.filter((row) => row.id !== param.row.id);
    setres(newRes);
  }
  
  const response = async () => {
    try{
      const result = await userservice.manageteachersandstudents(user.instituteName,"faculty");
      // console.log(result);
      setres(result);
      
      }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    response();
  }, [])

 
  return (
    <>
      <Box sx={{marginTop:'100px'}}> 
        <Box display={'flex'} justifyContent={'space-between'}>
        <Typography variant='h4' padding={"0px 40px 40px"}>Manage Teachers</Typography>
        <Button variant='contained' onClick={handleFaculty} style={{height: '40px', margin: '20px 40px 30px'}}>Faculties</Button>
        </Box>
        <Box padding={'30px'}>
          <DataGrid 
            stickyHeader
            rows={res}
            columns={columns}
            style={{padding:'20px'}}
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

export default ManageFaculties;
