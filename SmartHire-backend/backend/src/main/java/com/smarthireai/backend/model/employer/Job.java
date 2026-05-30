package com.smarthireai.backend.model.employer;

import com.smarthireai.backend.enums.EmploymentType;
import com.smarthireai.backend.enums.ExperienceLevel;
import com.smarthireai.backend.enums.WorkMode;
import com.smarthireai.backend.model.auth.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String company;
    private String location;
    private Integer minSalary;
    private Integer maxSalary;

    @Enumerated(EnumType.STRING)
    private ExperienceLevel experienceLevel;
    @Enumerated(EnumType.STRING)
    private EmploymentType employmentType;
    @Enumerated(EnumType.STRING)
    private WorkMode workMode;

    @Column(length = 5000)
    private String description;

    @Column(length = 3000)
    private String requirements;

    @ElementCollection
    private List<String> skillsRequired;

    private LocalDateTime postedAt;

    @Builder.Default
    private Boolean active = true;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private User employer;

}
