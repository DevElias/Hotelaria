<div class="section-name">
    <div class="container">
        <div class="row flex-column-reverse flex-md-row">
            <div class="col-12 col-md-6">
                <h1>Olá, <?php echo($_SESSION['nome'] ?? '');?></h1>
                <p>Aqui você encontra todos os procedimentos da Hotelaria Brasil, consulta as perguntas frequentes e vagas em aberto. Aproveite!
                </p>
            </div>
            <div class="col-12 col-md-4  offset-md-2">
                <div class="form-group has-search d-none">
                    <img src="{{ asset('img/ico-pesquisa.svg') }}" class="btn-search">
                    <input type="text" class="form-control" placeholder="Digite aqui o que você procura">
                </div>
            </div>
        </div>
    </div>
</div>
