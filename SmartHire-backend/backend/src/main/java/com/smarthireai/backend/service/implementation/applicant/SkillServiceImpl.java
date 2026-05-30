package com.smarthireai.backend.service.implementation.applicant;

import com.smarthireai.backend.dto.applicantProfile.SkillDTO;
import com.smarthireai.backend.model.applicant.ApplicantProfile;
import com.smarthireai.backend.model.applicant.Skill;
import com.smarthireai.backend.model.auth.User;
import com.smarthireai.backend.repository.applicant.ApplicantProfileRepo;
import com.smarthireai.backend.repository.applicant.SkillRepo;
import com.smarthireai.backend.repository.auth.UserRepo;
import com.smarthireai.backend.service.applicant.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepo skillRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ApplicantProfileRepo profileRepo;

    @Override
    public List<SkillDTO> getSkills() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findUserByEmail(email).orElseThrow();
        ApplicantProfile profile = profileRepo.findByUser(user).orElseThrow();

        return profile.getSkills()
                .stream()
                .map(skill -> SkillDTO.builder()
                        .id(skill.getId())
                        .name(skill.getName())
                        .build())
                .toList();
    }

    @Override
    public SkillDTO addSkill(SkillDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findUserByEmail(email).orElseThrow();
        ApplicantProfile profile = profileRepo.findByUser(user).orElseThrow();

        Skill skill = Skill.builder()
                .name(dto.getName())
                .profile(profile)
                .build();

        Skill savedSkill = skillRepo.save(skill);

        return SkillDTO.builder()
                .id(savedSkill.getId())
                .name(savedSkill.getName())
                .build();
    }

    @Override
    public void deleteSkill(Long id) {
        skillRepo.deleteById(id);
    }
}
