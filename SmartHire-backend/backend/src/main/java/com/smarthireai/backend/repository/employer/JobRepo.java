package com.smarthireai.backend.repository.employer;

import com.smarthireai.backend.model.auth.User;
import com.smarthireai.backend.model.employer.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<Job, Long>{
    List<Job> findByEmployer(User employer);
    List<Job> findByActiveTrue();
}
