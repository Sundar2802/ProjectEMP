import React, { useContext, useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import userservice from "../../services/userservice";
import { usercontext } from "../Usercontext";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const DepartmentsandClasses = () => {
  const [user] = useContext(usercontext);
  const [open, setOpen] = useState(false);
  const [dept, setDept] = useState({
    dept_id: "",
    dept_name: "",
    dept_incharge_id: "",
    dept_incharge_name: "",
    instituteName: "",
  });
  const [depts, setDepts] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      setDept((prevDept) => ({
        ...prevDept,
        instituteName: user.instituteName,
      }));
      try {
        const deptList = await userservice.existingDepartments(
          user.instituteName
        );
        setDepts(deptList.data);
        console.log(deptList.data);
      } catch (error) {
        toast.error("Failed to fetch departments: " + error.message);
      }
    };

    fetchDepartments();
  }, [user.instituteName]);

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

  async function handleDelete(deptId, instituteName) {
    try {
      await userservice.deleteDepartment(deptId, instituteName);
    } catch (error) {
      console.log("Error deleting");
      throw error;
    }
    removeDepartment(deptId);
  }

  const removeDepartment = (deptId) => {
    const newDepts = depts.filter((dept) => dept.department_Id !== deptId);
    setDepts(newDepts);
  };

  const handlecreatedept = async () => {
    if (!dept.dept_id || !dept.dept_name) {
      toast.warn("Please fill the required fields");
      return;
    }

    const updatedDept = {
      ...dept,
      dept_id: parseInt(dept.dept_id, 10),
      dept_incharge_id: dept.dept_incharge_id
        ? parseInt(dept.dept_incharge_id, 10)
        : null,
    };

    try {
      const response = await userservice.createdept(updatedDept);
      if (response) {
        toast.success("Department Created Successfully");
        console.log(depts);
        console.log(dept);
        setDept({
          dept_id: "",
          dept_name: "",
          dept_incharge_id: "",
          instituteName: user.instituteName,
        });
        setOpen(false);

        try {
          await userservice.facultyDeptAssignment(dept);
        } catch (error) {
          console.log("Error in departmentandclassescomponent");
          throw error;
        }
      } else {
        toast.error("There was an error.");
      }
    } catch (error) {
      toast.error("There was an error: " + error.message);
    }
  };

  return (
    <>
      <Box
        sx={{ marginTop: "100px", display: "flex", flexDirection: "column" }}
      >
        <Box padding="20px">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpen(true)}
          >
            Create Dept
          </Button>
        </Box>
        <Box display="flex" flexWrap="wrap" gap="16px" padding="20px">
          {depts.map((dept, index) => (
            <Card
              key={dept.department_Id}
              sx={{ minWidth: 275, marginBottom: "16px", boxShadow: 3 }}
            >
              <CardContent>
                <Typography variant="h5" component="div" textAlign="center">
                  {dept.department_name}
                </Typography>
                <Typography color="textSecondary">
                  Incharge: {dept.department_incharge_name} (ID:{" "}
                  {dept.department_incharge_id})
                </Typography>
                <Typography color="textSecondary">
                  Department ID: {dept.department_Id}
                </Typography>
                <Typography color="textSecondary">
                  Institute: {user.instituteName}
                </Typography>
              </CardContent>
              <CardActions
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    console.log(dept.department_Id);
                    navigate("/admin/DepartmentDashboard", {
                      state: {
                        deptId: dept.department_Id,
                        instituteName: user.instituteName,
                      },
                    });
                  }}
                >
                  View Department
                </Button>
                <Button size="small" color="primary">
                  Add Classes
                </Button>
                <IconButton
                  onClick={() =>
                    handleDelete(dept.department_Id, user.instituteName)
                  }
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new Department</DialogTitle>
        <DialogContent style={{ padding: "20px" }}>
          <TextField
            required
            variant="outlined"
            value={dept.dept_id}
            label="Department_Id"
            onChange={(e) => {
              setDept({ ...dept, dept_id: e.target.value });
            }}
            fullWidth
            style={{ marginBottom: "20px" }}
          />
          <TextField
            required
            variant="outlined"
            value={dept.dept_name}
            label="Department_Name"
            onChange={(e) => {
              setDept({ ...dept, dept_name: e.target.value });
            }}
            fullWidth
            style={{ marginBottom: "20px" }}
          />
          <TextField
            required
            fullWidth
            select
            variant="outlined"
            label="Department_Incharge"
            value={dept.dept_incharge_id}
            onChange={(e) => {
              const selectedFaculty = faculties.find(
                (faculty) => faculty.faculty_id === e.target.value
              );
              setDept({
                ...dept,
                dept_incharge_id: selectedFaculty?.faculty_id,
                dept_incharge_name: selectedFaculty?.faculty_name,
              });
            }}
          >
            {faculties.map((option) => (
              <MenuItem key={option.faculty_id} value={option.faculty_id}>
                {option.faculty_name + " (" + option.faculty_id + ")"}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlecreatedept}>Create Dept</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default DepartmentsandClasses;
