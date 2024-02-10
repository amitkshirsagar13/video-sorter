import { VIDEO_TYPE, sleep } from './constants';
import { getVideoMetadata } from './video-processor/video-processor';
import { glob } from 'glob';
import fs from 'fs-extra';

const getMetadata = async (fileName: string)=> {
    const metadata: any = await getVideoMetadata(fileName);
    let videoType = 'sd';
    Object.keys(VIDEO_TYPE).forEach((height: string) => metadata.video.height > (Number(height)*0.9) && (videoType = VIDEO_TYPE[height]));
    console.log(`video: ${metadata.video.height} | ${videoType} | ${metadata.parent}`)
    return {videoType, metadata}
}

const sortFiles = async (parent = '', target = parent)=> {
    const videoFiles = await glob(`${parent}**/*.{mp4,mkv}`, { ignore: '{sd,720p,1080p,2k,4k,8k}/*.mp4', nodir: true, withFileTypes: true });
    const ignoreDirectories = Object.values(VIDEO_TYPE);

    const tobeSorted = videoFiles.filter((file:any) => !ignoreDirectories.includes(file.parent.name));
    console.log('started');
    for (let tobe of tobeSorted) {
        const metadata: any = await getMetadata(tobe.fullpath());
        console.log(`Moving: ${tobe.parent.name} -> ${metadata.videoType} : ${tobe.name}`)
        const targetFolder: string = `${target}/${tobe.parent.name}/${metadata.videoType}`;
        if (!fs.existsSync(targetFolder)){
            fs.mkdirSync(targetFolder, { recursive: true });
        }
        fs.move(tobe.fullpath(), `${targetFolder}/${tobe.name}`, function (err) {
            if (err) return console.error(err)
            console.log(`Moved: ${tobe.parent.name} -> ${metadata.videoType} : ${tobe.name}`)
        });
        await sleep(150);
    }
    console.log('finished!!!');
}

const source = '/media/poomit/Crucial-X6/ShareMe/media/songs/HD-Songs/Actress/Marathi/';
const target = '/media/poomit/Crucial-X6/ShareMe/media/songs/target/Marathi';
sortFiles(source, target);