// module.exports = {
//     fetchLocation: async (loc) => {
//         const res = await fetch('/locations/'+loc, {
//             method: 'GET',
//             headers: {
//                 'Content-type': 'application/json'
//             }
//         })
//         const data = await res.json();
//         return data
//     },

//     postLocation: async (location) => {
//         const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_API_KEY}`)
//         const res_json = await res.json()
//         if (res_json['status'] == "ZERO_RESULTS") {
//             return "ZERO_RESULTS"
//         } else {
//             var lt = res_json.results[0].geometry.location.lat
//             var lg = res_json.results[0].geometry.location.lng
//             const data = await fetch('/locations', {
//                 method: 'POST',
//                 headers: {
//                     'Content-type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
//                 },
//                 body: JSON.stringify(
//                     {
//                         lat: lt,
//                         lon: lg
//                     }
//                 )
//             })
//             var data_json = await data.json();
//             return data_json['data']
//         }
//     }
// }

export async function fetchLocation(loc) {
    const res = await fetch('/locations/'+loc, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    const data = await res.json();
    return data
}

export async function postLocation(location) {
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_API_KEY}`)
        const res_json = await res.json()
        if (res_json['status'] == "ZERO_RESULTS") {
            return "ZERO_RESULTS"
        } else {
            var lt = res_json.results[0].geometry.location.lat
            var lg = res_json.results[0].geometry.location.lng
            const data = await fetch('/locations', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
                },
                body: JSON.stringify(
                    {
                        lat: lt,
                        lon: lg
                    }
                )
            })
            var data_json = await data.json();
            return data_json['data']
        }
}