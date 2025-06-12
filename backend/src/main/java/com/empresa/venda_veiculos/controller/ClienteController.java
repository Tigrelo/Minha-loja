package com.empresa.venda_veiculos.controller;

import com.empresa.venda_veiculos.model.Cliente;
import com.empresa.venda_veiculos.model.Venda;
import com.empresa.venda_veiculos.service.ClienteService;
import com.empresa.venda_veiculos.service.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    // --- 1. ADICIONE A INJEÇÃO DO VENDASERVICE ---
    @Autowired
    private VendaService vendaService;

    @GetMapping
    public List<Cliente> listarTodos() {
        return clienteService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteService.buscarPorId(id);
        return cliente.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Cliente criar(@RequestBody Cliente cliente) {
        return clienteService.salvar(cliente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Long id, @RequestBody Cliente clienteAtualizado) {
        Optional<Cliente> clienteExistente = clienteService.buscarPorId(id);
        if (clienteExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Cliente cliente = clienteExistente.get();
        cliente.setNome(clienteAtualizado.getNome());
        cliente.setCpf(clienteAtualizado.getCpf());
        cliente.setTelefone(clienteAtualizado.getTelefone());

        Cliente salvo = clienteService.salvar(cliente);
        return ResponseEntity.ok(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteService.buscarPorId(id);
        if (cliente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        clienteService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/vendas")
    public ResponseEntity<List<Venda>> buscarVendasDoCliente(@PathVariable Long id) {
        // Primeiro, verificamos se o cliente existe
        if (clienteService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        // Se existe, buscamos as vendas dele
        List<Venda> vendas = vendaService.buscarPorClienteId(id);
        return ResponseEntity.ok(vendas);
    }
}