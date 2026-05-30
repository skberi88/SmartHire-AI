package com.smarthireai.backend.service.implementation.applicant;

import com.smarthireai.backend.dto.applicant.ApplicantTalentDTO;
import com.smarthireai.backend.dto.applicantProfile.ApplicantProfileDTO;
import com.smarthireai.backend.model.applicant.ApplicantProfile;
import com.smarthireai.backend.model.applicant.Skill;
import com.smarthireai.backend.model.auth.User;
import com.smarthireai.backend.repository.applicant.ApplicantProfileRepo;
import com.smarthireai.backend.repository.auth.UserRepo;
import com.smarthireai.backend.service.applicant.ApplicantProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicantProfileServiceImpl implements ApplicantProfileService {

    @Autowired
    private ApplicantProfileRepo repo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public ApplicantProfileDTO getProfile() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepo.findUserByEmail(email).orElseThrow();

        ApplicantProfile profile = repo.findByUser(user)
                .orElseGet(() -> {
                    ApplicantProfile newProfile = ApplicantProfile
                            .builder()
                            .user(user)
                            .build();
                    return repo.save(newProfile);
                });

        return ApplicantProfileDTO.builder()
                .bio(profile.getBio())
                .location(profile.getLocation())
                .phone(profile.getPhone())
                .resumeUrl(profile.getResumeUrl())
                .githubUrl(profile.getGithubUrl())
                .linkedinUrl(profile.getLinkedinUrl())
                .jobTitle(profile.getJobTitle())
                .company(profile.getCompany())
                .experience(profile.getExperience())
                .build();
    }

    @Override
    public ApplicantProfileDTO updateProfile(ApplicantProfileDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepo.findUserByEmail(email).orElseThrow();

        ApplicantProfile profile = repo.findByUser(user).orElseThrow();

        profile.setBio(dto.getBio());
        profile.setLocation(dto.getLocation());
        profile.setPhone(dto.getPhone());
        profile.setGithubUrl(dto.getGithubUrl());
        profile.setLinkedinUrl(dto.getLinkedinUrl());
        profile.setResumeUrl(dto.getResumeUrl());
        profile.setJobTitle(dto.getJobTitle());
        profile.setCompany(dto.getCompany());
        profile.setExperience(dto.getExperience());

        repo.save(profile);
        return dto;
    }

    @Override
    public List<ApplicantTalentDTO> getAllApplicants() {
        List<ApplicantProfile> profiles = repo.findAll();

        return profiles.stream()
                .map(profile ->
                {
                    List<String> skills = profile.getSkills()
                            .stream()
                            .map(Skill::getName)
                            .toList();
                    return ApplicantTalentDTO.builder()
                            .id(profile.getId())
                            .fullName(profile.getUser().getName())
                            .jobTitle(profile.getJobTitle())
                            .company(profile.getCompany())
                            .location(profile.getLocation())
                            .experienceYears(Integer.parseInt(profile.getExperience()
                                                    .replaceAll("[^0-9]", "")))
                            .about(profile.getBio())
                            .skills(skills)
                            .build();
                })
                .toList();
    }
}
