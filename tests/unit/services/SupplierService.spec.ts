import { SupplierService } from '@/modules/supplier/services/SupplierService';

class SupplierModelMock {
  public find: jest.Mock = jest.fn();
  public findOneOrFail: jest.Mock = jest.fn();
  public save: jest.Mock = jest.fn();
  public update: jest.Mock = jest.fn();
  public delete: jest.Mock = jest.fn();
}

describe('Supplier service unit tests', () => {
  let supplier: SupplierService;
  let supplierModelMock: SupplierModelMock;

  beforeAll(() => {
    supplierModelMock = new SupplierModelMock();
    supplier = new SupplierService(supplierModelMock as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllSupplier()', () => {
    beforeEach(async () => {
      await supplier.getAllSupplier();
    });

    it('find() should have been called 1 time', () => {
      expect(supplierModelMock.find).toHaveBeenCalledTimes(1);
    });

    it('find() should have 1 returned times', () => {
      expect(supplierModelMock.find).toHaveReturnedTimes(1);
    });
  });

  describe('getSupplierById()', () => {
    beforeEach(async () => {
      await supplier.getSupplierById(1);
    });

    it('findOneOrFail() should have been called 1 time', () => {
      expect(supplierModelMock.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('findOneOrFail() should have been called with "1" argument value', () => {
      expect(supplierModelMock.findOneOrFail).toBeCalledWith(1);
    });

    it('findOneOrFail() should have 1 returned time', () => {
      expect(supplierModelMock.findOneOrFail).toHaveReturnedTimes(1);
    });
  });

  describe('insertSupplier', () => {
    const params = { supplier_name: 'Darwin' };

    beforeEach(async () => {
      await supplier.insertSupplier(params);
    });

    it('save() should have been called 1 time', () => {
      expect(supplierModelMock.save).toHaveBeenCalledTimes(1);
    });

    it('save() should have been called with correct argument value', () => {
      expect(supplierModelMock.save).toBeCalledWith(params);
    });

    it('save() should have 1 returned time', () => {
      expect(supplierModelMock.save).toHaveReturnedTimes(1);
    });
  });

  describe('updateSupplier', () => {
    const params = { supplier_name: 'Budi' };

    beforeEach(async () => {
      await supplier.updateSupplier(1, params);
    });

    it('update() should have been called 1 time', () => {
      expect(supplierModelMock.update).toHaveBeenCalledTimes(1);
    });

    it('update() should have been called with correct argument value', () => {
      expect(supplierModelMock.update).toBeCalledWith(1, params);
    });

    it('update() should have 1 returned time', () => {
      expect(supplierModelMock.update).toHaveReturnedTimes(1);
    });
  });

  describe('deleteSupplier()', () => {
    beforeEach(async () => {
      await supplier.deleteSupplier(1);
    });

    it('delete() should have been called 1 time', () => {
      expect(supplierModelMock.delete).toHaveBeenCalledTimes(1);
    });

    it('delete() should have been called with "1" argument value', () => {
      expect(supplierModelMock.delete).toBeCalledWith(1);
    });

    it('delete() should have 1 returned time', () => {
      expect(supplierModelMock.delete).toHaveReturnedTimes(1);
    });
  });
});
