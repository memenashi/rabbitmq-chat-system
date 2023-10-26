import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { MessageResource } from './dto/message.resource'; // MessageDtoとMessageTypeをインポート
import { GetMessagesRequest } from './dto/get-messages.request';
import { AuthGuard } from '@nestjs/passport';
import { PostMessageRequest } from './dto/post.massage.request';

@ApiTags('messages') // Swagger UIに`messages`タグを付ける
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ description: 'Message payload', type: PostMessageRequest }) // リクエストボディの説明と型を指定
  @ApiOkResponse({ description: 'Message has been successfully created.' }) // 正常なレスポンスの説明
  async create(
    @Body() createMessageDto: PostMessageRequest, // DTOを使用してリクエストボディをバインド
    @Req() req: any,
  ): Promise<MessageResource> {
    const userId = req.user._id;
    const message = await this.messageService.create(
      createMessageDto.content,
      userId,
      createMessageDto.type,
    ); // DTOからcontentを取得
    this.messageService.sendNotification(message);
    return message;
  }

  @Post('/find')
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({
    description: 'Entire Message find request',
    type: GetMessagesRequest,
  }) // リクエストボディの説明と型を指定
  @ApiOkResponse({
    description: 'List of messages before the specified message',
    type: MessageResource,
    isArray: true,
  })
  async findBeforeLastMessage(
    @Body() getMessagesDto: GetMessagesRequest,
  ): Promise<MessageResource[]> {
    return this.messageService.findBeforeLastMessage(
      getMessagesDto.lastMessageId,
      getMessagesDto.limit,
    );
  }
}
