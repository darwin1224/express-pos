import { BadRequestException } from '@/exceptions/BadRequestException';
import { Authenticate } from '@/middlewares/Authenticate';
import { ProductService } from '@/modules/product/services/ProductService';
import { TransactionModel } from '@/modules/transaction/models/TransactionModel';
import { TransactionResource } from '@/modules/transaction/resources/TransactionResource';
import { TransactionService } from '@/modules/transaction/services/TransactionService';
import {
  Authorized,
  Body,
  Get,
  JsonController,
  Post,
  UseBefore,
  UseInterceptor,
} from 'routing-controllers';

@JsonController('/transaction')
@UseBefore(Authenticate)
@Authorized(['admin', 'cashier'])
export class TransactionController {
  /**
   * Constructor
   *
   * @param {TransactionService} transaction
   * @param {ProductService} product
   * @returns {void}
   */
  public constructor(
    private readonly transaction: TransactionService,
    private readonly product: ProductService,
  ) {}

  /**
   * Get all resource in storage
   *
   * @returns {Promise<TransactionModel[]>}
   */
  @Get()
  @UseInterceptor(TransactionResource)
  public async index(): Promise<TransactionModel[]> {
    try {
      return await this.transaction.getAllTransaction();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Insert a single resource into storage
   *
   * @param {TransactionModel} transaction
   * @returns {Promise<TransactionModel>}
   */
  @Post()
  public async store(@Body() transaction: TransactionModel): Promise<TransactionModel> {
    try {
      const store = await this.transaction.insertTransaction(transaction);
      await this.product.decreaseStockProductById(store.product_id, store.quantity);
      return store;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
