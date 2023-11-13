import { TestBed } from '@angular/core/testing';

import { AuthService, UserInfo, UserSession } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;
  let userInfoMock: UserInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    userInfoMock = { email: 'teste@test.com', password: '1234' };
    service.registerUser(userInfoMock);
    service.signOut();
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should registerUser a user in localstorage', () => {
    const newUserInfo = { email: 'createTeste@test.com', password: '1234' };
    service.registerUser(newUserInfo);
    const newUser = localStorage.getItem(newUserInfo.email);
    expect(typeof newUser).toBe('string');
    localStorage.removeItem(newUserInfo.email);
  });

  it('should not register the same user', () => {
    service.registerUser(userInfoMock);
    const sameUser = service.registerUser(userInfoMock);
    expect(sameUser).toContain('Usuário já registrado');
  });

  it('should login user', () => {
    const userSession = service.signIn(userInfoMock) as UserSession;
    expect(typeof userSession).toBe('object');
  });

  it('should not found a user',
    () => expect(service.signIn({ email: 'notFound@test.com', password: userInfoMock.password })).toEqual('Credenciais incorretas')
  );

  it('should get credenciais incorretas as a message on login with wrong email',
    () => expect(service.signIn({ email: 'wrong@test.com', password: userInfoMock.password })).toEqual('Credenciais incorretas')
  );

  it('should get credenciais incorretas as a message on login with wrong password',
    () => expect(service.signIn({ email: userInfoMock.email, password: 'wrongPassword' })).toEqual('Credenciais incorretas')
  );

  it('should get session from a logged user', () => {
    const userSession = service.signIn(userInfoMock);
    expect(service.getUserSession()).toEqual(userSession);
  });

  it('should not get a session for an unlogged user', () => {
    expect(service.getUserSession()).toEqual('Sessão de usuário não encontrada');
  });

  it('should return true for a logged user', () => {
    service.signIn(userInfoMock);
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false for an unlogged user', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });
});
