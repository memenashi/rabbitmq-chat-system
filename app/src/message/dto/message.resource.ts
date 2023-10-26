import { ApiProperty } from '@nestjs/swagger';
import { UserResource } from 'src/user/dto/user.resource';

export enum MessageType {
  MESSAGE = 'message',
  JOIN = 'join',
  LEAVE = 'leave',
  DIRECT = 'direct',
}

export class MessageDto {
  @ApiProperty({ description: 'The content of the message', required: true })
  content: string;
  @ApiProperty({ description: 'The type of the message', enum: MessageType })
  type: MessageType;
  createdAt: Date;
  user: UserResource;

}
