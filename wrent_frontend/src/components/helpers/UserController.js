export async function getUser() {
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

export async function getUsers() {
    const res = await fetch('/users', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
        }
    })
    const res_json = await res.json();
    return res_json;
}

export async function getAdminStatus() {
    const res = await fetch('/users/isAdmin', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
        }
    })
    const res_json = await res.json();
    return res_json;
}