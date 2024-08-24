import { PickType } from '@nestjs/swagger';
import { LoginUserDto as login } from '../../users/dto/loginUser.dto';

export class LoginUserDto extends PickType(login, ['email', 'password']) {}
