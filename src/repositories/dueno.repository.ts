import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Dueno, DuenoRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class DuenoRepository extends DefaultCrudRepository<
  Dueno,
  typeof Dueno.prototype.id,
  DuenoRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Dueno.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Dueno, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
