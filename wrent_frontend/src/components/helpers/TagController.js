export async function fetchTags() {
    const res = await fetch('/tags', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    const data = await res.json();
    return data
}

export async function postTag(nm) {
    const res = await fetch('/tags', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
            {
                name: nm
            }
        )
    })
    const data = await res.json()
    return data
}