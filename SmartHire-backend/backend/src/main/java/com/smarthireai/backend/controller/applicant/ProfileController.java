package com.smarthireai.backend.controller.applicant;

import com.smarthireai.backend.dto.applicant.ApplicantTalentDTO;
import com.smarthireai.backend.dto.applicantProfile.ApplicantProfileDTO;
import com.smarthireai.backend.dto.applicantProfile.CertificationDTO;
import com.smarthireai.backend.dto.applicantProfile.ExperienceDTO;
import com.smarthireai.backend.dto.applicantProfile.SkillDTO;
import com.smarthireai.backend.service.applicant.ApplicantProfileService;
import com.smarthireai.backend.service.applicant.CertificationService;
import com.smarthireai.backend.service.applicant.ExperienceService;
import com.smarthireai.backend.service.applicant.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ApplicantProfileService profileService;

    @Autowired
    private SkillService skillService;

    @Autowired
    private ExperienceService experienceService;

    @Autowired
    private CertificationService certificationService;

    @GetMapping
    public ResponseEntity<ApplicantProfileDTO> getProfile(){
        return ResponseEntity.ok(profileService.getProfile());
    }

    @PutMapping
    public ResponseEntity<ApplicantProfileDTO> updateProfile(@RequestBody ApplicantProfileDTO dto){
        return ResponseEntity.ok(profileService.updateProfile(dto));
    }

    @GetMapping("/skills")
    public ResponseEntity<List<SkillDTO>> getSkills(){
        return ResponseEntity.ok(skillService.getSkills());
    }

    @PostMapping("/skills")
    public ResponseEntity<SkillDTO> addSkill(@RequestBody SkillDTO dto){
        return new ResponseEntity<>(skillService.addSkill(dto),HttpStatus.CREATED);
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id){
        skillService.deleteSkill(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/experience")
    public ResponseEntity<List<ExperienceDTO>> getExperiences(){
        return ResponseEntity.ok(experienceService.getExperiences());
    }

    @PostMapping("/experience")
    public ResponseEntity<ExperienceDTO> addExperience(@RequestBody ExperienceDTO dto){
        return new ResponseEntity<>(experienceService.addExperience(dto), HttpStatus.CREATED);
    }

    @PutMapping("/experience/{id}")
    public ResponseEntity<ExperienceDTO> updateExperience(@PathVariable Long id,
                                                          @RequestBody ExperienceDTO dto){
        return new ResponseEntity<>(experienceService.updateExperience(id, dto), HttpStatus.OK);
    }

    @DeleteMapping("/experience/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id){
        experienceService.deleteExperience(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/certifications")
    public ResponseEntity<List<CertificationDTO>> getCertifications(){
        return ResponseEntity.ok(certificationService.getCertifications());
    }

    @PostMapping("/certifications")
    public ResponseEntity<CertificationDTO> addCertification(@RequestBody CertificationDTO dto){
        return new ResponseEntity<>(certificationService.addCertification(dto), HttpStatus.CREATED);
    }

    @PutMapping("/certifications/{id}")
    public ResponseEntity<CertificationDTO> updateExperience(@PathVariable Long id,
                                                          @RequestBody CertificationDTO dto){
        return new ResponseEntity<>(certificationService.updateCertification(id, dto), HttpStatus.OK);
    }

    @DeleteMapping("/certifications/{id}")
    public ResponseEntity<Void> deleteCertification(@PathVariable Long id){
        certificationService.deleteCertification(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ApplicantTalentDTO>> getAllApplicants(){
        return ResponseEntity.ok(
                profileService.getAllApplicants()
        );
    }

    @GetMapping("/{id}/experience")
    public ResponseEntity<List<ExperienceDTO>> getApplicantExperiences(@PathVariable Long id){
        return ResponseEntity.ok(experienceService.getApplicantExperiences(id));
    }

    @GetMapping("/{id}/certifications")
    public ResponseEntity<List<CertificationDTO>> getApplicantCertifications(@PathVariable Long id){
        return ResponseEntity.ok(certificationService.getApplicantCertifications(id));
    }


}
