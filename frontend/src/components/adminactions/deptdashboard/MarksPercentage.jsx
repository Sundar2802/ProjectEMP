import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import marksService from '../services/marksService';

const MarksPercentage = () => {
  const [marksData, setMarksData] = useState([]);
  
//   useEffect(() => {
//     marksService.getMarksPercentage().then(response => {
//       setMarksData(response.data);
//     });
//   }, []);

//   const data = {
//     labels: marksData.map(item => item.class),
//     datasets: [
//       {
//         label: 'Marks Percentage',
//         data: marksData.map(item => item.percentage),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return <Bar data={data} />;
};

export default MarksPercentage;
