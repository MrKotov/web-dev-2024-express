import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

interface HeroAttributes {
  id: number;
  name: string;
  magicPoints: number;
  killedMonsters: number;
}

interface HeroCreationAttributes extends Optional<HeroAttributes, 'id'> {}

export class Hero
  extends Model<HeroAttributes, HeroCreationAttributes>
  implements HeroAttributes {
  public id!: number;
  public name!: string;
  public magicPoints!: number;
  public killedMonsters!: number;
}

export const HeroModel = (sequelize: Sequelize) => {
  Hero.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      magicPoints: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      killedMonsters: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'heroes',
    }
  );
  return Hero;
};
