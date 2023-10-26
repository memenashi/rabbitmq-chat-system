import { Body, Controller, Post, Req } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(
    @Body('content') content: string,
    @Req() req: any, // リクエストオブジェクトを取得
  ): Promise<any> {
    const userId = req.user.sub; // JWTからユーザーIDを取得
    const message = await this.messageService.create(content, userId);
    return message;
  }
}
