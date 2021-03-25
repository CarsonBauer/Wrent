export async function postTagItem(item, tag) {
    const res = await fetch('/tagItems', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
        },
        body: JSON.stringify(
            {
                'tagId': tag,
                'itemId': item
            }
        )
    })
    const data = await res.json()
    return data
}