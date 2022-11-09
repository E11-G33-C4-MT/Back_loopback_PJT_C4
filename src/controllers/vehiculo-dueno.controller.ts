import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  Dueno,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoDuenoController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/dueno', {
    responses: {
      '200': {
        description: 'Dueno belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Dueno)},
          },
        },
      },
    },
  })
  async getDueno(
    @param.path.string('id') id: typeof Vehiculo.prototype.placa,
  ): Promise<Dueno> {
    return this.vehiculoRepository.dueno(id);
  }
}
