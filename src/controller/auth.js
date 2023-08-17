const { user } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* Body = {
    "username" : "vino",
    "email": "vino1arystio@gmail.com",
    "password" : "123qweasd",
    "role": "sales"  
  }  */

exports.register = async (req, res) => {
  try {
    const data = req.body;
    const validasiUsername = await user.findOne({
      where: {
        username: data.username,
      },
    });

    if (validasiUsername === null) {
      const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        role: Joi.string().min(1).required(),
      });

      const { error } = schema.validate(data);

      if (error) {
        return res.status(400).send({
          status: "error",
          message: error.details[0].message,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      const newUser = await user.create({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      });

      res.status(200).send({
        status: "success",
        data: {
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
          // password: hashedPassword,
        },
      });
    } else {
      res.status(500).send({
        status: "failed",
        message: "account already created",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  const data = req.body;

  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).send({
      status: "error",
      message: error.details[0].message,
    });
  }

  try {
    const userExist = await user.findOne({
      where: {
        username: data.username,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!userExist) {
      return res.status(400).send({
        status: "Failed",
        message: "Username doesnt match",
      });
    }

    const isValid = await bcrypt.compare(data.password, userExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "Failed",
        message: "Password doesnt match",
      });
    }

    const dataToken = {
      id: userExist.id,
    };

    const token = jwt.sign(dataToken, process.env.TOKEN_KEY);

    res.status(200).send({
      status: "success...",
      data: {
        user: {
          id: userExist.dataValues.id,
          username: userExist.dataValues.username,
          email: userExist.dataValues.email,
          role: userExist.dataValues.role,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).send({
      status: "success",
      message: "See You Later",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
    });
  }
};
