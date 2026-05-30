package com.smarthireai.backend.dto.applicant;

import com.smarthireai.backend.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobApplicationResponseDTO {
    private Long applicationId;

    private Long jobId;

    private String jobTitle;

    private String company;

    private String location;

    private Integer minSalary;

    private Integer maxSalary;

    private String applicantName;

    private String applicantEmail;

    private String coverLetter;

    private String phone;

    private String resumeUrl;

    private LocalDateTime appliedAt;

    private ApplicationStatus status;

    private String description;

    private String requirements;

    private List<String> skillsRequired;
}
