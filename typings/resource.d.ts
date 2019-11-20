/**
 * Resource collection types
 */
export interface ResourceCollection<T> {
  /**
   * Resource collection data
   *
   * @type {T | T[]}
   */
  data: T | T[];

  /**
   * Links of the page
   */
  links: Link;

  /**
   * Pagination meta
   */
  meta: Meta;
}

/**
 * Link pagination types
 */
export interface Link {
  /**
   * First page link
   *
   * @type {string | null}
   */
  first: string | null;

  /**
   * Last page link
   *
   * @type {string | null}
   */
  last: string | null;

  /**
   * Previous page
   *
   * @type {string | null}
   */
  prev: string | null;

  /**
   * Previous page
   *
   * @type {string | null}
   */
  next: string | null;
}

/**
 * Meta pagination types
 */
export interface Meta {
  /**
   * Current page
   *
   * @type {number}
   */
  current_page: number;

  /**
   * Offset page
   *
   * @type {number}
   */
  from: number;

  /**
   * Last page
   *
   * @type {number}
   */
  last_page?: number;

  /**
   * Path of the url
   *
   * @type {string | null}
   */
  path: string | null;

  /**
   * Per page number
   *
   * @type {number}
   */
  per_page: number;

  /**
   * Limit page
   *
   * @type {number}
   */
  to: number;

  /**
   * Total data
   *
   * @type {number}
   */
  total: number;
}
