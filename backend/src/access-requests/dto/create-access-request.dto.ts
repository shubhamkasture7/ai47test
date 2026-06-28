import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateAccessRequestDto {
  @IsString()
  @MinLength(10, { message: 'Reason must be at least 10 characters' })
  @MaxLength(500, { message: 'Reason must not exceed 500 characters' })
  reason!: string;

  @IsString()
  @IsNotEmpty({ message: 'Telegram Chat ID is required' })
  telegramChatId!: string;

  @IsString()
  @IsNotEmpty({ message: 'Location is required' })
  location!: string;
}
