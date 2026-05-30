package com.smarthireai.backend.service.employer;

import com.smarthireai.backend.dto.employer.EmployerJobDTO;
import com.smarthireai.backend.dto.employer.JobDTO;

import java.util.List;

public interface JobService {
    JobDTO postJob(JobDTO jobDTO);

    List<JobDTO> getAllJobs();
    JobDTO getJobById(Long id);

    List<JobDTO> getEmployerJobs();

    void closeJob(Long jobId);

    JobDTO editJob(Long jobId, JobDTO dto);

    void reopenJob(Long jobId);
}
