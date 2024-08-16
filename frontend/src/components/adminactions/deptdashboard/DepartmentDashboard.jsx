import React, { useContext, useState, useEffect } from "react";
import { Typography, Grid, Box } from "@mui/material";
import AttendanceChart from "./AttendenceChart";
import MarksPercentage from "./MarksPercentage";
import { usercontext } from "../../Usercontext";
import userservice from "../../../services/userservice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import ClassCards from "./ClassCards";
import { LocalActivity } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";

// const CreateClassDialog = ({ open, onClose, onClassCreated }) => {

//     return (

//     );
// };

export const DepartmentDashboard = () => {
  const [user] = useContext(usercontext);
  const [open, setOpen] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const location = useLocation();
  const [clas, setClas] = useState({
    class_id: "",
    class_name: "",
    class_incharge_id: "",
    class_incharge_name: "",
    dept_id: location.state.deptId,
    instituteName: location.state.instituteName,
  });

  useEffect(() => {
    const getFaculties = async () => {
      const facultyResponse = await userservice.manageTeacher(
        user.instituteName
      );
      setFaculties(facultyResponse.data);
    };
    getFaculties();
    console.log(faculties);
  }, []);

  const handleCreate = async () => {
    // const newClass = { id: Date.now(), name: className }; // Replace with proper ID generation logic
    // onClassCreated(newClass);
    // onClose();
    setClas((prevClas) => ({ ...prevClas, dept_id: location.state.deptId }));
    setOpen(false);

    const res = await userservice.addClasses(clas);
    console.log(res)
    if (res) {
      toast.success("Class created successfully");
    } else {
      toast.error("Error creating the class");
    }

    try {
      console.log(clas);
      await userservice.assignFacultyclass(clas);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  // useEffect(() => {
  //   console.log(clas);
  // }, [clas]);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Class</DialogTitle>
        <DialogContent style={{ padding: "20px" }}>
          <TextField
            autoFocus
            label="Class Id"
            fullWidth
            value={clas.class_id}
            onChange={(e) => setClas({ ...clas, class_id: e.target.value })}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="Class Name"
            fullWidth
            value={clas.class_name}
            onChange={(e) => setClas({ ...clas, class_name: e.target.value })}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            select
            label="Class Incharge"
            fullWidth
            value={clas.class_incharge_id}
            onChange={(e) => {
              const selectedFaculty = faculties.find(
                (faculty) => faculty.faculty_id === e.target.value
              );
              setClas({
                ...clas,
                class_incharge_id: selectedFaculty?.faculty_id,
                class_incharge_name: selectedFaculty?.faculty_name,
              });
            }}
            style={{ marginBottom: "20px" }}
          >
            {faculties.map((option) => (
              <MenuItem key={option.faculty_id} value={option.faculty_id}>
                {option.faculty_name + " (" + option.faculty_id + ")"}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          {user.instituteName} Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Button variant = 'contained' style = {{margin: '30px'}}onClick={() => setOpen(true)}>Create Class</Button>
            <ClassCards clas = {clas} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            {/* <FacultyPresence /> */}
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AttendanceChart />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MarksPercentage />
          </Grid>
        </Grid>
        <ToastContainer />
      </Box>
    </>
  );
};
