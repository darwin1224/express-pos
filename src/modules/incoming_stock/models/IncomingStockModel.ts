import { ProductModel } from '@/modules/product/models/ProductModel';
import { SupplierModel } from '@/modules/supplier/models/SupplierModel';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_incoming_stock')
export class IncomingStockModel {
  /**
   * Incoming stock id primary key
   *
   * @type {number}
   */
  @PrimaryGeneratedColumn({ unsigned: true })
  public readonly incoming_stock_id?: number;

  /**
   * ID product
   *
   * @type {number}
   */
  @ManyToOne(type => ProductModel, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  @IsNumber()
  public readonly product_id!: number;

  /**
   * ID supplier
   *
   * @type {number}
   */
  @ManyToOne(type => SupplierModel, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'supplier_id' })
  @IsNumber()
  public readonly supplier_id!: number;

  /**
   * Incoming stock added column
   *
   * @type {number}
   */
  @Column({ type: 'int', unsigned: true })
  @IsNotEmpty()
  @IsNumber()
  public readonly incoming_stock_added!: number;
}
