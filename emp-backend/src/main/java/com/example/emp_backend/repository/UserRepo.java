package com.example.emp_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.example.emp_backend.model.Department;
import com.example.emp_backend.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

	User findUserByEmail(String email);
    User findUserByInstituteNameAndRole(String instituteName, String role);

    List<User> findByInstituteNameAndRole(String instituteName, String role);

    @Query(value="SELECT DISTINCT institute_name FROM user",nativeQuery=true)
    List<String> findInstituteNames();

    // @Query(value = "SELECT * FROM user WHERE institute_name = :instituteName AND role = :role", nativeQuery = true)
    // List<User> findUsersByInstituteNameAndRole(@Param("instituteName") String instituteName, @Param("role") String role);
    
}
