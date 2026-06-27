package com.psicotestes.dto;

import com.fasterxml.jackson.annotation.JsonAnyGetter;

import java.util.List;
import java.util.Map;

// O Record "Pai"
public record DashboardAdminResponseDTO(
        KpisAdmin kpis,
        List<TestesPorEmpresaPivot> distribuicaoTestes,
        List<DesempenhoEmpresa> desempenhoEmpresas
) {

    // 1. Os Cards Superiores
    public record KpisAdmin(
            long totalEmpresas,
            long psicologosAtivos,
            long testesAplicados
    ) {}

    // 2. Teste X Empresa
    public record TestesPorEmpresa(
            String nomeEmpresa,
            String nomeTeste,
            long quantidadeAplicada
    ) {}

    public record TestesPorEmpresaPivot(
            String nomeEmpresa,
            @JsonAnyGetter Map<String, Long> quantidades
    ) {}

    // 3. O Gráfico de Barras e o Ranking de Volume
    public record DesempenhoEmpresa(
            String nomeEmpresa,
            long testesAplicados,
            long pacientesAtendidos
    ) {}
}