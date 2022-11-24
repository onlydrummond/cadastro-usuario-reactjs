import axios from "axios";
import React, { useEffect, useRef } from 'react';
import styled from "styled-components";

import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 60px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    justify-content: center;
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

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.Nome.value = onEdit.Nome;
            user.Telefone.value = onEdit.Telefone;
            user.Data_Nascimento.value = onEdit.Data_Nascimento;
            user.Email.value = onEdit.Email;
            user.Senha.value = onEdit.Senha;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = ref.current;
        console.log(user.Telefone.current.value);
        // if
        //     (
        //     !user.Nome_Completo.value ||
        //     !user.Telefone.value ||
        //     !user.Data_Nascimento.value ||
        //     !user.Email.value ||
        //     !user.Senha.value 
        //     )
        // {
        //     return toast.warn("Preencha todos os campos!");
        // }

        if (onEdit) {
            await axios
            .put("http://localhost:8800/" + onEdit.id, {
                // Nome_Completo: user.Nome_Completo.value,
                // Telefone: user.Telefone.value,
                // Data_Nascimento: user.Data_Nascimento.value,
                // Email: user.Email.value,
                // Senha: user.Senha.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8800", {
                    // Nome_Completo: user.Nome_Completo.value,
                    // Telefone: user.Telefone.value,
                    // Data_Nascimento: user.Data_Nascimento.value,
                    // Email: user.Email.value,
                    // Senha: user.Senha.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        // user.Nome_Completo.value = "";
        // user.Telefone.value = "";
        // user.Data_Nascimento.value = "";
        // user.Email.value="";
        // user.Senha.value="";
        
        setOnEdit(null);
        getUsers();
    };
    
    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label> Nome Completo </Label>
                <Input name="Nome_Completo"/>
            </InputArea>
            <InputArea>
                <Label> Telefone </Label>
                <Input name="Telefone" type="telefone" />
            </InputArea>
            <InputArea>
                <Label> Data de Nascimento </Label>
                <Input name="Data_Nasc" type="date" />
            </InputArea>
            <InputArea>
                <Label> Email </Label>
                <Input name="Email" type="email" />
            </InputArea>
            <InputArea>
                <Label> Senha </Label>
                <Input name="Senha" type="password" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;
