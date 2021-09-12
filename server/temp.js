const ytdl = require('ytdl-core');

const getinfo = async (videoId) =>{

    let info = await ytdl.getInfo(videoId);
    console.log(info.formats)
}
 
getinfo('b6eEUo34pSk')