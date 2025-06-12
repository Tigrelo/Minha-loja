package com.empresa.venda_veiculos.repository;

import com.empresa.venda_veiculos.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {

    // Método que já tínhamos adicionado para a nova funcionalidade
    List<Venda> findByClienteId(Long clienteId);

}