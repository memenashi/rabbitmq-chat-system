import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({ description: 'The unique email of the user' })
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  password: string;
}
