import axios from 'axios';

//Send Connection Request:
const sendConnectionRequest = async (senderId:string, receiverId:string) => {
    try {
        const response = await axios.post('/api/connection-requests/send', null, {
            params: {
                senderId,
                receiverId
            }
        });
        const data = response.data;
        // Handle success, update state, etc.
    } catch (error) {
        console.error("Error sending connection request:", error);
    }
};

//Accept Connection Request:
const acceptConnectionRequest = async (requestId:string) => {
    try {
        const response = await axios.put(`/connections/${requestId}/accept`);
        console.log('Connection request accepted:', response.data);
    } catch (error) {
        console.error("Error accepting connection request:", error);
    }
};

//Reject Connection Request:
const rejectConnectionRequest = async (requestId:string) => {
    try {
        const response = await axios.put(`/connections/${requestId}/reject`);
        console.log('Connection request rejected:', response.data);
    } catch (error) {
        console.error("Error rejecting connection request:", error);
    }
};

//List Pending Connection Requests
const getPendingConnectionRequests = async () => {
    try {
        const response = await axios.get('/connections/pending');
        console.log('Pending connection requests:', response.data);
    } catch (error) {
        console.error("Error fetching pending connection requests:", error);
    }
};

//List All Connections:
const getAllConnections = async () => {
    try {
        const response = await axios.get('/connections');
        console.log('All connections:', response.data);
    } catch (error) {
        console.error("Error fetching all connections:", error);
    }
};


