import { ApiProperty } from '@nestjs/swagger';

export class LoginResource {
  @ApiProperty()
  message: 'Login successful' | 'Invalid credentials';
}
