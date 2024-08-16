import * as React from 'react';
import { useEffect } from 'react';
import { DataGrid, renderBooleanCell } from '@mui/x-data-grid';
import { color } from 'framer-motion';
import { Box, Checkbox } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 100},
  { field: 'firstName', headerName: 'First name', flex: 1 },
  { field: 'lastName', headerName: 'Last name',  flex: 1},  
  {
    field: 'fullName',
    headerName: 'Full name',
    flex: 1,
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'attendance',
    headerName: 'Attendance',
    flex: 1,
    renderCell: () => <Checkbox defaultChecked color='success'/>
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', registerNo: 35 , },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', registerNo: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', registerNo: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', registerNo: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', registerNo: null },
  { id: 6, lastName: 'Melisandre', firstName: null, registerNo: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', registerNo: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', registerNo: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', registerNo: 65 },
];

export default function DataTable() {
  return (
    <Box>
      <DataGrid
        stikyHeader
        rows={rows}
        columns={columns}
        width={'100vw'}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </Box>
  );
}
