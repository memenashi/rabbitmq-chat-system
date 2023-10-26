import { ApiProperty } from '@nestjs/swagger';

export class GetMessagesDto {
  @ApiProperty({
    description: 'The ID of the last loaded message',
    required: false,
  })
  lastMessageId?: string;

  @ApiProperty({ description: 'The number of messages to load', default: 10 })
  limit?: number;
}
