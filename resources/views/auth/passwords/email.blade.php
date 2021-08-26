@extends('layouts.app')

@section('content')
<div class="bg-login">
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-4">

                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        <form method="POST" action="{{ route('password.email') }}">
                            @csrf

                            <div class="form-group row">
                                <a href="{{ url('/login') }}"> Voltar</a>
                                <p>Redefina sua senha através do seu e-mail cadastrado:</p>
                                <label for="email" class="col-12 col-md-8 col-form-label ">{{ __('Seu e-mail') }}</label>

                                <div class="col-12">
                                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                    @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-6">
                                    <button type="submit" class="btn btn-primary btn-block">
                                        {{ __('Recuperar senha') }}
                                    </button>
                                </div>
                            </div>
                        </form>
            </div>
        </div>
    </div>
</div>

@include('layouts.perguntas')
@endsection
