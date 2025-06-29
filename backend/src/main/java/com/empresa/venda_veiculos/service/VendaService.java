package com.empresa.venda_veiculos.service;

import com.empresa.venda_veiculos.model.Venda;
import com.empresa.venda_veiculos.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    public List<Venda> listarTodos() {
        return vendaRepository.findAll();
    }

    public Optional<Venda> buscarPorId(Long id) {
        return vendaRepository.findById(id);
    }

    public Venda salvar(Venda venda) {
        return vendaRepository.save(venda);
    }

    public void deletar(Long id) {
        vendaRepository.deleteById(id);
    }

    public List<Venda> buscarPorClienteId(Long clienteId) {
        return vendaRepository.findByClienteId(clienteId);
    }
}