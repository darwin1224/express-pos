import { ProductController } from '@/modules/product/controllers/ProductController';

class ProductServiceMock {
  public getAllProduct: jest.Mock = jest.fn();
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
});
