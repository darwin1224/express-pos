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
  Param,
  Put,
  Delete,
} from 'routing-controllers';
import { NotFoundException } from '@/exceptions/NotFoundException';

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
   * Get a single resource from storage
   *
   * @param {number} id
   * @returns {Promise<SupplierModel>}
   */
  @Get('/:id')
  public async show(@Param('id') id: number): Promise<SupplierModel> {
    try {
      return await this.supplier.getSupplierById(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  /**
   * Insert a single resource into storage
   *
   * @param {SupplierModel} supplier
   * @returns {Promise<SupplierModel>}
   */
  @Post()
  public async store(@Body() supplier: SupplierModel): Promise<SupplierModel> {
    try {
      return await this.supplier.insertSupplier(supplier);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Update a single resource from storage
   *
   * @param {number} id
   * @param {supplier} SupplierModel
   * @returns {Promise<SupplierModel>}
   */
  @Put('/:id')
  public async update(
    @Param('id') id: number,
    @Body() supplier: SupplierModel,
  ): Promise<SupplierModel> {
    try {
      const data = await this.supplier.getSupplierById(id);
      if (!data) {
        throw new NotFoundException('Data not found');
      }
      await this.supplier.updateSupplier(id, supplier);
      return data;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Delete a single resource from storage
   *
   * @param {number} id}
   * @returns {Promise<SupplierModel>}
   */
  @Delete('/:id')
  public async destroy(@Param('id') id: number): Promise<SupplierModel> {
    try {
      const data = await this.supplier.getSupplierById(id);
      if (!data) {
        throw new NotFoundException('Data not found');
      }
      await this.supplier.deleteSupplier(id);
      return data;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
