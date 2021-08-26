import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './login/Login';
import Usuarios from './usuarios/Usuarios';
import UsuariosPerfil from './usuarios/UsuariosPerfil';
import Categorias from './categorias/Categorias';
import AdminCategorias from './categorias/AdminCategorias';
import Subcategorias from './subcategorias/Subcategorias';
import AdminSubCategorias from './subcategorias/AdminSubCategorias';
import IndexProcedimentos from './procedimentos/Index';
import AdminProcedimentos from './procedimentos/AdminProcedimentos';
import Procedimentos from './procedimentos/Procedimentos';
import Areas from './areas/Areas';
import AdminAreas from './areas/AdminAreas';
import Cargos from './cargos/Cargos';
import AdminCargos from './cargos/AdminCargos';
import AdminVagas from './vagas/AdminVagas';
import Vagas from './vagas/Vagas';
import IndexVagas from './vagas/Index';
import Hoteis from './hoteis/Hoteis';
import AdminHoteis from './hoteis/AdminHoteis';
import VagaDetalhe from './vagas/VagaDetalhe';
import CategoriasPerguntas from './categoriasperguntas/CategoriasPerguntas';
import AdminCategoriasPerguntas from './categoriasperguntas/AdminCategoriasPerguntas';
import AdminUsuarios from './usuarios/AdminUsuarios';
import Perguntas from './perguntas/Perguntas';
import AdminPerguntas from './perguntas/AdminPerguntas';
import IndexPerguntas from './perguntas/Index';
import Candidatos from './candidatos/Candidatos';
import AdminCandidatos from './candidatos/AdminCandidatos';
import ExcluirCV from './candidatos/ExcluirCV';
import DetalheCandidatos from './candidatos/DetalheCandidatos';
import Dashboard from './dashboard/Dashboard';
import Esqueci from './usuarios/Esqueci';
import AdminVagasCandidatos from './vagas/AdminVagasCandidatos';


if (document.getElementById('root')) {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}

if (document.getElementById('categorias')) {
    ReactDOM.render(
        <Categorias />,
        document.getElementById('categorias')
    );
}

if (document.getElementById('adminlistacategorias')) {
    ReactDOM.render(
        <AdminCategorias />,
        document.getElementById('adminlistacategorias')
    );
}

if (document.getElementById('usuarios')) {
    ReactDOM.render(
        <Usuarios />,
        document.getElementById('usuarios')
    );
}

if (document.getElementById('usuariosperfil')) {
    ReactDOM.render(
        <UsuariosPerfil />,
        document.getElementById('usuariosperfil')
    );
}

if (document.getElementById('subcategorias')) {
    ReactDOM.render(
        <Subcategorias />,
        document.getElementById('subcategorias')
    );
}

if (document.getElementById('adminlistasubcategorias')) {
    ReactDOM.render(
        <AdminSubCategorias />,
        document.getElementById('adminlistasubcategorias')
    );
}

if (document.getElementById('listaprocedimentos')) {
    ReactDOM.render(
        <IndexProcedimentos />,
        document.getElementById('listaprocedimentos')
    );
}

if (document.getElementById('adminlistaprocedimentos')) {
    ReactDOM.render(
        <AdminProcedimentos />,
        document.getElementById('adminlistaprocedimentos')
    );
}

if (document.getElementById('procedimentos')) {
    ReactDOM.render(
        <Procedimentos />,
        document.getElementById('procedimentos')
    );
}

if (document.getElementById('login')) {
    ReactDOM.render(
        <Login />,
        document.getElementById('login')
    );
}

if (document.getElementById('dash-cliente')) {
    ReactDOM.render(
        <Usuarios />,
        document.getElementById('dash-cliente')
    );
}

if (document.getElementById('areas')) {
    ReactDOM.render(
        <Areas />,
        document.getElementById('areas')
    );
}

if (document.getElementById('adminlistaareas')) {
    ReactDOM.render(
        <AdminAreas />,
        document.getElementById('adminlistaareas')
    );
}

if (document.getElementById('cargos')) {
    ReactDOM.render(
        <Cargos />,
        document.getElementById('cargos')
    );
}

if (document.getElementById('adminlistacargos')) {
    ReactDOM.render(
        <AdminCargos />,
        document.getElementById('adminlistacargos')
    );
}

if (document.getElementById('vagas')) {
    ReactDOM.render(
        <Vagas />,
        document.getElementById('vagas')
    );
}

if (document.getElementById('listavagas')) {
    ReactDOM.render(
        <IndexVagas />,
        document.getElementById('listavagas')
    );
}

if (document.getElementById('hoteis')) {
    ReactDOM.render(
        <Hoteis />,
        document.getElementById('hoteis')
    );
}

if (document.getElementById('adminlistahoteis')) {
    ReactDOM.render(
        <AdminHoteis />,
        document.getElementById('adminlistahoteis')
    );
}

if (document.getElementById('vaga_detalhe')) {
    ReactDOM.render(
        <VagaDetalhe />,
        document.getElementById('vaga_detalhe')
    );
}

if (document.getElementById('categoriasperguntas')) {
    ReactDOM.render(
        <CategoriasPerguntas />,
        document.getElementById('categoriasperguntas')
    );
}

if (document.getElementById('adminlistacategoriasperguntas')) {
    ReactDOM.render(
        <AdminCategoriasPerguntas />,
        document.getElementById('adminlistacategoriasperguntas')
    );
}

if (document.getElementById('adminvagas')) {
    ReactDOM.render(
        <AdminVagas />,
        document.getElementById('adminvagas')
    );
}

if (document.getElementById('adminusuarios')) {
    ReactDOM.render(
        <AdminUsuarios />,
        document.getElementById('adminusuarios')
    );
}

if (document.getElementById('perguntas')) {
    ReactDOM.render(
        <Perguntas />,
        document.getElementById('perguntas')
    );
}


if (document.getElementById('adminperguntas')) {
    ReactDOM.render(
        <AdminPerguntas />,
        document.getElementById('adminperguntas')
    );
}

if (document.getElementById('listaperguntas')) {
    ReactDOM.render(
        <IndexPerguntas />,
        document.getElementById('listaperguntas')
    );
}

if (document.getElementById('candidatos')) {
    ReactDOM.render(
        <Candidatos />,
        document.getElementById('candidatos')
    );
}

if (document.getElementById('excluircv')) {
    ReactDOM.render(
        <ExcluirCV />,
        document.getElementById('excluircv')
    );
}

if (document.getElementById('adminlistacandidatos')) {
    ReactDOM.render(
        <AdminCandidatos />,
        document.getElementById('adminlistacandidatos')
    );

}

if (document.getElementById('detalhecandidato')) {
    ReactDOM.render(
        <DetalheCandidatos />,
        document.getElementById('detalhecandidato')
    );

}

if (document.getElementById('dashboard')) {
    ReactDOM.render(
        <Dashboard />,
        document.getElementById('dashboard')
    );

}

if (document.getElementById('esqueci')) {
    ReactDOM.render(
        <Esqueci />,
        document.getElementById('esqueci')
    );

}

if (document.getElementById('adminlistavagascandidatos')) {
    ReactDOM.render(
        <AdminVagasCandidatos />,
        document.getElementById('adminlistavagascandidatos')
    );

}
