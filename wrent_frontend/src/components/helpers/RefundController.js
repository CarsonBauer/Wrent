export async function getRefunds() {
    const res = await fetch('/refunds', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
        }
    })
    const data = await res.json();
    return data
}

export async function deleteRefund(id) {
    const res = await fetch('/refunds/'+id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
        }
    })
    const data = await res.json();
    return data
}

export async function postRefund(renterId, itemId) {
    const res = await fetch('/refunds', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
      },
      body: JSON.stringify({
          'renterId': renterId,
          'itemId': itemId
      })
    })
}