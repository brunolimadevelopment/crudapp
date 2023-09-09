import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getUsers, OnEdit, setOnEdit }) => {
    const ref = useRef(); // referencia o form

    useEffect(() => {
        // verifica se o form tem algum item de edição
        if (OnEdit) {
            const user = ref.current;

            user.nome.value = OnEdit.nome; // input nome recebe o edit.nome quando for pra editar
            user.email.value = OnEdit.email; // input email recebe o edit.nome quando for pra editar
            user.fone.value = OnEdit.fone; // input fone recebe o edit.nome quando for pra editar
            user.data_nascimento.value = OnEdit.data_nascimento; //  input data_nasc. recebe o edit.nome quando for pra editar
        }
    }, [OnEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current; // user referencia o formulario

        // Verifica se os campos estão preenchidos.
        if (
            !user.nome.value ||
            !user.email.value ||
            !user.fone.value ||
            !user.data_nascimento.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        // verifica se é uma editção
        if (OnEdit) {

            await axios.put("http://localhost:8800/" + OnEdit.id, {
                nome: user.nome.value,
                email: user.email.value,
                fone: user.fone.value,
                data_nascimento: user.data_nascimento.value,
            }).then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));

        } else {

            await axios.post("http://localhost:8800", {
                nome: user.nome.value,
                email: user.email.value,
                fone: user.fone.value,
                data_nascimento: user.data_nascimento.value,
            })
                .then(({ data }) => toast.success(data))
                .then(({ data }) => toast.error(data));
        }

        // limpa o form depois de editar/postar algo no form.
        user.nome.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.data_nascimento.value = "";

        setOnEdit(null); // para fazer uma inclusao depois do edit sem dar conflito.
        getUsers(); // atualiza o grid, fazendo uma nova requisição pegando todos os itens
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>Email</Label>
                <Input name="email" type="email" />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="fone" />
            </InputArea>
            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name="data_nascimento" type="date" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    )
}

export default Form;