import { Injectable } from '@nestjs/common';
import { RoomsDTO } from './rooms.dto';

@Injectable()
export class RoomsService {
  async getAll(): Promise<Array<RoomsDTO>> {
    return [
      {
        id: 1,
        name: 'Room 1',
      },
      {
        id: 2,
        name: 'Room 2',
      },
      {
        id: 3,
        name: 'Room 3',
      },
      {
        id: 4,
        name: 'Room 4',
      },
      {
        id: 5,
        name: 'Room 5',
      },
    ];
  }
}
