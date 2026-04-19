package com.psicotestes.dto;

import com.psicotestes.model.Empresa;

// DTO de Saída (O que o Spring devolve para o React)
// Aqui sim nós devolvemos o ID gerado, e NÃO devolvemos a lista de usuários para evitar loop!
public record EmpresaResponseDTO(
        Long id,
        String razaoSocial,
        String cnpj
) {
    // Construtor prático para converter a Entidade no DTO rapidamente
    public EmpresaResponseDTO(Empresa empresa) {
        this(empresa.getId(), empresa.getRazaoSocial(), empresa.getCnpj());
    }
}