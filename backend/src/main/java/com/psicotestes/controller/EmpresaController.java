package com.psicotestes.controller;

import com.psicotestes.dto.EmpresaRequestDTO;
import com.psicotestes.dto.EmpresaResponseDTO;
import com.psicotestes.service.EmpresaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
@RequiredArgsConstructor
public class EmpresaController {

    private final EmpresaService empresaService;

    // POST /api/empresas -> Cadastrar uma nova clínica
    @PostMapping
    public ResponseEntity<EmpresaResponseDTO> cadastrar(@RequestBody @Valid EmpresaRequestDTO dto) {
        EmpresaResponseDTO empresaCriada = empresaService.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(empresaCriada);
    }

    // GET /api/empresas -> Listar todas as clínicas
    @GetMapping
    public ResponseEntity<List<EmpresaResponseDTO>> listarTodas() {
        List<EmpresaResponseDTO> empresas = empresaService.listarTodas();

        return ResponseEntity.ok(empresas);
    }

    // GET /api/empresas/{id} -> Buscar uma clínica específica pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<EmpresaResponseDTO> buscarPorId(@PathVariable Long id) {
        EmpresaResponseDTO empresa = empresaService.buscarPorId(id);
        return ResponseEntity.ok(empresa);
    }

    // PUT /api/empresas/{id} -> Atualizar os dados de uma clínica existente
    @PutMapping("/{id}")
    public ResponseEntity<EmpresaResponseDTO> atualizar(@PathVariable Long id, @RequestBody @Valid EmpresaRequestDTO dto) {
        EmpresaResponseDTO empresaAtualizada = empresaService.atualizar(id, dto);

        return ResponseEntity.ok(empresaAtualizada);
    }

    // DELETE /api/empresas/{id} -> Soft Delete transparente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        empresaService.remover(id);
        return ResponseEntity.noContent().build();
    }

    // PATCH /api/empresas/{id}/status -> Altera entre ativo/inativo
    @PatchMapping("/{id}/status")
    public ResponseEntity<EmpresaResponseDTO> alternarStatus(@PathVariable Long id) {
        EmpresaResponseDTO empresa = empresaService.alternarStatus(id);
        return ResponseEntity.ok(empresa);
    }
}