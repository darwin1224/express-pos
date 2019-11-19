/**
 * Credentials jwt types
 */
export interface Credentials<T> {
  header: JWTHeader;
  payload: T & ExpAndIat;
  signature: Signature;
}

/**
 * JWT Header types
 */
export interface JWTHeader {
  alg: string;
  typ: string;
}

/**
 * Signature type
 */
export type Signature = string;

/**
 * Iat and exp types
 */
export interface ExpAndIat {
  iat: number;
  exp: number;
}
