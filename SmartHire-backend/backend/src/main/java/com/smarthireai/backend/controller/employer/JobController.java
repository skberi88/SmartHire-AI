package com.smarthireai.backend.controller.employer;

import com.smarthireai.backend.dto.employer.EmployerJobDTO;
import com.smarthireai.backend.dto.employer.JobDTO;
import com.smarthireai.backend.service.employer.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin
public class JobController {
    @Autowired
    private JobService jobService;

    @GetMapping
    public ResponseEntity<List<JobDTO>> getAllJobs(){
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJobById(@PathVariable Long id){
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PostMapping
    public ResponseEntity<JobDTO> postJob(@RequestBody JobDTO jobDTO){
        JobDTO postedJob = jobService.postJob(jobDTO);
        return new ResponseEntity<>(postedJob,HttpStatus.CREATED);
    }

    @GetMapping("/employer")
    public ResponseEntity<List<JobDTO>> getEmployerJobs(){
        return ResponseEntity.ok(jobService.getEmployerJobs());
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<JobDTO> editJob(@PathVariable Long jobId,
                                          @RequestBody JobDTO dto){
        return ResponseEntity.ok(jobService.editJob(jobId, dto));
    }

    @PutMapping("/{jobId}/close")
    public ResponseEntity<String> closeJob(@PathVariable Long jobId){
        jobService.closeJob(jobId);
        return ResponseEntity.ok("Job Closed Successfully");
    }
    @PutMapping("/{jobId}/reopen")
    public ResponseEntity<String> reopenJob(@PathVariable Long jobId){
        jobService.reopenJob(jobId);
        return ResponseEntity.ok("Job Reopened Successfully");
    }


}
