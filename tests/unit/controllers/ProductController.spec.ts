import { ProductController } from '@/modules/product/controllers/ProductController';

class ProductServiceMock {
  public getAllProduct: jest.Mock = jest.fn();
  public getProductById: jest.Mock = jest.fn(() => ({ product_name: 'Gas Kompor' }));
  public insertProduct: jest.Mock = jest.fn();
  public updateProduct: jest.Mock = jest.fn();
  public deleteProduct: jest.Mock = jest.fn();
}

describe('Product Controller unit tests', () => {
  let product: ProductController;
  let productServiceMock: ProductServiceMock;

  beforeEach(() => {
    productServiceMock = new ProductServiceMock();
    product = new ProductController(productServiceMock as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('index()', () => {
    beforeEach(async () => {
      await product.index();
    });

    it('getAllProduct() should have been called 1 time', () => {
      expect(productServiceMock.getAllProduct).toHaveBeenCalledTimes(1);
    });

    it('getAllProduct() should have 1 returned time', () => {
      expect(productServiceMock.getAllProduct).toHaveReturnedTimes(1);
    });
  });

  describe('show()', () => {
    beforeEach(async () => {
      await product.show(1);
    });

    it('getProductById() should have been called 1 time', () => {
      expect(productServiceMock.getProductById).toHaveBeenCalledTimes(1);
    });

    it('getProductById() should have "1" argument value', () => {
      expect(productServiceMock.getProductById).toBeCalledWith(1);
    });

    it('getProductById() should have 1 returned time', () => {
      expect(productServiceMock.getProductById).toHaveReturnedTimes(1);
    });
  });

  describe('store()', () => {
    const params = { product_name: 'Kompor', product_price: 50000, product_stock: 5 };

    beforeEach(async () => {
      await product.store(params);
    });

    it('insertProduct() should have been called 1 time', () => {
      expect(productServiceMock.insertProduct).toHaveBeenCalledTimes(1);
    });

    it('insertProduct() should have received correct argument value', () => {
      expect(productServiceMock.insertProduct).toBeCalledWith(params);
    });

    it('insertProduct() should have 1 returned time', () => {
      expect(productServiceMock.insertProduct).toHaveReturnedTimes(1);
    });
  });

  describe('update()', () => {
    const params = { product_name: 'Gas Minyak', product_price: 50000, product_stock: 5 };

    beforeEach(async () => {
      await product.update(1, params);
    });

    it('getProductById() should have been called 1 time', () => {
      expect(productServiceMock.getProductById).toHaveBeenCalledTimes(1);
    });

    it('getProductById() should have received correct argument value', () => {
      expect(productServiceMock.getProductById).toBeCalledWith(1);
    });

    it('getProductById() should have 1 returned time', () => {
      expect(productServiceMock.getProductById).toHaveReturnedTimes(1);
    });

    it('getProductById() should have received correct return value', () => {
      expect(productServiceMock.getProductById).toHaveReturnedWith({ product_name: 'Gas Kompor' });
    });

    it('updateProduct() should have been called 1 time', () => {
      expect(productServiceMock.updateProduct).toHaveBeenCalledTimes(1);
    });

    it('updateProduct() should have received correct argument value', () => {
      expect(productServiceMock.updateProduct).toBeCalledWith(1, params);
    });

    it('updateProduct() should have 1 returned time', () => {
      expect(productServiceMock.updateProduct).toHaveReturnedTimes(1);
    });
  });

  describe('destroy()', () => {
    beforeEach(async () => {
      await product.destroy(1);
    });

    it('getProductById() should have been called 1 time', () => {
      expect(productServiceMock.deleteProduct).toHaveBeenCalledTimes(1);
    });

    it('getProductById() should have received correct argument value', () => {
      expect(productServiceMock.getProductById).toBeCalledWith(1);
    });

    it('getProductById() should have 1 returned time', () => {
      expect(productServiceMock.getProductById).toHaveReturnedTimes(1);
    });

    it('getProductById() should have received correct return value', () => {
      expect(productServiceMock.getProductById).toHaveReturnedWith({ product_name: 'Gas Kompor' });
    });

    it('deleteProduct() should have been called 1 time', () => {
      expect(productServiceMock.deleteProduct).toHaveBeenCalledTimes(1);
    });

    it('deleteProduct() should have received correct argument value', () => {
      expect(productServiceMock.deleteProduct).toBeCalledWith(1);
    });

    it('deleteProduct() should have 1 returned time', () => {
      expect(productServiceMock.deleteProduct).toHaveReturnedTimes(1);
    });
  });
});
