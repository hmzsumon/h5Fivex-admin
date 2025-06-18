'use client';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import CopyToClipboard from '@/lib/CopyToClipboard';

import { Card } from 'flowbite-react';

import React from 'react';

import { useGetDepositByIdQuery } from '@/redux/features/deposit/depositApi';

const SingleDeposit = ({ params }: any) => {
	const { depositId } = params;
	const { data, isLoading } = useGetDepositByIdQuery(depositId);
	const { deposit } = data || {};

	return (
		<div>
			<Card>
				<h3 className='text-center text-xl font-bold mb-4'>Deposit Details</h3>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
					<div>
						<strong>Status:</strong>{' '}
						<span
							className={`${
								deposit?.status === 'approved'
									? 'text-green-500'
									: 'text-orange-500'
							}`}
						>
							{deposit?.status}
						</span>
					</div>
					<div>
						<strong>Approved:</strong>{' '}
						{deposit?.isApproved ? '✅ Yes' : '❌ No'}
					</div>

					<div>
						<strong>Confirmations:</strong> {deposit?.confirmations}
					</div>
					<div>
						<strong>User ID:</strong> {deposit?.customerId}
					</div>
					<div>
						<strong>Name:</strong> {deposit?.name}
					</div>
					<div>
						<strong>Email:</strong> {deposit?.email}
					</div>
					<div>
						<strong>Amount:</strong> ${deposit?.amount}
					</div>
					<div>
						<strong>Chain:</strong> {deposit?.chain}
					</div>
					<div>
						<strong>TX ID:</strong>{' '}
						<span className='flex gap-1 items-center'>
							{deposit?.txId} <CopyToClipboard text={deposit?.txId} />
						</span>
					</div>
					<div>
						<strong>Created:</strong>{' '}
						{new Date(deposit?.createdAt).toLocaleString()}
					</div>
					<div>
						<strong>Updated:</strong>{' '}
						{new Date(deposit?.updatedAt).toLocaleString()}
					</div>
					<div>
						<strong>Order ID:</strong> {deposit?.orderId}
					</div>
					<div>
						<strong>Mongo ID:</strong>{' '}
						<span className='text-gray-500'>{deposit?._id}</span>
					</div>
					<div>
						<strong>Spin Amount:</strong>{' '}
						<span className='text-gray-500'>{deposit?.spin_amount}$</span>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default SingleDeposit;
