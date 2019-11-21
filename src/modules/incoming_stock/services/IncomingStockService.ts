import { IncomingStockModel } from '@/modules/incoming_stock/models/IncomingStockModel';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class IncomingStockService {
  /**
   * Constructor
   *
   * @param {Repository<IncomingStockModel>}
   * @returns {void}
   */
  public constructor(
    @InjectRepository(IncomingStockModel)
    private readonly incomingStock: Repository<IncomingStockModel>,
  ) {}

  /**
   * Get all data
   *
   * @returns {Promise<IncomingStockModel[]>}
   */
  public getAllIncomingStock(): Promise<IncomingStockModel[]> {
    return this.incomingStock.find({
      relations: ['product_id', 'supplier_id'],
    });
  }

  /**
   * Insert data
   *
   * @returns {Promise<IncomingStockModel>}
   */
  public insertIncomingStock(params: IncomingStockModel): Promise<IncomingStockModel> {
    return this.incomingStock.save(params);
  }
}
