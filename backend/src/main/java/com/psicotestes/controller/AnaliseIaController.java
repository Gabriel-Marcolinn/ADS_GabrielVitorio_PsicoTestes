package com.psicotestes.controller;

import com.psicotestes.model.AplicacaoTeste;
import com.psicotestes.model.Paciente;
import com.psicotestes.service.AplicacaoTesteService;
import com.psicotestes.service.GeminiService;
import com.psicotestes.service.PacienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ia")
@RequiredArgsConstructor
public class AnaliseIaController {

    private final GeminiService geminiService;
    private final AplicacaoTesteService aplicacaoTesteService;
    private final PacienteService pacienteService;

    // Gerar Análise de Teste com IA
    @GetMapping("/teste/{aplicacaoId}")
    public ResponseEntity<Map<String, String>> analisarTesteUnico(@PathVariable Long aplicacaoId) {
        AplicacaoTeste aplicacao = aplicacaoTesteService.buscarAplicacaoCompleta(aplicacaoId);
        String analise = geminiService.gerarAnaliseTesteUnico(aplicacao);

        return ResponseEntity.ok(Map.of("analise", analise));
    }

    // Gerar Análise de Paciente com IA
    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<Map<String, String>> analisarHistoricoPaciente(@PathVariable Long pacienteId) {
        Paciente paciente = pacienteService.buscarPorId(pacienteId);

        List<AplicacaoTeste> aplicacoes = aplicacaoTesteService.listarAplicacoesPorPacienteEntity(pacienteId);
        String analise = geminiService.gerarAnaliseHistoricoPaciente(paciente, aplicacoes);

        return ResponseEntity.ok(Map.of("analise", analise));
    }
}