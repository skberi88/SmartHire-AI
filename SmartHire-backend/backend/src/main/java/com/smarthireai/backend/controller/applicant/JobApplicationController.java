package com.smarthireai.backend.controller.applicant;

import com.smarthireai.backend.dto.applicant.ApplicantPreviewDTO;
import com.smarthireai.backend.dto.applicant.JobApplicationResponseDTO;
import com.smarthireai.backend.enums.ApplicationStatus;
import com.smarthireai.backend.model.applicant.JobApplication;
import com.smarthireai.backend.service.implementation.applicant.JobApplicationServiceImpl;
import jakarta.servlet.annotation.MultipartConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/applications")
public class JobApplicationController {
    @Autowired
    private JobApplicationServiceImpl service;

    @GetMapping("/my")
    public ResponseEntity<List<JobApplicationResponseDTO>> getAllAppliedJobs(){
        return ResponseEntity.ok(service.viewAllAppliedJobs());
    }

    @PostMapping(value = "/{jobId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<JobApplication> applyJob(@PathVariable Long jobId,
                                                   @RequestParam String name,
                                                   @RequestParam String email,
                                                   @RequestParam String phone,
                                                   @RequestParam String coverLetter,
                                                   @RequestParam MultipartFile resume
                                                   ) throws IOException {
        JobApplication application = service.applyJob(jobId,name,email,phone,coverLetter,resume);
        return new ResponseEntity<>(application, HttpStatus.CREATED);
    }

    @DeleteMapping("/{applicationId}")
    public ResponseEntity<String> withdrawApplication(@PathVariable Long applicationId){
        service.withdrawApplication(applicationId);
        return ResponseEntity.ok("Application Withdrawn Successfully");
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long applicationId,
                                          @RequestParam ApplicationStatus status){
        service.updateStatus(applicationId,status);
        return ResponseEntity.ok("Status Updated");
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicantPreviewDTO>> getApplicantsForJob(@PathVariable Long jobId){
        return ResponseEntity.ok(service.getApplicantsForJob(jobId));
    }

    @PutMapping("/{applicationId}/reapply")
    public ResponseEntity<?> reapplyApplication(@PathVariable Long applicationId) {
        service.reapplyApplication(applicationId);
        return ResponseEntity.ok("Application reapplied successfully");
    }
}
