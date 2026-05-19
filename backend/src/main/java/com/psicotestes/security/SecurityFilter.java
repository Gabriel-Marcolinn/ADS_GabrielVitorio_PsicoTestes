package com.psicotestes.security;

import com.psicotestes.repository.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 1. Tenta extrair o token do cabeçalho da requisição
        var token = recuperarToken(request);

        if (token != null) {
            // 2. Valida o token e extrai o email (subject)
            var email = tokenService.validarToken(token);

            if (!email.isEmpty()) {
                // 3. Busca o usuário no banco de dados
                UserDetails usuario = usuarioRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

                // 4. Cria o objeto de autenticação que o Spring Security entende
                var authentication = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());

                // 5. Força a autenticação no contexto do Spring para esta requisição específica
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        // 6. Passa a requisição para frente (para o próximo filtro ou para o Controller)
        // Se o token for nulo ou inválido, ele passa sem autenticar (e será bloqueado mais na frente pelas regras de rota)
        filterChain.doFilter(request, response);
    }

    private String recuperarToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) {
            return null;
        }

        // cortamos a palavra "Bearer " para pegar só o token real
        return authHeader.replace("Bearer ", "");
    }
}