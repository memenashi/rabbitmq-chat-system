import { ApiProperty } from '@nestjs/swagger';

export class UserResource {
  @ApiProperty({ description: 'The unique ID of the user' })
  username: string;

  @ApiProperty({ description: 'The email of the user' })
  email: string;
}
