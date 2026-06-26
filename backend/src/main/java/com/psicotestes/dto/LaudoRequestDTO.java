package com.psicotestes.dto;

import jakarta.validation.constraints.NotBlank;

public record LaudoRequestDTO(
        @NotBlank(message = "O texto do laudo não pode estar vazio.")
        String laudo
) {}