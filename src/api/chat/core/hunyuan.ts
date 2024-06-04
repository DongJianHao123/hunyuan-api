/* eslint-disable prettier/prettier */
import { hunyuan } from 'tencentcloud-sdk-nodejs-hunyuan';
import { config } from 'dotenv';
config();
const HunyuanClient = hunyuan.v20230901.Client;

const clientConfig = {
    credential: {
        secretId: process.env.secretId,
        secretKey: process.env.secretKey,
    },
    region: 'ap-guangzhou',
    profile: {
        httpProfile: {
            endpoint: 'hunyuan.ap-beijing.tencentcloudapi.com',
        },
    },
};

// 实例化要请求产品的client对象,clientProfile是可选的
const hunyuanChat = new HunyuanClient(clientConfig);
console.log('混元大模型已启动');


export default hunyuanChat;
