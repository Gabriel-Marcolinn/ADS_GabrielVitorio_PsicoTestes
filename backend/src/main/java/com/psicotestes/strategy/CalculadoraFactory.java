package com.psicotestes.strategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CalculadoraFactory {

    private final Map<String, CalculadoraTesteStrategy> strategies = new HashMap<>();

    // O Spring injeta TODAS as classes que implementam a interface aqui
    @Autowired
    public CalculadoraFactory(List<CalculadoraTesteStrategy> strategyList) {
        for (CalculadoraTesteStrategy strategy : strategyList) {
            strategies.put(strategy.getIdentificadorTeste(), strategy);
        }
    }

    // Retorna a estratégia certa
    public CalculadoraTesteStrategy obterCalculadora(String nomeTeste) {
        return strategies.get(nomeTeste);
    }
}