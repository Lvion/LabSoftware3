package com.example.meritoestudantil.services;

import com.example.meritoestudantil.models.Aluno;
import com.example.meritoestudantil.models.TransacaoVantagem;
import com.example.meritoestudantil.models.Vantagem;
import com.example.meritoestudantil.repositories.AlunoRepository;
import com.example.meritoestudantil.repositories.TransacaoVantagemRepository;
import com.example.meritoestudantil.repositories.VantagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class TransacaoVantagemService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private VantagemRepository vantagemRepository;

    @Autowired
    private TransacaoVantagemRepository transacaoVantagemRepository;

    public String comprarVantagem(String alunoEmail, Long vantagemId) {
        Aluno aluno = alunoRepository.findByEmail(alunoEmail)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        Vantagem vantagem = vantagemRepository.findById(vantagemId)
                .orElseThrow(() -> new RuntimeException("Vantagem não encontrada"));

        if (aluno.getSaldoMoedas() < vantagem.getCustoEmMoedas()) {
            return "Saldo insuficiente para comprar a vantagem.";
        }

        // Deduz o saldo do aluno
        aluno.setSaldoMoedas(aluno.getSaldoMoedas() - vantagem.getCustoEmMoedas());
        alunoRepository.save(aluno);

        // Registra a transação
        TransacaoVantagem transacao = new TransacaoVantagem();
        transacao.setAluno(aluno);
        transacao.setVantagem(vantagem);
        transacao.setQuantidadeMoedas(vantagem.getCustoEmMoedas());
        transacao.setDescricao("Compra da vantagem: " + vantagem.getNome());
        transacao.setData(new Date());
        transacao.setCodigoConfirmacao(UUID.randomUUID().toString()); // Gera um código único

        transacaoVantagemRepository.save(transacao);

        return "Compra realizada com sucesso. Código de confirmação: " + transacao.getCodigoConfirmacao();
    }
    public List<TransacaoVantagem> listarTransacoesPorAluno(String email) {
        return transacaoVantagemRepository.findByAlunoEmail(email);
    }
}
