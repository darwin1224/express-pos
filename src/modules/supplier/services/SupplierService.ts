import { SupplierModel } from '@/modules/supplier/models/SupplierModel';
import { Service } from 'typedi';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class SupplierService {
  /**
   * Constructor
   *
   * @param {Repository<SupplierModel>}
   * @returns {void}
   */
  public constructor(
    @InjectRepository(SupplierModel) private readonly supplier: Repository<SupplierModel>,
  ) {}

  /**
   * Get all data
   *
   * @returns {Promise<SupplierModel[]>}
   */
  public getAllSupplier(): Promise<SupplierModel[]> {
    return this.supplier.find();
  }

  /**
   * Get data by id
   *
   * @param {number} id
   * @returns {Promise<SupplierModel>}
   */
  public getSupplierById(id: number): Promise<SupplierModel> {
    return this.supplier.findOneOrFail(id);
  }

  /**
   * Insert data
   *
   * @returns {Promise<SupplierModel>}
   */
  public insertSupplier(params: SupplierModel): Promise<SupplierModel> {
    return this.supplier.save(params);
  }

  /**
   * Update data by id
   *
   * @param {number} id
   * @param {SupplierModel} params
   * @returns {Promise<UpdateResult>}
   */
  public updateSupplier(id: number, params: SupplierModel): Promise<UpdateResult> {
    return this.supplier.update(id, params);
  }

  /**
   * Delete data by id
   *
   * @param {number} id
   * @returns {Promise<DeleteResult>}
   */
  public deleteSupplier(id: number): Promise<DeleteResult> {
    return this.supplier.delete(id);
  }
}
