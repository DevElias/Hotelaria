<?php
namespace App\Models;

use App\Models\Task;
use App\Models\Usuarios;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable {
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    public function tasks() {
        return $this->hasMany(Task::class);
    }
    
    public function Usuarios() {
        return $this->hasMany(Usuarios::class);
    }
}
