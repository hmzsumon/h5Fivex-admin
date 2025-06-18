'use client';

import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import ItemCard from '@/components/Dashboard/ItemCard';
import {
	useGetAdminDashboardDataQuery,
	useUpdateProfitStatusMutation,
	useUpdateUserFcmTokenMutation,
} from '@/redux/features/admin/adminApi';
import { Card } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { GiReceiveMoney } from 'react-icons/gi';
import { FaWallet, FaUsers } from 'react-icons/fa';
import { CiInboxOut } from 'react-icons/ci';
import { requestForToken } from '@/lib/firebase';
import { useSelector } from 'react-redux';

const Dashboard = () => {
	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading } = useGetAdminDashboardDataQuery(undefined);
	const { dashboardData } = data || {};
	const [status, setStatus] = useState(dashboardData?.is_profit);

	const [
		updateProfitStatus,
		{ isLoading: updating, isError, isSuccess, error },
	] = useUpdateProfitStatusMutation();

	useEffect(() => {
		setStatus(dashboardData?.is_profit);
	}, [dashboardData]);

	const updateHandler = async () => {
		try {
			await updateProfitStatus({ is_profit: !status }).unwrap();
			setStatus((prevStatus: any) => !prevStatus);
		} catch (error) {
			console.error('Failed to update profit status', error);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Update successfully');
		}

		if (isError) {
			if (isError && error) {
				toast.error((error as fetchBaseQueryError).data?.message);
			}
		}
	}, [isSuccess, isError, error]);

	return (
		<div className='z-0 px-2'>
			<div className='py-4'>
				<div className='my-6 grid md:grid-cols-2 gap-4'>
					<ItemCard
						icon={<GiReceiveMoney />}
						title='Total Deposit'
						balance={dashboardData?.totalDeposits}
						balance2={dashboardData?.totalBlockBeeDepDeposits}
						is_balance={true}
					/>
					<ItemCard
						icon={<FaWallet />}
						title='Today Deposit'
						balance={dashboardData?.todayDeposits}
						balance2={dashboardData?.todayBlockBeeDepDeposits}
						is_balance={true}
					/>
					<ItemCard
						icon={<FaWallet />}
						title='Total Deposit Fee'
						balance={dashboardData?.totalDepositFee}
						is_balance={true}
					/>
					{/* Withdraw  */}
					<ItemCard
						icon={<CiInboxOut />}
						title='Total Withdraw'
						balance={dashboardData?.totalWithdraw}
						is_balance={true}
					/>
					<ItemCard
						icon={<CiInboxOut />}
						title='Total Net Withdraw'
						balance={dashboardData?.totalNetWithdraw}
						is_balance={true}
					/>
					<ItemCard
						icon={<CiInboxOut />}
						title='Today Withdraw'
						balance={dashboardData?.todayWithdraw}
						is_balance={true}
					/>
					<ItemCard
						icon={<CiInboxOut />}
						title='Total Withdraw Fee'
						balance={dashboardData?.totalWithdrawFee}
						is_balance={true}
					/>
					{/* Users */}
					<ItemCard
						icon={<FaUsers />}
						title='Total Users'
						balance={dashboardData?.totalUsers}
						is_balance={false}
					/>
					<ItemCard
						icon={<FaUsers />}
						title='Today Users'
						balance={dashboardData?.todayNewUsers}
						is_balance={false}
					/>
					<ItemCard
						icon={<FaUsers />}
						title='Today Active Users'
						balance={dashboardData?.todayActiveUsers}
						is_balance={false}
					/>
					<ItemCard
						icon={<FaUsers />}
						title='Total Active Users'
						balance={dashboardData?.totalActiveUsers}
						is_balance={false}
					/>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
