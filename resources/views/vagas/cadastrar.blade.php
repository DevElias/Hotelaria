@extends('layouts.applogado')

@section('content')
<div class="section-dashclient custom-headervagas">
    @include('layouts.headervagas')
    <div class="container">
        <div class="row vagas">
            <div class="col-12">
                <h2>Cadastrar/Atualizar Currículo</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-8">
                <form class="form-cadastrarcv">
                    <div class="form-group row">
                        <div class="col-12 col-md-8">
                            <label>Nome Completo*:</label>
                            <input id="nome" type="text" class="form-control-rounded form-control" name="nome" />
                        </div>
                        <div class="col-12 col-md-4">
                            <label>CPF*:</label>
                            <input id="cpf" type="text" class="form-control-rounded form-control" name="email" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12 col-md-4">
                            <label>E-mail*:</label>
                            <input id="email" type="email" class="form-control-rounded form-control" name="nome" />
                        </div>
                        <div class="col-12 col-md-4">
                            <label>Telefone*:</label>
                            <input id="telefone" type="text" class="form-control-rounded form-control" name="tel" />
                        </div>
                        <div class="col-12 col-md-4">
                            <label>Celular*:</label>
                            <input id="cel" type="text" class="form-control-rounded form-control" name="cel" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12 col-md-8">
                            <label>Endereço*:</label>
                            <input id="end" type="text" class="form-control-rounded form-control" name="end" />
                        </div>
                        <div class="col-12 col-md-4">
                            <label>Número*:</label>
                            <input id="numero" type="text" class="form-control-rounded form-control" name="numero" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12 col-md-4">
                            <label>Complemento*:</label>
                            <input id="complemento" type="text" class="form-control-rounded form-control" name="complemento" />
                        </div>
                        <div class="col-12 col-md-4">
                            <label>CEP*:</label>
                            <input id="cep" type="text" class="form-control-rounded form-control" name="cep" />
                        </div>
                        <div class="col-12 col-md-4">
                            <label>Bairro*:</label>
                            <input id="bairro" type="text" class="form-control-rounded form-control" name="bairro" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12 col-md-6">
                            <label>Estado*:</label>
                            <select id="inputState" class="form-control">
                                <option selected>Selecione...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6">
                            <label>Cidade*:</label>
                            <select id="inputState" class="form-control">
                                <option selected>Selecione...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div class="col-12">
                            <hr />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12">
                            <h3><strong>Área de interesse*</strong> (escolha até 3 áreas e no minimo 1)</h3>
                        </div>
                        <div class="form-check col-12 col-md-4">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                                Área de interesse 1
                            </label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12">
                            <hr />
                        </div>
                        <div class="col-12">
                            <h3><strong>Onde gostaria de trabalhar*</strong> (escolha até 2 cidades no minimo 1)</3>
                        </div>
                        <div class="col-12 col-md-6">
                            <label>Estado*:</label>
                            <select id="inputState" class="form-control">
                                <option selected>Selecione...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6">
                            <label>Cidade*:</label>
                            <select id="inputState" class="form-control">
                                <option selected>Selecione...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div class="col-12">
                            <hr />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12">
                            <h3><strong>Trabalha ou já trabalhou em algum hotel administrado pela Hotelaria Brasil?</strong></h3>
                        </div>
                        <div class="form-check col-12 col-md-4">
                            <input class="form-check-input" type="radio" name="trabalho">
                            <label class="form-check-label" for="defaultCheck1">
                                Sim
                            </label>
                        </div>
                        <div class="form-check col-12 col-md-4">
                            <input class="form-check-input" type="radio" name="trabalho" >
                            <label class="form-check-label" for="defaultCheck1">
                                Não
                            </label>
                        </div>

                        <div class="col-12">
                            <hr />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="form-check col-12">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                            *Li e concordo com os <a href="#"> Termos e condições</a> do banco de talentos da Hotelaria Brasil.
                            </label>
                            <p class="italic">Os termos e condições devem informar que a Hotelaria Brasil irá utilizar esses dados apenas para fins de análise de currículo para contratação e que após o período de 180 dias sem atualização do cadastro, os dados serão excluídos.</p>
                        </div>
                        <div class="form-check col-12">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                            *Li e concordo com os <a href="#"> Política de Privacidade</a> da Hotelaria Brasil.
                            </label>
                        </div>
                        <div class="form-check col-12">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                            *Li e concordo com os <a href="#"> Código de Ética</a> da Hotelaria Brasil.
                            </label>
                        </div>
                        <div class="form-check col-12">
                            <button type="submit" class="btn btn-salvar">
                                Salvar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>


    </div>
</div>
@endsection
