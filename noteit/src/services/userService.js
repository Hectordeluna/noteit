import axios from 'axios';

export default {
  sendRequest: async (userID) => {
    let res = await axios.post('/api/users/send-request/'+userID);
    return res.data || [];
  },
  acceptRequest: async (userID) => {
    let res = await axios.post('/api/users/accept-request/'+userID);
    return res.data || [];
  },
  declineRequest: async (userID) => {
    let res = await axios.post('api/users/deny-request/'+userID);
    return res.data || [];
  }
}