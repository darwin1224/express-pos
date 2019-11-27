import { SupplierController } from '@/modules/supplier/controllers/SupplierController';
import { SupplierService } from '@/modules/supplier/services/SupplierService';

jest.mock('@/modules/supplier/services/SupplierService', () => ({
  getAllSupplier: jest.fn(() => [{ supplier_id: 1, supplier_name: 'Darwin' }]),
}));

describe('Supplier Controller unit tests', () => {
  let supplier: SupplierController;
  let service: SupplierService;

  beforeAll(() => {
    service = new SupplierService(null as any);
    supplier = new SupplierController(service);
  });

  describe('index()', () => {
    it('should return correct supplier columns', async () => {
      const data = await supplier.index();
      expect(service.getAllSupplier).toHaveBeenCalled();
      expect(service.getAllSupplier).toEqual([{ supplier_id: 1, supplier_name: 'Darwin' }]);
    });
  });
});
