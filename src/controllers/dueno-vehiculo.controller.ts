import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Dueno,
  Vehiculo,
} from '../models';
import {DuenoRepository} from '../repositories';

export class DuenoVehiculoController {
  constructor(
    @repository(DuenoRepository) protected duenoRepository: DuenoRepository,
  ) { }

  @get('/duenos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Dueno has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.duenoRepository.vehiculos(id).find(filter);
  }

  @post('/duenos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Dueno model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Dueno.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInDueno',
            exclude: ['placa'],
            optional: ['duenoId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'placa'>,
  ): Promise<Vehiculo> {
    return this.duenoRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/duenos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Dueno.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.duenoRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/duenos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Dueno.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.duenoRepository.vehiculos(id).delete(where);
  }
}
