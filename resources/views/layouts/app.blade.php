@include('layouts.header')
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md header-system login-nav">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    <img src="{{ asset('img/logo-hotelaria-brasil-portal.svg') }}" alt="Hotelaria Brasil">
                </a>
            </div>
        </nav>

            @yield('content')

            <div class="footer footersitemobile">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-md-4 col-lg-2 social-icons">
                            <a target="_blank" href="https://www.facebook.com/hotelariabrasil">
                                <img src="{{ asset('img/ico-rodape-face.svg') }}" alt="Facebook">
                            </a>
                            <a target="_blank" href="https://www.instagram.com/hotelariabrasil/">
                                <img src="{{ asset('img/ico-rodape-insta.svg') }}" alt="Instagram">
                            </a>
                            <a target="_blank" href="https://www.linkedin.com/company/hotelaria-brasil/">
                                <img src="{{ asset('img/ico-rodape-linkedin.svg') }}" alt="Linkedin">
                            </a>
                            <hr class="linhamobile"/>
                        </div>
                        <div class="col-6 col-md-4 col-lg-2">
                            <h3>Hotelaria Brasil</h3>
                            <ul>
                                <li>
                                    <a href="http://www.hotelariabrasil.com.br/institucional">Quem somos</a>
                                </li>
                                <li>
                                    <a href="http://www.hotelariabrasil.com.br/eventos">Seu evento</a>
                                </li>
                                <li>
                                    <a href="http://www.hotelariabrasil.com.br/contato">Contato</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-6 col-md-4 col-lg-2">
                            <h3>Descubra</h3>
                            <ul>
                                <li>
                                    <a href="http://www.hotelariabrasil.com.br/ofertas">Ofertas</a>
                                </li>
                                <li>
                                    <a href="http://www.hotelariabrasil.com.br/hoteis">Nossos hotéis</a>
                                </li>
                                <li>
                                    <a href="http://www.hotelariabrasil.com.br/fidelidade">Fidelidade</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-6 col-md-4 col-lg-2">
                            <h3>Investimentos</h3>
                            <ul>
                                <li>
                                    <a href="http://www.hotelariabrasil.com.br/investidores">Quero investir</a>
                                </li>
                                <li>
                                    <a href="http://portaldoinvestidor.hotelariabrasil.com.br/login">Portal do investidor</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-6 col-md-4 col-lg-2">
                         <h3>Recursos</h3>
                            <ul>
                                <li>
                                    <a href="http://extranet.hotelariabrasil.com.br/entrar.php">Extranet</a>
                                </li>
                                <li>
                                    <a href="http://hotelariabrasil.woli.com.br/">Universidade Corporativa</a>
                                </li>
                                <li>
                                    <a target="_blank" href="http://www.hotelariabrasil.com.br/assets/files/termos-de-uso_2017-01.pdf">Termos de Uso</a>
                                </li>
                                <li>
                                    <a href="http://www.hotelariabrasil.com.br/assets/files/politica-privacidade_2017-01.pdf">Políticas de Privacidade</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-12 col-md-4 col-lg-2">
                            <h3>Reservas</h3>
                            <ul>
                                <li>
                                    <a href="tel:08000144040">0800 014 4040</a>
                                </li>
                                <li>
                                    <a href="mailto:reservas@hotelariabrasil.com.br">reservas@hotelariabrasil.com.br</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row line-style">
                        @include('layouts.footercommon')
                    </div>
                </div>
            </div>
    </div>
</body>
</html>
