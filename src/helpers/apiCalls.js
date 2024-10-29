import { axiosInstance } from './refreshToken.js'



export const checkAuth = async () => {
    try {
        const response = await axiosInstance.get('/users/tokens/info');
        // console.log('Data successfully fetched:', response.data);
        return response
    } catch (error) {
        console.error('Error fetching data:', error);
        return error
    }
};

export const revokeToken = async () => {
    const response = await axiosInstance.post('/users/tokens/revoke');
    console.log('Successfully revoked token');
    return response
};

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        // console.log('Data successfully fetched:', response.data);
        return response
    } catch (error) {
        console.error('Error fetching data:', error);
        return error
    }
};

export const getGroups = async (userID) => {
    try {
        const response = await axiosInstance.get('/groups');
        // console.log('Data successfully fetched:', response.data);
        return response
    } catch (error) {
        console.error('Error fetching data:', error);
        return error
    }
};

export const getGroup = async (groupId) => {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}`);
        // console.log('Data successfully fetched:', response.data);
        return response
    } catch (error) {
        console.error('Error fetching data:', error);
        return error
    }
};

export const createMessage = async (messageContent) => {
    try {
        const response = await axiosInstance.post(`/messages`, null, { params: {
            message: {content: messageContent}
        }}) ;
        // console.log('Data successfully fetched:', response.data);
        return response
    } catch (error) {
        console.error('Error creating message:', error);
        return error
    }
};

export const addMessageToGroup = async (messageID, groupID) => {
    try {
        const response = await axiosInstance.patch(`/groups/${groupID}`, null, {
            params: {
                group: { message_id: messageID }
            }
        });
        // console.log('Data successfully fetched:', response.data);
        return response
    } catch (error) {
        console.error('Error creating message:', error);
        return error
    }
};