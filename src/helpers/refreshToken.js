import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3000",
    headers: {
        "Content-type": "application/json",
    }
});
    axiosInstance.interceptors.request.use(request => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            request.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return request;
    }, error => {
        return Promise.reject(error);
    });
    axiosInstance.interceptors.response.use(
        response => response, // Directly return successful responses.
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
                try {
                    const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the stored refresh token.
                    const response = await axios({
                        method: 'post',
                        url: `${baseURL}/users/tokens/refresh`,
                        headers: { 'Authorization': 'Bearer ' + refreshToken }
                    })
                    const accessToken = response.data.token
                    const newRefreshToken = response.data.refresh_token

                    // Store the new access and refresh tokens.
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', newRefreshToken);
                    // Update the authorization header with the new access token.
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest); // Retry the original request with the new access token.
                } catch (refreshError) {
                    // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
                    console.error('Token refresh failed:', refreshError);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/signin';
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );