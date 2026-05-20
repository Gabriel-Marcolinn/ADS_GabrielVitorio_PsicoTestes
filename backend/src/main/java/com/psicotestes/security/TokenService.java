package com.psicotestes.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.psicotestes.model.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    //chave do application properties
    @Value("${api.security.token.secret}")
    private String secret;

    public String gerarToken(Usuario usuario) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("psicotestes-api")
                    .withSubject(usuario.getEmail()) // O "dono" do token
                    // Injectando Claims (Carga útil): Essencial para não ter que ir ao banco toda hora!
                    .withClaim("id", usuario.getId())
                    .withClaim("tipo", usuario.getTipo())
                    .withClaim("empresaId", usuario.getEmpresa().getId()) // Garante o RNF-7
                    .withClaim("nome", usuario.getNome())
                    .withExpiresAt(gerarDataExpiracao())
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao gerar token JWT", exception);
        }
    }

    public String validarToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("psicotestes-api")
                    .build()
                    .verify(token)
                    .getSubject(); // Devolve o email se o token for válido e não estiver expirado
        } catch (JWTVerificationException exception) {
            return ""; // Se for inválido, falso, alterado ou expirado, devolve vazio e bloqueia
        }
    }

    private Instant gerarDataExpiracao() {
        // Define o token para expirar em 2 horas.
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00")); // O fuso horário de Brasília é -03:00.
    }
}