package com.example.emp_backend.utility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import com.example.emp_backend.repository.UserRepo;
import com.example.emp_backend.model.Department;
import com.example.emp_backend.model.Student;
import com.example.emp_backend.model.User;
import com.example.emp_backend.model.VerifyUser;
import com.example.emp_backend.model.Announcement;
import com.example.emp_backend.model.Class;
import java.util.*;;

public class Utility {
    @Autowired
    private UserRepo repo;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    String candites = "ABCDEFGHIJKLMNOPQRSTUVYXZabcdefghijklmnopqrstuvxyz1234567890";

    public String tryCode() {
        StringBuilder s = new StringBuilder(candites);
        Random random = new Random();
        int len = candites.length();
        for (int i = 0; i < 8; i++) {
            s.append(candites.charAt(random.nextInt(len)));
        }
        return s.toString();
    }

    // public String generateClassCode(){
    // String uniqueClassCode = "";
    // do{
    // uniqueClassCode = tryCode();
    // }while(repo.findByUniqueClassCode(uniqueClassCode));
    // return uniqueClassCode;
    // }

    public void createInstituteTable(String instituteName) {
        String queryFaculty = "CREATE TABLE IF NOT EXISTS " + instituteName + "_faculties" + " (" +
                "faculty_id INT NOT NULL, " +
                "faculty_name VARCHAR(255) NOT NULL," +
                "faculty_email VARCHAR(255) NOT NULL, " +
                "faculty_department_id BIGINT, " +
                "faculty_class_id BIGINT," +
                "faculty_gender VARCHAR(255) , " +
                "faculty_dob VARCHAR(255) , " +
                "faculty_phone_no VARCHAR(255) , " +
                "faculty_address VARCHAR(255) , " +
                "faculty_specializations VARCHAR(255) , " +
                "faculty_doj DATE , " +
                "PRIMARY KEY (faculty_id));";

        String queryStudent = "CREATE TABLE IF NOT EXISTS " + instituteName + "_students" + " (" +
                "student_id INT NOT NULL, " +
                "reg_no VARCHAR(255) , " +
                "student_name VARCHAR(255) NOT NULL," +
                "student_email VARCHAR(255) NOT NULL, " +
                "student_department_id BIGINT ," +
                "student_gender VARCHAR(255), " +
                "student_dob VARCHAR(255), " +
                "student_phone_no VARCHAR(255), " +
                "student_address VARCHAR(255), " +
                "student_specializations VARCHAR(255), " +
                "student_class_id BIGINT , " +
                "student_doj DATE, " +
                "PRIMARY KEY (student_id));";

        String queryDept = "CREATE TABLE IF NOT EXISTS " + instituteName + "_departments" + " (" +
                "department_Id INT NOT NULL, " +
                "department_name VARCHAR(255) NOT NULL, " +
                "department_incharge_name VARCHAR(255) , " +
                "department_incharge_id INT , " +
                "PRIMARY KEY (department_Id)); ";

        String queryClass = "CREATE TABLE IF NOT EXISTS " + instituteName + "_classes" + " (" +
                "class_id BIGINT NOT NULL, " +
                "class_name VARCHAR(255) NOT NULL, " +
                "class_incharge VARCHAR(255) NOT NULL, " +
                "faculty_in_charge_id BIGINT NOT NULL, " +
                "department_id INT NOT NULL, " +
                "PRIMARY KEY (class_id));";

        String queryRequest = "CREATE TABLE IF NOT EXISTS " + instituteName + "_requests" + " (" +
                "email VARCHAR(255) NOT NULL, " +
                "verified BOOLEAN NOT  NULL, " +
                "PRIMARY KEY (email));";

        String queryAnnouncement = "CREATE TABLE IF NOT EXISTS " + instituteName + "_announcement ( "
                + "announcement_id INT NOT NULL AUTO_INCREMENT , " +
                "title VARCHAR(255) NOT NULL, " +
                "description TEXT NOT NULL, " +
                "date VARCHAR(255) NOT NULL, " +
                "role VARCHAR(255) NOT NULL, " +
                "access_group VARCHAR(255) NOT NULL, " +
                "dept_id INT ," +
                "class_id INT, " +
                "PRIMARY KEY (announcement_id));";

                // CREATE TABLE IF NOT EXISTS  seven_attendance_record (attendance_id BIGINT NOT NULL AUTO_INCREMENT, student_id INT NOT NULL, class_id INT NOT NULL, department_id INT NOT NULL, date VARCHAR(50) NOT NULL, status VARCHAR(50) NOT NULL, faculty_id INT NOT NULL, PRIMARY KEY(attendance_id));
        String queryAttendence = "CREATE TABLE IF NOT EXISTS " + instituteName + "_attendance_record ( " +
                            "attendance_id BIGINT NOT NULL AUTO_INCREMENT, " +
                            "student_id INT NOT NULL, " +
                            "class_id INT NOT NULL, " +
                            "department_id INT NOT NULL, "+
                            "date VARCHAR(50) NOT NULL, "+ 
                            "status VARCHAR(50) NOT NULL, "+
                            "faculty_id INT NOT NULL, "+
                            "PRIMARY KEY(attendance_id));";
 
        jdbcTemplate.execute(queryFaculty);
        jdbcTemplate.execute(queryStudent);
        jdbcTemplate.execute(queryDept);
        jdbcTemplate.execute(queryClass);
        jdbcTemplate.execute(queryRequest);
        jdbcTemplate.execute(queryAnnouncement);
        jdbcTemplate.execute(queryAttendence);

    }

    public boolean addTeachers(User faculty) {
        try {
            String tableName = (faculty.instituteName) + "_faculties";
            String nquery = "INSERT INTO " + tableName + " (faculty_id, faculty_name, faculty_email) VALUES (?, ?, ?)";
            jdbcTemplate.update(nquery, faculty.id, faculty.name, faculty.email);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean addStudents(User student) {
        try {
            String tableName = (student.instituteName) + "_students";
            String nquery = "INSERT INTO " + tableName + " (student_id, student_name, student_email) VALUES (?, ?, ?)";
            jdbcTemplate.update(nquery, student.id, student.name, student.email);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean createdept(Department dept) {
        try {
            String tableName = (dept.instituteName) + "_departments";
            String nquery = "INSERT INTO " + tableName
                    + " (department_id, department_name, department_incharge_name, department_incharge_id) VALUES(?, ?, ?, ?)";
            jdbcTemplate.update(nquery, dept.dept_id, dept.dept_name, dept.dept_incharge_name, dept.dept_incharge_id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean addRequest(String instituteName, VerifyUser user) {
        try {
            String tableName = instituteName + "_requests";
            String query = "INSERT INTO " + tableName + " (email, verified) VALUES(?,?)";
            jdbcTemplate.update(query, user.email, user.verified);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<User> checkAlreadyAdded(List<User> users, String instituteName, String role) {
        List<User> nonAddedUsers = new ArrayList<>();
        String tableName = "";
        if (role.equals("student")) {
            tableName = instituteName + "_students";
        } else if (role.equals("faculty")) {
            tableName = instituteName + "_faculties";
        }
        for (User user : users) {
            String query = "SELECT COUNT(*) FROM " + tableName + " WHERE " + role + "_email = ?";
            Integer count = jdbcTemplate.queryForObject(query, new Object[] { user.getEmail() }, Integer.class);

            if (count == null || count == 0) {
                nonAddedUsers.add(user);
            }
        }
        return nonAddedUsers;
    }

    public List<?> managedFacultiesList(String instituteName) {
        String tableName = instituteName + "_faculties";
        String query = "SELECT * FROM " + tableName;
        List<Map<String, Object>> facultyList = jdbcTemplate.queryForList(query);
        return facultyList;
    }

    public List<?> existedDepartments(String instituteName) {
        String tableName = instituteName + "_departments";
        String query = "SELECT * FROM " + tableName;
        List<Map<String, Object>> deptList = jdbcTemplate.queryForList(query);
        return deptList;
    }

    public List<?> checkverifiedstatus(String email, String instituteName) {
        String tableName = instituteName + "_requests";
        String query = "SELECT verified FROM " + tableName + " WHERE email=?";
        List<Map<String, Object>> verified = jdbcTemplate.queryForList(query, email);
        return verified;
    }

    public void updateVerifyStatus(String email, String instituteName) {
        String tableName = instituteName + "_requests";
        String updateQuery = "UPDATE " + tableName + " SET verified = TRUE WHERE email=?";
        jdbcTemplate.update(updateQuery, email);
    }

    public void assignFacultyToDept(Department dept) {
        String tableName = dept.instituteName + "_faculties";
        String query = "UPDATE " + tableName + " SET faculty_department_id = " + dept.dept_id + " WHERE faculty_id = "
                + dept.dept_incharge_id;
        jdbcTemplate.update(query);
    }

    public String getDepartmentNameById(int deptId, String instituteName) {
        String tableName = instituteName + "_departments";
        String sql = "SELECT department_name FROM " + tableName + " WHERE department_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[] { deptId }, String.class);
    }

    public void deleteDepartment(int deptId, String instituteName) {
        String tableName = (instituteName) + "_departments";
        String sql = "DELETE FROM " + tableName + " WHERE department_id = ?";
        jdbcTemplate.update(sql, deptId);
    }

    public boolean addClasses(Class clas) {
        String tableName = clas.instituteName + "_classes";
        String sql = "INSERT INTO " + tableName
                + "(class_id, class_name, class_incharge , faculty_in_charge_id, department_id) VALUES (?, ?, ?, ?, ?)";

        try {
            jdbcTemplate.update(sql, clas.getClass_id(), clas.getClass_name(), clas.getClass_incharge_name(),
                    clas.getClass_incharge_id(), clas.getDept_id());
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public void assignFacultyClass(Class clas) {
        String tableName = clas.instituteName + "_faculties";
        String query = "UPDATE " + tableName + " SET faculty_class_id = " + clas.getClass_id() + " WHERE faculty_id = "
                + clas.class_incharge_id;
        jdbcTemplate.update(query);

    }

    public List<?> fetchClasses(String instituteName, int deptId){
        String tableName = instituteName + "_classes";
        String query = "SELECT * FROM " + tableName + " WHERE department_id = " + deptId;
        List<Map<String, Object>> deptList = jdbcTemplate.queryForList(query);
        return deptList;
    }

    public List<?> getStudents(String instituteName) {
        String tableName = instituteName + "_students";
        String query = "SELECT * FROM " + tableName;
        List<Map<String, Object>> studentList = jdbcTemplate.queryForList(query);
        return studentList;
    }

    public List<?> getYourClass(String instituteName, int faculty_id) {
        String tableName = instituteName + "_classes";
        String query = "SELECT * FROM " + tableName + " WHERE faculty_in_charge_id = ?";
        List<Map<String, Object>> yourClass = jdbcTemplate.queryForList(query, faculty_id);
        return yourClass;
    }

    public List<?> getStudentDetailsById(String instituteName, int student_id) {
        String tableName = instituteName + "_students";
        String query = "SELECT * FROM " + tableName + " WHERE student_id = ?";
        List<Map<String, Object>> studentDetails = jdbcTemplate.queryForList(query, student_id);
        return studentDetails;
    }

    public boolean addAnnouncement(Announcement announcement, String instituteName) {
        String tableName = instituteName + "_announcement";
        String query = "INSERT INTO " + tableName
                + " (title, description, date, role, access_group, dept_id, class_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try{
            jdbcTemplate.update(query, announcement.getTitle(), announcement.getDescription(),  announcement.getDate(),
            announcement.getRole(), announcement.getAccessGroup(), announcement.getDeptId(),
            announcement.getClassId());
           return true;
        }catch(Exception e){
            return false;
      }
      
    }


    public List<?> fetchAnnouncements(String instituteName){
        String tableName = instituteName + "_announcement";
        String query = "SELECT * FROM " + tableName;
        List<Map<String, Object>> announcements =  jdbcTemplate.queryForList(query);
        return announcements;
    }   
 // "PRIMARY KEY (announcement_id)"e
    public void updateStudentDetails( Student student,String instituteName, int student_id) {
        String tableName = instituteName + "_students";
        String query = "UPDATE " + tableName + " SET reg_no = '" + student.getReg_no() + "'"+ 
        " , student_department_id = " + student.getStudent_department_id() + 
        " , student_gender = '" + student.getStudent_gender() + "'" + 
        " , student_dob = '" + student.getStudent_dob() + "'" + 
        " , student_phone_no = '" + student.getStudent_phone_no() + "'" + 
        " , student_address = '" + student.getStudent_address() + "'" + 
        " , student_specializations = '" + student.getStudent_specializations() + "'" + 
        " , student_class_id = " + student.getStudent_class_id() + 
        " , student_doj = '" + student.getStudent_doj() + "'" + 
        " WHERE student_id = " + student_id;
        jdbcTemplate.update(query);
    }

    
    public List<?> fetchStudentsbyClass(String instituteName,int class_id){
        String tableName = instituteName + "_students";
        String query = "SELECT * FROM "+ tableName +" WHERE student_class_id = ?";
        List<Map<String, Object>> studenList=jdbcTemplate.queryForList(query,class_id);
        return studenList;
    }


    public List<?> fetchStudentByUserId(String instituteName, int userId){
        String tableName = instituteName + "_students";
        String query = "SELECT * FROM " + tableName + " WHERE student_id = ?";
        return jdbcTemplate.queryForList(query, userId);

    }

    public List<?> fetchFacultyByUserId(int userId, String instituteName){
        String tableName = instituteName + "_faculties";
        String query = "SELECT * FROM " + tableName + " WHERE faculty_id = ?";
        return jdbcTemplate.queryForList(query, userId);
    }

}
