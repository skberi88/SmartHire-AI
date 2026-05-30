package com.smarthireai.backend.controller.admin;

import com.smarthireai.backend.dto.admin.AdminJobDTO;
import com.smarthireai.backend.service.employer.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private JobService jobService;

    @GetMapping("/jobs")
    public ResponseEntity<List<AdminJobDTO>> getAllJobsForAdmin() {
        return ResponseEntity.ok(
                jobService.getAllJobsForAdmin()
        );
    }
}
