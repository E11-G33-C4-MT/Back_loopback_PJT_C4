import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Dueno} from '../models';
import {DuenoRepository} from './dueno.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.placa,
  VehiculoRelations
> {

  public readonly dueno: BelongsToAccessor<Dueno, typeof Vehiculo.prototype.placa>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DuenoRepository') protected duenoRepositoryGetter: Getter<DuenoRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.dueno = this.createBelongsToAccessorFor('dueno', duenoRepositoryGetter,);
    this.registerInclusionResolver('dueno', this.dueno.inclusionResolver);
  }
}
