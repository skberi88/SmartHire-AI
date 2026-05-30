package com.smarthireai.backend.dto.employer;

import com.smarthireai.backend.enums.EmploymentType;
import com.smarthireai.backend.enums.ExperienceLevel;
import com.smarthireai.backend.enums.WorkMode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployerJobDTO {
    private Long id;
    private String title;
    private String company;
    private String location;
    private Integer minSalary;
    private Integer maxSalary;
    private ExperienceLevel experienceLevel;
    private EmploymentType employmentType;
    private WorkMode workMode;
    private Boolean active;
    private Integer noOfApplicants;
    private LocalDateTime postedAt;
}
