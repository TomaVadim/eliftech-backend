import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';

dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
