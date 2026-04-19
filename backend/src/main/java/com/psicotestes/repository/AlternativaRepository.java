package com.psicotestes.repository;

import com.psicotestes.model.Alternativa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlternativaRepository extends JpaRepository<Alternativa, Long> {

    // Essencial para carregar as opções de resposta de uma pergunta específica.
    // O 'OrderByIdAsc' garante que as alternativas venham sempre na sequência correta
    // em que foram inseridas no banco, mantendo o teste padronizado.
    List<Alternativa> findByPerguntaIdOrderByIdAsc(Long perguntaId);

}