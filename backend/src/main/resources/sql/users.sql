-- ==============================================================================
-- CARGA INICIAL: EMPRESA E USUÁRIO ADMINISTRADOR
-- ==============================================================================

-- 1. Inserir a Empresa Matriz (Necessário para a chave estrangeira empresa_id no Usuário)
INSERT INTO empresas (id, razao_social, cnpj, ativo, deletado)
VALUES (1, 'Clínica Matriz PsicoTestes', '00000000000000', true, false);

-- 2. Inserir o Usuário Administrador (Tipo 'AD')
-- A string na senha é o hash BCrypt exato para: "123456"
INSERT INTO usuarios (id, nome, email, senha, tipo, ativo, deletado, empresa_id)
VALUES (1, 'Administrador Geral', 'admin@psicotestes.com.br', '$2a$10$Y50UaMFOxteibQEYLrwuHeehHYfcoafCopUazP12.rqB41bsolF5.', 'AD', true, false, 1);

-- 3. Atualizar as sequences para evitar erros de "Unique Constraint" (Atualizado para empresas_id_seq)
SELECT setval('empresas_id_seq', (SELECT MAX(id) FROM empresas));
SELECT setval('usuarios_id_seq', (SELECT MAX(id) FROM usuarios));