package com.smarthireai.backend.model.applicant;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String company;
    private String issuedBy;
    private String issueDate;
    private String certId;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private ApplicantProfile profile;
}
