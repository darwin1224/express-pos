import { RoleUserModel } from '@/modules/role_user/models/RoleUserModel';
import { RoleUserService } from '@/modules/role_user/services/RoleUserService';
import { Connection, createConnection, getRepository } from 'typeorm';

describe('RoleUser service integration tests', () => {
  let connection: Connection;
  let roleUser: RoleUserService;

  beforeAll(async () => {
    connection = await createConnection();
    roleUser = new RoleUserService(getRepository(RoleUserModel));
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('getAllRoleUser()', () => {
    let data;

    beforeAll(async () => {
      data = await roleUser.getAllRoleUser();
    });

    it('should return correct role_user columns', async () => {
      data.map(item => {
        expect(Object.keys(item)).toEqual(['role_user_id', 'role_user_name']);
      });
    });
  });

  describe('insertRoleUser()', () => {
    let insert;

    beforeAll(async () => {
      insert = await roleUser.insertRoleUser({ role_user_name: 'Michael ' });
    });

    it('should return correct role_user columns', async () => {
      expect(Object.keys(insert)).toEqual(['role_user_name', 'role_user_id']);
    });
  });
});
