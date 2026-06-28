import { IsEnum } from 'class-validator';

export class UpdateRequestStatusDto {
  @IsEnum(['approved', 'rejected'], {
    message: 'Status must be either "approved" or "rejected"',
  })
  status!: 'approved' | 'rejected';
}
