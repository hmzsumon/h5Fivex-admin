'use client';

import React from 'react';
import { toast } from 'react-toastify';

import { useAdminResetDailyTasksMutation } from '@/redux/features/admin/adminApi';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { PulseLoader } from 'react-spinners';
import { Button } from 'flowbite-react';

const Settings = () => {
	const [
		adminResetDailyTasks,
		{
			isLoading: isResettingDailyTasks,
			isSuccess: isResetDailyTasksSuccess,
			isError: isResetDailyTasksError,
			error: resetDailyTasksError,
			data: resetDailyTasksData,
		},
	] = useAdminResetDailyTasksMutation();

	// handle reset click
	const handleReset = async () => {
		const result = await adminResetDailyTasks(null);
		if ('data' in result) {
			toast.success(`✅ ${result.data.count} user's tasks reset successfully!`);
		} else {
			const err = (resetDailyTasksError as fetchBaseQueryError).data?.error;
			toast.error(`❌ Failed to reset tasks: ${err}`);
		}
	};

	return (
		<div className='p-6  mx-auto bg-gray-100 rounded-lg shadow-md dark:bg-gray-900 dark:text-white'>
			<h2 className='text-xl font-bold mb-4'>🛠️ Task Manager Settings</h2>

			<Button
				onClick={handleReset}
				disabled={isResettingDailyTasks}
				className='w-full flex justify-center items-center gap-2'
			>
				{isResettingDailyTasks ? (
					<>
						<PulseLoader size={8} color='white' />
						<span>Resetting...</span>
					</>
				) : (
					<span>🔄 Reset Daily Tasks</span>
				)}
			</Button>

			{resetDailyTasksData?.count !== undefined && (
				<p className='mt-4 text-sm text-green-600 dark:text-green-400'>
					✅ Tasks ready for <strong>{resetDailyTasksData.count}</strong> users.
				</p>
			)}
		</div>
	);
};

export default Settings;
