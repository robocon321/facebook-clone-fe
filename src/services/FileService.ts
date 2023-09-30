import { UploadFileRequest } from "types/requests/UploadFileRequest";

export const uploadFile = async (request: UploadFileRequest) : Promise<string> => {
    const formData = new FormData();
    formData.append("uploadDir", request.uploadDir);
    formData.append("file", request.file);

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/file`, {
            method: "POST",
            body: formData
        });
        const status = response.status;        
        const data = await response.text();
        if(status == 200) {            
            return data;
        } else {
            throw new Error(data);
        }
    } catch (error) {
        throw error;
    }
};