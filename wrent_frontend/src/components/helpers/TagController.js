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