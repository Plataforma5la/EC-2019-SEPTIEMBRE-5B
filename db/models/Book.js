const db = require("../index");
const S = require("sequelize");
const Op = S.Op;
const chalk = require("chalk");

class Book extends S.Model {}
Book.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: S.FLOAT,
      allowNull: false
    },
    description: {
      type: S.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    stock: {
      type: S.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    imgURL: {
      type: S.STRING,
      defaultValue: "https://www.ecured.cu/images/8/81/Libro_abierto.jpg"
    },
    year: {
      type: S.INTEGER,
      allowNull: true
    },
    author: {
      type: S.STRING,
      allowNull: true
    },
    category: {
      type: S.ARRAY(S.TEXT),
      defaultValue: ["Terror", "Aventura"]
    }
  },
  { sequelize: db, modelName: "book" }
);

Book.prototype.snippet = () =>
  this.getDataValue("description").substring(0, 20);

Book.findByAuthor = author => {
  return Book.findAll({
    where: {
      author
    }
  }).then(books => books);
};

Book.findByCategory = category => {
  return Book.findAll({
    where: { category: { [Op.contains]: [category] } }
  });
};

// FALTA METODO DE CLASE PARA LAS REVIEWS
//////////////////////////////////////////////////////////////////////////////
//RELACIONES
/////////////

module.exports = Book;
