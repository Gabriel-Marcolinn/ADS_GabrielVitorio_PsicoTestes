package com.psicotestes.dto;

import java.util.List;

public record DashboardPsicologoResponseDTO(
        KpisPsicologo kpis,
        List<TesteFrequencia> testesPorInstrumento
) {

    // Os Cards Superiores
    public record KpisPsicologo(
            long pacientesCadastrados,
            long testesAplicados
    ) {}

    // O Gráfico de Frequência
    public record TesteFrequencia(
            String nomeTeste,
            long quantidade
    ) {}
}