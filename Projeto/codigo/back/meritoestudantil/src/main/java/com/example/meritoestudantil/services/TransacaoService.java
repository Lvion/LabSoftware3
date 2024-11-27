package com.example.meritoestudantil.services;

import com.example.meritoestudantil.models.*;
import com.example.meritoestudantil.repositories.AlunoRepository;
import com.example.meritoestudantil.repositories.ProfessorRepository;
import com.example.meritoestudantil.repositories.TransacaoRepository;
import com.example.meritoestudantil.repositories.VantagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TransacaoService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Autowired
    private VantagemRepository vantagemRepository;

    public String transferirMoedas(String professorEmail, Long alunoId, int quantidadeMoedas, String descricao, TipoTransacao tipoTransacao) {
        Professor professor = professorRepository.findByEmail(professorEmail)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        if (professor.getSaldoMoedas() < quantidadeMoedas) {
            return "Saldo insuficiente para a transferência.";
        }

        // Atualiza o saldo do professor e do aluno
        professor.setSaldoMoedas(professor.getSaldoMoedas() - quantidadeMoedas);
        aluno.setSaldoMoedas(aluno.getSaldoMoedas() + quantidadeMoedas);

        // Salva as alterações de saldo no banco de dados
        professorRepository.save(professor);
        alunoRepository.save(aluno);

        // Cria e salva a transação
        Transacao transacao = new Transacao();
        transacao.setProfessor(professor);
        transacao.setAluno(aluno);
        transacao.setQuantidadeMoedas(quantidadeMoedas);
        transacao.setDescricao(descricao);
        transacao.setData(new Date());
        transacao.setTipoTransacao(tipoTransacao); // Define o tipo de transação

        transacaoRepository.save(transacao);

        return "Transferência realizada com sucesso.";
    }
    public String comprarBeneficio(String alunoEmail, Long beneficioId) {
        Aluno aluno = alunoRepository.findByEmail(alunoEmail)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        Vantagem vantagem = vantagemRepository.findById(beneficioId)
                .orElseThrow(() -> new RuntimeException("Benefício não encontrado"));

        Empresa empresa = vantagem.getEmpresa();
        if (empresa == null) {
            throw new RuntimeException("Empresa associada ao benefício não encontrada.");
        }

        if (aluno.getSaldoMoedas() < vantagem.getCustoEmMoedas()) {
            return "Saldo insuficiente para comprar o benefício.";
        }

        // Deduz o valor do benefício do saldo do aluno
        aluno.setSaldoMoedas(aluno.getSaldoMoedas() - vantagem.getCustoEmMoedas());
        alunoRepository.save(aluno);

        // Registra a transação
        Transacao transacao = new Transacao();
        transacao.setAluno(aluno);
        transacao.setQuantidadeMoedas(vantagem.getCustoEmMoedas());
        transacao.setDescricao("Compra de benefício: " + vantagem.getNome());
        transacao.setData(new Date());
        transacao.setTipoTransacao(TipoTransacao.COMPRA_BENEFICIO);
        transacao.setVantagem(vantagem); // Associa a vantagem

        transacaoRepository.save(transacao);

        return "Compra realizada com sucesso.";
    }


}
