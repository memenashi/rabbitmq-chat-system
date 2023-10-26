import { ApiProperty } from '@nestjs/swagger';

export class LoginResource {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;
}
