package com.psicotestes.service;

import com.psicotestes.dto.AlternativaDTO;
import com.psicotestes.dto.PerguntaDTO;
import com.psicotestes.dto.TesteCompletoDTO;
import com.psicotestes.dto.TesteResumoDTO;
import com.psicotestes.model.Teste;
import com.psicotestes.repository.TesteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TesteService {

    private final TesteRepository testeRepository;

    // Retorna apenas ID e Nome para montar os Cards ou Tabela no React
    @Transactional(readOnly = true)
    public List<TesteResumoDTO> listarTestesDisponiveis() {
        return testeRepository.findAllByOrderByNomeAsc().stream()
                .map(teste -> new TesteResumoDTO(teste.getId(), teste.getNome()))
                .toList();
    }

    // Retorna a árvore completa para a tela de Aplicação de Teste
    @Transactional(readOnly = true)
    public TesteCompletoDTO buscarTesteCompleto(Long id) {
        Teste teste = testeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teste não encontrado."));

        // Mapeia a Entidade para os DTOs aninhados
        List<PerguntaDTO> perguntasDTO = teste.getPerguntas().stream().map(p -> {
            List<AlternativaDTO> alternativasDTO = p.getAlternativas().stream()
                    .map(a -> new AlternativaDTO(a.getId(), a.getAlternativa(), a.getPontuacao()))
                    .toList();
            return new PerguntaDTO(p.getId(), p.getPergunta(), alternativasDTO);
        }).toList();

        return new TesteCompletoDTO(teste.getId(), teste.getNome(), perguntasDTO);
    }
}