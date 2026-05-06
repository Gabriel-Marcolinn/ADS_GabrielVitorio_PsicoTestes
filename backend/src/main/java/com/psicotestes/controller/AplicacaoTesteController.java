package com.psicotestes.controller;

import com.psicotestes.dto.AplicacaoRequestDTO;
import com.psicotestes.dto.AplicacaoResponseDTO;
import com.psicotestes.service.AplicacaoTesteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/aplicacoes")
@RequiredArgsConstructor
public class AplicacaoTesteController {

    private final AplicacaoTesteService aplicacaoTesteService;

    @PostMapping
    public ResponseEntity<AplicacaoResponseDTO> aplicarTeste(
            @RequestBody @Valid AplicacaoRequestDTO dto,
            // TODO: Substituir por @AuthenticationPrincipal quando implementar Spring Security
            @RequestHeader("Usuario-Id") Long usuarioLogadoId
    ) {

        AplicacaoResponseDTO response = aplicacaoTesteService.aplicarTeste(dto, usuarioLogadoId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Visualizar histórico de aplicações de um paciente específico
    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<AplicacaoResponseDTO>> listarPorPaciente(@PathVariable Long pacienteId) {
        List<AplicacaoResponseDTO> historico = aplicacaoTesteService.listarAplicacoesPorPaciente(pacienteId);
        return ResponseEntity.ok(historico);
    }
}