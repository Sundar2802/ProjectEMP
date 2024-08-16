import { Typography, Box, Autocomplete, TextField, stepClasses } from '@mui/material'
import React, { useState } from 'react'
import './styles/attendance.css'
import DataTable from './DataTable'

export const Attendence = () => {

		const classList = ["IT-B", "IT-C"];
		const [class_name, set_class] = useState('null');
		
	return (
		<div className='container'>
			<Box display={'flex'} justifyContent={'space-between'}>
				<Typography variant='h3' margin={'0 0 50px 0'}>Attendance Sheet</Typography>
				<Autocomplete
					onChange={(event, value) => set_class(value)}
					id="class-list"
					options={classList}
					sx={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label="choose class" />}
				/>
			</Box>
			<DataTable class={class_name}/>
		</div>
	)
}
