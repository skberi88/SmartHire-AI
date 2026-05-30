package com.smarthireai.backend.dto.employer;

import com.smarthireai.backend.enums.EmploymentType;
import com.smarthireai.backend.enums.ExperienceLevel;
import com.smarthireai.backend.enums.WorkMode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class JobDTO {
    private Long id;
    private String title;
    private String company;
    private String location;
    private Integer minSalary;
    private Integer maxSalary;
    private ExperienceLevel experienceLevel;
    private EmploymentType employmentType;
    private WorkMode workMode;
    private String description;
    private String requirements;
    private List<String> skillsRequired;
    private Boolean active;
    private Integer noOfApplicants;
    private LocalDateTime postedAt;
}
