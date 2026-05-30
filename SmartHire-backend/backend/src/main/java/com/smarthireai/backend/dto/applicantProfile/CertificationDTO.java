package com.smarthireai.backend.dto.applicantProfile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CertificationDTO {
    private Long id;
    private String certId;
    private String title;
//    private String description;
    private String company;
    private String issuedBy;
    private String issueDate;
}
