import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_product')
export class ProductModel {
  /**
   * Product id primary key
   *
   * @type {number}
   */
  @PrimaryGeneratedColumn({ unsigned: true })
  public readonly product_id?: number;

  /**
   * Product name column
   *
   * @type {string}
   */
  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  public readonly product_name!: string;

  /**
   * Product price column
   *
   * @type {number}
   */
  @Column({ type: 'decimal', default: 0 })
  @IsNotEmpty()
  @IsNumber()
  public readonly product_price!: number;

  /**
   * Product stock column
   *
   * @type {number}
   */
  @Column({ type: 'int', unsigned: true, default: 0 })
  @IsNotEmpty()
  @IsNumber()
  public readonly product_stock!: number;
}
