package com.psicotestes.dto;

import java.util.List;

public record PerguntaDTO(
        Long id,
        String pergunta,
        List<AlternativaDTO> alternativas
) {}