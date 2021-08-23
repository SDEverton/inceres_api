import { inject, injectable } from 'tsyringe';

import { DistressCall } from '@modules/distressCall/infra/typeorm/entities/DistressCall';
import { IDistressCallRepository } from '@modules/distressCall/respositories/IDistressCallRepository';
import { UserMap } from '@modules/users/mapper/UserMap';

@injectable()
class ListAllDistressCallUseCase {
  constructor(
    @inject('DistressCallRespository')
    private distressCallRespository: IDistressCallRepository
  ) {}

  async execute(
    activid: boolean,
    take: number,
    page: number
  ): Promise<DistressCall[]> {
    const data = await this.distressCallRespository.listAll(
      activid,
      take,
      page
    );

    const dataFormated = data.map((item: DistressCall) => {
      return {
        id: item.id,
        lat: item.lat,
        lng: item.lng,
        activid: true,
        token_channel: item.token_channel,
        created_at: item.created_at,
        updated_at: item.updated_at,
        user: UserMap.toDTO(item.user),
      };
    });

    return dataFormated as DistressCall[];
  }
}

export { ListAllDistressCallUseCase };
