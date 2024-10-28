import { axiosInstance } from './refreshToken.js'



export const checkAuth = async () => {
    try {
        const response = await axiosInstance.get('/users/tokens/info');
        console.log('Data successfully fetched:', response.data);
        return response
    } catch (error) {
        console.error('Error fetching data:', error);
        return error
    }
};