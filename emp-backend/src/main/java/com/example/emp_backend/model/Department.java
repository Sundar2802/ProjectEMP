package com.example.emp_backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Department {
    public int dept_id;
    public String dept_name;
    public int dept_incharge_id;
    public String dept_incharge_name;
    public String instituteName;
}
