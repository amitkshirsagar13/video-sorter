export const VIDEO_TYPE = {
    360: 'sd',
    720: '720p',
    1080: '1080p',
    1440: '2k',
    2160: '4k',
    4320: '8k',
}

export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}