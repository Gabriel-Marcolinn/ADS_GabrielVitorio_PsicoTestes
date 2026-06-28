package com.psicotestes.controller;

import com.psicotestes.dto.PacienteRequestDTO;
import com.psicotestes.dto.PacienteResponseDTO;
import com.psicotestes.service.PacienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@RequiredArgsConstructor
public class PacienteController {

    private final PacienteService pacienteService;

    // POST /api/pacientes -> Cadastrar novo paciente
    @PostMapping
    public ResponseEntity<PacienteResponseDTO> cadastrar(@RequestBody @Valid PacienteRequestDTO dto) {
        PacienteResponseDTO pacienteCriado = pacienteService.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(pacienteCriado);
    }

    // GET /api/pacientes?psicologoId=1&ativo=true -> Listar pacientes (Aba de Ativos ou Inativos)
    @GetMapping
    public ResponseEntity<List<PacienteResponseDTO>> listarPorPsicologo(
            @RequestParam Long psicologoId,
            @RequestParam(defaultValue = "true") Boolean ativo) {

        List<PacienteResponseDTO> pacientes = pacienteService.listarPorPsicologo(psicologoId, ativo);
        return ResponseEntity.ok(pacientes);
    }


    @GetMapping("/empresa")
    public ResponseEntity<List<PacienteResponseDTO>> listarPorEmpresa(
            @RequestParam Long empresaId,
            @RequestParam (defaultValue = "true") Boolean ativo) {
        return ResponseEntity.ok(pacienteService.listarPorEmpresaIdAndAtivo(empresaId, ativo));
    }

    // PUT /api/pacientes/{id} -> Atualizar dados cadastrais
    @PutMapping("/{id}")
    public ResponseEntity<PacienteResponseDTO> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid PacienteRequestDTO dto) {

        PacienteResponseDTO pacienteAtualizado = pacienteService.atualizar(id, dto);
        return ResponseEntity.ok(pacienteAtualizado);
    }

    // PATCH /api/pacientes/{id}/status -> Ativar/Inativar
    @PatchMapping("/{id}/status")
    public ResponseEntity<PacienteResponseDTO> alternarStatus(@PathVariable Long id) {
        PacienteResponseDTO paciente = pacienteService.alternarStatus(id);
        return ResponseEntity.ok(paciente);
    }

    // DELETE /api/pacientes/{id} -> Excluir (Soft Delete, some do sistema)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        pacienteService.remover(id);
        return ResponseEntity.noContent().build();
    }
}