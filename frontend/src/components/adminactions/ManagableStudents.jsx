import { DataGrid } from '@mui/x-data-grid'
import { usercontext } from '../Usercontext';
import { Box } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import userservice from '../../services/userservice';
import { isPasteShortcut } from '@mui/x-data-grid/internals';

const ManagableStudents = () => {
    const [res, setRes] = useState([]);
    const [user] = useContext(usercontext); 

    const columns =[
        {field:'student_id',headerName:'Student Id',flex:1},
        {field:'student_name',headerName:'Student name',flex:1},
        {field:'student_email',headerName:'Student Email',flex:1},
        {field: 'student_department_id', headerName: 'Department/Grade', flex: 1,
        valueGetter: (id) => id || "Not assigned"
        },
        {field: 'student_class_id', headerName: 'Classes', flex: 1,
            valueGetter: (id) => id || "Not assigned"
        }
        // {field:'acceptorreact', headerName:'Accept/React', flex:1, renderCell: (param)=>
        //   <>
        //   <Chip onClick={() => handleAccept(param)}label='Accept' color='success'  style={{marginRight:'20px'}} />
        //   <Chip label='Reject' onClick={() => removeRow(param)} color='error' />
        //   </>
        // }
    ]  

    const getResponse = async (instituteName) => {
        const response = await userservice.getStudents(instituteName);
        setRes(response);
    }

    useEffect(() => {
        getResponse(user.instituteName);
    },[])

    // useEffect(() => {
    //     console.log(res);
    // }, [res]);
    const getRowId = (row) => row.student_id;

  return (

    <Box marginTop={'100px'} padding={'30px'}>
        <DataGrid
        stikyHeader
        rows={res}
        columns={columns}
        getRowId={getRowId}
    />
    </Box>
  )
}

export default ManagableStudents;