package com.smarthireai.backend.dto.applicant;

import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApplicantTalentDTO {
    private Long id;

    private String fullName;

    private String jobTitle;

    private String company;

    private String location;

    private Integer experienceYears;

    private String about;

    private List<String> skills;
}
