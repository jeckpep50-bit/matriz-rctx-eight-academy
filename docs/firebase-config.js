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

// Súper administración (registra, edita y elimina). En minúsculas.
// Debe coincidir con rctxAdmin() de firestore.rules.
export const ADMIN_EMAILS = [
  "dsroblesl@eightacademy.edu.ec",
  "lemaciasb@eightacademy.edu.ec",
  "slbustamantel@eightacademy.edu.ec"
];

// Solo pueden ingresar cuentas de este dominio. Quien no es súper administración solo consulta.
export const ALLOWED_DOMAIN = "eightacademy.edu.ec";

// Dominios propios (p. ej. el de Netlify) donde el inicio de sesión se hace en el mismo dominio
// a través del proxy /__/auth de netlify.toml. Agrega un dominio aquí SOLO después de autorizar
// https://ESE_DOMINIO/__/auth/handler en Google Cloud (ver README). En Firebase Hosting es automático.
export const AUTH_SAME_ORIGIN_HOSTS = [];
