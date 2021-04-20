export async function fetchItem(id) {
  const res = await fetch('/items/'+id, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
  const data = await res.json();
  return data
}

export async function postItem(id, user, name, description, url, rating, price) {
  const res = await fetch('/items', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
    },
    body: JSON.stringify({
        'location': id,
        'ownerId': user,
        'name': name.toString(),
        'description': description.toString(),
        'imageURL': url.toString(),
        'rating': rating,
        'price': price
    })
  })

  const res_json = await res.json();
  return res_json;
}

export async function getItemsFromTag(id) {
  const res = await fetch('/items/tags', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      'id': id
    })
  })
  const data = await res.json();
  return data;
}

export async function fetchAvailableItems() {
  const res = await fetch('/items/available', {
      method: 'GET',
      headers: {
          'Content-type': 'application/json'
      }
  })
  const data = await res.json();
  return data
}