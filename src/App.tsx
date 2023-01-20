import { useEffect, useState } from 'react';
import { TextInput, Button, Card } from 'flowbite-react';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
	id: string;
	name: string;
	createdAt: number;
	completed: boolean;
}

function App() {
	const [todos, setTodos] = useState(Array<Todo>);
	const [currentInput, setCurrentInput] = useState<string>('');

	const createTodo = () => {
		setCurrentInput('');
		const newTodo: Todo = {
			id: uuidv4(),
			name: currentInput,
			createdAt: Date.now(),
			completed: false,
		};
		setTodos([...todos, newTodo]);
	};

	const completeTodo = (id: string) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id == id) {
					return { ...todo, completed: !todo.completed };
				} else {
					return todo;
				}
			})
		);
	};

	const deleteTodo = (id: string) => {
		const todoToRemove = todos.find((t) => t.id === id);
		if (todoToRemove === undefined) {
			return;
		}
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<main className='min-h-screen flex flex-col items-center p-10 gap-4'>
			<div className='flex flex-col w-screen max-w-screen-sm'>
				<h1 className='text-center text-4xl font-bold mb-4'>Novo Todo:</h1>
				<div className='flex w-full gap-4'>
					<TextInput
						className='flex-1'
						value={currentInput}
						onChange={(e) => setCurrentInput(e.target.value)}
					/>
					<Button onClick={createTodo}>Enviar</Button>
				</div>
			</div>
			<div className='flex flex-col gap-4'>
				{todos.map((todo) => (
					<Card className='w-screen max-w-screen-sm'>
						{todo.completed ? (
							<h1 className='text-2xl text-center line-through text-gray-500'>{todo.name}</h1>
						) : (
							<h1 className='text-2xl text-center'>{todo.name}</h1>
						)}
						<div className='flex gap-4'>
							<Button className='flex-1' onClick={() => completeTodo(todo.id)}>
								Completar!
							</Button>
							<Button color='failure' className='flex-1' onClick={() => deleteTodo(todo.id)}>
								Apagar!
							</Button>
						</div>
					</Card>
				))}
			</div>
		</main>
	);
}

export default App;
