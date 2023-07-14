require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:90mVoWrg2BdICKVpwsqi@containers-us-west-113.railway.app:6972/railway";

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach((model) => model(sequelize));
const models = sequelize.models;

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  ...models,
  sequelize,
};
