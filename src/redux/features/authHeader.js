export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    if (user && token) {
      // for Node.js Express back-end
      return { 'x-access-token': token ,'X-Requested-With': 'XMLHttpRequest', 
      "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
      "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS","withCredentials": true};
    } else {
      return {};
    }
  }