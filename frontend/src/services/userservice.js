import { Details, Insights } from "@mui/icons-material";
import { responsiveFontSizes } from "@mui/material";
import { findHeaderElementFromField } from "@mui/x-data-grid/utils/domUtils";
import axios from "axios";
const API_URL = "http://localhost:8080/api";

class userservice {
  async postUser(user) {
    try {
      const response = await axios.post(API_URL + "/postuser", user);
      return response;
    } catch (error) {
      console.log("There is a error!", error);
      throw error;
    }
  }

  async checkUser(email, password, role) {
    try {
      const response = await axios.get(API_URL + "/checkuser", {
        params: { email, password, role },
      });
      return response;
    } catch (error) {
      console.log("There was an error!", error);
      throw error;
    }
  }
  async manageteachersandstudents(instituteName, role) {
    try {
      const response = await axios.get(API_URL + "/manageteachersandstudents", {
        params: { instituteName, role },
      });
      return response.data;
    } catch (error) {
      console.log("There was an error !", error);
      throw error;
    }
  }

  async addTeachers(user) {
    try {
      const response = await axios.post(API_URL + "/admin/addfaculty", user);
      return response.data;
    } catch (error) {
      console.log("add teachers error");
      throw error;
    }
  }

  async addStudents(user) {
    try {
      const response = await axios.post(API_URL + "/admin/addStudent", user);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async manageTeacher(instituteName) {
    try {
      const response = await axios.get(API_URL + "/admin/managedfaculties", {
        params: {
          instituteName: instituteName,
        },
      });
      return response;
    } catch (error) {
      console.log("Error fetching managed faculties");
      throw error;
    }
  }

  async createdept(dept) {
    try {
      const response = await axios.post(
        API_URL + "/admin/createdepartment",
        dept
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getInstitutes() {
    try {
      const response = await axios.get(API_URL + "/institutes");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async existingDepartments(instituteName) {
    try {
      const response = axios.get(API_URL + "/departmentList", {
        params: { instituteName },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async verifyUser(user, instituteName) {
    try {
      const response = await axios.post(API_URL + "/admin/verifystatus", user, {
        params: { instituteName },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async verifiedStatus(email, instituteName) {
    try {
      const response = await axios.get(API_URL + "/verifiedStatus", {
        params: { email, instituteName },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async updateVerifyStatus(user) {
    try {
      await axios.put(API_URL + "/updateVerifyStatus", user);
    } catch (error) {
      throw error;
    }
  }

  async facultyDeptAssignment(dept) {
    try {
      await axios.put(API_URL + "/assignFacultyToDept", dept);
    } catch (error) {
      console.log("Error assigning the Incharge to dept");
      throw error;
    }
  }

  async deleteDepartment(deptId, instituteName) {
    try {
      console.log(deptId);
      console.log(instituteName);
      await axios.delete(API_URL + "/deleteDepartment", {
        params: {
          deptId,
          instituteName,
        },
      });
    } catch (error) {
      console.log("Error deleting the department", error.message);
      throw error;
    }
  }

  async addClasses(clas) {
    try {
      console.log(clas);
      const response = await axios.post(API_URL + "/addClasses", clas);
      return response.data;
    } catch (error) {
      console.log("Error adding class", error.message);
      throw error;
    }
  }

  async assignFacultyclass(clas) {
    try {
      await axios.put(API_URL + "/assignFacultyToClass", clas);
    } catch (error) {
      console.log("error assigning faculty to class");
      throw error;
    }
  }

  async fetchClasses(instituteName, deptId) {
    try {
      const response = await axios.get(API_URL + "/fetchClasses", {
        params: {
          instituteName: instituteName,
          deptId : deptId
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async getStudents(instituteName) {
    try {
      const response = await axios.get(API_URL + "/getStudents", {
        params: {
          instituteName: instituteName,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
  async getYourClass(instituteName,faculty_id){
    try{
      const response = await axios.get(API_URL + "/yourclass", {
        params:{
          instituteName:instituteName,
          faculty_id:faculty_id,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch(error){
      console.log(error.message);
      throw error;
    }
  }
  async getStudentDetailsById(instituteName,student_id){
    try{
      const response = await axios.get(API_URL + "/getStudentDetailsById", {
        params : {instituteName:instituteName, userId:student_id},
      });
      return response.data;
    }catch(error){
      console.log(error);
      throw error;
    }
  }
  
  async addAnnouncement(announcement, instituteName){
    try{
      console.log(announcement);
      const response = await axios.post(API_URL + "/addAnnouncement", announcement, {
        params : {
          instituteName: instituteName
        }
      })
      return response.data;
    }catch(error){
      console.log(error.message);
      throw error;
    }
  }

  async fetchAnnouncements(instituteName){
    try{
      const response = await axios.get(API_URL + "/fetchAnnouncements", {
        params: {
          instituteName: instituteName
        }
      })
      console.log(response.data);
      return response.data;
    }catch(error){
      console.log(error.message);
      throw error;
    }
  }

  async updateStudentDetails(student,instituteName,student_id) {
    try{
      await axios.put(API_URL + "/updateStudentDetails",student,{
        params : {instituteName:instituteName,student_id:student_id}
      });
    }catch(error){
      throw error;
    }
  }
  async getStudentsByClass(instituteName,class_id){
    try{
      const response = await axios.get(API_URL + "/getStudentsByClass",{
        params:{instituteName:instituteName,class_id:class_id},
      });
      console.log(response.data);
      return response.data;
    }catch(error){
      throw error;
    }
  }


  async fetchStudentByUserId(userId, instituteName){
    try{
      const response = await axios.get(API_URL + "/fetchStudentByUserId", {
        params: {
          userId: userId,
          instituteName: instituteName
        }
      })
      return response.data;
    }catch(error){
      console.log(error.message);
    }
  }

  async fetchFacultyByUserId(userId, instituteName){
    try{
      const response = await axios.get(API_URL + "/fetchFacultyByUserId", {
        params: {
          userId: userId,
          instituteName: instituteName
        }
      })
      return response.data;
    }catch(error){
      console.log(error.message);
    }
  }

  async fetchStudentsByClassId(userId, instituteName){
    try{
      const response = await axios.get(API_URL + "/fetchStudentsByClassId", {
        params: {
          userId: userId,
          instituteName: instituteName
        }
      })
      return response.data;
    }catch(error){
      console.log(error.message);
    }
  }
}

export default new userservice();
