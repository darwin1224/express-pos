import { TransactionModel } from '@/modules/transaction/models/TransactionModel';
import { Service } from 'typedi';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class TransactionService {
  /**
   * Constructor
   *
   * @param {Repository<TransactionModel>}
   * @returns {void}
   */
  public constructor(
    @InjectRepository(TransactionModel) private readonly transaction: Repository<TransactionModel>,
  ) {}

  /**
   * Get all data
   *
   * @returns {Promise<TransactionModel[]>}
   */
  public getAllTransaction(): Promise<TransactionModel[]> {
    return this.transaction.find({
      relations: ['product_id'],
    });
  }

  /**
   * Insert data
   *
   * @returns {Promise<TransactionModel>}
   */
  public insertTransaction(params: TransactionModel): Promise<TransactionModel> {
    return this.transaction.save(params);
  }
}
