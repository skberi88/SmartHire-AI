package com.smarthireai.backend.service.applicant;

import com.smarthireai.backend.dto.applicantProfile.CertificationDTO;

import java.util.List;

public interface CertificationService {
    List<CertificationDTO> getCertifications();
    CertificationDTO addCertification(CertificationDTO dto);
    CertificationDTO updateCertification(Long id, CertificationDTO dto);
    void deleteCertification(Long id);

    List<CertificationDTO> getApplicantCertifications(Long id);
}
