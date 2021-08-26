@extends('layouts.applogado')

@section('content')
@include('layouts.introcliente')
<div class="section-dashclient">
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-8">
                <div class="row busca">
                    <div class="col-12 col-md-8">
                        <h3>Procedimentos</h3>
                    </div>
                    <div class="col-12 col-md-4 text-right">
                        <div class="btn-group">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Ordenar
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Alfabética [a-z]</a>
                                <a class="dropdown-item" href="#">Alfabética [z-a]</a>
                            </div>
                        </div>
                        <div class="btn-group">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Filtrar
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Procedimentos</a>
                                <a class="dropdown-item" href="#">Vagas</a>
                                <a class="dropdown-item" href="#">Perguntas Frequentes</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <hr />
                    </div>
                    <div class="col-12">
                        <p class="legendas-busca">Legenda: <span class="leg-procedimento">Procedimentos</span> <span class="leg-perguntas">Perguntas Frequentes</span> <span class="leg-vagas">Vagas</span> </p>
                    </div>
                    <div class="col-12 outros">
                            <div class="card">
                                <div class="card-content">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                                    <p class="cat">Categoria: <span>Desbravador /Administrativo Financeiro</span></p>
                                </div>
                                <div class="card-saiba">
                                    <a href="#">
                                        Saiba mais <img src="{{ asset('img/ico-visualizar.svg') }}" alt="Visualizar">
                                    </a>
                                </div>
                            </div>
                        </div>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                                <p class="cat">Categoria: <span>Desbravador /Administrativo Financeiro</span></p>
                            </div>
                            <div class="card-viz">
                                <a href="#">
                                    <img src="{{ asset('img/ico-visualizar.svg') }}" alt="Visualizar"><br>
                                    Visualizar</a>
                            </div>
                            <div class="card-baixa">
                                <a href="#"><img src="{{ asset('img/ico-baixar.svg') }}" alt="Visualizar"><br>
                                Baixar</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                                <p class="cat">Categoria: <span>Desbravador /Administrativo Financeiro</span></p>
                            </div>
                            <div class="card-viz">
                                <a href="#">
                                    <img src="{{ asset('img/ico-visualizar.svg') }}" alt="Visualizar"><br>
                                    Visualizar</a>
                            </div>
                            <div class="card-baixa">
                                <a href="#"><img src="{{ asset('img/ico-baixar.svg') }}" alt="Visualizar"><br>
                                Baixar</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                                <p class="cat">Categoria: <span>Desbravador /Administrativo Financeiro</span></p>
                            </div>
                            <div class="card-viz">
                                <a href="#">
                                    <img src="{{ asset('img/ico-visualizar.svg') }}" alt="Visualizar"><br>
                                    Visualizar</a>
                            </div>
                            <div class="card-baixa">
                                <a href="#"><img src="{{ asset('img/ico-baixar.svg') }}" alt="Visualizar"><br>
                                Baixar</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                                <p class="cat">Categoria: <span>Desbravador /Administrativo Financeiro</span></p>
                            </div>
                            <div class="card-viz">
                                <a href="#">
                                    <img src="{{ asset('img/ico-visualizar.svg') }}" alt="Visualizar"><br>
                                    Visualizar</a>
                            </div>
                            <div class="card-baixa">
                                <a href="#"><img src="{{ asset('img/ico-baixar.svg') }}" alt="Visualizar"><br>
                                Baixar</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <nav aria-label="Page navigation">
                            <ul class="pagination justify-content-end">
                                <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">01</a></li>
                                <li class="page-item"><a class="page-link" href="#">02</a></li>
                                <li class="page-item"><a class="page-link" href="#">03</a></li>
                                <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span class="sr-only">Next</span>
                                </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                 </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card card-aviso">
                    <div class="card-body">
                        <h3>Não encontrou o que precisa?</h3>
                         <p>Consectetur adipiscing elit. Ac massa lorem viverra et ac fermentum  male.</p>
                         <p><a href="{{ url('dashboard-cliente') }}"> Ir para Home <img src="{{ asset('img/ico-seta-dir-preta.svg') }}" alt="Home"></a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
