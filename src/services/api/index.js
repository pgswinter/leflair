import axios from 'axios';
import LeflairApi from './leflair';

const get = async (path) => {
    const result = await axios({
        method: 'get',
        url: path,
    }).catch(error => console.log(error));
    return result;
}

const post = async (path, body) => {
    const result = await axios({
        method: 'post',
        url: path,
        data: body
    }).catch(error => console.log(error));
    return result;
}

const Leflair = new LeflairApi({ post, get });

export default {
    Leflair,
}