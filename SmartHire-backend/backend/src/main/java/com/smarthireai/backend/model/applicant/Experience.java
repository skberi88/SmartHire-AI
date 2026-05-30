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
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String jobTitle;
    private String company;
    private String location;

    @Column(length = 2000)
    private String description;
    private String startDate;
    private String endDate;

    private Boolean currentlyWorking;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private ApplicantProfile profile;
}
