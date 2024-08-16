// src/pages/AddAnnouncement.js

import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import userservice from "../../services/userservice";
import { usercontext } from "../Usercontext";
import { ToastContainer, toast } from "react-toastify";

const AddAnnouncement = () => {
  const [user] = useContext(usercontext);
  const [depts, setDepts] = useState([]);
  const [clases, setClases] = useState([]);
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    date: "",
    role: "",
    accessGroup: "",
    deptId: null,
    classId: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await userservice.addAnnouncement(
      announcement,
      user.instituteName
    );

    if (response) {
      toast.success("Announcement published Successfully");
    } else {
      toast.error("There is was an error");
    }

    setAnnouncement({
      title: "",
      description: "",
      date: "",
      role: "",
      accessGroup: "",
      deptId: null,
      classId: null,
    });
  };

  useEffect(() => {
    const getResponse = async () => {
      const response = await userservice.existingDepartments(
        user.instituteName
      );
      setDepts(response.data);
    };
    getResponse();
    console.log(depts);
  }, []);

  useEffect(() => {
    const getClasses = async () => {
      const response = await userservice.fetchClasses(
        user.instituteName,
        announcement.deptId
      );
      setClases(response);
    };
    if (announcement.deptId) {
      getClasses();
    }
  }, [announcement.deptId]);

  return (
    <Container maxWidth="ms" style={{ marginTop: "80px" }}>
      <Typography
        variant="h4"
        gutterBottom
        padding={"20px"}
        paddingBottom={"0"}
      >
        Add Announcement
      </Typography>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={8} paddingBottom={"10px"}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={announcement.title}
                onChange={(e) =>
                  setAnnouncement({ ...announcement, title: e.target.value })
                }
                required
              />
            </Grid>
            <Grid
              item
              xs={4}
              paddingBottom={"10px"}
              justifyContent={"space-around"}
            >
              <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={announcement.date}
                onChange={(e) =>
                  setAnnouncement({ ...announcement, date: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={4} paddingBottom={"10px"}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Select Role</InputLabel>
                <Select
                  value={announcement.role}
                  onChange={(e) =>
                    setAnnouncement({ ...announcement, role: e.target.value })
                  }
                  label="Select Role"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="students">Students</MenuItem>
                  <MenuItem value="staff">Staff</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} paddingBottom={"10px"}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Access Group</InputLabel>
                <Select
                  value={announcement.accessGroup}
                  onChange={(e) =>
                    setAnnouncement({
                      ...announcement,
                      accessGroup: e.target.value,
                    })
                  }
                  label="Access Group"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Departments">Departments</MenuItem>
                  <MenuItem value="Class">Class</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {announcement.accessGroup === "Departments" ||
            announcement.accessGroup === "Class" ? (
              <Grid item xs={4} paddingBottom={"10px"}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel>Select Department</InputLabel>
                  <Select
                    value={announcement.deptId}
                    onChange={(e) =>
                      setAnnouncement({
                        ...announcement,
                        deptId: e.target.value,
                      })
                    }
                    label="Department"
                  >
                    {depts.map((dept) => (
                      <MenuItem
                        key={dept.department_Id}
                        value={dept.department_Id}
                      >
                        {dept.department_name + " (" + dept.department_Id + ")"}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ) : null}
            {announcement.accessGroup === "Class" ? (
              <Grid item xs={4} paddingBottom={"10px"}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel>Select Class</InputLabel>
                  <Select
                    value={announcement.classId}
                    onChange={(e) =>
                      setAnnouncement({
                        ...announcement,
                        classId: e.target.value,
                      })
                    }
                    label="Class"
                  >
                    {clases.map((clas) => (
                      <MenuItem key={clas.class_id} value={clas.class_id}>
                        {clas.class_name + " (" + clas.class_id + ")"}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={10}
                value={announcement.description}
                onChange={(e) =>
                  setAnnouncement({
                    ...announcement,
                    description: e.target.value,
                  })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                  color="primary"
                  endIcon={<PublishIcon />}
                >
                  Publish Announcement
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default AddAnnouncement;
