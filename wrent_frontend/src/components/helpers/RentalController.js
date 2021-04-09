export async function getRentalItems(id) {
    const res = await fetch(`/rentals/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
        }
    })
    const data = await res.json();
    return data
}

export async function getRentalItem(renterId, itemId) {
    const res = await fetch(`/rentals/${renterId}/${itemId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
        }
    })
    const data = await res.json();
    return data
}

export async function getRentals() {
    const res = await fetch(`/rentals`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
        }
    })
    const data = await res.json();
    return data
}

export async function getRecentRentals() {
    const res = await fetch(`/rentals/recent`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
        }
    })
    const data = await res.json();
    return data
}