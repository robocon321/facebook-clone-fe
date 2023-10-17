export const buildFormData = (formData: FormData, data: Record<string, any>, parentKey = ''): void => {
    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            const newKey = parentKey ? `${parentKey}[${index}]` : `${index}`;
            if (typeof item === 'object') {
                buildFormData(formData, item, newKey);
            } else {
                formData.append(newKey, item);
            }
        });
    } else {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const newKey = parentKey ? `${parentKey}.${key}` : key;
                const value = data[key];

                if (typeof value === 'string' || typeof value === 'number') {
                    formData.append(newKey, value.toString());
                } else if (value instanceof File) {
                    formData.append(newKey, value);
                } else if (value instanceof Date) {
                    formData.append(newKey, value.getTime().toString());
                } else if (typeof value === 'object') {
                    buildFormData(formData, value, newKey);
                }
            }
        }
    }
}

export const logFormData = (formData: FormData) => {
    formData.forEach((value, key, parent) => {
        if (typeof value === 'string' || typeof value === 'number') {
            console.log(`Value: ${parent}-${key}-${value}`);
        } else if (value instanceof File) {
            console.log(`File: ${parent}-${key}-${value.name} (Size: ${parent}-${key}-${value.size} bytes)`);
        } else {
            console.log('Complex Data:');
            logFormData(value);
        }
    })
}