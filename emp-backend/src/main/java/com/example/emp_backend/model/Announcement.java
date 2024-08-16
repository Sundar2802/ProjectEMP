package com.example.emp_backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Announcement {
    public int announcement_id;
    public String title;
    public String description;
    public String date;
    public String role;
    public String accessGroup;
    public int deptId;
    public int classId;
}
// "CREATE TABLE IF NOT EXISTS " + instituteName + "_announcements (" +
//                                 "announcement_id int NOT NULL AUTO_INCREAMENT, " +
//                                 "title VARCHAR(255) NOT NULL, " +
//                                 "description VARCHAR NOT NULL, "+
//                                 "date VARCHAR(255) NOT NULL, " +
//                                 "role VARCHAR(255) NOT NULL, " + 
//                                 "access_group VARCHAR(255) NOT NULL, "+
//                                 "dept_id int ,"+
//                                 "class_id int, " +
//                                 "PRIMARY KEY (announcement_id)";