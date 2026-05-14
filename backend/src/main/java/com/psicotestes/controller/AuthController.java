package com.psicotestes.controller;

import com.psicotestes.dto.AutenticacaoDTO;
import com.psicotestes.dto.TokenJwtDTO;
import com.psicotestes.model.Usuario;
import com.psicotestes.security.TokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager manager;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<TokenJwtDTO> efetuarLogin(@RequestBody @Valid AutenticacaoDTO dto) {
        try {
            // 1. O Spring pega o email e senha e tenta validar no banco de dados
            var authenticationToken = new UsernamePasswordAuthenticationToken(dto.email(), dto.senha());
            var authentication = manager.authenticate(authenticationToken);

            // 2. Se deu certo, ele pega o Usuário e fabrica o Token
            var usuarioAutenticado = (Usuario) authentication.getPrincipal();
            var tokenJWT = tokenService.gerarToken(usuarioAutenticado);

            // 3. Devolve o 200 OK com o Token para o Postman/React
            return ResponseEntity.ok(new TokenJwtDTO(tokenJWT));

        } catch (Exception e) {
            // Se a senha estiver errada, cai aqui!
            System.out.println(">>> ERRO DE LOGIN: " + e.getMessage());
            return ResponseEntity.status(403).build();
        }
    }
}