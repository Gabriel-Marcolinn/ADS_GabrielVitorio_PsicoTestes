# PsicoTestes

Sistema web para aplicação de testes psicológicos. Permite o cadastro e gerenciamento de empresas, usuários (administradores e psicólogos) e pacientes, com controle de acesso por tipo de perfil.

---

## Tecnologias

### Frontend

- **React 19** com Vite
- **Material UI (MUI)** para componentes visuais
- **React Router DOM** para navegação
- **React Hook Form** para formulários
- **validation-br** para validação de CPF/CNPJ

### Backend

- **Java 21** com **Spring Boot 4**
- **Spring Data JPA** + **Hibernate** para persistência
- **Spring Validation** para validação de dados
- **Lombok** para redução de boilerplate
- **PostgreSQL** como banco de dados

---

## Como rodar

### Pré-requisitos

- Node.js 18+
- Java 21+
- Maven
- PostgreSQL rodando localmente na porta `5432`

### Banco de dados

Crie o banco de dados no PostgreSQL:

```sql
CREATE DATABASE psicotestes;
```

### Backend

1. Abra o arquivo backend/src/main/resources/application.properties e preencha suas credenciais do banco

```properties
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

2. Na pasta `backend`, rode:

```bash
mvn spring-boot:run
```

O servidor sobe em `http://localhost:8080`.

> As tabelas são criadas automaticamente pelo Hibernate no primeiro start (`ddl-auto=create-drop`).

### Frontend

Na pasta `frontend`, rode:

```bash
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173`.

