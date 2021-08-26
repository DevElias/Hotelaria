<?php
use Illuminate\Database\Seeder;

class TasksTableSeeder extends Seeder {
    public function run() {
        $tasks = [
            [1, 'Buy a Bread', '','2020-03-02'],
            [1, 'Fix the TV', '','2020-02-09'],
            [1, 'Water the Plants', 1,'2019-12-10'],
            [1, 'Clean the House', 1,'2020-01-09'],
            [1, 'Wash the Clothes', 1,'2020-02-09'],
            [1, 'Pay the rent', '','2020-04-09'],
            [2, 'Buy a Bread', '','2020-03-02'],
            [2, 'Fix the TV', '','2020-02-09'],
            [2, 'Water the Plants', 1,'2019-12-10'],
            [2, 'Clean the House', 1,'2020-01-09'],
            [2, 'Wash the Clothes', 1,'2020-02-09'],
            [2, 'Pay the rent', '','2020-04-09'],
            [3, 'Wash the Clothes', 1,'2020-02-09'],
            [3, 'Pay the rent', '','2020-04-09'],
            [3, 'Buy a Bread', '','2020-03-02'],
            [3, 'Fix the TV', '','2020-02-09'],
        ];

        for ($i = 0; $i < count($tasks); $i++) {
            DB::table('tasks')->insert([
                'user_id' => $tasks[$i][0],
                'title' => $tasks[$i][1],
                'completed' => $tasks[$i][2],
                'estimated_at' => $tasks[$i][3],
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
