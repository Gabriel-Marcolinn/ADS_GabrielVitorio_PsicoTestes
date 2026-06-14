package com.psicotestes.dto;

import java.time.LocalDateTime;
import java.util.List;

public record AplicacaoCompletaResponseDTO(
        Long id,
        LocalDateTime data,
        String nomePaciente,
        String nomeTeste,
        List<RespostaDTO> respostas
) {

    // Outros records aninhados nesse, que são acessórios da Aplicação Completa
    public record RespostaDTO(
            Long id,
            String descricaoPergunta,
            AlternativaDTO alternativaMarcada
    ) {}

    public record AlternativaDTO(
            Long id,
            String descricao,
            Double pontuacao
    ) {}
}