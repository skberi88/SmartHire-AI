package com.smarthireai.backend.model.applicant;

import com.smarthireai.backend.enums.ApplicationStatus;
import com.smarthireai.backend.model.auth.User;
import com.smarthireai.backend.model.employer.Job;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "applicant_id")
    private User applicant;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    private String name;
    private String email;

    @Column(length = 5000)
    private String coverLetter;

    private String phone;

    private String resumeUrl;

    private LocalDateTime appliedAt;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

}
