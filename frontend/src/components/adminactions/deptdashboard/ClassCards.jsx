import React, { useContext, useState, useEffect } from "react";
import userservice from "../../../services/userservice";
import { usercontext } from "../../Usercontext";
import { useNavigate } from "react-router-dom";
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
    Typography
  } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


const ClassCards = ({clas}) => {
  const [clases, setClases] = useState([]);
  const [user] = useContext(usercontext);
  const navigate = useNavigate();
  useEffect(() => {
    const getResponse = async () => {
      const response = await userservice.fetchClasses(user.instituteName, clas.dept_id);
      setClases(response);  
    };
    getResponse();
  }, []);

  return (
    <Box display="flex" flexWrap="wrap" gap="16px" padding="20px">
      {clases.map((clas, index) => (
        <Card
          key={index}
          sx={{ minWidth: 275, marginBottom: "16px", boxShadow: 3 }}
        >
          <CardContent>
            <Typography variant="h5" component="div" textAlign="center">
              {clas.class_name}
            </Typography>
            <Typography color="textSecondary">
                Class Id: {clas.class_id}
            </Typography>
            <Typography color="textSecondary">
              Incharge: {clas.class_incharge} (ID:{" "}
              {clas.faculty_in_charge_id})
            </Typography>
            <Typography color="textSecondary">
              Department ID: {clas.department_id}
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
            //   onClick={() => {
            //     console.log(dept.department_Id);
            //     navigate("/admin/DepartmentDashboard", {
            //       state: {
            //         deptId: dept.department_Id,
            //         instituteName: user.instituteName,
            //       },
            //     });
            //   }}
            >
              View Class
            </Button>
            {/* <Button size="small" color="primary">
              Add Classes
            </Button> */}
            <IconButton
            //   onClick={() =>
            //     handleDelete(dept.department_Id, user.instituteName)
            //   }
            >
              <DeleteIcon color="error" />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default ClassCards;
