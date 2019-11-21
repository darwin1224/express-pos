import { BadRequestException } from '@/exceptions/BadRequestException';
import { Authenticate } from '@/middlewares/Authenticate';
import { SupplierModel } from '@/modules/supplier/models/SupplierModel';
import { SupplierResource } from '@/modules/supplier/resources/SupplierResource';
import { SupplierService } from '@/modules/supplier/services/SupplierService';
import {
  Body,
  Get,
  JsonController,
  Post,
  UseBefore,
  UseInterceptor,
  Authorized,
} from 'routing-controllers';

@JsonController('/supplier')
@UseBefore(Authenticate)
@Authorized(['admin', 'cashier'])
export class SupplierController {
  /**
   * Constructor
   *
   * @param {SupplierService} supplier
   * @returns {void}
   */
  public constructor(private readonly supplier: SupplierService) {}

  /**
   * Get all resource in storage
   *
   * @returns {Promise<SupplierModel[]>}
   */
  @Get()
  @UseInterceptor(SupplierResource)
  public async index(): Promise<SupplierModel[]> {
    try {
      return await this.supplier.getAllSupplier();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Insert a single resource into storage
   *
   * @param {SupplierModel} params
   * @returns {Promise<SupplierModel>}
   */
  @Post()
  public async store(@Body() params: SupplierModel): Promise<SupplierModel> {
    try {
      return await this.supplier.insertSupplier(params);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
