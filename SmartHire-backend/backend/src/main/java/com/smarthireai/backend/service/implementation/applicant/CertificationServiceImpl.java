package com.smarthireai.backend.service.implementation.applicant;

import com.smarthireai.backend.dto.applicantProfile.CertificationDTO;
import com.smarthireai.backend.model.applicant.ApplicantProfile;
import com.smarthireai.backend.model.applicant.Certification;
import com.smarthireai.backend.model.auth.User;
import com.smarthireai.backend.repository.applicant.ApplicantProfileRepo;
import com.smarthireai.backend.repository.applicant.CertificationRepo;
import com.smarthireai.backend.repository.auth.UserRepo;
import com.smarthireai.backend.service.applicant.CertificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificationServiceImpl implements CertificationService {

    @Autowired
    private CertificationRepo certiRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ApplicantProfileRepo profileRepo;

    @Override
    public List<CertificationDTO> getCertifications() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findUserByEmail(email).orElseThrow();
        ApplicantProfile profile = profileRepo.findByUser(user).orElseThrow();

        return profile.getCertifications()
                .stream()
                .map(certification -> CertificationDTO
                        .builder()
                        .id(certification.getId())
                        .title(certification.getTitle())
                        .company(certification.getCompany())
                        .issuedBy(certification.getIssuedBy())
                        .issueDate(certification.getIssueDate())
                        .certId(certification.getCertId())
                        .build())
                .toList();
    }

    @Override
    public CertificationDTO addCertification(CertificationDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findUserByEmail(email).orElseThrow();
        ApplicantProfile profile = profileRepo.findByUser(user).orElseThrow();

        Certification certification = Certification.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .company(dto.getCompany())
                .issuedBy(dto.getIssuedBy())
                .issueDate(dto.getIssueDate())
                .profile(profile)
                .certId(dto.getCertId())
                .build();

        Certification savedCertification = certiRepo.save(certification);

        return CertificationDTO.builder()
                .id(savedCertification.getId())
                .title(savedCertification.getTitle())
                .company(savedCertification.getCompany())
                .issuedBy(savedCertification.getIssuedBy())
                .issueDate(savedCertification.getIssueDate())
                .certId(savedCertification.getCertId())

                .build();
    }

    @Override
    public CertificationDTO updateCertification(Long id, CertificationDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findUserByEmail(email).orElseThrow();
        ApplicantProfile profile = profileRepo.findByUser(user).orElseThrow();

        Certification certification = certiRepo.findById(id).orElseThrow();
        if (!certification.getProfile().getId().equals(profile.getId())){
            throw new RuntimeException("Unauthorized");
        }

        certification.setTitle(dto.getTitle());
        certification.setCompany(dto.getCompany());
        certification.setIssuedBy(dto.getIssuedBy());
        certification.setIssueDate(dto.getIssueDate());
        certification.setCertId(dto.getCertId());

        Certification updatedCertification = certiRepo.save(certification);
        return CertificationDTO.builder()
                .id(updatedCertification.getId())
                .title(updatedCertification.getTitle())
                .company(updatedCertification.getCompany())
                .issuedBy(updatedCertification.getIssuedBy())
                .issueDate(updatedCertification.getIssueDate())
                .certId(updatedCertification.getCertId())
                .build();
    }

    @Override
    public void deleteCertification(Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findUserByEmail(email).orElseThrow();
        ApplicantProfile profile = profileRepo.findByUser(user).orElseThrow();

        Certification certification = certiRepo.findById(id).orElseThrow();
        if (!certification.getProfile().getId().equals(profile.getId())){
            throw new RuntimeException("Unauthorized");
        }
        certiRepo.deleteById(id);
    }

    @Override
    public List<CertificationDTO> getApplicantCertifications(Long applicantId) {
        ApplicantProfile profile = profileRepo.findById(applicantId).orElseThrow();

        return profile.getCertifications()
                .stream()
                .map(cert -> CertificationDTO.builder()
                        .id(cert.getId())
                        .title(cert.getTitle())
                        .company(cert.getCompany())
                        .issuedBy(cert.getIssuedBy())
                        .issueDate(cert.getIssueDate())
                        .certId(cert.getCertId())
                        .build())
                .toList();
    }
}
