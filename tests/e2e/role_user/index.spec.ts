import req from 'supertest';

const apiBaseUrl = 'http://localhost:3000';

describe('/role_user', () => {
  let loginResponse;
  let token;
  let id;

  beforeAll(async () => {
    loginResponse = await req(apiBaseUrl)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({ username: 'admin', password: '123456' });
    token = loginResponse.body.token;
  });

  describe('GET /', () => {
    let res;

    beforeAll(async () => {
      res = await req(apiBaseUrl)
        .get('/role_user')
        .set('Authorization', token);
    });

    it('response status should return 200', () => {
      expect(res.status).toBe(200);
    });

    it('response body should return correct structure data', () => {
      expect(Object.keys(res.body)).toEqual(['data', 'links', 'meta']);
    });

    it('response body which has property "data" should return correct structure data', () => {
      res.body.data.map(item => {
        expect(Object.keys(item)).toEqual(['role_user_id', 'role_user_name']);
      });
    });

    it('response body which has property "links" should return correct object keys', () => {
      expect(Object.keys(res.body.links)).toEqual(['first', 'last', 'prev', 'next']);
    });

    it('response body which has property "meta" should return correct object keys', () => {
      expect(Object.keys(res.body.meta)).toEqual([
        'current_page',
        'from',
        'last_page',
        'path',
        'per_page',
        'to',
        'total',
      ]);
    });
  });

  describe('POST /', () => {
    let res;

    beforeAll(async () => {
      res = await req(apiBaseUrl)
        .post('/role_user')
        .set('Authorization', token)
        .send({ role_user_name: 'User' });
      id = res.body.role_user_id;
    });

    it('response status should return 201', () => {
      expect(res.status).toBe(200);
    });

    it('response body should return correct object keys', () => {
      expect(Object.keys(res.body)).toEqual(['role_user_name', 'role_user_id']);
    });
  });

  // describe('GET /:id', () => {
  //   let res;

  //   beforeAll(async () => {
  //     console.log(id);
  //     res = await req(apiBaseUrl)
  //       .get(`/role_user/${id}`)
  //       .set('Authorization', token);
  //   });

  //   it('response status should return 200', () => {
  //     expect(res.status).toBe(200);
  //   });

  //   it('response body should return correct object keys', () => {
  //     expect(Object.keys(res.body)).toEqual(['role_user_id', 'role_user_name']);
  //   });
  // });

  // describe('PUT /:id', () => {
  //   let res;

  //   beforeAll(async () => {
  //     res = await req(apiBaseUrl)
  //       .put(`/role_user/${id}`)
  //       .set('Authorization', token)
  //       .send({ role_user_name: 'Cashier' });
  //   });

  //   it('response status should return 200', () => {
  //     expect(res.status).toBe(200);
  //   });

  //   it('response body should return correct object keys', () => {
  //     expect(Object.keys(res.body)).toEqual(['role_user_id', 'role_user_name']);
  //   });
  // });

  // describe('DELETE /:id', () => {
  //   let res;

  //   beforeAll(async () => {
  //     res = await req(apiBaseUrl)
  //       .delete(`/role_user/${id}`)
  //       .set('Authorization', token);
  //   });

  //   it('response status should return 200', () => {
  //     expect(res.status).toBe(200);
  //   });

  //   it('response body should return correct object keys', () => {
  //     expect(Object.keys(res.body)).toEqual(['role_user_id', 'role_user_name']);
  //   });
  // });
});
