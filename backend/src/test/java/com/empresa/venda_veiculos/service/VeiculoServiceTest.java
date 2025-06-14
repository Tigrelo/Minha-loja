package com.empresa.venda_veiculos.service;

import com.empresa.venda_veiculos.model.Veiculo;
import com.empresa.venda_veiculos.repository.VeiculoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VeiculoServiceTest {

    @Mock
    private VeiculoRepository veiculoRepository;

    @InjectMocks
    private VeiculoService veiculoService;

    @Test
    void deveRetornarListaDeVeiculosComSucesso() {
        // Given
        Veiculo veiculo1 = new Veiculo();
        veiculo1.setId(1L);
        veiculo1.setMarca("Fiat");
        veiculo1.setModelo("Uno");

        Veiculo veiculo2 = new Veiculo();
        veiculo2.setId(2L);
        veiculo2.setMarca("Ford");
        veiculo2.setModelo("Ka");

        when(veiculoRepository.findAll()).thenReturn(List.of(veiculo1, veiculo2));

        // When
        List<Veiculo> resultado = veiculoService.listarTodos();

        // Then
        assertThat(resultado).isNotNull();
        assertThat(resultado).hasSize(2);
        assertThat(resultado.get(0).getMarca()).isEqualTo("Fiat");
    }

    @Test
    void deveSalvarUmVeiculoComSucesso() {
        // Given
        Veiculo veiculoParaSalvar = new Veiculo();
        veiculoParaSalvar.setMarca("VW");
        veiculoParaSalvar.setModelo("Gol");

        // Quando o repositório falso chamar o método save com QUALQUER objeto Veiculo,
        // então retorne o objeto que passamos.
        when(veiculoRepository.save(any(Veiculo.class))).thenReturn(veiculoParaSalvar);

        // When
        Veiculo veiculoSalvo = veiculoService.salvar(veiculoParaSalvar);

        // Then
        assertThat(veiculoSalvo).isNotNull();
        assertThat(veiculoSalvo.getMarca()).isEqualTo("VW");

        // Verifica se o método save foi chamado no nosso mock exatamente 1 vez
        verify(veiculoRepository, times(1)).save(veiculoParaSalvar);
    }
}