import { SupplierController } from '@/modules/supplier/controllers/SupplierController';

class SupplierServiceMock {
  public getAllSupplier: jest.Mock = jest.fn();
  public getSupplierById: jest.Mock = jest.fn(() => ({ supplier_name: 'Darwin' }));
  public insertSupplier: jest.Mock = jest.fn();
  public updateSupplier: jest.Mock = jest.fn();
  public deleteSupplier: jest.Mock = jest.fn();
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

  describe('store()', () => {
    const params = { supplier_name: 'Kompor', supplier_price: 50000, supplier_stock: 5 };

    beforeEach(async () => {
      await supplier.store(params);
    });

    it('insertSupplier() should have been called 1 time', () => {
      expect(supplierServiceMock.insertSupplier).toHaveBeenCalledTimes(1);
    });

    it('insertSupplier() should have received correct argument value', () => {
      expect(supplierServiceMock.insertSupplier).toBeCalledWith(params);
    });

    it('insertSupplier() should have 1 returned time', () => {
      expect(supplierServiceMock.insertSupplier).toHaveReturnedTimes(1);
    });
  });

  describe('update()', () => {
    const params = { supplier_name: 'Michael' };

    beforeEach(async () => {
      await supplier.update(1, params);
    });

    it('getSupplierById() should have been called 1 time', () => {
      expect(supplierServiceMock.getSupplierById).toHaveBeenCalledTimes(1);
    });

    it('getSupplierById() should have received correct argument value', () => {
      expect(supplierServiceMock.getSupplierById).toBeCalledWith(1);
    });

    it('getSupplierById() should have 1 returned time', () => {
      expect(supplierServiceMock.getSupplierById).toHaveReturnedTimes(1);
    });

    it('getSupplierById() should have received correct return value', () => {
      expect(supplierServiceMock.getSupplierById).toHaveReturnedWith({
        supplier_name: 'Darwin',
      });
    });

    it('updateSupplier() should have been called 1 time', () => {
      expect(supplierServiceMock.updateSupplier).toHaveBeenCalledTimes(1);
    });

    it('updateSupplier() should have received correct argument value', () => {
      expect(supplierServiceMock.updateSupplier).toBeCalledWith(1, params);
    });

    it('updateSupplier() should have 1 returned time', () => {
      expect(supplierServiceMock.updateSupplier).toHaveReturnedTimes(1);
    });
  });

  describe('destroy()', () => {
    beforeEach(async () => {
      await supplier.destroy(1);
    });

    it('getSupplierById() should have been called 1 time', () => {
      expect(supplierServiceMock.deleteSupplier).toHaveBeenCalledTimes(1);
    });

    it('getSupplierById() should have received correct argument value', () => {
      expect(supplierServiceMock.getSupplierById).toBeCalledWith(1);
    });

    it('getSupplierById() should have 1 returned time', () => {
      expect(supplierServiceMock.getSupplierById).toHaveReturnedTimes(1);
    });

    it('getSupplierById() should have received correct return value', () => {
      expect(supplierServiceMock.getSupplierById).toHaveReturnedWith({
        supplier_name: 'Darwin',
      });
    });

    it('deleteSupplier() should have been called 1 time', () => {
      expect(supplierServiceMock.deleteSupplier).toHaveBeenCalledTimes(1);
    });

    it('deleteSupplier() should have received correct argument value', () => {
      expect(supplierServiceMock.deleteSupplier).toBeCalledWith(1);
    });

    it('deleteSupplier() should have 1 returned time', () => {
      expect(supplierServiceMock.deleteSupplier).toHaveReturnedTimes(1);
    });
  });
});
