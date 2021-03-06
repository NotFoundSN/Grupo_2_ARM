var express = require('express');
var router = express.Router();
var usuarioController = require('../controllers/usuarioController');
const { check, validationResult } = require('express-validator');

//VALIDACIONES
const registerUserValidator = [
    check("userName")
        .isLength({min:6}).withMessage("Nombre Vacio"),
    check("name")
        .notEmpty().withMessage("Nombre Vacio"),
    check("surname")
        .notEmpty().withMessage("Apellido Vacio"),
    check("mail")
        .isEmail().withMessage("Correo Invalido"),
    /*check('pass')
        .isStrongPassword({minLowercase: 1, minUppercase:1, minNumbers: 1}).withMessage('Contrasenia insegura, debe tener al menos 1 mayuscula, 1 minuscula, numeros y ser de almenos 6 caracteres')
    */
    ];
const loginUserValidator = [
    check("name")
        .isLength({min:6}).withMessage("Nombre Vacio"),
];


//GET
router.get('/login',usuarioController.render.login);
router.get('/register',usuarioController.render.register);
router.get('/close',usuarioController.function.signOff);

//POST
router.post("/register",registerUserValidator,usuarioController.function.register);
router.post('/login', loginUserValidator,usuarioController.function.login);

module.exports = router;
