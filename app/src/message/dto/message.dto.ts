import { ApiProperty } from '@nestjs/swagger';

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
}
