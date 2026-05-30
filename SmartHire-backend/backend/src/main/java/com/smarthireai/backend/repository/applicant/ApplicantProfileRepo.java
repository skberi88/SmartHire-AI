package com.smarthireai.backend.repository.applicant;

import com.smarthireai.backend.model.applicant.ApplicantProfile;
import com.smarthireai.backend.model.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicantProfileRepo extends JpaRepository<ApplicantProfile, Long> {
    Optional<ApplicantProfile> findByUser(User user);
}
