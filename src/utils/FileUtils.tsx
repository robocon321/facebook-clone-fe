export type convertToBlobType = {
    blobUrl: string,
    type: string
}

export function getFileExtension(fileName: string) {
    return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
}

export function convertToBlobFile(file: File): convertToBlobType {
    const type = file.type;
    const blob = new Blob([file], { type });
    const blobUrl = URL.createObjectURL(blob);
    return {
        blobUrl,
        type
    };
}