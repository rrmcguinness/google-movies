import { Image } from "./model/model"

export const formatString = (template: string, ...args: string[]) => {
    return template.replace(/{([0-9]+)}/g, function (match, index) {
        return typeof args[index] === 'undefined' ? match : args[index];
    });
}

const geminifyBase64String = (input: string | ArrayBuffer | null): string => {
    if (input) {
        if (input instanceof ArrayBuffer) {
            let decoder = new TextDecoder()
            let temp = decoder.decode(input)
            return temp.substring(temp.indexOf(",") + 1)
        } else {
            return input.substring(input.indexOf(",") + 1)
        }
    }
    return ""
}

export const imageToBase64 = (url: string, callback: (image: Image) => void): void => {
    fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64String = reader.result;
                const mimeType = blob.type;
                callback({uri: url, base64: geminifyBase64String(base64String), type: mimeType} as Image)
            };
        });
}

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));