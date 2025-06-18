let ioBaseUrl = '';
if (process.env.NODE_ENV === 'development') {
	ioBaseUrl = 'http://localhost:8000';
	console.log('Running in development mode');
} else {
	ioBaseUrl = 'https://h5fivex-api-f483cf4d7ab3.herokuapp.com';
}
console.log('baseUrl', ioBaseUrl);
export default ioBaseUrl;
