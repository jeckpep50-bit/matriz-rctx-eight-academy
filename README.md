# Matriz de visita áulica RCTX · Eight Academy

Aplicación web del Departamento de Planificación para registrar visitas áulicas con la matriz RCTX (versión 2: 13 indicadores, 100 puntos). Funciona en computadora y celular; solo se necesita una cuenta de Google autorizada.

Los datos se guardan en Firebase (Firestore). Las fotografías (máximo 2 por visita) se comprimen y se guardan en Firestore, así que **no hace falta el plan de pago ni Cloud Storage**.

- **Proyecto Firebase:** `matriz-rctx-eight-academy`
- **Súper administración:** `dsroblesl`, `lemaciasb`, `slbustamantel` (@eightacademy.edu.ec)
- **Acceso:** solo cuentas `@eightacademy.edu.ec`
- **Publicación:** Netlify (desde la carpeta `docs`, se actualiza con cada `git push`) y Firebase Hosting (`https://matriz-rctx-eight-academy.web.app`).

## Estructura

```
matriz-rctx-eight-academy/
├── docs/                  ← la página (Netlify y Firebase Hosting la publican desde aquí)
│   ├── index.html
│   ├── firebase-config.js ← configuración pública de Firebase y correo de administración
│   ├── logo.png
│   └── .nojekyll
├── firestore.rules        ← reglas de seguridad (con validación de datos)
├── firestore.indexes.json
├── firebase.json          ← Firebase Hosting + cabeceras de seguridad
├── netlify.toml           ← Netlify + cabeceras de seguridad + proxy de inicio de sesión
├── .firebaserc
└── README.md
```

## Configuración única en la consola de Firebase

1. **Authentication › Método de acceso › Google › Habilitar** (elige el correo de asistencia y guarda).
2. **Authentication › Configuración › Dominios autorizados › Agregar dominio**: agrega el dominio de Netlify (p. ej. `matriz-rctx-eight.netlify.app`). `localhost` y los dominios `web.app`/`firebaseapp.com` ya vienen autorizados.
3. Recomendado: en Google Cloud › APIs y servicios › Credenciales, restringe la *Browser key* a los sitios web de la matriz (referentes HTTP).

## Publicar cambios

```
git add -A && git commit -m "…" && git push      # Netlify publica automáticamente
firebase deploy --only hosting,firestore           # Firebase Hosting + reglas
```

## Inicio de sesión en Safari/iPhone desde Netlify (opcional)

En Firebase Hosting el inicio de sesión usa el mismo dominio automáticamente. En Netlify, si alguien en iPhone no puede ingresar:

1. Google Cloud › APIs y servicios › Credenciales › *Web client (auto created by Google Service)* › **URI de redireccionamiento autorizados**: agrega `https://TU-SITIO.netlify.app/__/auth/handler`.
2. En `docs/firebase-config.js` agrega el dominio: `AUTH_SAME_ORIGIN_HOSTS = ["TU-SITIO.netlify.app"]` y publica.

`netlify.toml` ya incluye el proxy `/__/auth/*` necesario.

## Acceso

| Cuenta | Puede |
|---|---|
| Súper administración (3 correos) | Todo: registrar, editar, eliminar, listas, logo y respaldos |
| Cualquier otra cuenta `@eightacademy.edu.ec` | Solo consultar registros, docentes y tablero |
| Otros dominios (gmail, etc.) | Nada: ven «Sin acceso» |

No hay que dar acceso uno por uno. Para cambiar la súper administración edita **los dos archivos**: `ADMIN_EMAILS` en `docs/firebase-config.js` y `rctxAdmin()` en `firestore.rules`; luego publica (`firebase deploy --only firestore,hosting` y `git push`). El servidor aplica estas reglas aunque alguien modifique la página.

## Funcionamiento y protección de datos

- **Borrador automático:** la visita en curso se guarda en el dispositivo mientras se escribe. Si el navegador se cierra o se recarga, al volver aparece «Recuperar borrador».
- **Guardado atómico:** la visita y sus fotografías se guardan juntas en una transacción; el número `VA-fecha-NNN` se reserva en el servidor, así que dos observadores que guardan a la vez nunca se sobrescriben.
- **Sin conexión:** si no hay internet, el guardado se detiene a los 25 s con un aviso; el borrador sigue en el dispositivo para reintentar.
- **Autoría:** cada visita registra quién la creó y quién la modificó por última vez (visible al pie de la ficha).
- **Reglas de Firestore:** solo aceptan campos conocidos, secciones y fechas válidas, IDs con el formato correcto y autoría de quien escribe.
- **Respaldo JSON:** incluye visitas, listas, logo y fotografías. Importarlo valida cada registro y pide confirmación antes de reemplazar.
- **CSV:** protegido contra fórmulas maliciosas al abrirlo en Excel.

## Matriz (versión 2)

| Bloque | Indicadores (puntos) | Total |
|---|---|---|
| Criterios generales y planificación | CG1 (4) · CG2 (6) · CG3 (5) | 15 |
| Anticipación | A1 (5) | 5 |
| Construcción | C1 (9) · C2 (11) | 20 |
| Consolidación | K1 (12) | 12 |
| Evaluación formativa | E1 (12) | 12 |
| Actuación del docente | D1 (7) · D2 (7) · D3 (7) | 21 |
| Actuación del estudiante | S1 (8) · S2 (7) | 15 |
| **Total** | **13 indicadores** | **100** |

Los puntajes siguen la proporción de la matriz anterior (18 indicadores) llevada a 100 y redondeada a enteros. Cada visita guarda `version: 2`; las reglas de Firestore solo aceptan los 13 códigos vigentes y la importación rechaza respaldos de la matriz anterior.

## Escala de calificación

Puntaje del indicador = puntaje máximo × factor (Cumple 100 %, En proceso 50 %, No cumple 0 %).
Satisfactorio ≥ 90 · Conforme 70–89.99 · Insatisfactorio < 70.
