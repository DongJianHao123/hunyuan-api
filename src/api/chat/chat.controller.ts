import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request, Response } from 'express';

@Controller('hunyuan')
export class ChatController {
  constructor(private readonly appService: ChatService) { }

  @Post('chat')
  chatProcess(@Body("question") question: string, @Res() res: Response) {
    this.appService.chatProcess(question, res);
  }
}
