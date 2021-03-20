module.exports = {
    fetchItem: async (id) => {
        const res = await fetch('/items/'+id, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json'
            }
          })
        const data = await res.json();
        return data
    },

    postItem: async (id, user, name, description, url, rating) => {
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
              'rating': rating
          })
      })

      const res_json = await res.json();
      return res_json;
  }
}