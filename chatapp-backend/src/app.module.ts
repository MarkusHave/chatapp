import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [MessagesModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
