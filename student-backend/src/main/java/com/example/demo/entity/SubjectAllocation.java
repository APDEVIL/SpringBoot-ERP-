package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
public class SubjectAllocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer teacherId;
    private Integer subjectId;
    private String branch;

    public SubjectAllocation() {}

    public SubjectAllocation(Integer id, Integer teacherId, Integer subjectId, String branch) {
        this.id = id;
        this.teacherId = teacherId;
        this.subjectId = subjectId;
        this.branch = branch;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getTeacherId() { return teacherId; }
    public void setTeacherId(Integer teacherId) { this.teacherId = teacherId; }

    public Integer getSubjectId() { return subjectId; }
    public void setSubjectId(Integer subjectId) { this.subjectId = subjectId; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
}