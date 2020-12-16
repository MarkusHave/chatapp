import { Controller, Get } from '@nestjs/common';
import { RoomsDTO } from './rooms.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async findAll(): Promise<Array<RoomsDTO>> {
    return this.roomsService.getAll();
  }
}
