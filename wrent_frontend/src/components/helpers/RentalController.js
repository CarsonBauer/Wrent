// module.exports = {
//     getRentalItems: async (id) => {
//         const res = await fetch(`/rentals/${id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
//             }
//         })
//         const data = await res.json();
//         return data
//     }
// }

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