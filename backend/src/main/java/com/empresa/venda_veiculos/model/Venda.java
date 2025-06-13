package com.empresa.venda_veiculos.model;


import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "vendas")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "vendedor_id")
    private Vendedor vendedor;


    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataVenda;

    private double valorTotal;

    public Venda() {}

    public Venda(Veiculo veiculo, Cliente cliente, Vendedor vendedor, LocalDate dataVenda, double valorTotal) {
        this.veiculo = veiculo;
        this.cliente = cliente;
        this.vendedor = vendedor;
        this.dataVenda = dataVenda;
        this.valorTotal = valorTotal;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Veiculo getVeiculo() { return veiculo; }
    public void setVeiculo(Veiculo veiculo) { this.veiculo = veiculo; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public Vendedor getVendedor() { return vendedor; }
    public void setVendedor(Vendedor vendedor) { this.vendedor = vendedor; }

    public LocalDate getDataVenda() { return dataVenda; }
    public void setDataVenda(LocalDate dataVenda) { this.dataVenda = dataVenda; }

    public double getValorTotal() { return valorTotal; }
    public void setValorTotal(double valorTotal) { this.valorTotal = valorTotal; }
}