let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
	baseUrl = 'http://localhost:8000/api/v1';
	console.log('Running in development mode', baseUrl);
} else {
	baseUrl = '/api/v1'; // ✅ Proxy through Next.js on production
}

export default baseUrl;
