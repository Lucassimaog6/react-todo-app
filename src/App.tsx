import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CardItem } from './CardItem';
import { Header } from './Header';

interface Todo {
	id: string;
	name: string;
	createdAt: number;
	completed: boolean;
}

function App() {
	const [todos, setTodos] = useState(Array<Todo>);
	const [currentInput, setCurrentInput] = useState('');

	useEffect(() => {
		if (todos.length > 0) {
			localStorage.setItem('todos', JSON.stringify(todos));
		}
	}, [todos]);

	useEffect(() => {
		const storageTodos = localStorage.getItem('todos');
		if (storageTodos !== undefined && storageTodos !== null) {
			setTodos(JSON.parse(storageTodos));
		}
	}, []);

	const createTodo = () => {
		if (currentInput === '' || currentInput === undefined) {
			return;
		}
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
			<Header currentInput={currentInput} setCurrentInput={setCurrentInput} createTodo={createTodo} />
			<div className='flex flex-col gap-4 w-11/12 max-w-screen-sm'>
				{todos.map((todo) => CardItem(todo, completeTodo, deleteTodo))}
			</div>
		</main>
	);
}

export default App;
