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

@JsonController('/incoming_stock')
@UseBefore(Authenticate)
@Authorized('admin')
export class IncomingStockController {
  /**
   * Constructor
   *
   * @param {IncomingStockService} incomingStock
   * @returns {void}
   */
  public constructor(private readonly incomingStock: IncomingStockService) {}

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
      return await this.incomingStock.insertIncomingStock(incomingStock);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
