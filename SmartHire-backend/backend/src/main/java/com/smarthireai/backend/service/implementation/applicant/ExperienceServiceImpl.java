package com.smarthireai.backend.service.implementation.applicant;

import com.smarthireai.backend.dto.applicantProfile.ExperienceDTO;
import com.smarthireai.backend.model.applicant.ApplicantProfile;
import com.smarthireai.backend.model.applicant.Experience;
import com.smarthireai.backend.model.auth.User;
import com.smarthireai.backend.repository.applicant.ApplicantProfileRepo;
import com.smarthireai.backend.repository.applicant.ExperienceRepo;
import com.smarthireai.backend.repository.auth.UserRepo;
import com.smarthireai.backend.service.applicant.ExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceServiceImpl implements ExperienceService {

    @Autowired
    private ExperienceRepo experienceRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ApplicantProfileRepo profileRepo;

    @Override
    public List<ExperienceDTO> getExperiences() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepo.findUserByEmail(email).orElseThrow();

        ApplicantProfile profile = profileRepo.findByUser(user).orElseThrow();

        return profile.getExperiences()
                .stream()
                .map(experience -> ExperienceDTO.builder()
                        .id(experience.getId())
                        .jobTitle(experience.getJobTitle())
                        .company(experience.getCompany())
                        .location(experience.getLocation())
                        .description(experience.getDescription())
                        .startDate(experience.getStartDate())
                        .endDate(experience.getEndDate())
                        .currentlyWorking(experience.getCurrentlyWorking())
                        .build())
                .toList();
    }

    @Override
    public ExperienceDTO addExperience(ExperienceDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findUserByEmail(email).orElseThrow();
        ApplicantProfile profile = profileRepo.findByUser(user).orElseThrow();

        Experience experience = Experience.builder()
                .jobTitle(dto.getJobTitle())
                .company(dto.getCompany())
                .location(dto.getLocation())
                .description(dto.getDescription())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .currentlyWorking(dto.getCurrentlyWorking())
                .profile(profile)
                .build();

        Experience savedExperience = experienceRepo.save(experience);
        return ExperienceDTO.builder()
                .id(savedExperience.getId())
                .jobTitle(savedExperience.getJobTitle())
                .company(savedExperience.getCompany())
                .location(savedExperience.getLocation())
                .description(savedExperience.getDescription())
                .startDate(savedExperience.getStartDate())
                .endDate(savedExperience.getEndDate())
                .currentlyWorking(savedExperience.getCurrentlyWorking())
                .build();
    }

    @Override
    public void deleteExperience(Long id) {
        experienceRepo.deleteById(id);
    }

    @Override
    public ExperienceDTO updateExperience(Long id, ExperienceDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findUserByEmail(email).orElseThrow();
        ApplicantProfile profile = profileRepo.findByUser(user).orElseThrow();

        Experience experience = experienceRepo.findById(id).orElseThrow();
        if (!experience.getProfile().getId().equals(profile.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        experience.setJobTitle(dto.getJobTitle());
        experience.setCompany(dto.getCompany());
        experience.setLocation(dto.getLocation());
        experience.setDescription(dto.getDescription());
        experience.setStartDate(dto.getStartDate());
        experience.setEndDate(dto.getEndDate());
        experience.setCurrentlyWorking(dto.getCurrentlyWorking());

        Experience updatedExperience = experienceRepo.save(experience);

        return ExperienceDTO.builder()
                .id(updatedExperience.getId())
                .jobTitle(updatedExperience.getJobTitle())
                .company(updatedExperience.getCompany())
                .location(updatedExperience.getLocation())
                .description(updatedExperience.getDescription())
                .startDate(updatedExperience.getStartDate())
                .endDate(updatedExperience.getEndDate())
                .currentlyWorking(updatedExperience.getCurrentlyWorking())
                .build();
    }

    @Override
    public List<ExperienceDTO>
    getApplicantExperiences(Long applicantId) {

        ApplicantProfile profile = profileRepo.findById(applicantId).orElseThrow();

        return profile.getExperiences()
                .stream()
                .map(exp -> ExperienceDTO.builder()
                        .id(exp.getId())
                        .jobTitle(exp.getJobTitle())
                        .company(exp.getCompany())
                        .description(exp.getDescription())
                        .startDate(exp.getStartDate())
                        .endDate(exp.getEndDate())
                        .build())
                .toList();
    }
}
