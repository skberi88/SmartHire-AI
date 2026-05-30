package com.smarthireai.backend.repository.applicant;

import com.smarthireai.backend.model.applicant.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificationRepo extends JpaRepository<Certification, Long> {
}
