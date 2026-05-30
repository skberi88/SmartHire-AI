package com.smarthireai.backend.repository.applicant;

import com.smarthireai.backend.model.applicant.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepo extends JpaRepository<Skill, Long> {
}
