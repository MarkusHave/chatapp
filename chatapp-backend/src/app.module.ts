import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';
@Module({
  imports: [
    MessagesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RoomsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
