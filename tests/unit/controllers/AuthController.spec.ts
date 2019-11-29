import { AuthController } from '@/modules/auth/controllers/AuthController';

class UserServiceMock {
  public getUserByUsername: jest.Mock = jest.fn(() =>
    Promise.resolve({ username: 'admin', password: '123456' }),
  );
}

class BcryptMock {
  public compare: jest.Mock = jest.fn();
}

class JWTMock {
  public sign: jest.Mock = jest.fn(() => '123456');
  public decode: jest.Mock = jest.fn(() => ({ payload: { username: 'admin' } }));
}

describe('Auth Controller unit tests', () => {
  let auth: AuthController;
  let userServiceMock: UserServiceMock;
  let bcryptMock: BcryptMock;
  let jwtMock: JWTMock;

  beforeAll(() => {
    userServiceMock = new UserServiceMock();
    bcryptMock = new BcryptMock();
    jwtMock = new JWTMock();
    auth = new AuthController(userServiceMock as any, bcryptMock as any, jwtMock as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login()', () => {
    let login;
    const params = { username: 'admin', password: '123456' };

    beforeEach(async () => {
      login = await auth.login(params);
    });

    it('getUserByUsername() should have been call 1 time', () => {
      expect(userServiceMock.getUserByUsername).toHaveBeenCalledTimes(1);
    });

    it('getUserByUsername() should have received correct argument value', () => {
      expect(userServiceMock.getUserByUsername).toBeCalledWith('admin');
    });

    it('compare() should have been call 1 time', () => {
      expect(bcryptMock.compare).toHaveBeenCalledTimes(1);
    });

    it('compare() should have received correct argument value', () => {
      expect(bcryptMock.compare).toBeCalledWith('123456', '123456');
    });

    it('sign() should have been call 1 time', () => {
      expect(jwtMock.sign).toHaveBeenCalledTimes(1);
    });

    it('sign() should have received correct argument value', () => {
      expect(jwtMock.sign).toBeCalledWith({ username: 'admin', password: '123456' });
    });

    it('login() should return mocked token', () => {
      expect(login).toEqual({ token: '123456' });
    });
  });

  describe('credentials()', () => {
    let credentials;

    beforeEach(async () => {
      credentials = await auth.credentials('123456');
    });

    it('decode() should have been call 1 time', () => {
      expect(jwtMock.decode).toHaveBeenCalledTimes(1);
    });

    it('decode() should have received correct argument value', () => {
      expect(jwtMock.decode).toBeCalledWith('123456');
    });

    it('credentials() should return correct value', () => {
      expect(credentials).toEqual({ username: 'admin' });
    });
  });
});
