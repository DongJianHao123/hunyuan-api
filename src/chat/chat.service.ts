import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import hunyuanChat from './core/hunyuan';
import { ChatProRequest, ChatProResponse } from 'tencentcloud-sdk-nodejs-hunyuan/tencentcloud/services/hunyuan/v20230901/hunyuan_models';

@Injectable()
export class ChatService {
    chatProcess(question: string, res: Response) {
        console.log(question);
        if (!question) {
            res.json({ code: 400, err: '请输入您的问题' })
            return
        }

        const params: ChatProRequest = {
            Messages: [{ Role: 'user', Content: question }],
        };
        res.setHeader('Content-type', 'application/octet-stream')
        hunyuanChat.ChatPro(params).then((answer: any) => {
            const _res: any = { ...answer }
            let firstchunk = true
            _res.stream.on('data', (buffer: Buffer) => {
                let bufferString = buffer.toString('utf-8').trim()
                const _bufferString = bufferString.replace(/\n+/g, '\n');//.substring(bufferString.indexOf('{')).trim()
                try {
                    if (firstchunk) {
                        _bufferString.split('\n').forEach((item, i) => {
                            item = item.substring(bufferString.indexOf('{')).trim()
                            res.write(i === 0 ? item : `\n${item}`)
                        })
                    } else {
                        res.write(`\n${_bufferString.substring(bufferString.indexOf('{')).trim()}`)
                    }
                    firstchunk = false
                } catch (error) {
                    console.error(error);
                }
            });
            _res.stream.on('end', () => {
                console.log('Stream ended');
                res.end()
            });
        })
    };
}

