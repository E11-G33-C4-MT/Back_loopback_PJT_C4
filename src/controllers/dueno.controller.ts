import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Dueno} from '../models';
import {DuenoRepository} from '../repositories';

export class DuenoController {
  constructor(
    @repository(DuenoRepository)
    public duenoRepository : DuenoRepository,
  ) {}

  @post('/duenos')
  @response(200, {
    description: 'Dueno model instance',
    content: {'application/json': {schema: getModelSchemaRef(Dueno)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dueno, {
            title: 'NewDueno',
            exclude: ['id'],
          }),
        },
      },
    })
    dueno: Omit<Dueno, 'id'>,
  ): Promise<Dueno> {
    return this.duenoRepository.create(dueno);
  }

  @get('/duenos/count')
  @response(200, {
    description: 'Dueno model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Dueno) where?: Where<Dueno>,
  ): Promise<Count> {
    return this.duenoRepository.count(where);
  }

  @get('/duenos')
  @response(200, {
    description: 'Array of Dueno model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Dueno, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Dueno) filter?: Filter<Dueno>,
  ): Promise<Dueno[]> {
    return this.duenoRepository.find(filter);
  }

  @patch('/duenos')
  @response(200, {
    description: 'Dueno PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dueno, {partial: true}),
        },
      },
    })
    dueno: Dueno,
    @param.where(Dueno) where?: Where<Dueno>,
  ): Promise<Count> {
    return this.duenoRepository.updateAll(dueno, where);
  }

  @get('/duenos/{id}')
  @response(200, {
    description: 'Dueno model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Dueno, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Dueno, {exclude: 'where'}) filter?: FilterExcludingWhere<Dueno>
  ): Promise<Dueno> {
    return this.duenoRepository.findById(id, filter);
  }

  @patch('/duenos/{id}')
  @response(204, {
    description: 'Dueno PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dueno, {partial: true}),
        },
      },
    })
    dueno: Dueno,
  ): Promise<void> {
    await this.duenoRepository.updateById(id, dueno);
  }

  @put('/duenos/{id}')
  @response(204, {
    description: 'Dueno PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() dueno: Dueno,
  ): Promise<void> {
    await this.duenoRepository.replaceById(id, dueno);
  }

  @del('/duenos/{id}')
  @response(204, {
    description: 'Dueno DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.duenoRepository.deleteById(id);
  }
}
