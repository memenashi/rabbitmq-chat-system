import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.resource'; // MessageDtoとMessageTypeをインポート
import { GetMessagesRequest } from './dto/get-messages.request';
import { Message } from './schemas/message.schema';

@ApiTags('messages') // Swagger UIに`messages`タグを付ける
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiBody({ description: 'Message payload', type: MessageDto }) // リクエストボディの説明と型を指定
  @ApiOkResponse({ description: 'Message has been successfully created.' }) // 正常なレスポンスの説明
  async create(
    @Body() createMessageDto: MessageDto, // DTOを使用してリクエストボディをバインド
    @Req() req: any,
  ): Promise<any> {
    const userId = req.user.sub;
    const message = await this.messageService.create(
      createMessageDto.content,
      userId,
    ); // DTOからcontentを取得
    return message;
  }

  @Get()
  @ApiQuery({
    name: 'lastMessageId',
    required: true,
    description: 'ID of the last loaded message',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of messages to load',
  })
  @ApiOkResponse({
    description: 'List of messages before the specified message',
  })
  async findBeforeLastMessage(
    @Query() getMessagesDto: GetMessagesRequest,
  ): Promise<Message[]> {
    return this.messageService.findBeforeLastMessage(
      getMessagesDto.lastMessageId,
      getMessagesDto.limit,
    );
  }
}
