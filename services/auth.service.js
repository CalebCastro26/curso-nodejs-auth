const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwt_secret);
    return {
      user,
      token,
    };
  }

  async sendMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    //Estos datos deben ir como variable de entorno
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      // secure: true,
      port: 587,
      auth: {
        user: 'demetris29@ethereal.email',
        pass: 'S1qvgJwBG8C5kSGB9Y',
      },
    });

    await transporter.sendMail({
      from: '"Fred Foo 👻" <demetris29@ethereal.email>', // sender address
      to: user.dataValues.email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world, desde la aplicacion de Node.js con Express', // plain text body
      html: '<b>Hello world, desde la aplicacion de Node.js con Express</b>', // html body
    });

    return { message: 'Se envio el mensaje con exito' };
  }
}

module.exports = AuthService;
