import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock, MdPersonOutline } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useForm } from "react-hook-form";

import { Container, Title, Column, TitleLogin, SubtitleLogin, jaTenhoContaText, fazerLoginText, Row, Wrapper } from './styles';

const schema = yup.object({
    nome: yup.string().required('Campo obrigatório'),
    email: yup.string().email('email não é válido').required('campo obrigatório'),
    password: yup.string().min(3, 'no mínimo 3 caracteres').required('campo obrigatório'),
}).required();

const Cadastro = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    console.log( errors );

    const onSubmit = async (formData) => {
        try {
            // Chamada à API para criar um novo usuário
            const { data } = await api.post('/users', {
                nome: formData.nome,
                email: formData.email,
                senha: formData.password
            });
    
            if (data) {
                alert('Usuário cadastrado com sucesso!');
                navigate('/login'); 
            }
        } catch (e) {
            alert('Erro ao cadastrar usuário. Tente novamente!');
        }
    };
    

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome completo" leftIcon={<MdPersonOutline />} name="nome"  control={control} />
                    {errors.nome && <span>Nome é obrigatório</span>}
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" errorMessage={errors?.email?.message} control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="password" errorMessage={errors?.password?.message} control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Entrar" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <jaTenhoContaText>Já tenho conta.</jaTenhoContaText>
                    <fazerLoginText>Fazer login</fazerLoginText>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Cadastro }