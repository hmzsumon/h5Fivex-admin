import React from 'react';

interface ToggleSwitchProps {
	title: string;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
	title,
	checked = false,
	onChange,
}) => {
	const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e.target.checked);
		}
	};

	return (
		<div>
			<label className='inline-flex items-center cursor-pointer'>
				<input
					type='checkbox'
					checked={checked}
					onChange={handleToggle}
					className='sr-only peer'
				/>
				<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				<span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-900'>
					{title}
				</span>
			</label>
		</div>
	);
};

export default ToggleSwitch;
