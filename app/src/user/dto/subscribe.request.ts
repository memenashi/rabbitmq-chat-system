import { ApiProperty } from '@nestjs/swagger';

export class SubscribeRequest {
  @ApiProperty({ description: 'Endpoint for the push subscription.' })
  readonly endpoint: string;

  @ApiProperty({
    description: 'Expiration time for the push subscription.',
    nullable: true,
  })
  readonly expirationTime: string | null;

  @ApiProperty({
    description: 'Keys for the push subscription.',
    type: Object,
    properties: {
      p256dh: {
        type: 'string',
        description: 'P256dh key for the push subscription.',
      },
      auth: {
        type: 'string',
        description: 'Auth key for the push subscription.',
      },
    },
  })
  readonly keys: {
    p256dh: string;
    auth: string;
  };
}
