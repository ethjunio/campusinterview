import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '@/users/users.module';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { Faq, FaqSchema } from './schemas/faq.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Faq.name, schema: FaqSchema }]),
    UsersModule,
  ],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
