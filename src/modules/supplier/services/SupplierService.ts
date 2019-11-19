import { SupplierModel } from '@/modules/supplier/models/SupplierModel';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class SupplierService {
  /**
   * Constructor
   *
   * @param {Repository<SupplierModel>}
   * @returns {void}
   */
  public constructor(@InjectRepository(SupplierModel) private readonly supplier: Repository<SupplierModel>) {}

  /**
   * Get all data
   *
   * @returns {Promise<SupplierModel[]>}
   */
  public getAllSupplier(): Promise<SupplierModel[]> {
    return this.supplier.find();
  }

  /**
   * Insert data
   *
   * @returns {Promise<SupplierModel>}
   */
  public insertSupplier(params: SupplierModel): Promise<SupplierModel> {
    return this.supplier.save(params);
  }
}
