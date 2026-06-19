package com.psicotestes.dto;

import java.time.LocalDateTime;

public record AplicacaoResponseDTO(
        Long id,
        Long pacienteId,
        String nomePaciente,
        Long testeId,
        String nomeTeste,
        Double pontuacaoTotal,
        String classificacao,
        LocalDateTime dataAplicacao,
        String analiseIa
) {}