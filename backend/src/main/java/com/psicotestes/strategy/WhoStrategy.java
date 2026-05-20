package com.psicotestes.strategy;

import com.psicotestes.model.Alternativa;

import java.util.Comparator;
import java.util.List;

/// TESTE 3 - Remix Inspirado no WHOQOL-BREF
public class WhoStrategy implements CalculadoraTesteStrategy {

    @Override
    public String getIdentificadorTeste() {
        return "WHOQOL-BREF";
    }

    @Override
    public Double calcular(List<Alternativa> alternativasEscolhidas) {
        if (alternativasEscolhidas == null || alternativasEscolhidas.size() < 26) {
            throw new IllegalArgumentException("O teste WHOQOL exige respostas para todas as 26 perguntas.");
        }

        // Garantir que a lista está estritamente na ordem das perguntas (Q1 a Q26).
        List<Alternativa> ordenadas = alternativasEscolhidas.stream()
                .sorted(Comparator.comparing(a -> a.getPergunta().getId()))
                .toList();

        // Mapear as respostas para um array de 1 a 26.
        // Crio com tamanho 27 para ignorar o index 0 e a leitura do código ficar idêntica à fórmula visual (q[1] = Q1).
        double[] q = new double[27];
        for (int i = 0; i < 26; i++) {
            q[i + 1] = ordenadas.get(i).getPontuacao();
        }

        // Cálculo dos Itens Invertidos
        double q3i = 6.0 - q[3];
        double q4i = 6.0 - q[4];
        double q19i = 6.0 - q[19];

        // Domínios Brutos (Escala da OMS de 4 a 20)
        double domFisico = ((q3i + q4i + q[5] + q[10] + q[15] + q[16] + q[17]) / 7.0) * 4.0;
        double domPsicologico = ((q[6] + q[7] + q[11] + q[18] + q19i + q[26]) / 6.0) * 4.0;
        double domSocial = ((q[20] + q[21] + q[22]) / 3.0) * 4.0;
        double domAmbiente = ((q[8] + q[9] + q[12] + q[13] + q[14] + q[23] + q[24] + q[25]) / 8.0) * 4.0;

        // Transformação para a escala de 0 a 100%
        double domFisico100 = ((domFisico - 4.0) / 16.0) * 100.0;
        double domPsicologico100 = ((domPsicologico - 4.0) / 16.0) * 100.0;
        double domSocial100 = ((domSocial - 4.0) / 16.0) * 100.0;
        double domAmbiente100 = ((domAmbiente - 4.0) / 16.0) * 100.0;

        // Retorno de um único Double exigido pela interface (Score Global: Média dos 4 domínios transformados)
        return (domFisico100 + domPsicologico100 + domSocial100 + domAmbiente100) / 4.0;
    }

    @Override
    public String classificar(Double pontuacaoFinal) {
        double pontuacaoArredondada = (double) Math.round(pontuacaoFinal);
        if (pontuacaoArredondada <= 50.0) {
            return "Qualidade de vida indicativa baixa";
        } else if (pontuacaoArredondada >= 51.0 && pontuacaoArredondada <= 75.0) {
            return "Regular (Qualidade de vida moderada)";
        } else {
            return "Satisfatória (Qualidade de vida boa)";
        }
    }
}
