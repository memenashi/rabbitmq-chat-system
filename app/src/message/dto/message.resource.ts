import { ApiProperty } from '@nestjs/swagger';
import { UserResource } from 'src/user/dto/user.resource';

export enum MessageType {
  MESSAGE = 'message',
  JOIN = 'join',
  LEAVE = 'leave',
  DIRECT = 'direct',
}

export class MessageResource {
  @ApiProperty({ description: 'The content of the message', required: true })
  content: string;
  @ApiProperty({ description: 'The type of the message', enum: MessageType })
  type: MessageType;
  @ApiProperty({ description: 'The date the message was created' })
  createdAt: Date;
  @ApiProperty({ description: 'The user who sent the message' })
  user: UserResource;
}
