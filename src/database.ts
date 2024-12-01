import { Sequelize } from 'sequelize';
import { HeroModel } from './heroes/Hero';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', 
});

export const db = {
  sequelize,
  Sequelize,
  models: {
    Hero: HeroModel(sequelize),
  },
};

sequelize
  .sync({ alter: true })
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('Error syncing database:', err));
