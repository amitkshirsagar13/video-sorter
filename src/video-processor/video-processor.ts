import ffprobe from 'ffprobe';
import ffprobeStatic from 'ffprobe-static';
import path from 'path';
// const files = ['Chennai Express (2013).mkv', 'Qatra_Qatra_Full_Song_Family.mp4'];

export const getVideoMetadata = async (fileName: string) => {
    return new Promise((resolve) => {
        const parent = path.dirname(fileName).split(path.sep).pop();
        ffprobe(fileName, { path: ffprobeStatic.path }, (err:any, info:any)=> {
            const video = info.streams.find((stream:any)=> stream.codec_type === 'video');
            const audio = info.streams.find((stream:any)=> stream.codec_type === 'audio');

            resolve({parent, video, audio});
        })
    })
}