package com.empresa.venda_veiculos.repository;

import com.empresa.venda_veiculos.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    // O Spring Data JPA cria os métodos básicos como findAll, findById, save, etc. automaticamente.
}