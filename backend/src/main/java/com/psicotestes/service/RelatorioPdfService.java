package com.psicotestes.service;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;

@Service
@RequiredArgsConstructor
public class RelatorioPdfService {

    private final TemplateEngine templateEngine;

    public byte[] gerarRelatorioSimplificado(String pacienteNome, String psicologoNome, String testeNome, Double pontuacao, String classificacao, String dataStr) {

        // 1. Vincula as variáveis ao contexto do Thymeleaf
        Context context = new Context();
        context.setVariable("pacienteNome", pacienteNome);
        context.setVariable("psicologoNome", psicologoNome);
        context.setVariable("testeNome", testeNome);

        // Exibe o score arredondado para zero casas decimais na visualização do PDF
        context.setVariable("pontuacao", Math.round(pontuacao));
        context.setVariable("classificacao", classificacao);
        context.setVariable("dataAplicacao", dataStr);

        // 2. Renderiza o HTML do relatório simplificado com os dados reais
        String htmlProcessado = templateEngine.process("relatorio-simplificado", context);

        // 3. Conversão de HTML String pura para vetor de bytes PDF através do OpenHTMLtoPDF
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            builder.withHtmlContent(htmlProcessado, null);
            builder.toStream(outputStream);
            builder.run();

            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Falha crítica ao compilar o PDF Simplificado", e);
        }
    }
}