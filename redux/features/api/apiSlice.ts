import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from '@/config/baseUrl';
import { baseQueryWithReauth } from '@/redux/baseQueryWithReauth';

const url = `${baseUrl}/api/v1`;

console.log('baseUrl', baseUrl);
export const apiSlice = createApi({
	reducerPath: 'api',

	baseQuery: baseQueryWithReauth, // ✅ Override with refresh-enabled baseQuery
	tagTypes: [
		'Users',
		'Admin',
		'Pxc',
		'Wallet',
		'Transactions',
		'User',
		'Withdraw',
		'Withdraws',
		'MyWithdraws',
		'Mining',
		'Deposits',
		'Notification',
		'Notifications',
		'Kyc',
		'Agents',
		'Agent',
		'Package',
		'Packages',
		'LiveTrade',
		'LiveTradeProfitRate',
		'PoolConfig',
		'PoolHistory',
		'SignalTradeConfig',
		'Announcement',
		'Deposit',
	],
	endpoints: (builder) => ({}),
});

//https://wfc-api.herokuapp.com/api/v1
//http://localhost:5005/api/v1
