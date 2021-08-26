@include('layouts.header')
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md header-system">
            <div class="container">
                <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="#">
                    <img src="{{ asset('img/logo-hotelaria-portal-menor.svg') }}" class="logo" alt="Hotelaria Brasil">
                </a>
                <div class="fotomobile d-block d-sm-none">
                    <img src="<?php echo($_SESSION['foto'] ?? '');?>" alt="<?php echo($_SESSION['nome'] ?? '');?>"  class="img-menu-circle">
                </div>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->

                    <div class="d-block d-sm-none minhacontamobile">
                        <div class="d-block text-center">
                            <img src="<?php echo($_SESSION['foto'] ?? '');?>" alt="<?php echo($_SESSION['nome'] ?? '');?>" class="img-circle">
                        </div>
                        <div  class="d-block text-center nomemobile">
                        <?php echo($_SESSION['nome'] ?? ''); ?>
                        </div>
                        <div class="d-block text-center">
                        <a href="{{ url('usuarios/perfil') }}"><img src="{{ asset('img/ico-editar-perfil.svg') }}" alt=""> Editar Perfil</a> <a href="{{ url('sair') }}"> <img src="{{ asset('img/ico-sair.svg') }}" alt=""> Sair</a>
                        </div>
                    </div>
                    <ul class="navbar-nav menu-custom">
                            <li>
                            <a href="{{ url('dashboard-cliente') }}" class="{{ (request()->is('dashboard-cliente')) ? 'active' : '' }}">Home</a>
                        </li>
                        <li>
                            <a href="{{ url('procedimentos/lista') }}" class="{{ (request()->is('procedimentos/lista')) ? 'active' : '' }}">Procedimentos</a>
                        </li>
                        <li>
                            <a href="{{ url('perguntas/lista') }}" class="{{ (request()->is('perguntas/lista')) ? 'active' : '' }}">Perguntas Frequentes</a>
                        </li>
                        <li>
                            <a href="{{ url('vagas') }}" class="{{ (request()->is('vagas')) ? 'active' : '' }}">Vagas</a>
                        </li>
                        <li>
                            <a href="{{ url('usuarios/perfil') }}" class="{{ (request()->is('usuarios/perfil')) ? 'active' : '' }}">Dados do usuário</a>
                        </li>
                    </ul>
                    <div class="d-block d-sm-none text-center linkvoltarmobile">
                        <a href="http://www.hotelariabrasil.com.br/home" class="btn btn-link"><img src="{{ asset('img/ico-seta-esq.svg') }}" alt="Voltar"> Voltar ao Site</a>
                    </div>
                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto removemobile">
                        <!-- Authentication Links -->
                        <a href="<?php if (env('APP_ENV') != 'local'): ?>http://www.hotelariabrasil.com.br/home<?php else: ?>#<?php endif; ?>" class="btn btn-link"><img src="{{ asset('img/ico-seta-esq.svg') }}" alt="Voltar"> Voltar ao Site</a>
                        <div class="dropdown">
                            <button class="btn dropdown-toggle paddingtop20" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <?php echo($_SESSION['nome'] ?? ''); ?>
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="{{ url('usuarios/perfil') }}">Minha Conta</a>
                                <a class="dropdown-item" href="/sair">Sair</a>
                            </div>
                            <img src="<?php echo($_SESSION['foto'] ?? '');?>" alt="<?php echo($_SESSION['nome'] ?? '');?>" class="img-menu-circle customimgperfil">
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
<?php if (isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] == 0): ?>
        <div class="menuadmin">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <a class="navbar-brand" href="#">Menu Admin:</a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul class="navbar-nav">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Procedimentos
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a class="dropdown-item" href="/procedimentos/admin">Listagem de Procedimentos</a>
                                        <a class="dropdown-item" href="/categorias/admin">Categorias</a>
                                        <a class="dropdown-item" href="/subcategorias/admin">Subcategorias</a>
                                    </div>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Perguntas Frequentes
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a class="dropdown-item" href="/perguntas/admin">Listagem de Perguntas Frequentes</a>
                                        <a class="dropdown-item" href="/categoriasperguntas/admin">Categorias</a>
                                    </div>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Vagas
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a class="dropdown-item" href="/vagas/admin">Listagem de Vagas</a>
                                    <a class="dropdown-item" href="/areas/admin">Áreas</a>
                                    <a class="dropdown-item" href="/cargos/admin">Cargos</a>
                                    <a class="dropdown-item" href="/usuarios/admin">Responsáveis</a>
                                    <a class="dropdown-item" href="/hoteis/admin">Hotéis</a>
                                    </div>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Usuários
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a class="dropdown-item" href="/usuarios/admin">Listagem de Usuários</a>
                                    </div>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Candidatos
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a class="dropdown-item" href="/candidatos/admin">Banco de Talentos</a>
                                    </div>
                                </li>

                                </ul>
                            </div>
                        </nav>
                        </div>
                </div>
            </div>
        </div>
<?php endif; ?>
            <div class="min-height100">
            @yield('content')
            </div>
            <div class="footer footer-logado">
                <div class="container">
                    <div class="row">
                        @include('layouts.footercommon')
                    </div>
                </div>
            </div>
    </div>
</body>
</html>
