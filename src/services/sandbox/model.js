export default function defineModel(sequelize, DataTypes) {
  const Castle = sequelize.define('castles', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.TEXT,
    country: DataTypes.TEXT
  })

  return Castle
}
