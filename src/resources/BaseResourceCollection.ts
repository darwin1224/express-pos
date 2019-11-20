import { ResourceCollectionException } from '@/exceptions/ResourceCollectionException';
import { getFullUrl } from '@/utils/full-url';
import { Link, Meta, ResourceCollection } from '@typings/resource';
import { Request } from 'express';
import { Action, InterceptorInterface } from 'routing-controllers';

export class BaseResourceCollection<T> implements InterceptorInterface {
  /**
   * Resources of collection
   *
   * @type {T[]}
   */
  protected resource: T[] = [];

  /**
   * Page param
   *
   * @type {number}
   */
  protected page!: number;

  /**
   * Limit param
   *
   * @type {number}
   */
  protected limit!: number;

  /**
   * Express request instance
   *
   * @type {Request}
   */
  protected request!: Request;

  /**
   * Return a set of collection resources
   *
   * @returns {ResourceCollection<T>}
   */
  public intercept({ request }: Action, content: T[]): ResourceCollection<T> {
    this.request = request;
    this.page = Number(this.request.query.page) || 1;
    this.limit = Number(this.request.query.limit) || 10;
    this.resource = content;

    return {
      data: this.resource,
      links: this.getLink(),
      meta: this.getMeta(),
    };
  }

  /**
   * Get link key
   *
   * @returns {Link}
   */
  protected getLink(): Link {
    const computedPage = this.getComputedPage();
    return {
      first: this.getFirstPageLink(),
      last: this.getLastPageLink(computedPage),
      prev: this.getPreviousPageLink(),
      next: this.getNextPageLink(),
    };
  }

  /**
   * Get meta key
   *
   * @returns {Meta}
   */
  protected getMeta(): Meta {
    return {
      current_page: this.page,
      from: this.getComputedOffsetPage(),
      last_page: this.getComputedPage(),
      path: getFullUrl(this.request),
      per_page: this.limit,
      to: this.getComputedLimitPage(),
      total: this.getTotalPage(),
    };
  }

  /**
   * Get computed page
   *
   * @returns {number}
   * @throws {ResourceCollectionException}
   */
  protected getComputedPage(): number | never {
    if (!Array.isArray(this.resource)) {
      throw new ResourceCollectionException('Data resource should be an array');
    }

    return Math.floor(this.resource.length / this.limit + 1);
  }

  /**
   * Get first page link
   *
   * @returns {string}
   */
  protected getFirstPageLink(): string {
    return `${getFullUrl(this.request)}?page=1`;
  }

  /**
   * Get last page link
   *
   * @param {number} computedPage
   * @returns {string}
   */
  protected getLastPageLink(computedPage: number): string {
    return `${getFullUrl(this.request)}?page=${computedPage}`;
  }

  /**
   * Get previous page link
   *
   * @returns {string | null}
   */
  protected getPreviousPageLink(): string | null {
    return this.page !== 1 ? `${getFullUrl(this.request)}?page=${this.page - 1}` : null;
  }

  /**
   * Get next page link
   *
   * @returns {string | null}
   */
  protected getNextPageLink(): string | null {
    return this.page !== 1 ? `${getFullUrl(this.request)}?page=${this.page + 1}` : null;
  }

  /**
   * Get computed offset page
   *
   * @returns {number}
   */
  protected getComputedOffsetPage(): number {
    return this.page * 10 - this.limit;
  }

  /**
   * Get computed limit page
   *
   * @returns {number}
   */
  protected getComputedLimitPage(): number {
    return this.page * 10;
  }

  /**
   * Get total page
   *
   * @returns {number}
   */
  protected getTotalPage(): number {
    return Array.isArray(this.resource) ? this.resource.length : 0;
  }
}
