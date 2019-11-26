import { getFullUrl } from '@/utils/full-url';

describe('Utils tests', () => {
  let req: any;

  beforeEach(() => {
    req = {
      protocol: 'http',
      hostname: 'localhost',
      baseUrl: '',
      path: '/supplier',
    };
  });

  describe('Full url utils test', () => {
    it('should return correct full url', () => {
      expect(getFullUrl(req)).toBe('http://localhost/supplier');
    });
  });
});
