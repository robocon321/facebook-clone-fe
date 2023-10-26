import { DataStateType, ImageModalType, VideoModalType } from "app/(main)/home/_type/ModalType";
import { CreatePostRequest, ImageType, VideoType } from "types/requests/CreatePostRequest";
import { PageRequest } from "types/requests/PageRequest";
import { buildFormData } from "utils/FormDataUtils";

export const createNewPost = async (dataModal: DataStateType): Promise<any> => {
    const request: CreatePostRequest = {
        scope: dataModal.scope,
    }
    if (dataModal.checkin) {
        request.checkin = dataModal.checkin.checkinId;
    }
    if (dataModal.emotion) {
        request.emotion = dataModal.emotion.emotion_id;
    }
    if (dataModal.text) {
        request.text = dataModal.text;
    }
    if (dataModal.tags.length > 0) {
        request.tags = dataModal.tags.map(item => item.accountId);
    }

    if (dataModal.files.length > 0) {
        for (const file of dataModal.files) {
            if ('tags' in file) {
                const image = file as ImageModalType;
                if (!request.images) {
                    request.images = []
                }
                const imageRequest: ImageType = {
                    file: image.file,
                    createTime: image.created_date
                }
                if (image.tags.length > 0) {
                    imageRequest.tags = image.tags.map(item => ({
                        accountId: item.account.accountId,
                        xPos: item.x_pos,
                        yPos: item.y_pos
                    }));
                }
                if (image.texts.length > 0) {
                    imageRequest.texts = image.texts.map(item => ({
                        text: item.text,
                        color: item.color,
                        xPos: item.x_pos,
                        yPos: item.y_pos,
                        size: item.size
                    }));
                }
                if (image.note && image.note.length > 0) {
                    imageRequest.note = image.note
                }
                request.images.push(imageRequest);
            } else {
                const video = file as VideoModalType;
                if (!request.videos) {
                    request.videos = []
                }
                const videoRequest: VideoType = {
                    file: video.file,
                    createTime: video.created_date
                }
                if (video.note) {
                    videoRequest.note = video.note
                }
                request.videos.push(videoRequest);
            }
        }

    }

    const formData = new FormData();
    buildFormData(formData, request);

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.BACKEND_URL}/post`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        const status = response.status;
        const data = await response.text();
        if (status == 200) {
            return data;
        } else {
            throw new Error(data);
        }
    } catch (error) {
        throw error;
    }
}

export const recommendPost = async (pageRequest?: PageRequest): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        let queryParams: any = {
        };

        if (pageRequest) queryParams = {
            ...pageRequest
        }

        const queryString = Object.keys(queryParams)
            .map((key) => `${key}=${queryParams[key]}`)
            .join('&');

        const requestUrl = `${process.env.BACKEND_URL}/post/recommend?${queryString}`;

        const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const status = response.status;
        const data = await response.json();
        if (status == 200) {
            return data;
        } else {
            throw new Error(data);
        }
    } catch (error) {
        throw error;
    }
}