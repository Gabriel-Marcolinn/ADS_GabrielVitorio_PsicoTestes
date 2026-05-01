package com.psicotestes.repository;

import com.psicotestes.model.Teste;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TesteRepository extends JpaRepository<Teste, Long> {

    //Retorna a lista de testes ordenados para a tela inicial
    List<Teste> findAllByOrderByNomeAsc();

    // Evita o erro de N+1. Com essa anotação, o Hibernate faz um JOIN automático
    // e traz a árvore completa (Teste -> Perguntas -> Alternativas)
    // Isso faz o Postgres fazer apenas uma consulta ao banco, e não N+1 consultas
    @EntityGraph(attributePaths = {"perguntas", "perguntas.alternativas"})
    Optional<Teste> findById(Long id);
}