package com.psicotestes.controller;

import com.psicotestes.dto.TesteCompletoDTO;
import com.psicotestes.dto.TesteResumoDTO;
import com.psicotestes.service.TesteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testes")
@RequiredArgsConstructor
public class TesteController {

    private final TesteService testeService;

    // GET /api/testes -> Lista os testes (Resumo)
    @GetMapping
    public ResponseEntity<List<TesteResumoDTO>> listar() {
        return ResponseEntity.ok(testeService.listarTestesDisponiveis());
    }

    // GET /api/testes/{id} -> Traz o formulário completo do Teste
    @GetMapping("/{id}")
    public ResponseEntity<TesteCompletoDTO> buscarCompleto(@PathVariable Long id) {
        return ResponseEntity.ok(testeService.buscarTesteCompleto(id));
    }
}