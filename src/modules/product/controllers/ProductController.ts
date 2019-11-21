import { BadRequestException } from '@/exceptions/BadRequestException';
import { Authenticate } from '@/middlewares/Authenticate';
import { ProductModel } from '@/modules/product/models/ProductModel';
import { ProductResource } from '@/modules/product/resources/ProductResource';
import { ProductService } from '@/modules/product/services/ProductService';
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

@JsonController('/product')
@UseBefore(Authenticate)
@Authorized(['admin', 'cashier'])
export class ProductController {
  /**
   * Constructor
   *
   * @param {ProductService} product
   * @returns {void}
   */
  public constructor(private readonly product: ProductService) {}

  /**
   * Get all resource in storage
   *
   * @returns {Promise<ProductModel[]>}
   */
  @Get()
  @UseInterceptor(ProductResource)
  public async index(): Promise<ProductModel[]> {
    try {
      return await this.product.getAllProduct();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Get a single resource from storage
   *
   * @param {number} id
   * @returns {Promise<ProductModel>}
   */
  @Get('/:id')
  public async show(@Param('id') id: number): Promise<ProductModel> {
    try {
      return await this.product.getProductById(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  /**
   * Insert a single resource into storage
   *
   * @param {ProductModel} product
   * @returns {Promise<ProductModel>}
   */
  @Post()
  public async store(@Body() product: ProductModel): Promise<ProductModel> {
    try {
      return await this.product.insertProduct(product);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Update a single resource from storage
   *
   * @param {number} id
   * @param {product} ProductModel
   * @returns {Promise<ProductModel>}
   */
  @Put('/:id')
  public async update(
    @Param('id') id: number,
    @Body() product: ProductModel,
  ): Promise<ProductModel> {
    try {
      const data = await this.product.getProductById(id);
      if (!data) {
        throw new NotFoundException('Data not found');
      }
      await this.product.updateProduct(id, product);
      return data;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Delete a single resource from storage
   *
   * @param {number} id}
   * @returns {Promise<ProductModel>}
   */
  @Delete('/:id')
  public async destroy(@Param('id') id: number): Promise<ProductModel> {
    try {
      const data = await this.product.getProductById(id);
      if (!data) {
        throw new NotFoundException('Data not found');
      }
      await this.product.deleteProduct(id);
      return data;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
