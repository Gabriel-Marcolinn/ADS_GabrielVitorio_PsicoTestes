package com.psicotestes.dto;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import java.util.List;
import java.util.Map;

// O Record "Pai"
public record DashboardPsicologoAdminResponseDTO(
        KpisGestor kpis,
        List<DesempenhoPsicologo> desempenhoEquipe,
        List<AtividadeMensalPivot> atividadeMensal
) {

    // Os Cards Superiores
    public record KpisGestor(
            long psicologosEquipe,
            long pacientesAtivos,
            long testesRealizados
    ) {}

    // Gráficos de Desempenho e Ranking
    public record DesempenhoPsicologo(
            String nomePsicologo,
            long testesAplicados,
            long pacientesAtendidos
    ) {}

    // Gráfico Mensal
    public record AtividadeMensalPivot(
            String mes,
            @JsonAnyGetter Map<String, Long> quantidadesPorPsicologo
    ) {}

    // O DTO invisível usado apenas para trazer os dados planos do banco
    public record AtividadeMensalFlat(
            Integer mes,
            String nomePsicologo,
            long quantidade
    ) {}
}