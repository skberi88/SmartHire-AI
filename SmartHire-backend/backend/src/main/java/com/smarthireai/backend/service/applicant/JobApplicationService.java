package com.smarthireai.backend.service.applicant;

import com.smarthireai.backend.dto.applicant.ApplicantPreviewDTO;
import com.smarthireai.backend.dto.applicant.JobApplicationResponseDTO;
import com.smarthireai.backend.enums.ApplicationStatus;
import com.smarthireai.backend.model.applicant.JobApplication;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface JobApplicationService {
    JobApplication applyJob(Long jobId,String name, String email, String phone, String coverLetter, MultipartFile resume) throws IOException;
    List<JobApplicationResponseDTO> viewAllAppliedJobs();
    void withdrawApplication(Long applicationId);
    void updateStatus(Long applicationId, ApplicationStatus status);

    List<ApplicantPreviewDTO> getApplicantsForJob(Long jobId);

    void reapplyApplication(Long applicationId);
}
