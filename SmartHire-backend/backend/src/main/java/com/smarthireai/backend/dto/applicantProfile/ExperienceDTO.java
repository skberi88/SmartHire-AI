package com.smarthireai.backend.dto.applicantProfile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExperienceDTO {
    private Long id;
    private String jobTitle;
    private String company;
    private String location;
    private String description;
    private String startDate;
    private String endDate;
    private Boolean currentlyWorking;
}
