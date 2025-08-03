//#region IMPORTACIONES
import { body } from 'express-validator';
//#endregion

//#region VALIDACIONES AL MODELO EN CADA ENPOINT

// 
export const loginValidador = [
  body('username')
      .notEmpty().withMessage('El usuario es obligatorio. Para pruebas es "admin"'),
  body('password')
      .notEmpty().withMessage('La contraseña es obligatoria. Para pruebas es "admin123')
      .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

//#endregion