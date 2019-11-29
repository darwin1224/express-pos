import { ProductService } from '@/modules/product/services/ProductService';

class ProductModelMock {
  public find: jest.Mock = jest.fn();
  public findOneOrFail: jest.Mock = jest.fn();
  public save: jest.Mock = jest.fn();
  public update: jest.Mock = jest.fn();
  public delete: jest.Mock = jest.fn();
}

describe('Product service unit tests', () => {
  let product: ProductService;
  let productModelMock: ProductModelMock;

  beforeAll(() => {
    productModelMock = new ProductModelMock();
    product = new ProductService(productModelMock as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProduct()', () => {
    beforeEach(async () => {
      await product.getAllProduct();
    });

    it('find() should have been called 1 time', () => {
      expect(productModelMock.find).toHaveBeenCalledTimes(1);
    });

    it('find() should have 1 returned times', () => {
      expect(productModelMock.find).toHaveReturnedTimes(1);
    });
  });

  describe('getProductById()', () => {
    beforeEach(async () => {
      await product.getProductById(1);
    });

    it('findOneOrFail() should have been called 1 time', () => {
      expect(productModelMock.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('findOneOrFail() should have been called with "1" argument value', () => {
      expect(productModelMock.findOneOrFail).toBeCalledWith(1);
    });

    it('findOneOrFail() should have 1 returned time', () => {
      expect(productModelMock.findOneOrFail).toHaveReturnedTimes(1);
    });
  });

  describe('insertProduct', () => {
    const params = { product_name: 'Sabun Batang', product_price: 30000, product_stock: 6 };

    beforeEach(async () => {
      await product.insertProduct(params);
    });

    it('save() should have been called 1 time', () => {
      expect(productModelMock.save).toHaveBeenCalledTimes(1);
    });

    it('save() should have been called with correct argument value', () => {
      expect(productModelMock.save).toBeCalledWith(params);
    });

    it('save() should have 1 returned time', () => {
      expect(productModelMock.save).toHaveReturnedTimes(1);
    });
  });

  describe('updateProduct', () => {
    const params = { product_name: 'Minyak Goreng', product_price: 40000, product_stock: 4 };

    beforeEach(async () => {
      await product.updateProduct(1, params);
    });

    it('update() should have been called 1 time', () => {
      expect(productModelMock.update).toHaveBeenCalledTimes(1);
    });

    it('update() should have been called with correct argument value', () => {
      expect(productModelMock.update).toBeCalledWith(1, params);
    });

    it('update() should have 1 returned time', () => {
      expect(productModelMock.update).toHaveReturnedTimes(1);
    });
  });

  describe('deleteProduct()', () => {
    beforeEach(async () => {
      await product.deleteProduct(1);
    });

    it('delete() should have been called 1 time', () => {
      expect(productModelMock.delete).toHaveBeenCalledTimes(1);
    });

    it('delete() should have been called with "1" argument value', () => {
      expect(productModelMock.delete).toBeCalledWith(1);
    });

    it('delete() should have 1 returned time', () => {
      expect(productModelMock.delete).toHaveReturnedTimes(1);
    });
  });
});
