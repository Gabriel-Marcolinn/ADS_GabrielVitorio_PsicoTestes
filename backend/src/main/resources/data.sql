-- ==============================================================================
-- CARGA INICIAL: TESTE BDI-II (Inventário de Depressão de Beck - Segunda Edição)
-- ==============================================================================

-- 1. Criação do Teste (ID 1)
INSERT INTO testes (id, nome)
VALUES (1, 'Inventário de Depressão de Beck - Segunda Edição (BDI-II)');

-- 2. Criação das 21 Perguntas vinculadas ao Teste ID 1
INSERT INTO perguntas (id, pergunta, teste_id) VALUES
                                                   (1, '1. Tristeza', 1),
                                                   (2, '2. Pessimismo', 1),
                                                   (3, '3. Fracasso Passado', 1),
                                                   (4, '4. Perda de Prazer', 1),
                                                   (5, '5. Sentimentos de Culpa', 1),
                                                   (6, '6. Sentimentos de Punição', 1),
                                                   (7, '7. Autoestima', 1),
                                                   (8, '8. Autocrítica', 1),
                                                   (9, '9. Pensamentos ou Desejos Suicidas', 1),
                                                   (10, '10. Choro', 1),
                                                   (11, '11. Agitação', 1),
                                                   (12, '12. Perda de Interesse', 1),
                                                   (13, '13. Indecisão', 1),
                                                   (14, '14. Desvalorização', 1),
                                                   (15, '15. Perda de Energia', 1),
                                                   (16, '16. Alterações no Padrão de Sono', 1),
                                                   (17, '17. Irritabilidade', 1),
                                                   (18, '18. Alterações no Apetite', 1),
                                                   (19, '19. Dificuldade de Concentração', 1),
                                                   (20, '20. Cansaço ou Fadiga', 1),
                                                   (21, '21. Perda de Interesse Sexual', 1);

-- 3. Criação das Alternativas vinculadas a cada Pergunta (0 a 3 pontos)

-- Pergunta 1
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (1, 0.0, 'Não me sinto triste.'),
                                                                   (1, 1.0, 'Sinto-me triste boa parte do tempo.'),
                                                                   (1, 2.0, 'Estou sempre triste.'),
                                                                   (1, 3.0, 'Sou tão triste ou infeliz que não consigo suportar.');

-- Pergunta 2
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (2, 0.0, 'Não estou desanimado a respeito do meu futuro.'),
                                                                   (2, 1.0, 'Sinto-me mais desanimado a respeito do meu futuro do que costumava ser.'),
                                                                   (2, 2.0, 'Não espero que as coisas deêm certo para mim.'),
                                                                   (2, 3.0, 'Sinto que não há esperança para o meu futuro e que as coisas só vão piorar.');

-- Pergunta 3
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (3, 0.0, 'Não me sinto um fracassado.'),
                                                                   (3, 1.0, 'Tenho fracassado mais do que eu deveria.'),
                                                                   (3, 2.0, 'Quando olho para trás, vejo muitos fracassos.'),
                                                                   (3, 3.0, 'Sinto que sou um fracasso total como pessoa.');

-- Pergunta 4
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (4, 0.0, 'Sinto tanto prazer com as coisas como antes.'),
                                                                   (4, 1.0, 'Não sinto mais prazer nas coisas como costumava sentir.'),
                                                                   (4, 2.0, 'Sinto muito pouco prazer nas coisas que eu costumava gostar.'),
                                                                   (4, 3.0, 'Não sinto nenhum prazer nas coisas que eu costumava gostar.');

-- Pergunta 5
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (5, 0.0, 'Não me sinto particularmente culpado.'),
                                                                   (5, 1.0, 'Sinto-me culpado sobre várias coisas que fiz ou deveria ter feito.'),
                                                                   (5, 2.0, 'Sinto-me culpado na maior parte do tempo.'),
                                                                   (5, 3.0, 'Sinto-me culpado o tempo todo.');

-- Pergunta 6
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (6, 0.0, 'Não sinto que estou sendo punido.'),
                                                                   (6, 1.0, 'Sinto que posso ser punido.'),
                                                                   (6, 2.0, 'Espero ser punido.'),
                                                                   (6, 3.0, 'Sinto que estou sendo punido.');

-- Pergunta 7
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (7, 0.0, 'Sinto a mesma coisa sobre mim mesmo que sempre senti.'),
                                                                   (7, 1.0, 'Perdi a confiança em mim mesmo.'),
                                                                   (7, 2.0, 'Estou decepcionado comigo mesmo.'),
                                                                   (7, 3.0, 'Não gosto de mim mesmo.');

-- Pergunta 8
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (8, 0.0, 'Não me critico ou me culpo mais do que o habitual.'),
                                                                   (8, 1.0, 'Sou mais crítico comigo mesmo do que costumava ser.'),
                                                                   (8, 2.0, 'Eu me critico por todos os meus erros.'),
                                                                   (8, 3.0, 'Eu me culpo por tudo de ruim que acontece.');

-- Pergunta 9
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (9, 0.0, 'Não tenho nenhum pensamento de me matar.'),
                                                                   (9, 1.0, 'Tenho pensamentos de me matar, mas não os levaria adiante.'),
                                                                   (9, 2.0, 'Gostaria de me matar.'),
                                                                   (9, 3.0, 'Eu me mataria se tivesse a chance.');

-- Pergunta 10
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (10, 0.0, 'Não choro mais do que costumava chorar.'),
                                                                   (10, 1.0, 'Choro mais agora do que antes.'),
                                                                   (10, 2.0, 'Choro por qualquer coisinha.'),
                                                                   (10, 3.0, 'Tenho vontade de chorar, mas não consigo.');

-- Pergunta 11
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (11, 0.0, 'Não sou mais inquieto ou agitado do que o habitual.'),
                                                                   (11, 1.0, 'Sinto-me mais inquieto ou agitado do que o habitual.'),
                                                                   (11, 2.0, 'Estou tão inquieto ou agitado que é difícil ficar parado.'),
                                                                   (11, 3.0, 'Estou tão inquieto ou agitado que tenho que estar sempre me mexendo ou fazendo alguma coisa.');

-- Pergunta 12
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (12, 0.0, 'Não perdi o interesse por outras pessoas ou atividades.'),
                                                                   (12, 1.0, 'Estou menos interessado por outras pessoas ou coisas do que costumava estar.'),
                                                                   (12, 2.0, 'Perdi quase todo o interesse por outras pessoas ou coisas.'),
                                                                   (12, 3.0, 'É difícil me interessar por qualquer coisa.');

-- Pergunta 13
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (13, 0.0, 'Tomo decisões tão bem quanto antes.'),
                                                                   (13, 1.0, 'Acho mais difícil tomar decisões agora do que costumava ser.'),
                                                                   (13, 2.0, 'Tenho muito mais dificuldade em tomar decisões do que antes.'),
                                                                   (13, 3.0, 'Tenho problemas em tomar quaisquer decisões.');

-- Pergunta 14
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (14, 0.0, 'Não sinto que eu não tenha valor.'),
                                                                   (14, 1.0, 'Não me considero tão útil ou valioso quanto antes.'),
                                                                   (14, 2.0, 'Sinto-me menos valioso quando me comparo com outras pessoas.'),
                                                                   (14, 3.0, 'Sinto-me completamente sem valor.');

-- Pergunta 15
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (15, 0.0, 'Tenho tanta energia quanto sempre tive.'),
                                                                   (15, 1.0, 'Tenho menos energia do que costumava ter.'),
                                                                   (15, 2.0, 'Não tenho energia suficiente para fazer muita coisa.'),
                                                                   (15, 3.0, 'Não tenho energia suficiente para fazer nada.');

-- Pergunta 16
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (16, 0.0, 'Não notei nenhuma mudança no meu padrão de sono.'),
                                                                   (16, 1.0, 'Durmo um pouco mais (ou menos) do que o habitual.'),
                                                                   (16, 2.0, 'Durmo muito mais (ou menos) do que o habitual.'),
                                                                   (16, 3.0, 'Durmo a maior parte do dia (ou acordo muito mais cedo e não consigo voltar a dormir).');

-- Pergunta 17
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (17, 0.0, 'Não sou mais irritado do que o habitual.'),
                                                                   (17, 1.0, 'Sou mais irritável do que o habitual.'),
                                                                   (17, 2.0, 'Sou muito mais irritável do que o habitual.'),
                                                                   (17, 3.0, 'Fico irritado o tempo todo.');

-- Pergunta 18
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (18, 0.0, 'Meu apetite não mudou.'),
                                                                   (18, 1.0, 'Meu apetite é um pouco menor (ou maior) do que o habitual.'),
                                                                   (18, 2.0, 'Meu apetite é muito menor (ou maior) do que antes.'),
                                                                   (18, 3.0, 'Não tenho apetite nenhum (ou tenho vontade de comer o tempo todo).');

-- Pergunta 19
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (19, 0.0, 'Consigo me concentrar tão bem quanto sempre.'),
                                                                   (19, 1.0, 'Não consigo me concentrar tão bem quanto antes.'),
                                                                   (19, 2.0, 'É difícil manter minha mente em qualquer coisa por muito tempo.'),
                                                                   (19, 3.0, 'Descobri que não consigo me concentrar em nada.');

-- Pergunta 20
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (20, 0.0, 'Não estou mais cansado ou fadigado do que o habitual.'),
                                                                   (20, 1.0, 'Fico cansado ou fadigado mais facilmente do que antes.'),
                                                                   (20, 2.0, 'Estou muito cansado ou fadigado para fazer muitas coisas que costumava fazer.'),
                                                                   (20, 3.0, 'Estou muito cansado ou fadigado para fazer a maioria das coisas.');

-- Pergunta 21
INSERT INTO alternativas (pergunta_id, pontuacao, alternativa) VALUES
                                                                   (21, 0.0, 'Não notei nenhuma mudança recente no meu interesse por sexo.'),
                                                                   (21, 1.0, 'Estou menos interessado por sexo do que costumava estar.'),
                                                                   (21, 2.0, 'Estou muito menos interessado por sexo agora.'),
                                                                   (21, 3.0, 'Perdi completamente o interesse por sexo.');

-- ==============================================================================
-- ATUALIZAÇÃO DAS SEQUENCES (EVITA ERROS DE AUTO-INCREMENTO NO POSTGRESQL)
-- ==============================================================================
SELECT setval('testes_id_seq', (SELECT MAX(id) FROM testes));
SELECT setval('perguntas_id_seq', (SELECT MAX(id) FROM perguntas));
SELECT setval('alternativas_id_seq', (SELECT MAX(id) FROM alternativas));