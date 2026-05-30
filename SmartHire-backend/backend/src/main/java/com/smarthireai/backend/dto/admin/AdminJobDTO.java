package com.smarthireai.backend.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminJobDTO {
    private Long id;
    private String title;
    private String company;
    private String employerName;
    private String employerEmail;
    private Boolean active;
    private Integer noOfApplicants;
    private LocalDateTime postedAt;
}
