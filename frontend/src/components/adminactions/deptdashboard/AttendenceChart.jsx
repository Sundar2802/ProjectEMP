import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import attendanceService from '../services/attendanceService';
// import MarksPercentage from './MarksPercentage';

const AttendanceChart = () => {
  const [attendanceData, setAttendanceData] = useState([]);

//   useEffect(() => {
//     attendanceService.getAttendance().then(response => {
//       setAttendanceData(response.data);
//     });
//   }, []);
//   const data = {
//     labels: attendanceData.map(item => item.date),
//     datasets: [
//       {
//         label: 'Attendance',
//         data: attendanceData.map(item => item.percentage),
//         fill: false,
//         backgroundColor: 'rgba(75,192,192,1)',
//         borderColor: 'rgba(75,192,192,1)',
//       },
//     ],
//   };

//   return <Line data={data} />;
};

export default AttendanceChart;
