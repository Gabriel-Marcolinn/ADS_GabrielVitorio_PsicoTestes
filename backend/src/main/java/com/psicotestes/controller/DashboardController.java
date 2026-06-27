package com.psicotestes.controller;

import com.psicotestes.dto.DashboardAdminResponseDTO;
import com.psicotestes.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/admin")
    public ResponseEntity<DashboardAdminResponseDTO> obterDashboardAdmin() {
        DashboardAdminResponseDTO dashboard = dashboardService.montarDashboardAdmin();
        return ResponseEntity.ok(dashboard);
    }
}