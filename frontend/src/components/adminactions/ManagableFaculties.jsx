import { DataGrid } from '@mui/x-data-grid'
import { usercontext } from '../Usercontext';
import { Box } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import userservice from '../../services/userservice';
import { isPasteShortcut } from '@mui/x-data-grid/internals';
import { m } from 'framer-motion';
import { ClassNames } from '@emotion/react';

export const ManagableFaculties = () => {
    const [res, setRes] = useState([{
      faculty_id: "",
      faculty_name: "",
      faculty_department_id:"",
      faculty_email: "",
      faculty_class_id: "",
      faculty_specializations:""
    }]);
    const [user] = useContext(usercontext); 
    // const [depts, setDepts] = useState([]);

    useEffect(() => {
      
      const getResponse = async (instituteName) => {
        const response = await userservice.manageTeacher(instituteName);
        setRes(response.data);
        console.log(response);
    }

      getResponse(user.instituteName);
  },[])

  // useEffect(() => {
  //   const departments = async () => {
  //     const response = await userservice.existingDepartments(user.instituteName);
  //     setDepts(response.data);
  //   }

  //   departments();
  // }, [])


    const columns =[
        {field:'faculty_id',headerName:'FacultyId',flex:1},
        {field:'faculty_name',headerName:'Facultyname',flex:1},
        {field:'faculty_email',headerName:'Email',flex:1},
        {field: 'faculty_department_id', headerName: 'Department/Grade', flex: 1,
          valueGetter: (faculty_department_id) => faculty_department_id || "Not Assigned"
        },
        {field: 'faculty_class_id', headerName: 'Classes', flex: 1,
          valueGetter: (faculty_class_id) => faculty_class_id || "Not Assigned"
        },
        {field: 'faculty_specializations', headerName: 'Specialization', flex: 1,
          valueGetter: (faculty_specializations) => faculty_specializations || "Not Assigned"

        }
        // {field:'acceptorreact', headerName:'Accept/React', flex:1, renderCell: (param)=>
        //   <>
        //   <Chip onClick={() => handleAccept(param)}label='Accept' color='success'  style={{marginRight:'20px'}} />
        //   <Chip label='Reject' onClick={() => removeRow(param)} color='error' />
        //   </>
        // }
    ]  
    const getRowId = (row) => row.faculty_id;

  return (

    <Box marginTop={'100px'} padding={'30px'}>
        <DataGrid
        stickyHeader
        rows={res}
        columns={columns}
        getRowId={getRowId}
    />
    </Box>
  )
}
