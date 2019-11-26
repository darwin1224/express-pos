import req from 'supertest';

const apiBaseUrl = 'http://localhost:3000';

describe('/supplier', () => {
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
        .get('/supplier')
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
        expect(Object.keys(item)).toEqual(['supplier_id', 'supplier_name']);
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
        .post('/supplier')
        .set('Authorization', token)
        .send({ supplier_name: 'Martin' });
      id = res.body.supplier_id;
    });

    it('response status should return 201', () => {
      expect(res.status).toBe(200);
    });

    it('response body should return correct object keys', () => {
      expect(Object.keys(res.body)).toEqual(['supplier_name', 'supplier_id']);
    });
  });

  describe('GET /:id', () => {
    let res;

    beforeAll(async () => {
      res = await req(apiBaseUrl)
        .get(`/supplier/${id}`)
        .set('Authorization', token);
    });

    it('response status should return 200', () => {
      expect(res.status).toBe(200);
    });

    it('response body should return correct object keys', () => {
      expect(Object.keys(res.body)).toEqual(['supplier_id', 'supplier_name']);
    });
  });

  describe('PUT /:id', () => {
    let res;

    beforeAll(async () => {
      res = await req(apiBaseUrl)
        .put(`/supplier/${id}`)
        .set('Authorization', token)
        .send({ supplier_name: 'Andi' });
    });

    it('response status should return 200', () => {
      expect(res.status).toBe(200);
    });

    it('response body should return correct object keys', () => {
      expect(Object.keys(res.body)).toEqual(['supplier_id', 'supplier_name']);
    });
  });

  describe('DELETE /:id', () => {
    let res;

    beforeAll(async () => {
      res = await req(apiBaseUrl)
        .delete(`/supplier/${id}`)
        .set('Authorization', token);
    });

    it('response status should return 200', () => {
      expect(res.status).toBe(200);
    });

    it('response body should return correct object keys', () => {
      expect(Object.keys(res.body)).toEqual(['supplier_id', 'supplier_name']);
    });
  });
});
