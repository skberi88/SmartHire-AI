package com.smarthireai.backend.repository.applicant;

import com.smarthireai.backend.model.applicant.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceRepo extends JpaRepository<Experience, Long> {
}
