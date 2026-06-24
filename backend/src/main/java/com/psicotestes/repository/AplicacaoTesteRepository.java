package com.psicotestes.repository;

import com.psicotestes.model.AplicacaoTeste;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AplicacaoTesteRepository extends JpaRepository<AplicacaoTeste, Long> {

    // Usado pelo psicólogo para visualizar o histórico
    List<AplicacaoTeste> findByPacienteIdOrderByDataAplicacaoDesc(Long pacienteId);

    // Usado para listar a lista de aplicações por psicólogo
    List<AplicacaoTeste> findByUsuarioIdOrderByDataAplicacaoDesc(Long psicologoId);

    // Busca uma aplicação específica já trazendo as respostas aninhadas.
    // O @EntityGraph evita o problema do N+1 Queries na hora de gerar o PDF com os resultados.
    @EntityGraph(attributePaths = {"respostas", "respostas.alternativa"})
    Optional<AplicacaoTeste> findById(Long id);
}