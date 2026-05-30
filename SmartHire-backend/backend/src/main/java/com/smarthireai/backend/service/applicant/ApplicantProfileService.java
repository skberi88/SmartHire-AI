package com.smarthireai.backend.service.applicant;

import com.smarthireai.backend.dto.applicant.ApplicantTalentDTO;
import com.smarthireai.backend.dto.applicantProfile.ApplicantProfileDTO;

import java.util.List;

public interface ApplicantProfileService {
    ApplicantProfileDTO getProfile();
    ApplicantProfileDTO updateProfile(ApplicantProfileDTO dto);

    List<ApplicantTalentDTO> getAllApplicants();
}
