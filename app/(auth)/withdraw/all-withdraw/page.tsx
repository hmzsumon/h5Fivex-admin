'use client';

import { formatDate } from '@/lib/functions';
import { useGetAllWithdrawRequestsQuery } from '@/redux/features/withdraw/withdrawApi';
import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';
import { Card, Tabs } from 'flowbite-react';
import CustomNoRowsOverlay from '@/components/CustomNoRowsOverlay';
import CustomLoadingOverlay from '@/components/CustomLoadingOverlay';

type Withdraw = {
	id: string;
	name: string;
	customerId: string;
	amount: number;
	status: string;
	date: string;
	tnx_id: string;
	sl_no: number;
};

const AllWithdraw = () => {
	const { data, isLoading, isSuccess, isError, error } =
		useGetAllWithdrawRequestsQuery(undefined);
	const { withdraws } = data || [];
	const [selectedTab, setSelectedTab] = useState('all');

	// Filter deposits based on selected tab's criteria
	const filteredWithdraws = withdraws?.filter((deposit: Withdraw) => {
		if (selectedTab === 'all') return true;
		if (selectedTab === 'new') return deposit.status === 'pending';
		if (selectedTab === 'approve') return deposit.status === 'approved';
		if (selectedTab === 'rejected') return deposit.status === 'rejected';
		return true;
	});
	// Calculate total deposit amount based on the selected tab's criteria
	const totalAmount = filteredWithdraws?.reduce((total: any, withdraw: any) => {
		return total + withdraw.amount;
	}, 0);

	const totalNetAmount = filteredWithdraws?.reduce(
		(total: any, withdraw: any) => {
			return total + withdraw.net_amount;
		},
		0
	);

	const columns: GridColDef<any>[] = [
		{
			field: 'sl_no',
			headerName: 'SL No',
			width: 80,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.sl_no}</p>
				</div>
			),
		},
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
			field: 'name',
			headerName: 'Name',
			width: 200,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.name}</p>
				</div>
			),
		},
		{
			field: 'method',
			headerName: 'Method',
			width: 150,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.method.network}</p>
				</div>
			),
		},

		{
			field: 'amount',
			headerName: 'Amount',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>
						{Number(params.row.amount).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</p>
				</div>
			),
		},

		{
			field: 'netAmount',
			headerName: 'Net Amount',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs text-danger'>
					<p>
						{Number(params.row.netAmount).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</p>
				</div>
			),
		},

		{
			field: 'status',
			headerName: 'Status',
			width: 100,
			renderCell: (params: any) => {
				return (
					<div className='flex items-center'>
						{params.row.status === 'pending' && (
							<p className='text-warning '>
								<span>Pending</span>
							</p>
						)}
						{params.row.status === 'approved' && (
							<p className='text-success '>
								<span>Approved</span>
							</p>
						)}

						{params.row.status === 'rejected' && (
							<p className='text-danger '>
								<span>Rejected</span>
							</p>
						)}
					</div>
				);
			},
		},
		{
			field: 'user_details',
			headerName: 'View',
			width: 60,
			renderCell: (params: any) => {
				return (
					<div className=' w-full flex items-center justify-center'>
						<Link href={`/withdraw/${params.row.id}`} passHref>
							<FaEye />
						</Link>
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
					<div
						className='d-flex align-items-center justify-content-center w-100'
						style={{ cursor: 'pointer' }}
					>
						<Link href={`/withdraw/${params.row.id}`} passHref>
							<FaEye />
						</Link>
					</div>
				);
			},
		},
	];

	const rows: any = [];

	withdraws &&
		filteredWithdraws?.map((withdraw: any) => {
			return rows.unshift({
				id: withdraw._id,
				sl_no: withdraw.sl_no,
				name: withdraw.name,
				customer_id: withdraw.customerId,
				amount: withdraw.amount,
				netAmount: withdraw.netAmount,
				status: withdraw.status,
				method: withdraw.method,
				date: formatDate(withdraw.createdAt),
				user_id: withdraw.user_id,
			});
		});

	return (
		<div>
			<h2>All Withdraw</h2>
			<div>
				<Card className=' my-4'>
					<div className='flex items-center gap-4 '>
						<h3 className=''> All Withdraw :</h3>
						<p className='  '>{withdraws?.length}</p>
					</div>
					<div className='flex items-center gap-4 '>
						<h3 className=''> Amount :</h3>
						<p className='  '>
							{Number(totalAmount).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</p>
					</div>

					<div className='flex items-center gap-4 '>
						<h3 className=''>Net Amount :</h3>
						<p className='  '>
							{Number(totalNetAmount).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</p>
					</div>
				</Card>

				<Tabs aria-label='Pills' style='pills'>
					<Tabs.Item
						active
						title='All withdraw'
						onClick={() => setSelectedTab('all')}
					>
						{filteredWithdraws?.length}
					</Tabs.Item>
					<Tabs.Item title='Pending' onClick={() => setSelectedTab('new')}>
						{filteredWithdraws?.length}
					</Tabs.Item>
					<Tabs.Item title='Approved'>{filteredWithdraws?.length}</Tabs.Item>
					<Tabs.Item title='Rejected'>{filteredWithdraws?.length}</Tabs.Item>
				</Tabs>

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

export default AllWithdraw;
