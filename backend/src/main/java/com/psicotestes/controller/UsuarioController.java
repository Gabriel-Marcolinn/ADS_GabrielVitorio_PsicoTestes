package com.psicotestes.controller;

import com.psicotestes.dto.UsuarioRequestDTO;
import com.psicotestes.dto.UsuarioResponseDTO;
import com.psicotestes.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    // POST /api/usuarios -> Cadastrar novo usuário (Admin ou Psicólogo)
    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> cadastrar(@RequestBody @Valid UsuarioRequestDTO dto) {
        UsuarioResponseDTO usuarioCriado = usuarioService.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioCriado);
    }

    // GET /api/usuarios?empresaId=1&ativo=true -> Listar usuários por empresa (Abas Ativos/Inativos)
    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listarPorEmpresa(
            @RequestParam Long empresaId,
            @RequestParam(defaultValue = "true") Boolean ativo) {

        List<UsuarioResponseDTO> usuarios = usuarioService.listarPorEmpresa(empresaId, ativo);
        return ResponseEntity.ok(usuarios);
    }

    // GET /api/usuarios
    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    // PUT /api/usuarios/{id} -> Atualizar dados cadastrais do usuário
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid UsuarioRequestDTO dto) {

        UsuarioResponseDTO usuarioAtualizado = usuarioService.atualizar(id, dto);
        return ResponseEntity.ok(usuarioAtualizado);
    }

    // PATCH /api/usuarios/{id}/status -> Ativar/Inativar (Bloqueia/Libera o login)
    @PatchMapping("/{id}/status")
    public ResponseEntity<UsuarioResponseDTO> alternarStatus(@PathVariable Long id) {
        UsuarioResponseDTO usuario = usuarioService.alternarStatus(id);
        return ResponseEntity.ok(usuario);
    }

    // DELETE /api/usuarios/{id} -> Excluir usuário (Soft Delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        usuarioService.remover(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}