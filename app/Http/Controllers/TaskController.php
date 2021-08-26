<?php
namespace App\Http\Controllers;
use App\Http\Requests\TasksRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller {

    public function __construct() {
        $this->middleware('auth');
    }

    public function index(Request $request, Task $task) {
        $allTasks = $task->whereIn('user_id', $request->user())->with('user');
        $tasks = $allTasks->orderBy('estimated_at', 'desc')->take(10)->get();

        return response()->json([
            'tasks' => $tasks,
        ]);
    }

    public function store(TasksRequest $request) {
        $task = $request->user()->tasks()->create([
            'title' => $request->title,
            'estimated_at' => $request->estimated_at,
        ]);

        return response()->json($task->with('user')->find($task->id));
    }
}
