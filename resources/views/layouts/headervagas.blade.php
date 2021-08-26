<div class="header-vagas">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <a href="{{ url('dashboard-cliente') }}" class="link-back"><img src="{{ asset('img/ico-seta-esq-preta.svg') }}" alt="" /> Voltar para Home</a>
            </div>
            <div class="col-12">
                <hr />
            </div>
        </div>
        <div class="row justify-content-md-center menu-vagas">
            <div class="col-md-auto">
             <a href="{{ url('vagas') }}" class="{{ (request()->is('vagas')) ? 'active' : '' }}">Vagas em aberto</a>
            </div>
            <div class="col-md-auto border-divisor">
                <a href="{{ url('candidatos/cadastro') }}" class="{{ (request()->is('candidatos/cadastro')) ? 'active' : '' }}">Cadastrar/Atualizar Currículo</a>
            </div>
            <div class="col-md-auto">
                <a href="{{ url('candidatos/excluir') }}" class="{{ (request()->is('candidatos/excluir')) ? 'active' : '' }}">Excluir Currículo</a>
            </div>
        </div>
    </div>
</div>
