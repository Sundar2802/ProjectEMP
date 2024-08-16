package com.example.emp_backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.emp_backend.model.Department;
import com.example.emp_backend.model.Student;
import com.example.emp_backend.model.VerifyUser;
import com.example.emp_backend.model.User;
import com.example.emp_backend.model.Announcement;
import com.example.emp_backend.model.Class;
import com.example.emp_backend.repository.UserRepo;
import com.example.emp_backend.utility.Utility;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping("/api")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {
    @Autowired
    private UserRepo repo;

    @Autowired
    private Utility util;

    @PostMapping("/postuser")
    boolean postuser(@RequestBody User user) {

        User userWithSameEmail = repo.findUserByEmail(user.email);
        if (userWithSameEmail != null) {
            return false;
        }
        if (user.role.equals("admin")) {
            User adminWithSameInstitueName = repo.findUserByInstituteNameAndRole(user.instituteName, "admin");
            if (adminWithSameInstitueName != null) {
                return false;
            }
            util.createInstituteTable(user.instituteName);
        }
        repo.save(user);
        return true;
    }

    @GetMapping("/checkuser")
    User checkStudentUser(@RequestParam String email, @RequestParam String password, @RequestParam String role) {
        User user = repo.findUserByEmail(email);
        if (user != null) {
            if (user.password.equals(password) && user.role.equals(role)) {
                return user;
            }
        }
        return null;
    }

    @GetMapping("/manageteachersandstudents")
    List<User> manageteachersandstudents(@RequestParam String instituteName, @RequestParam String role) {
        List<User> users = repo.findByInstituteNameAndRole(instituteName, role);
        return util.checkAlreadyAdded(users, instituteName, role);
    }

    @PostMapping("/admin/addfaculty")
    boolean addTeachers(@RequestBody User user) {
        return util.addTeachers(user);
    }

    @GetMapping("/admin/managedfaculties")
    List<?> managedFacultyList(@RequestParam String instituteName) {
        List<?> facultyList = util.managedFacultiesList(instituteName);
        return facultyList;
    }

    @PostMapping("/admin/addStudent")
    boolean addStudents(@RequestBody User user) {
        return util.addStudents(user);
    }

    @PostMapping("/admin/createdepartment")
    boolean createdept(@RequestBody Department dept) {
        return util.createdept(dept);
    }

    @PostMapping("/admin/verifystatus")
    boolean createverifuUser(@RequestBody VerifyUser user, @RequestParam String instituteName) {
        return util.addRequest(instituteName, user);
    }

    @GetMapping("/institutes")
    List<String> getInstitutes() {
        List<String> institutes = repo.findInstituteNames();
        return institutes;
    }

    @GetMapping("/departmentList")
    List<?> existedDepartments(@RequestParam String instituteName) {
        List<?> deptList = util.existedDepartments(instituteName);
        return deptList;
    }

    @GetMapping("/verifiedStatus")
    List<?> checkverified(@RequestParam String email, @RequestParam String instituteName) {
        List<?> verified = util.checkverifiedstatus(email, instituteName);
        return verified;
    }

    @PutMapping("/updateVerifyStatus")
    void updateVerifyStatus(@RequestBody User user) {
        util.updateVerifyStatus(user.email, user.instituteName);
    }

    @PutMapping("/assignFacultyToDept")
    void assignFacultyToDept(@RequestBody Department dept) {
        util.assignFacultyToDept(dept);
    }

    @GetMapping("/getDeptNamefromId")
    String getDeptNameFromDeptId(@RequestParam int deptId, @RequestParam String instituteName) {
        return util.getDepartmentNameById(deptId, instituteName);
    }

    @DeleteMapping("/deleteDepartment")
    void deleteDepartment(@RequestParam int deptId, @RequestParam String instituteName) {
        util.deleteDepartment(deptId, instituteName);
    }

    @PostMapping("/addClasses")
    boolean addClasses(@RequestBody Class clas) {
        return util.addClasses(clas);
    }

    @PutMapping("/assignFacultyToClass")
    void assignFacultyClass(@RequestBody Class clas) {
        util.assignFacultyClass(clas);
    }

    @GetMapping("/fetchClasses")
    List<?> fetchClasses(@RequestParam String instituteName, @RequestParam int deptId) {
        return util.fetchClasses(instituteName, deptId);
    }

    @GetMapping("/getStudents")
    List<?> getStudents(@RequestParam String instituteName) {
        return util.getStudents(instituteName);
    }

    @GetMapping("/yourclass")
    List<?> yourClass(@RequestParam String instituteName, @RequestParam int faculty_id) {
        return util.getYourClass(instituteName, faculty_id);
    }

    @GetMapping("/profileSettings")
    List<?> getStudentDetails(@RequestParam String instituteName,@RequestParam int student_id){
        return util.getStudentDetailsById(instituteName, student_id);
    }

    @PostMapping("/addAnnouncement")
    boolean addAnnouncement(@RequestBody Announcement announcement, @RequestParam String instituteName) {
        return util.addAnnouncement(announcement, instituteName);
    }

    @GetMapping("/fetchAnnouncements")
    List<?> fetchAnnouncements(@RequestParam String instituteName) {
        return util.fetchAnnouncements(instituteName);
    }

    @PutMapping("/updateStudentDetails")
    void updateStudentDetails(@RequestBody Student student, @RequestParam String instituteName,
            @RequestParam int student_id) {
        util.updateStudentDetails(student, instituteName, student_id);
    }

    @GetMapping("/getStudentsByClass")
    List<?> getStudentsByClass(@RequestParam String instituteName, @RequestParam int class_id) {
        return util.fetchStudentsbyClass(instituteName, class_id);
    }
    

    @GetMapping("/getStudentDetailsById")
    List<?> fetchStudentByUserId(@RequestParam String instituteName, @RequestParam int userId) {
        return util.fetchStudentByUserId(instituteName, userId);
    }

    @GetMapping("/fetchFacultyByUserId")
    List<?> fetchFacultyByUserId(@RequestParam int userId, @RequestParam String instituteName) {
        return util.fetchFacultyByUserId(userId, instituteName);
    }

}
