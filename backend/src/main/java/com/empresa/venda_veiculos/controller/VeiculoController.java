package com.empresa.venda_veiculos.controller;

import com.empresa.venda_veiculos.model.Veiculo;
import com.empresa.venda_veiculos.service.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/veiculos")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @GetMapping
    public List<Veiculo> listarTodos() {
        return veiculoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscarPorId(@PathVariable Long id) {
        Optional<Veiculo> veiculo = veiculoService.buscarPorId(id);
        return veiculo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Veiculo criar(@RequestBody Veiculo veiculo) {
        return veiculoService.salvar(veiculo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> atualizar(@PathVariable Long id, @RequestBody Veiculo veiculoAtualizado) {
        Optional<Veiculo> veiculoExistente = veiculoService.buscarPorId(id);
        if (veiculoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Veiculo veiculo = veiculoExistente.get();
        veiculo.setMarca(veiculoAtualizado.getMarca());
        veiculo.setModelo(veiculoAtualizado.getModelo());
        veiculo.setAno(veiculoAtualizado.getAno());
        veiculo.setPreco(veiculoAtualizado.getPreco());

        Veiculo salvo = veiculoService.salvar(veiculo);
        return ResponseEntity.ok(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        Optional<Veiculo> veiculo = veiculoService.buscarPorId(id);
        if (veiculo.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        veiculoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}