package com.psicotestes.dto;

import java.util.List;

public record TesteCompletoDTO(
        Long id,
        String nome,
        List<PerguntaDTO> perguntas
) {}