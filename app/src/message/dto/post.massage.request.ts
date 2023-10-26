import { ApiProperty } from '@nestjs/swagger';
import { MessageType } from './message.resource';

export class PostMessageRequest {
  @ApiProperty({ description: 'The content of the message', required: true })
  content: string;
  @ApiProperty({ description: 'The type of the message', enum: MessageType })
  type: MessageType = MessageType.MESSAGE;
  @ApiProperty({ description: 'The user who receive the message' })
  to: string;
}
