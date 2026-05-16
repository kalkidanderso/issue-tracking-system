
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const IssueTracker = db.define(
  "issues",
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
  }
);

export default IssueTracker;