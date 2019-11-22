import axios from 'axios';

export default {
  getAll: async (Q) => {
    let res = await axios.get('/api/search/note/', 
    { params: {
        search: Q,
    }});
    return res.data || [];
  },
  findUsers: async (Q) => {
    let res = await axios.get('/api/search/users/', 
    { params: {
        search: Q,
    }});
    return res.data || [];
  },
  getRequests: async () => {
    let res = await axios.get(`/api/users/requests`);
    if (typeof res.data === "undefined"){
      return [];
    }
    return res.data;
  },
  getFriensNotes: async (Q) => {
    let res = await axios.get('/api/search/friends/notes/', 
    { params: {
        search: Q,
    }});
    return res.data || [];
  }
}