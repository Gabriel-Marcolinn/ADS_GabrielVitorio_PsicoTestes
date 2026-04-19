package com.psicotestes.repository;

import com.psicotestes.model.Pergunta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PerguntaRepository extends JpaRepository<Pergunta, Long> {

    // Essencial para carregar o formulário do teste quando o psicólogo iniciar uma aplicação (HU11/HU12)
    List<Pergunta> findByTesteId(Long testeId);

    // Garante que as perguntas venham sempre na ordem correta (ordem de inserção/ID),
    // evitando que o teste mude de estrutura a cada vez que for aberto.
    List<Pergunta> findByTesteIdOrderByIdAsc(Long testeId);

}