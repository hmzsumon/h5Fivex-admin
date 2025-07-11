'use client';
import { formatDate } from '@/lib/functions';
import { useGetUsersQuery } from '@/redux/features/auth/authApi';
import { Box, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaEye } from 'react-icons/fa';

import { useGetAllUsersQuery } from '@/redux/features/admin/adminApi';
import CustomNoRowsOverlay from '@/components/CustomNoRowsOverlay';
import CustomLoadingOverlay from '@/components/CustomLoadingOverlay';

const AllUsers = () => {
	const { data, isLoading, isError, isSuccess, error } =
		useGetAllUsersQuery(undefined);
	const { users } = data || [];
	const columns = [
		{
			field: 'date',
			headerName: 'Created At',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.date}</p>
				</div>
			),
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 250,
			renderCell: (params: any) => (
				<div className=''>
					<p>{params.row.name}</p>
				</div>
			),
		},
		{
			field: 'email',
			headerName: 'Email',
			width: 250,
			renderCell: (params: any) => (
				<div className=''>
					<p>{params.row.email}</p>
				</div>
			),
		},

		{
			field: 'customer_id',
			headerName: 'Customer ID',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.customer_id}</p>
				</div>
			),
		},

		{
			field: 'rank',
			headerName: 'Rank',
			width: 80,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.rank}</p>
				</div>
			),
		},

		{
			field: 'is_active',
			headerName: 'Status',
			width: 80,
			renderCell: (params: any) => {
				return (
					<div className='flex items-center'>
						{params.row.is_active ? (
							<p className='text-green-500 '>
								<span>Active</span>
							</p>
						) : (
							<p className='text-orange-500'>
								<span>Inactive</span>
							</p>
						)}
					</div>
				);
			},
		},
		{
			field: 'block',
			headerName: 'Block',
			width: 100,
			renderCell: (params: any) => {
				return (
					<div className='flex items-center'>
						{params.row.block === true && (
							<p className='text-danger '>
								<span>Blocked</span>
							</p>
						)}

						{params.row.block === false && (
							<p className='text-success '>
								<span>Not Blocked</span>
							</p>
						)}
					</div>
				);
			},
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 60,
			renderCell: (params: any) => {
				return (
					<div className='flex items-center justify-center  w-full'>
						<Link href={`/users/${params.row.id}`} passHref>
							<span className='text-center bg-red-500'>
								<FaEye />
							</span>
						</Link>
					</div>
				);
			},
		},
	];

	const rows: any = [];

	users &&
		users.map((user: any) => {
			return rows.unshift({
				id: user._id,
				name: user.name,
				email: user.email,
				customer_id: user.customerId,
				date: formatDate(user.createdAt),
				is_active: user.is_active,
				block: user.is_block,
				rank: user.rank,
				kyc: user.kyc_verified,
			});
		});
	return (
		<div>
			<div style={{ height: '100%', width: '100%' }}>
				<Card className='my-2 d-flex align-items-center '>
					<div className='gap-2 flex list-none '>
						<li className='text-success h5'> Total Users :</li>
						<li className=' text-success h5'>{users?.length}</li>
					</div>
				</Card>
				<div className='h-[calc(100vh-200px)]'>
					<DataGrid
						rows={rows}
						columns={columns}
						loading={isLoading}
						slots={{
							noRowsOverlay: CustomNoRowsOverlay,
							loadingOverlay: CustomLoadingOverlay,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default AllUsers;
