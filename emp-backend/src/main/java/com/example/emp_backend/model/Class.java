package com.example.emp_backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Class {

    public int class_id;
    public String class_name;
    public int class_incharge_id;
    public String class_incharge_name;
    public int dept_id;
    public String instituteName;
}
