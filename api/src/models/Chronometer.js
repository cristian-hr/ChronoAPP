import { DataTypes } from 'sequelize';

const chrono = (sequelize) => {
  return sequelize.define('chronometer', {    
    time: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};

export default chrono
