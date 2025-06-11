package com.empresa.venda_veiculos.controller;

import com.empresa.venda_veiculos.model.Vendedor;
import com.empresa.venda_veiculos.service.VendedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vendedores")
public class VendedorController {

    @Autowired
    private VendedorService vendedorService;

    @GetMapping
    public List<Vendedor> listarTodos() {
        return vendedorService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vendedor> buscarPorId(@PathVariable Long id) {
        Optional<Vendedor> vendedor = vendedorService.buscarPorId(id);
        return vendedor.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Vendedor criar(@RequestBody Vendedor vendedor) {
        return vendedorService.salvar(vendedor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vendedor> atualizar(@PathVariable Long id, @RequestBody Vendedor vendedorAtualizado) {
        Optional<Vendedor> vendedorExistente = vendedorService.buscarPorId(id);
        if (vendedorExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Vendedor vendedor = vendedorExistente.get();
        vendedor.setNome(vendedorAtualizado.getNome());
        vendedor.setTelefone(vendedorAtualizado.getTelefone());
        vendedor.setEmail(vendedorAtualizado.getEmail());

        Vendedor salvo = vendedorService.salvar(vendedor);
        return ResponseEntity.ok(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        Optional<Vendedor> vendedor = vendedorService.buscarPorId(id);
        if (vendedor.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        vendedorService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}