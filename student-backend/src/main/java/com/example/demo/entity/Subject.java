package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String code;
    private String branch;

    public Subject() {}

    public Subject(Integer id, String name, String code, String branch) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.branch = branch;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
}