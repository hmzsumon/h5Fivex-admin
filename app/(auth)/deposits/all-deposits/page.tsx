'use client';
import { formatDate, formDateWithTime } from '@/lib/functions';

import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';
import { Card, Tabs } from 'flowbite-react';
import { useGetAdminDepositsQuery } from '@/redux/features/deposit/depositApi';
import CustomNoRowsOverlay from '@/components/CustomNoRowsOverlay';
import CustomLoadingOverlay from '@/components/CustomLoadingOverlay';

type Deposit = {
	id: string;
	name: string;
	customer_id: string;
	amount: number;
	status: string;
	date: string;
	tnx_id: string;
	sl_no: number;
};

const AllDeposit = () => {
	const { data, isLoading, isSuccess, isError, error } =
		useGetAdminDepositsQuery(undefined);
	const { deposits } = data || [];
	const [selectedTab, setSelectedTab] = useState('all');

	// Calculate total deposit amount based on the selected tab's criteria
	const totalAmount = deposits?.reduce((total: any, deposit: any) => {
		return total + deposit.amount;
	}, 0);

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
			width: 150,
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
			field: 'receive_amount',
			headerName: 'Receive Amount',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>
						{Number(params.row.receive_amount).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</p>
				</div>
			),
		},
		{
			field: 'charge',
			headerName: 'Fee',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>
						{Number(params.row.charge).toLocaleString('en-US', {
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
			width: 150,
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
			field: 'spin',
			headerName: 'Free Spin',
			width: 100,
			renderCell: (params: any) => {
				return (
					<div className='flex items-center font-bold'>
						{params.row.spin ? (
							<p className='text-green-500 '>
								<span>Yes</span>
							</p>
						) : (
							<p className='text-red-500 '>
								<span>No</span>
							</p>
						)}
					</div>
				);
			},
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 100,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<Link href={`/deposits/${params.row.id}`}>
						<FaEye className='text-primary' />
					</Link>
				</div>
			),
		},
	];

	const rows: any = [];

	deposits &&
		deposits?.map((deposit: any) => {
			return rows.unshift({
				id: deposit._id,
				sl_no: rows.length + 1,
				name: deposit.name,
				customer_id: deposit.customerId,
				amount: deposit.amount,
				netAmount: deposit.net_amount,
				status: deposit.status,
				tnx_id: deposit.order_id,
				date: formDateWithTime(deposit.createdAt),
				charge: deposit.charge,
				receive_amount: deposit.amount - deposit.charge,
				spin: deposit.is_free_spin,
			});
		});

	return (
		<div>
			<h2>All Deposits By Crypto </h2>
			<div>
				<Card className=' my-4'>
					<div className='flex items-center gap-4 '>
						<h3 className=''> All Deposits :</h3>
						<p className='  '>{deposits?.length}</p>
					</div>
					<div className='flex items-center gap-4 '>
						<h3 className=''> Total Amount:</h3>
						<p className='  '>{totalAmount} USDT</p>
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

export default AllDeposit;
