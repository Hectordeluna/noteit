import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/note`);
    return res.data || [];
  },
  getFriendsNotes: async () => {
    let res = await axios.get(`/api/friends/notes`);
    return res.data || [];
  },
  getRequests: async () => {
    let res = await axios.get(`/api/users/requests`);
    return res.data || [];
  }
}