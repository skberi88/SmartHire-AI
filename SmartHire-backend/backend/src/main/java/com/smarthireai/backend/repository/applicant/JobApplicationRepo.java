package com.smarthireai.backend.repository.applicant;

import com.smarthireai.backend.dto.applicant.JobApplicationResponseDTO;
import com.smarthireai.backend.model.applicant.JobApplication;
import com.smarthireai.backend.model.auth.User;
import com.smarthireai.backend.model.employer.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepo extends JpaRepository<JobApplication, Long> {
    boolean existsByApplicantAndJob(User applicant, Job job);
    List<JobApplication> findByApplicant(User applicant);
    List<JobApplication> findByJob(Job job);
    Integer countByJob(Job job);
}
