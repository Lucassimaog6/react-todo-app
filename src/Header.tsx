import { Button, TextInput } from 'flowbite-react';
import { MouseEventHandler, SetStateAction } from 'react';

export function Header(props: {
	currentInput: string | number | readonly string[] | undefined;
	setCurrentInput: (arg0: string) => void;
	createTodo: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
	return (
		<div className='flex flex-col w-11/12 max-w-screen-sm'>
			<h1 className='text-center text-4xl font-bold mb-4'>Novo Todo:</h1>
			<div className='flex w-full gap-4'>
				<TextInput
					className='flex-1'
					value={props.currentInput}
					onChange={(e) => props.setCurrentInput(e.target.value)}
				/>
				<Button onClick={props.createTodo}>Enviar</Button>
			</div>
		</div>
	);
}
