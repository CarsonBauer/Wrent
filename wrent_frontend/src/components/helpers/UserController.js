module.exports = {
    getUser: async () => {
        const res = await fetch('/users/get', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
            }
        });
        const res_json = await res.json();
        return res_json;
    }
}