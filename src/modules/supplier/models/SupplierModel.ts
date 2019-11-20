import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_supplier')
export class SupplierModel {
  /**
   * Supplier id primary key
   *
   * @type {number}
   */
  @PrimaryGeneratedColumn({ unsigned: true })
  public readonly supplier_id?: number;

  /**
   * Supplier name column
   *
   * @type {string}
   */
  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  public readonly supplier_name!: string;
}
