package com.psicotestes.repository;

import com.psicotestes.model.Teste;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TesteRepository extends JpaRepository<Teste, Long> {

    // Para buscar um teste específico pelo seu nome exato (útil em validações internas)
    Optional<Teste> findByNome(String nome);

    // Para permitir que o psicólogo pesquise por um teste específico na tela de aplicação (HU06)
    List<Teste> findByNomeContainingIgnoreCase(String nome);

    // Bônus: Para exibir a lista de testes ordenados em ordem alfabética no frontend,
    // facilitando a visualização para o psicólogo
    List<Teste> findAllByOrderByNomeAsc();

}