module.exports = {
    postImage: async (user, image) => {
        const fd = new FormData();
        fd.append('ownerId', user);
        fd.append('image', image);
        const res = await fetch('/images', {
            method: 'POST',
            body: fd
        })
        const res_json = await res.json();
        if (res_json['statusCode'] == 200) {
            return res_json['data']
        } else {
            return "No image"
        }
    }
}