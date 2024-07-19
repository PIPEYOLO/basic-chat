

export function getBlobURLFromDataAndType({data, type}) {
    return URL.createObjectURL(
        new Blob(
            [new Uint8Array(data)], 
            { type }
        )
    )
}