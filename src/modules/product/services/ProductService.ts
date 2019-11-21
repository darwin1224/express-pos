import { ProductModel } from '@/modules/product/models/ProductModel';
import { Service } from 'typedi';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class ProductService {
  /**
   * Constructor
   *
   * @param {Repository<ProductModel>}
   * @returns {void}
   */
  public constructor(
    @InjectRepository(ProductModel) private readonly product: Repository<ProductModel>,
  ) {}

  /**
   * Get all data
   *
   * @returns {Promise<ProductModel[]>}
   */
  public getAllProduct(): Promise<ProductModel[]> {
    return this.product.find();
  }

  /**
   * Get data by id
   *
   * @param {number} id
   * @returns {Promise<ProductModel>}
   */
  public getProductById(id: number): Promise<ProductModel> {
    return this.product.findOneOrFail(id);
  }

  /**
   * Insert data
   *
   * @returns {Promise<ProductModel>}
   */
  public insertProduct(params: ProductModel): Promise<ProductModel> {
    return this.product.save(params);
  }

  /**
   * Update data by id
   *
   * @param {number} id
   * @param {ProductModel} params
   * @returns {Promise<UpdateResult>}
   */
  public updateProduct(id: number, params: ProductModel): Promise<UpdateResult> {
    return this.product.update(id, params);
  }

  /**
   * Delete data by id
   *
   * @param {number} id
   * @returns {Promise<DeleteResult>}
   */
  public deleteProduct(id: number): Promise<DeleteResult> {
    return this.product.delete(id);
  }

  /**
   * Increase stock product by id
   *
   * @param {number} id
   * @param {number} product_stock
   * @returns {Promise<UpdateResult>}
   */
  public increaseStockProductById(id: number, product_stock: number): Promise<UpdateResult> {
    return this.product.query(
      'UPDATE tbl_product SET product_stock = product_stock + ? WHERE product_id = ?',
      [product_stock, id],
    );
  }

  /**
   * Decrease stock product by id
   *
   * @param {number} id
   * @param {number} product_stock
   * @returns {Promise<UpdateResult>}
   */
  public decreaseStockProductById(id: number, product_stock: number): Promise<UpdateResult> {
    return this.product.query(
      'UPDATE tbl_product SET product_stock = product_stock - ? WHERE product_id = ?',
      [product_stock, id],
    );
  }
}
