package com.psicotestes.service;

import com.psicotestes.dto.EmpresaRequestDTO;
import com.psicotestes.dto.EmpresaResponseDTO;
import com.psicotestes.model.Empresa;
import com.psicotestes.repository.EmpresaRepository;
import com.psicotestes.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmpresaService {

    private final EmpresaRepository empresaRepository;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public EmpresaResponseDTO salvar(EmpresaRequestDTO dto) {

        if (empresaRepository.findByCnpj(dto.cnpj()).isPresent()) {
            throw new RuntimeException("Já existe uma empresa cadastrada com este CNPJ.");
        }

        String cnpjFormatado = dto.cnpj().trim().replace("-", "").replace(".","").replace("/","");
        Empresa empresa = new Empresa(dto.razaoSocial(), cnpjFormatado);
        return new EmpresaResponseDTO(empresaRepository.save(empresa));
    }

    @Transactional(readOnly = true)
    public List<EmpresaResponseDTO> listarTodas() {
        return empresaRepository.findAll(Sort.by(Sort.Order.asc("razaoSocial").ignoreCase()))
                .stream()
                .map(empresa -> new EmpresaResponseDTO(empresa))
                .toList();
    }

    @Transactional(readOnly = true)
    public EmpresaResponseDTO buscarPorId(Long id) {
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada com o ID: " + id));
        return new EmpresaResponseDTO(empresa);
    }

    @Transactional
    public EmpresaResponseDTO atualizar(Long id, EmpresaRequestDTO dto) {
        Empresa empresaExistente = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada."));

        // Se o CNPJ mudou, verifica se o novo já existe em outra empresa
        if (!empresaExistente.getCnpj().equals(dto.cnpj()) &&
                empresaRepository.findByCnpj(dto.cnpj()).isPresent()) {
            throw new RuntimeException("O novo CNPJ já está em uso por outra empresa.");
        }

        empresaExistente.setRazaoSocial(dto.razaoSocial());
        empresaExistente.setCnpj(dto.cnpj());

        return new EmpresaResponseDTO(empresaRepository.save(empresaExistente));
    }

    @Transactional
    public void remover(Long id) {
        if (!empresaRepository.existsById(id)) {
            throw new RuntimeException("Empresa não encontrada.");
        }

        // Caso a empresa tenha usuários vinculados, o sistema impede o soft delete
        if (usuarioRepository.existsByEmpresaId(id)) {
            throw new RuntimeException("A empresa tem usuários vinculados à ela, logo, ela não pode ser deletada.");
        }

        // O Hibernate vai interceptar isso aqui e fazer o UPDATE deletado = true
        empresaRepository.deleteById(id);
    }

    @Transactional
    public EmpresaResponseDTO alternarStatus(Long id) {
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada."));

        // Inverte o status atual (se for true vira false, se for false vira true)
        empresa.setAtivo(!empresa.getAtivo());

        return new EmpresaResponseDTO(empresa);
    }
}