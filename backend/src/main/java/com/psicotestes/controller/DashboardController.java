package com.psicotestes.controller;

import com.psicotestes.dto.DashboardAdminResponseDTO;
import com.psicotestes.dto.DashboardPsicologoAdminResponseDTO;
import com.psicotestes.dto.DashboardPsicologoResponseDTO;
import com.psicotestes.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/psicologoadmin/{empresaId}")
    public ResponseEntity<DashboardPsicologoAdminResponseDTO> obterDashboardPsicologoAdmin(@PathVariable Long empresaId) {
        DashboardPsicologoAdminResponseDTO dashboard = dashboardService.montarDashboardPsicologoAdmin(empresaId);
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/psicologo")
    public ResponseEntity<DashboardPsicologoResponseDTO> obterDashboardPsicologo(
            @RequestHeader("usuarioId") Long usuarioLogadoId
    ) {
        DashboardPsicologoResponseDTO dashboard = dashboardService.montarDashboardPsicologo(usuarioLogadoId);
        return ResponseEntity.ok(dashboard);
    }
}