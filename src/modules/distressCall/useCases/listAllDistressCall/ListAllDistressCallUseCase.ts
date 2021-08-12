import { inject, injectable } from 'tsyringe';

import { DistressCall } from '@modules/distressCall/infra/typeorm/entities/DistressCall';
import { IDistressCallRepository } from '@modules/distressCall/respositories/IDistressCallRepository';

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
        user: {
          id: item.user.id,
          name: item.user.name,
          document: item.user.document,
          cell_phone: item.user.cell_phone,
        },
      };
    });

    return dataFormated as DistressCall[];
  }
}

export { ListAllDistressCallUseCase };
