package com.smarthireai.backend.service.applicant;

import com.smarthireai.backend.dto.applicantProfile.ExperienceDTO;

import java.util.List;

public interface ExperienceService {
    List<ExperienceDTO> getExperiences();
    ExperienceDTO addExperience(ExperienceDTO dto);
    void deleteExperience(Long id);
    ExperienceDTO updateExperience(Long id, ExperienceDTO dto);

    List<ExperienceDTO> getApplicantExperiences(Long id);
}
