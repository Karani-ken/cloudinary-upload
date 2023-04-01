const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: "dbb7ffclc",
    api_key: "971663865859441",
    api_secret: "nGB_zTLeGUuX8M8MVvQnEiBg0Xo"
})

uploadToCloudinary = (path, folder) => {
    return cloudinary.uploader.upload(path, {
        folder
    }).then((data) => {
        return { url: data.url, public_id: data.public_id };
    }).catch((error) => {
        console.log(error)
    })
}

removeFromCloudinary = async (public_id) => {
    await cloudinary.uploader.destroy(public_id, function (error, result) {
        console.log(result, error)
    })
}
module.exports = { uploadToCloudinary, removeFromCloudinary }