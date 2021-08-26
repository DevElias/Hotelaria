<div class="perguntas">
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h2>Perguntas?</h2>
                <p>Veja as dúvidas mais frequentes aqui:</p>
            </div>
            <div class="col-12 col-md-6">
                <div id="accordion">
                    <?php if(!empty($perguntas)): foreach($perguntas as $key => $pergunta): ?>
                    <div class="card-question">
                        <div class="card-header-question" id="pergunta<?=$pergunta->id?>">
                            <h5 class="mb-0">
                                <button class="btn btn-pergunta" data-toggle="collapse" data-target="#collapse<?=$pergunta->id?>" aria-expanded="false" aria-controls="collapse">
                                    <?=$pergunta->pergunta?>
                                </button>
                            </h5>
                        </div>
                        <div id="collapse<?=$pergunta->id?>" class="collapse" aria-labelledby="pergunta<?=$pergunta->id?>">
                            <div class="card-body-question">
                                <?=$pergunta->resposta?>
                            </div>
                        </div>
                    </div>
                    <?php endforeach; endif; ?>
                </div>
            </div>
        </div>
    </div>
</div>
