import Imagekit, { toFile } from '@imagekit/nodejs'

const client = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

export const songUpload = async ({ buffer, filename, folder = ""}) => {
    const url = await client.files.upload({
        file: await toFile(Buffer.from(buffer), 'file'),
        fileName: filename ? filename : "",
        folder: folder
    })

    return url;
}