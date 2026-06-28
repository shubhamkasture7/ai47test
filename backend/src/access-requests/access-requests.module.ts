import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessRequest, AccessRequestSchema } from './schemas/access-request.schema';
import { AccessRequestsService } from './access-requests.service';
import { AccessRequestsController } from './access-requests.controller';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccessRequest.name, schema: AccessRequestSchema },
    ]),
    TelegramModule,
  ],
  providers: [AccessRequestsService],
  controllers: [AccessRequestsController],
  exports: [AccessRequestsService],
})
export class AccessRequestsModule {}
