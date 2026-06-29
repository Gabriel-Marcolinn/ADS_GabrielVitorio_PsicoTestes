package com.psicotestes.controller;

import com.psicotestes.dto.AplicacaoCompletaResponseDTO;
import com.psicotestes.dto.AplicacaoRequestDTO;
import com.psicotestes.dto.AplicacaoResponseDTO;
import com.psicotestes.dto.LaudoRequestDTO;
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

    // Visualizar histórico de aplicações de um psicologo específico
    @GetMapping("/psicologo/{psicologoId}")
    public ResponseEntity<List<AplicacaoResponseDTO>> listarPorPsicologo(@PathVariable Long psicologoId) {
        List<AplicacaoResponseDTO> aplicacoesPsicologo = aplicacaoTesteService.listarAplicacoesPorPsicologo(psicologoId);
        return ResponseEntity.ok(aplicacoesPsicologo);
    }

    // Visualizar histórico de aplicações de uma empresa, para listar pelo psicologo admin
    @GetMapping("/empresa/{empresaId}")
    public ResponseEntity<List<AplicacaoResponseDTO>> listarPorEmpresa(@PathVariable Long empresaId) {
        List<AplicacaoResponseDTO> aplicacoesEmpresa = aplicacaoTesteService.listarAplicacoesPorEmpresa(empresaId);
        return ResponseEntity.ok(aplicacoesEmpresa);
    }

    @GetMapping("/{AplicacaoId}")
    public ResponseEntity<AplicacaoCompletaResponseDTO> buscarAplicacaoCompleta(@PathVariable Long AplicacaoId) {
        return ResponseEntity.ok(aplicacaoTesteService.buscarAplicacaoCompletaDTO(AplicacaoId));
    }

    @PatchMapping("/{id}/laudo")
    public ResponseEntity<Void> adicionarLaudo(@PathVariable Long id, @RequestBody @Valid LaudoRequestDTO dto) {
        aplicacaoTesteService.salvarLaudo(id, dto.laudo());
        return ResponseEntity.noContent().build();
    }
}