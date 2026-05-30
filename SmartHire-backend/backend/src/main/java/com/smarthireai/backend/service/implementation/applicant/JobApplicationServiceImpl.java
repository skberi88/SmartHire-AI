package com.smarthireai.backend.service.implementation.applicant;

import com.smarthireai.backend.dto.applicant.ApplicantPreviewDTO;
import com.smarthireai.backend.dto.applicant.JobApplicationResponseDTO;
import com.smarthireai.backend.enums.ApplicationStatus;
import com.smarthireai.backend.model.applicant.JobApplication;
import com.smarthireai.backend.model.auth.User;
import com.smarthireai.backend.model.employer.Job;
import com.smarthireai.backend.repository.applicant.JobApplicationRepo;
import com.smarthireai.backend.repository.auth.UserRepo;
import com.smarthireai.backend.repository.employer.JobRepo;
import com.smarthireai.backend.service.applicant.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JobApplicationRepo applicationRepo;

    @Autowired
    private JobRepo jobRepo;

    @Override
    public JobApplication applyJob(Long jobId,String name, String email, String phone, String coverLetter, MultipartFile resume) throws IOException {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User applicant = userRepo.findUserByEmail(userEmail).orElseThrow(()->new RuntimeException("Applicant not found"));
        Job job = jobRepo.findById(jobId).orElseThrow(()-> new RuntimeException("Job Not Found"));
        if(applicationRepo.existsByApplicantAndJob(applicant,job)){
            throw new RuntimeException("Already Applied");
        }
        if(resume.isEmpty()){
            throw new RuntimeException("Resume Required");
        }
        //create file
        String fileName = resume.getOriginalFilename();
        if(fileName == null ||
                !(fileName.endsWith(".pdf") || fileName.endsWith(".doc") || fileName.endsWith(".docx")))
        {
            throw new RuntimeException("Invalid File Type");
        }

        String uniqueFileName = UUID.randomUUID() + "_" + fileName;

        //upload file
        Path uploadPath = Paths.get("uploads/resumes");
        if(!Files.exists(uploadPath)){
            Files.createDirectories(uploadPath);
        }

        // save file
        Files.copy(resume.getInputStream(),
                uploadPath.resolve(uniqueFileName),
                StandardCopyOption.REPLACE_EXISTING);

        JobApplication application = JobApplication.builder()
                .applicant(applicant)
                .job(job)
                .name(name)
                .email(email)
                .phone(phone)
                .coverLetter(coverLetter)
                .resumeUrl("uploads/resumes/" + uniqueFileName)
                .appliedAt(LocalDateTime.now())
                .status(ApplicationStatus.APPLIED)
                .build();

        return applicationRepo.save(application);
    }

    @Override
    public List<JobApplicationResponseDTO> viewAllAppliedJobs() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User applicant = userRepo.findUserByEmail(email).orElseThrow(()->new RuntimeException("Applicant not found"));
        List<JobApplication> applications = applicationRepo.findByApplicant(applicant);
        return applications.stream().map(application -> 
                JobApplicationResponseDTO.builder()
                        .applicationId(application.getId())
                        .jobId(application.getJob().getId())
                        .jobTitle(application.getJob().getTitle())
                        .description(application.getJob().getDescription())
                        .requirements(application.getJob().getRequirements())
                        .company(application.getJob().getCompany())
                        .location(application.getJob().getLocation())
                        .minSalary(application.getJob().getMinSalary())
                        .maxSalary(application.getJob().getMaxSalary())
                        .applicantName(application.getApplicant().getName())
                        .applicantEmail(application.getApplicant().getEmail())
                        .coverLetter(application.getCoverLetter())
                        .phone(application.getPhone())
                        .resumeUrl(application.getResumeUrl())
                        .appliedAt(application.getAppliedAt())
                        .status(application.getStatus())
                        .build())
                .toList();
    }

    @Override
    public void withdrawApplication(Long applicationId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User applicant = userRepo.findUserByEmail(email).orElseThrow(() -> new RuntimeException("Applicant Not Found"));
        JobApplication application = applicationRepo.findById(applicationId).orElseThrow();

        if(!application.getApplicant().getId().equals(applicant.getId())){
            throw new RuntimeException("Unauthorized");
        }
        application.setStatus(ApplicationStatus.WITHDRAWN);
        applicationRepo.save(application);

    }

    public void updateStatus(Long applicationId, ApplicationStatus status) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User employer = userRepo.findUserByEmail(email).orElseThrow();
        JobApplication application = applicationRepo.findById(applicationId).orElseThrow();
        if(!application.getJob().getEmployer().getId().equals(employer.getId())){
            throw new RuntimeException("Unauthorized");
        }

        application.setStatus(status);
        applicationRepo.save(application);
    }

    @Override
    public List<ApplicantPreviewDTO> getApplicantsForJob(Long jobId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User employer = userRepo.findUserByEmail(email).orElseThrow();
        Job job = jobRepo.findById(jobId).orElseThrow();

        if(!job.getEmployer().getId().equals(employer.getId())){
            throw  new RuntimeException("Unauthorized");
        }

        List<JobApplication> applications = applicationRepo.findByJob(job);

        return applications.stream()
                .map(application -> ApplicantPreviewDTO.builder()
                        .applicationId(application.getId())
                        .applicantId(application.getApplicant().getId())
                        .applicantName(application.getApplicant().getName())
                        .applicantEmail(application.getApplicant().getEmail())
                        .phone(application.getPhone())
                        .resumeUrl(application.getResumeUrl())
                        .coverLetter(application.getCoverLetter())
                        .status(application.getStatus())
                        .appliedAt(application.getAppliedAt())
                        .build())
                .toList();
    }

    @Override
    public void reapplyApplication(Long applicationId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findUserByEmail(email).orElseThrow();

        JobApplication application = applicationRepo.findById(applicationId).orElseThrow();
        // SECURITY CHECK
        if (!application.getApplicant().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        application.setStatus(ApplicationStatus.APPLIED);
        applicationRepo.save(application);
    }
}
