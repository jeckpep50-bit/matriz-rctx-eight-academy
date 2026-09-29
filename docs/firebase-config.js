// Configuración de Firebase de la Matriz de visita áulica RCTX · Eight Academy
// Proyecto: matriz-rctx-eight-academy (Firebase Console › Configuración del proyecto › Tus apps).
// Estos valores son públicos por diseño: la seguridad la dan el inicio de sesión y firestore.rules.
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAw48JtzEWnLI6KaxzGInKMeeGZxBmVzdY",
  authDomain: "matriz-rctx-eight-academy.firebaseapp.com",
  projectId: "matriz-rctx-eight-academy",
  storageBucket: "matriz-rctx-eight-academy.firebasestorage.app",
  messagingSenderId: "947779198370",
  appId: "1:947779198370:web:5b4582a56455c3349566fb"
};

// Súper administración: todo, incluido eliminar visitas y Ajustes. En minúsculas.
// Debe coincidir con rctxSuper() de firestore.rules.
export const SUPER_ADMIN_EMAILS = [
  "dsroblesl@eightacademy.edu.ec"
];

// Evaluadores: registran y editan visitas, envían la evaluación por correo y gestionan los docentes de Secundaria.
// Debe coincidir con rctxEval() de firestore.rules.
export const EVALUADOR_EMAILS = [
  "slbustamantel@eightacademy.edu.ec",
  "lemaciasb@eightacademy.edu.ec",
  "mibermeov@eightacademy.edu.ec"
];

// Solo pueden ingresar cuentas de este dominio. El resto de cuentas del dominio solo consulta.
export const ALLOWED_DOMAIN = "eightacademy.edu.ec";

// Dominios propios (p. ej. el de Netlify) donde el inicio de sesión se hace en el mismo dominio
// a través del proxy /__/auth de netlify.toml. Agrega un dominio aquí SOLO después de autorizar
// https://ESE_DOMINIO/__/auth/handler en Google Cloud (ver README). Vale también para PROYECTO.web.app.
export const AUTH_SAME_ORIGIN_HOSTS = [];
