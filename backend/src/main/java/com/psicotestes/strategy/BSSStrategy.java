package com.psicotestes.strategy;

import com.psicotestes.model.Alternativa;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

//Escala de Ideação Suicida BECK - BSS
@Component
public class BSSStrategy implements CalculadoraTesteStrategy{

    @Override
    public String getIdentificadorTeste() {
        return "Escala de Ideação Suicida BECK - BSS";
    }

    @Override
    public Double calcular(List<Alternativa> alternativasEscolhidas) {
        if (alternativasEscolhidas == null || alternativasEscolhidas.size() < 20) {
            throw new IllegalArgumentException("A Escala BSS exige respostas para todas as 20 perguntas.");
        }

        // Ordena para garantir que a Questão 1 seja o índice 0, a Questão 2 o índice 1, etc.
        List<Alternativa> ordenadas = alternativasEscolhidas.stream()
                .sorted(Comparator.comparing(a -> a.getPergunta().getId()))
                .toList();

        // Passa os valores para um array de tamanho 21 para facilitar a leitura da fórmula (índice 1 = Q1)
        double[] q = new double[21];
        for (int i = 0; i < 20; i++) {
            q[i + 1] = ordenadas.get(i).getPontuacao();
        }

        // Aplica a fórmula de inversão para os itens protetivos (3 - nota original)
        q[1] = 3.0 - q[1];
        q[3] = 3.0 - q[3];
        q[7] = 3.0 - q[7];
        q[13] = 3.0 - q[13];
        q[14] = 3.0 - q[14];
        q[16] = 3.0 - q[16];
        q[20] = 3.0 - q[20];

        // Soma total
        double pontuacaoFinal = 0.0;
        for (int i = 1; i <= 20; i++) {
            pontuacaoFinal += q[i];
        }

        return pontuacaoFinal;
    }

    @Override
    public String classificar(Double pontuacaoFinal) {
        if (pontuacaoFinal <= 20.0) {
            return "Poucos sinais de risco suicida.";
        } else if (pontuacaoFinal <= 40.0) {
            return "Pensamentos suicidas ou sofrimento importante.";
        } else {
            return "Risco elevado de tentativa suicida.";
        }
    }
}
