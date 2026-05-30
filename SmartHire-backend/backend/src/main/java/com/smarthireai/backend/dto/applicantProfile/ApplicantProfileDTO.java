package com.smarthireai.backend.dto.applicantProfile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApplicantProfileDTO {
    private String bio;
    private String location;
    private String phone;
    private String githubUrl;
    private String linkedinUrl;
    private String resumeUrl;
    private String jobTitle;
    private String company;
    private String experience;
}
