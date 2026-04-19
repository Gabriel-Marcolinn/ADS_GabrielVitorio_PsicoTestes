package com.psicotestes.repository;

import com.psicotestes.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    // Para busca exata de empresas por sua razão social completa
    List<Empresa> findByRazaoSocial(String razaoSocial);

    // Para facilitar a busca global de empresas por partes do nome (uso principal do Administrador do sistema)
    List<Empresa> findByRazaoSocialContainingIgnoreCase(String razaoSocial);

    // Para validação de unicidade na hora de cadastrar ou editar uma nova empresa
    Optional<Empresa> findByCnpj(String cnpj);
}
