import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
  tableName: "products",
})
class Product extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string | undefined;

  @Column({
    type: DataType.FLOAT,
  })
  declare price: number | undefined;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare isAvailable: boolean | undefined;
}
export default Product;
