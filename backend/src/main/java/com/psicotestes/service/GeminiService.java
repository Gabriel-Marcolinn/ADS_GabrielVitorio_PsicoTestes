package com.psicotestes.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.psicotestes.model.AplicacaoTeste;
import com.psicotestes.model.Paciente;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    // Regra de negócio explícita do DVP: Identificar geração por IA
    private static final String DISCLAIMER_IA = "\n\n**Aviso do Sistema:** Este parecer analítico foi gerado automaticamente por Inteligência Artificial a partir dos dados brutos do teste. Deve ser utilizado apenas como apoio à decisão clínica e validado pelo(a) psicólogo(a) responsável.";

    // Gerar análise de uma única aplicação de teste
    public String gerarAnaliseTesteUnico(AplicacaoTeste aplicacao) {
        String data = aplicacao.getDataAplicacao().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));

        String prompt = String.format(
                "Atue como um psicólogo clínico sênior. O paciente '%s' realizou o instrumento psicológico '%s' no dia %s. " +
                        "A pontuação global obtida foi %s, com a classificação de risco/resultado: '%s'. " +
                        "Escreva uma síntese clínica concisa, objetiva e profissional (máximo de 6 linhas) interpretando este resultado específico para compor o laudo do paciente. Não use saudações.",
                aplicacao.getPaciente().getNome(), aplicacao.getTeste().getNome(), data,
                aplicacao.getPontuacaoTotal(), aplicacao.getClassificacao()
        );

        return chamarApiGemini(prompt) + DISCLAIMER_IA;
    }

    // Gerar análise do contexto completo do paciente (Histórico)
    public String gerarAnaliseHistoricoPaciente(Paciente paciente, List<AplicacaoTeste> aplicacoes) {
        if (aplicacoes.isEmpty()) {
            return "O paciente não possui testes suficientes para gerar um histórico." + DISCLAIMER_IA;
        }

        // Mapeia o histórico resumido para o Prompt
        String resumoTestes = aplicacoes.stream()
                .map(app -> String.format("- %s (%s): Pontuação %s -> %s",
                        app.getTeste().getNome(),
                        app.getDataAplicacao().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                        app.getPontuacaoTotal(),
                        app.getClassificacao()))
                .collect(Collectors.joining("\n"));

        String prompt = String.format(
                "Atue como um psicólogo clínico sênior. Analise o histórico longitudinal do paciente '%s'. " +
                        "Abaixo estão os resultados dos testes realizados ao longo do tempo:\n%s\n\n" +
                        "Com base nessa linha do tempo, faça uma síntese clínica profissional (máximo de 8 linhas) avaliando a evolução do paciente, " +
                        "possíveis padrões e o quadro geral. Seja direto e clínico. Não use saudações.",
                paciente.getNome(), resumoTestes
        );

        return chamarApiGemini(prompt) + DISCLAIMER_IA;
    }


    // Método utilitário privado para fazer a requisição HTTP
    private String chamarApiGemini(String prompt) {
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt))))
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            // 1. Recebemos a resposta do Google como uma String pura (à prova de falhas)
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl + apiKey, entity, String.class);

            // 2. Usamos o ObjectMapper para ler essa String e transformá-la em uma Árvore JSON
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            JsonNode body = mapper.readTree(response.getBody());

            // 3. Navegamos na árvore para pegar apenas o texto da IA
            if (body != null && body.has("candidates")) {
                return body.at("/candidates/0/content/parts/0/text").asText().trim();
            }
            return "Erro na formatação da resposta da IA.";

        } catch (Exception e) {
            System.err.println("Erro API Gemini: " + e.getMessage());
            return "Serviço de Inteligência Artificial temporariamente indisponível.";
        }
    }
}