import { Button, Card } from 'flowbite-react';
import x from '../img/x.png';
import pencil from '../img/pencil.png';

interface Todo {
	id: string;
	name: string;
	createdAt: number;
	completed: boolean;
}

export function CardItem(
	todo: Todo,
	completeTodo: (id: string) => void,
	deleteTodo: (id: string) => void
): JSX.Element {
	return (
		<Card key={todo.id} className='w-full'>
			{todo.completed ? (
				<h1 className='text-2xl sm:text-4xl text-center line-through text-gray-500'>{todo.name}</h1>
			) : (
				<h1 className='text-2xl sm:text-4xl text-center'>{todo.name}</h1>
			)}
			<div className='flex gap-2 flex-col sm:flex-row'>
				<Button className='flex-1' onClick={() => completeTodo(todo.id)}>
					Completar!
					<img src={pencil} className='h-5 pl-1' />
				</Button>
				<Button className='flex-1 bg-red-800 hover:bg-red-900' onClick={() => deleteTodo(todo.id)}>
					Apagar!
					<img src={x} className='h-5 pl-1' />
				</Button>
			</div>
		</Card>
	);
}
