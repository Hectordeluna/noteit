import axios from 'axios';

export default {
  getAll: async (Q) => {
    let res = await axios.get('/api/search/note/', 
    { params: {
        search: Q,
    }});
    return res.data || [];
  }
}