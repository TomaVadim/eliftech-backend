import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://tomavadim74:Qwerty123@cluster.wqbghfq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster',
    ),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
