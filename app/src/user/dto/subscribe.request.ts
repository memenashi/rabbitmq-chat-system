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
        format: 'base64',
        description: 'Base64 encoded P256dh key for the push subscription.',
      },
      auth: {
        type: 'string',
        format: 'base64',
        description: 'Base64 encoded Auth key for the push subscription.',
      },
    },
  })
  readonly keys: {
    p256dh: string; // Base64 encoded
    auth: string; // Base64 encoded
  };
}
