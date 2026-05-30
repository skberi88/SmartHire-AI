package com.smarthireai.backend.service.implementation.employer;

import com.smarthireai.backend.dto.employer.EmployerJobDTO;
import com.smarthireai.backend.dto.employer.JobDTO;
import com.smarthireai.backend.model.auth.User;
import com.smarthireai.backend.model.employer.Job;
import com.smarthireai.backend.repository.applicant.JobApplicationRepo;
import com.smarthireai.backend.repository.auth.UserRepo;
import com.smarthireai.backend.repository.employer.JobRepo;
import com.smarthireai.backend.service.employer.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobServiceImpl implements JobService {
    @Autowired
    JobRepo jobRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    JobApplicationRepo applicationRepo;

    @Override
    public JobDTO postJob(JobDTO jobDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User employer = userRepo.findUserByEmail(email).orElseThrow(
                ()->new RuntimeException("User Not Found"));

        Job job = Job.builder()
                .title(jobDTO.getTitle())
                .company(jobDTO.getCompany())
                .location(jobDTO.getLocation())
                .minSalary(jobDTO.getMinSalary())
                .maxSalary(jobDTO.getMaxSalary())
                .experienceLevel(jobDTO.getExperienceLevel())
                .employmentType(jobDTO.getEmploymentType())
                .workMode(jobDTO.getWorkMode())
                .description(jobDTO.getDescription())
                .requirements(jobDTO.getRequirements())
                .skillsRequired(jobDTO.getSkillsRequired())
                .postedAt(LocalDateTime.now())
                .active(true)
                .employer(employer)
                .build();

        Job savedJob = jobRepo.save(job);

        return JobDTO.builder()
                .id(savedJob.getId())
                .title(savedJob.getTitle())
                .company(savedJob.getCompany())
                .location(savedJob.getLocation())
                .minSalary(savedJob.getMinSalary())
                .maxSalary(savedJob.getMaxSalary())
                .experienceLevel(savedJob.getExperienceLevel())
                .employmentType(savedJob.getEmploymentType())
                .workMode(savedJob.getWorkMode())
                .description(savedJob.getDescription())
                .requirements(savedJob.getRequirements())
                .skillsRequired(savedJob.getSkillsRequired())
                .active(savedJob.getActive())
                .noOfApplicants(0)
                .postedAt(savedJob.getPostedAt())
                .build();
    }

    @Override
    public List<JobDTO> getAllJobs() {
        List<Job> jobs = jobRepo.findByActiveTrue();
        return jobs.stream()
                .filter(Job::getActive)
                .map(job -> JobDTO.builder()
                        .id(job.getId())
                        .title(job.getTitle())
                        .company(job.getCompany())
                        .location(job.getLocation())
                        .minSalary(job.getMinSalary())
                        .maxSalary(job.getMaxSalary())
                        .experienceLevel(job.getExperienceLevel())
                        .employmentType(job.getEmploymentType())
                        .workMode(job.getWorkMode())
                        .description(job.getDescription())
                        .requirements(job.getRequirements())
                        .skillsRequired(job.getSkillsRequired())
                        .active(job.getActive())
                        .noOfApplicants(applicationRepo.countByJob(job))
                        .postedAt(job.getPostedAt())
                        .build()
                )
                .toList();
    }

    @Override
    public JobDTO getJobById(Long id) {
        Job job = jobRepo.findById(id).orElseThrow(() -> new RuntimeException("Job Not Found"));
        return JobDTO.builder()
                .id(job.getId())
                .title(job.getTitle())
                .company(job.getCompany())
                .location(job.getLocation())
                .minSalary(job.getMinSalary())
                .maxSalary(job.getMaxSalary())
                .experienceLevel(job.getExperienceLevel())
                .employmentType(job.getEmploymentType())
                .workMode(job.getWorkMode())
                .description(job.getDescription())
                .requirements(job.getRequirements())
                .skillsRequired(job.getSkillsRequired())
                .postedAt(job.getPostedAt())
                .build();
    }

    @Override
    public List<JobDTO> getEmployerJobs() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User employer = userRepo.findUserByEmail(email).orElseThrow();
        List<Job> jobs = jobRepo.findByEmployer(employer);
        return jobs.stream()
                .map(job -> JobDTO.builder()
                        .id(job.getId())
                        .title(job.getTitle())
                        .company(job.getCompany())
                        .location(job.getLocation())
                        .minSalary(job.getMinSalary())
                        .maxSalary(job.getMaxSalary())
                        .experienceLevel(job.getExperienceLevel())
                        .employmentType(job.getEmploymentType())
                        .workMode(job.getWorkMode())
                        .description(job.getDescription())
                        .requirements(job.getRequirements())
                        .skillsRequired(job.getSkillsRequired())
                        .active(job.getActive())
                        .noOfApplicants(applicationRepo.countByJob(job))
                        .postedAt(job.getPostedAt())
                        .build())
                .toList();
    }

    @Override
    public void closeJob(Long jobId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User employer = userRepo.findUserByEmail(email).orElseThrow();
        Job job = jobRepo.findById(jobId).orElseThrow();

        if(!job.getEmployer().getId().equals(employer.getId())){
            throw new RuntimeException("Unauthorized");
        }
        job.setActive(false);
        jobRepo.save(job);
    }

    @Override
    public JobDTO editJob(Long jobId, JobDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User employer = userRepo.findUserByEmail(email).orElseThrow();
        Job job = jobRepo.findById(jobId).orElseThrow();

        if(!job.getEmployer().getId().equals(employer.getId())){
            throw new RuntimeException("Unauthorized");
        }

        job.setTitle(dto.getTitle());
        job.setCompany(dto.getCompany());
        job.setLocation(dto.getLocation());
        job.setMinSalary(dto.getMinSalary());
        job.setMaxSalary(dto.getMaxSalary());
        job.setExperienceLevel(dto.getExperienceLevel());
        job.setEmploymentType(dto.getEmploymentType());
        job.setWorkMode(dto.getWorkMode());
        job.setDescription(dto.getDescription());
        job.setRequirements(dto.getRequirements());
        job.setSkillsRequired(dto.getSkillsRequired());

        Job updatedJob = jobRepo.save(job);

        return JobDTO.builder()
                .id(updatedJob.getId())
                .title(updatedJob.getTitle())
                .company(updatedJob.getCompany())
                .location(updatedJob.getLocation())
                .minSalary(updatedJob.getMinSalary())
                .maxSalary(updatedJob.getMaxSalary())
                .experienceLevel(updatedJob.getExperienceLevel())
                .employmentType(updatedJob.getEmploymentType())
                .workMode(updatedJob.getWorkMode())
                .description(updatedJob.getDescription())
                .requirements(updatedJob.getRequirements())
                .skillsRequired(updatedJob.getSkillsRequired())
                .build();
    }

    @Override
    public void reopenJob(Long jobId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User employer = userRepo.findUserByEmail(email).orElseThrow();
        Job job = jobRepo.findById(jobId).orElseThrow();

        if(!job.getEmployer().getId().equals(employer.getId())){
            throw new RuntimeException("Unauthorized");
        }
        job.setActive(true);
        jobRepo.save(job);
    }
}
