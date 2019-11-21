import { ProductModel } from '@/modules/product/models/ProductModel';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_transaction')
export class TransactionModel {
  /**
   * Transaction id primary key
   *
   * @type {number}
   */
  @PrimaryGeneratedColumn({ unsigned: true })
  public readonly transaction_id?: number;

  /**
   * ID Product
   *
   * @type {number}
   */
  @ManyToOne(type => ProductModel, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  @IsNumber()
  public readonly product_id!: number;

  /**
   * Quantity column
   *
   * @type {number}
   */
  @Column({ type: 'int', unsigned: true, default: 0 })
  @IsNotEmpty()
  @IsNumber()
  public readonly quantity!: number;
}
