package com.empresa.venda_veiculos.controller;

import com.empresa.venda_veiculos.model.Venda;
import com.empresa.venda_veiculos.service.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vendas")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @GetMapping
    public List<Venda> listarTodos() {
        return vendaService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venda> buscarPorId(@PathVariable Long id) {
        Optional<Venda> venda = vendaService.buscarPorId(id);
        return venda.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Venda criar(@RequestBody Venda venda) {
        return vendaService.salvar(venda);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Venda> atualizar(@PathVariable Long id, @RequestBody Venda vendaAtualizada) {
        Optional<Venda> vendaExistente = vendaService.buscarPorId(id);
        if (vendaExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Venda venda = vendaExistente.get();
        venda.setVeiculo(vendaAtualizada.getVeiculo());
        venda.setCliente(vendaAtualizada.getCliente());
        venda.setVendedor(vendaAtualizada.getVendedor());
        venda.setDataVenda(vendaAtualizada.getDataVenda());
        venda.setValorTotal(vendaAtualizada.getValorTotal());

        Venda salva = vendaService.salvar(venda);
        return ResponseEntity.ok(salva);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        Optional<Venda> venda = vendaService.buscarPorId(id);
        if (venda.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        vendaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}