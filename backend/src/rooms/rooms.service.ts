import { Injectable } from '@nestjs/common';
import { RoomsDTO } from './rooms.dto';

@Injectable()
export class RoomsService {
  private readonly mockData = [
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

  async getAll(): Promise<Array<RoomsDTO>> {
    return this.mockData;
  }

  async getOne(roomId: number): Promise<RoomsDTO> {
    return this.mockData.find((room) => room.id === roomId);
  }
}
