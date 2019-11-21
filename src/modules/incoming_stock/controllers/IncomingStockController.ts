import { BadRequestException } from '@/exceptions/BadRequestException';
import { Authenticate } from '@/middlewares/Authenticate';
import { IncomingStockModel } from '@/modules/incoming_stock/models/IncomingStockModel';
import { IncomingStockResource } from '@/modules/incoming_stock/resources/IncomingStockResource';
import { IncomingStockService } from '@/modules/incoming_stock/services/IncomingStockService';
import {
  Authorized,
  Body,
  Get,
  JsonController,
  Post,
  UseBefore,
  UseInterceptor,
} from 'routing-controllers';
import { ProductService } from '@/modules/product/services/ProductService';

@JsonController('/incoming_stock')
@UseBefore(Authenticate)
@Authorized('admin')
export class IncomingStockController {
  /**
   * Constructor
   *
   * @param {IncomingStockService} incomingStock
   * @param {ProductService} product
   * @returns {void}
   */
  public constructor(
    private readonly incomingStock: IncomingStockService,
    private readonly product: ProductService,
  ) {}

  /**
   * Get all resource in storage
   *
   * @returns {Promise<IncomingStockModel[]>}
   */
  @Get()
  @UseInterceptor(IncomingStockResource)
  public async index(): Promise<IncomingStockModel[]> {
    try {
      return await this.incomingStock.getAllIncomingStock();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Insert a single resource into storage
   *
   * @param {IncomingStockModel} incomingStock
   * @returns {Promise<IncomingStockModel>}
   */
  @Post()
  public async store(@Body() incomingStock: IncomingStockModel): Promise<IncomingStockModel> {
    try {
      const store = await this.incomingStock.insertIncomingStock(incomingStock);
      await this.product.increaseStockProductById(store.product_id, store.incoming_stock_added);
      return store;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
