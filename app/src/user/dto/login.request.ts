import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({ description: 'The unique username of the user' })
  username: string;

  @ApiProperty({ description: 'The password of the user' })
  password: string;
}
