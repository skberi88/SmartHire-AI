package com.smarthireai.backend.service.applicant;

import com.smarthireai.backend.dto.applicantProfile.SkillDTO;

import java.util.List;

public interface SkillService {
    List<SkillDTO> getSkills();
    SkillDTO addSkill(SkillDTO dto);
    void deleteSkill(Long id);
}
