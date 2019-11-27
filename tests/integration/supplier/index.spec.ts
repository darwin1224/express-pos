import { SupplierModel } from '@/modules/supplier/models/SupplierModel';
import { SupplierService } from '@/modules/supplier/services/SupplierService';
import { Connection, createConnection, getRepository } from 'typeorm';

describe('Supplier service integration tests', () => {
  let connection: Connection;
  let supplier: SupplierService;
  let id;

  beforeAll(async () => {
    connection = await createConnection();
    supplier = new SupplierService(getRepository(SupplierModel));
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('getAllSupplier()', () => {
    let data;

    beforeAll(async () => {
      data = await supplier.getAllSupplier();
    });

    it('should return correct supplier columns', async () => {
      data.map(item => {
        expect(Object.keys(item)).toEqual(['supplier_id', 'supplier_name']);
      });
    });
  });

  describe('getSupplierById()', () => {
    let data;

    beforeAll(async () => {
      data = await supplier.getSupplierById(1);
    });

    it('should return correct supplier columns', async () => {
      expect(Object.keys(data)).toEqual(['supplier_id', 'supplier_name']);
    });
  });

  describe('insertSupplier()', () => {
    let insert;

    beforeAll(async () => {
      insert = await supplier.insertSupplier({ supplier_name: 'Michael ' });
    });

    afterAll(() => {
      id = insert.supplier_id;
    });

    it('should return correct supplier columns', async () => {
      expect(Object.keys(insert)).toEqual(['supplier_name', 'supplier_id']);
    });
  });

  describe('updateSupplier()', () => {
    let update;

    beforeAll(async () => {
      update = await supplier.updateSupplier(id, { supplier_name: 'Andi' });
    });

    it('should return correct updated result object keys', async () => {
      expect(Object.keys(update)).toEqual(['generatedMaps', 'raw']);
    });
  });

  describe('deleteSupplier()', () => {
    let destroy;

    beforeAll(async () => {
      destroy = await supplier.deleteSupplier(id);
    });

    it('should return correct deleted result object keys', async () => {
      expect(Object.keys(destroy)).toEqual(['raw', 'affected']);
    });
  });
});
