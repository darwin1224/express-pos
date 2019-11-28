import { SupplierController } from '@/modules/supplier/controllers/SupplierController';

class SupplierServiceMock {
  public getAllSupplier: jest.Mock = jest.fn();
  public getSupplierById: jest.Mock = jest.fn();
}

describe('Supplier Controller unit tests', () => {
  let supplier: SupplierController;
  let supplierServiceMock: SupplierServiceMock;

  beforeAll(() => {
    supplierServiceMock = new SupplierServiceMock();
    supplier = new SupplierController(supplierServiceMock as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('index()', () => {
    beforeEach(async () => {
      await supplier.index();
    });

    it('getAllSupplier() should have been called 1 time', () => {
      expect(supplierServiceMock.getAllSupplier).toHaveBeenCalledTimes(1);
    });

    it('getAllSupplier() should have 1 returned time', () => {
      expect(supplierServiceMock.getAllSupplier).toHaveReturnedTimes(1);
    });
  });

  describe('show()', () => {
    beforeEach(async () => {
      await supplier.show(1);
    });

    it('getSupplierById() should have been called 1 time', () => {
      expect(supplierServiceMock.getSupplierById).toHaveBeenCalledTimes(1);
    });

    it('getSupplierById() should be called with "1" argument', () => {
      expect(supplierServiceMock.getSupplierById).toBeCalledWith(1);
    });

    it('getSupplierById() should have 1 returned time', () => {
      expect(supplierServiceMock.getSupplierById).toHaveReturnedTimes(1);
    });
  });
});
