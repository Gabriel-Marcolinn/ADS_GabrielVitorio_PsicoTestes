package com.psicotestes.service;

import com.psicotestes.dto.AplicacaoCompletaResponseDTO;
import com.psicotestes.dto.AplicacaoRequestDTO;
import com.psicotestes.dto.AplicacaoResponseDTO;
import com.psicotestes.model.Alternativa;
import com.psicotestes.model.AplicacaoTeste;
import com.psicotestes.model.Paciente;
import com.psicotestes.model.Teste;
import com.psicotestes.model.Usuario;
import com.psicotestes.repository.AplicacaoTesteRepository;
import com.psicotestes.repository.PacienteRepository;
import com.psicotestes.repository.TesteRepository;
import com.psicotestes.repository.UsuarioRepository;
import com.psicotestes.strategy.CalculadoraFactory;
import com.psicotestes.strategy.CalculadoraTesteStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AplicacaoTesteService {

    private final AplicacaoTesteRepository aplicacaoTesteRepository;
    private final PacienteRepository pacienteRepository;
    private final TesteRepository testeRepository;
    private final UsuarioRepository usuarioRepository;

    private final CalculadoraFactory calculadoraFactory;

    @Transactional
    public AplicacaoResponseDTO aplicarTeste(AplicacaoRequestDTO dto, Long usuarioLogadoId) {

        Paciente paciente = pacienteRepository.findById(dto.pacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado."));

        // Já traz teste, pergunta e alternativas
        Teste teste = testeRepository.findById(dto.testeId())
                .orElseThrow(() -> new RuntimeException("Teste não encontrado."));

        Usuario psicologo = usuarioRepository.findById(usuarioLogadoId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        // Valida se todas as perguntas foram respondidas
        if (dto.alternativasIds().size() != teste.getPerguntas().size()) {
            throw new RuntimeException(
                    String.format("O teste '%s' possui %d perguntas, mas foram enviadas %d respostas. Todas as perguntas devem ser respondidas.",
                            teste.getNome(), teste.getPerguntas().size(), dto.alternativasIds().size())
            );
        }

        List<Alternativa> alternativasEscolhidas = teste.getPerguntas().stream()
                .flatMap(pergunta -> pergunta.getAlternativas().stream()) // Achata a lista de listas em uma só
                .filter(alternativa -> dto.alternativasIds().contains(alternativa.getId())) // Filtra só as que o paciente clicou
                .toList();

        // Valida se todas as alternativas pertencem à esse teste
        if (alternativasEscolhidas.size() != dto.alternativasIds().size()) {
            throw new RuntimeException("Uma ou mais alternativas enviadas são inválidas ou não pertencem a este teste.");
        }
        
        CalculadoraTesteStrategy calculadora = calculadoraFactory.obterCalculadora(teste.getNome());
        if (calculadora == null) {
            throw new RuntimeException("O teste não foi encontrado no sistema");
        }

        Double pontuacaoTotal = calculadora.calcular(alternativasEscolhidas);
        String classificacaoFinal = calculadora.classificar(pontuacaoTotal);

        // Monta a Entidade Principal (Cabeçalho)
        AplicacaoTeste aplicacao = AplicacaoTeste.builder()
                .paciente(paciente)
                .teste(teste)
                .usuario(psicologo)
                .pontuacaoTotal(pontuacaoTotal)
                .classificacao(classificacaoFinal)
                .build();

        // Vincula as Respostas (Filhas) ao Cabeçalho
        alternativasEscolhidas.forEach(aplicacao::adicionarResposta);

        // Persiste tudo no banco (Cascade salva o cabeçalho e os itens de uma vez)
        AplicacaoTeste aplicacaoSalva = aplicacaoTesteRepository.save(aplicacao);

        // Limpa a análise de IA do cadastro do paciente quando é feito um novo teste, assim, ao chamar o método de gerar a análise de IA, o sistema vai saber que precisa consultar a API do Gemini e não só retornar o que está no banco
        paciente.setAnaliseIa(null);

        // Retorna o Recibo para o Front-end
        return mapearParaDTO(aplicacaoSalva);
    }

    public List<AplicacaoTeste>listarAplicacoesPorPacienteEntity(Long pacienteId) {
        return aplicacaoTesteRepository.findByPacienteIdOrderByDataAplicacaoDesc(pacienteId)
                .stream()
                .toList();
    }

    // Visualizar histórico de um paciente, usado pelo FrontEnd
    @Transactional(readOnly = true)
    public List<AplicacaoResponseDTO> listarAplicacoesPorPaciente(Long pacienteId) {
        return aplicacaoTesteRepository.findByPacienteIdOrderByDataAplicacaoDesc(pacienteId)
                .stream()
                .map(this::mapearParaDTO)
                .toList();
    }

    // Visualizar Aplicações de um psicólogo, usado pelo FrontEnd
    @Transactional(readOnly = true)
    public List<AplicacaoResponseDTO> listarAplicacoesPorPsicologo(Long psicologoId) {
        return aplicacaoTesteRepository.findByUsuarioIdOrderByDataAplicacaoDesc(psicologoId)
                .stream()
                .map(this::mapearParaDTO)
                .toList();
    }

    // Buscar aplicação completa, usado para geração dos relatórios em PDF, retorna a entidade mas não é usado pelo FrontEnd
    @Transactional(readOnly = true)
    public AplicacaoTeste buscarAplicacaoCompleta(Long aplicacaoId) {
        return aplicacaoTesteRepository.findById(aplicacaoId)
                .orElseThrow(() -> new RuntimeException("Aplicação de teste não encontrada."));
    }

    // Buscar Aplicação completa, retornando um DTO para usar nas requests do FrontEnd
    @Transactional(readOnly = true)
    public AplicacaoCompletaResponseDTO buscarAplicacaoCompletaDTO(Long aplicacaoId) {
        AplicacaoTeste aplicacao = buscarAplicacaoCompleta(aplicacaoId);
        List<AplicacaoCompletaResponseDTO.RespostaDTO> respostasDTO = aplicacao.getRespostas().stream()
                .map(resposta -> new AplicacaoCompletaResponseDTO.RespostaDTO(
                        resposta.getId(),

                        // Navega: Resposta -> Alternativa -> Pergunta
                        (resposta.getAlternativa() != null && resposta.getAlternativa().getPergunta() != null)
                                ? resposta.getAlternativa().getPergunta().getPergunta()
                                : null,

                        new AplicacaoCompletaResponseDTO.AlternativaDTO(
                                resposta.getAlternativa().getId(),
                                resposta.getAlternativa().getAlternativa(),
                                resposta.getAlternativa().getPontuacao()
                        )
                ))
                .toList();

        return new AplicacaoCompletaResponseDTO(
                aplicacao.getId(),
                aplicacao.getDataAplicacao(),
                aplicacao.getPaciente() != null ? aplicacao.getPaciente().getNome() : null,
                aplicacao.getTeste() != null ? aplicacao.getTeste().getNome() : null,
                respostasDTO
        );
    }

    @Transactional public void salvarAnaliseIa(Long aplicacaoId, String analise) {
        AplicacaoTeste aplicacao = aplicacaoTesteRepository.findById(aplicacaoId)
                .orElseThrow(() -> new RuntimeException("Aplicação não encontrada."));
        aplicacao.setAnaliseIa(analise);
        aplicacaoTesteRepository.save(aplicacao);
    }

    // Centraliza o mapeamento para evitar código repetido
    private AplicacaoResponseDTO mapearParaDTO(AplicacaoTeste aplicacao) {
        return new AplicacaoResponseDTO(
                aplicacao.getId(),
                aplicacao.getPaciente().getId(),
                aplicacao.getPaciente().getNome(),
                aplicacao.getTeste().getId(),
                aplicacao.getTeste().getNome(),
                aplicacao.getPontuacaoTotal(),
                aplicacao.getClassificacao(),
                aplicacao.getDataAplicacao(),
                aplicacao.getAnaliseIa()
        );
    }
}