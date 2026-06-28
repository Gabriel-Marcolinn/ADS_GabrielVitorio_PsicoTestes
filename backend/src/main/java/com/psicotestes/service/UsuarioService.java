package com.psicotestes.service;

import com.psicotestes.dto.UsuarioRequestDTO;
import com.psicotestes.dto.UsuarioResponseDTO;
import com.psicotestes.model.Empresa;
import com.psicotestes.model.Usuario;
import com.psicotestes.repository.EmpresaRepository;
import com.psicotestes.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final EmpresaRepository empresaRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UsuarioResponseDTO salvar(UsuarioRequestDTO dto) {

        if (usuarioRepository.findByEmailOrderByNomeAsc(dto.email()).isPresent()) {
            throw new RuntimeException("Já existe um usuário cadastrado com este e-mail.");
        }

        Empresa empresa = empresaRepository.findById(dto.empresaId())
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada."));

        if (dto.tipo().equals("PA")) {
            if (usuarioRepository.findByEmpresaIdOrderByNomeAsc(empresa.getId()).stream().anyMatch(u -> u.getTipo().equals("PA"))) {
                throw new RuntimeException("Já existe outro psicólogo administrador cadastrado para essa empresa, remova o mesmo e tente novamente.");
            }
        }

        Usuario usuario = Usuario.builder()
                .nome(dto.nome())
                .email(dto.email())
                .senha(passwordEncoder.encode(dto.senha()))
                .tipo(dto.tipo())
                .empresa(empresa)
                .ativo(true)
                .deletado(false)
                .build();

        return new UsuarioResponseDTO(usuarioRepository.save(usuario));
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> listarPorEmpresa(Long empresaId, Boolean ativo) {
        return usuarioRepository.findByEmpresaIdAndAtivoOrderByNomeAsc(empresaId, ativo)
                .stream()
                .map(UsuarioResponseDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> listarTodos() {
        return usuarioRepository.findAll(Sort.by(Sort.Order.asc("nome").ignoreCase()))
                .stream()
                .map(UsuarioResponseDTO::new)
                .toList();
    }

    @Transactional
    public UsuarioResponseDTO atualizar(Long id, UsuarioRequestDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        // Garante que não vai roubar o e-mail de outro usuário
        if (!usuario.getEmail().equals(dto.email()) && usuarioRepository.findByEmailOrderByNomeAsc(dto.email()).isPresent()) {
            throw new RuntimeException("Este e-mail já está em uso por outro usuário.");
        }

        Empresa empresa = empresaRepository.findById(dto.empresaId())
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada."));

        if (dto.tipo().equals("PA")) {
            if (usuarioRepository.findByEmpresaIdOrderByNomeAsc(empresa.getId()).stream().anyMatch(u -> u.getTipo().equals("PA"))) {
                throw new RuntimeException("Já existe outro psicólogo administrador cadastrado para essa empresa, esse usuário não poderá ser um psicólogo administrador.");
            }
        }

        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        usuario.setSenha(passwordEncoder.encode(dto.senha()));
        usuario.setTipo(dto.tipo());
        usuario.setEmpresa(empresa);

        return new UsuarioResponseDTO(usuarioRepository.save(usuario));
    }

    @Transactional
    public UsuarioResponseDTO alternarStatus(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        usuario.setAtivo(!usuario.getAtivo());
        return new UsuarioResponseDTO(usuario);
    }

    @Transactional
    public void remover(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        if (usuario.getTipo().equals("AD")){
            throw new RuntimeException("Não é possível excluir o usuário, pois ele é administrador do sistema. Inative o mesmo.");
        }

        // Trava de segurança: impede de deletar um psicólogo que já tem histórico de pacientes
        if (!usuario.getPacientes().isEmpty()) {
            throw new RuntimeException("Não é possível excluir o usuário, pois existem pacientes vinculados a ele.");
        }

        usuarioRepository.delete(usuario);
    }
}