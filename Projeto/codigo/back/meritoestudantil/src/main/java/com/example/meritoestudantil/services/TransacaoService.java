package com.example.meritoestudantil.services;

import com.example.meritoestudantil.models.Aluno;
import com.example.meritoestudantil.models.Professor;
import com.example.meritoestudantil.models.Transacao;
import com.example.meritoestudantil.repositories.AlunoRepository;
import com.example.meritoestudantil.repositories.ProfessorRepository;
import com.example.meritoestudantil.repositories.TransacaoRepository;
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

    public String transferirMoedas(String professorEmail, Long alunoId, int quantidadeMoedas, String descricao) {
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

        transacaoRepository.save(transacao);

        return "Transferência realizada com sucesso.";
    }
}
