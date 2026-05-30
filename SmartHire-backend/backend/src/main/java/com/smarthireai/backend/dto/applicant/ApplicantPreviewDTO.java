package com.smarthireai.backend.dto.applicant;

import com.smarthireai.backend.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicantPreviewDTO {
    private Long applicationId;
    private Long applicantId;
    private String applicantName;
    private String applicantEmail;
    private String phone;
    private String resumeUrl;
    private String coverLetter;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;

}
