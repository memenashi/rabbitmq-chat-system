import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
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
    console.log('message posted', req.user, createMessageDto);
    const userId = req.user._id;
    const message = await this.messageService.create(
      createMessageDto.content,
      userId,
      createMessageDto.type,
    ); // DTOからcontentを取得
    return message;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
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
    type: [MessageResource],
    isArray: true,
  })
  async findBeforeLastMessage(
    @Query() getMessagesDto: GetMessagesRequest,
  ): Promise<MessageResource[]> {
    return this.messageService.findBeforeLastMessage(
      getMessagesDto.lastMessageId,
      getMessagesDto.limit,
    );
  }
}
