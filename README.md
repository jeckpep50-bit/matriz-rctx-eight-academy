# Planificación Plataformas de Visitas · Eight Academy

Aplicación web del Departamento de Planificación (Eight Academy Unidad Educativa) para registrar visitas áulicas con la matriz RCTX (versión 2: 13 indicadores, 100 puntos). Funciona en computadora y celular; solo se necesita una cuenta de Google autorizada.

Los datos se guardan en Firebase (Firestore). Las fotografías (máximo 2 por visita) se comprimen y se guardan en Firestore, así que **no hace falta el plan de pago ni Cloud Storage**.

- **Proyecto Firebase:** `matriz-rctx-eight-academy`
- **Súper administración:** `dsroblesl` (@eightacademy.edu.ec)
- **Evaluadores:** `slbustamantel`, `lemaciasb`, `mibermeov` (@eightacademy.edu.ec)
- **Acceso:** solo cuentas `@eightacademy.edu.ec`
- **Publicación:** Firebase Hosting (`https://matriz-rctx-eight-academy.web.app`), desde la carpeta `docs`. El sitio de Netlify se dio de baja el 29/09/2026.

## Estructura

```
matriz-rctx-eight-academy/
├── docs/                  ← la página (Firebase Hosting la publica desde aquí)
│   ├── index.html
│   ├── firebase-config.js ← configuración pública de Firebase y correos de súper administración y evaluadores
│   ├── logo.png
│   └── .nojekyll
├── firestore.rules        ← reglas de seguridad (con validación de datos)
├── firestore.indexes.json
├── firebase.json          ← Firebase Hosting + cabeceras de seguridad
├── .firebaserc
└── README.md
```

## Configuración única en la consola de Firebase

1. **Authentication › Método de acceso › Google › Habilitar** (elige el correo de asistencia y guarda).
2. `localhost` y los dominios `web.app`/`firebaseapp.com` ya vienen autorizados en **Authentication › Configuración › Dominios autorizados**.
3. **Google Cloud › APIs y servicios › Biblioteca › Gmail API**: habilitada (necesaria para «Enviar por correo»).
4. Recomendado: en Google Cloud › APIs y servicios › Credenciales, restringe la *Browser key* a los sitios web de la matriz (referentes HTTP).

## Publicar cambios

```
git add -A && git commit -m "…" && git push      # guarda el código en GitHub
firebase deploy --only hosting,firestore           # publica la página y las reglas
```

## Acceso

| Cuenta | Puede |
|---|---|
| Súper administración (`dsroblesl`) | Todo: lo de los evaluadores, eliminar visitas y Ajustes (pesos, trimestres, duraciones, listas, logo y respaldos) |
| Evaluadores (`slbustamantel`, `lemaciasb`, `mibermeov`) | Registrar y editar visitas, marcar seguimientos, enviar la evaluación por correo, añadir y eliminar docentes de Secundaria |
| Cualquier otra cuenta `@eightacademy.edu.ec` | Solo consultar registros, docentes y tablero, y dar su conformidad en sus propias visitas |
| Otros dominios (gmail, etc.) | Nada: ven «Sin acceso» |

Para cambiar los roles edita **los dos archivos**: `SUPER_ADMIN_EMAILS` y `EVALUADOR_EMAILS` en `docs/firebase-config.js`, y `rctxSuper()` y `rctxEval()` en `firestore.rules`; luego publica con `firebase deploy --only firestore,hosting`. El servidor aplica estas reglas aunque alguien modifique la página.

## Seguimientos (aviso y campanita)

Al registrar una visita, la **Fecha de seguimiento** programa una nueva visita al mismo docente. El seguimiento pertenece a la cuenta que registró la visita.

- **Aviso del día:** ese día, al ingresar, a esa cuenta le aparece un recordatorio con los datos de la visita anterior (docente, sede, curso, asignatura, calificación, nivel, observador y aspectos por mejorar) y dos opciones: **Realizar visita áulica en este momento** (abre «Nueva visita» con los datos del docente ya llenos y vinculada a la anterior) y **Recordar visita áulica en 30 minutos** (el recordatorio en espera se guarda en ese dispositivo). Cerrar el aviso equivale a recordarlo en 30 minutos.
- **Campanita** (franja naranja): lista los seguimientos pendientes en Vencidos, Hoy y Programados, con contador. Cada evaluador ve los suyos; la súper administración ve los de todos. Los vencidos solo quedan en la campanita y en el Tablero.
- **Cierre comprobado:** un seguimiento solo queda «Realizado» al **guardar la visita de seguimiento vinculada**; la ficha anterior enlaza la nueva visita. Ya no existe la marca manual. Solo la súper administración puede **cancelar** un seguimiento, con motivo. Las reglas del servidor solo aceptan el cierre si la visita nueva existe y declara a la anterior como su origen.

## Docentes por sede

En **Docentes** hay una pestaña por sede: **Docentes Kids**, **Docentes Primaria** y **Docentes Secundaria**, cada una con buscador. Los evaluadores y la súper administración pueden **Añadir docente** (Nombres, Apellidos, Correo institucional y **Asignar sede**, todos obligatorios) y **Eliminar docente** (sus visitas no se borran). Un mismo docente puede estar en varias sedes. La base se guarda en Firestore (`rctx_docentes`), no en el repositorio.

Al registrar una visita, el campo «Docente observado/a» sugiere los docentes de la sede elegida y el **correo del docente se completa solo**. La pestaña «Calificaciones» sigue mostrando el historial de notas.

## Firma del docente

En la ficha, el apartado **Conformidad y firma del docente** tiene un espacio para que el docente firme **con el dedo o con un lápiz digital** (en tableta, celular o pantalla táctil). La firma se guarda una sola vez, con la hora del servidor y quien la registró (un evaluador o el propio docente); solo la súper administración puede borrarla. Se guarda aparte, en `rctx_firmas`, y aparece en el **PDF con firmas** sobre la línea «Firma del docente observado». La ficha ya solo ofrece «PDF con firmas», y ese es el PDF que se adjunta al enviar por correo.

## Envío de la evaluación por correo

En la ficha de cada visita, el botón **Enviar por correo** envía la evaluación al correo del docente **desde el Gmail institucional de quien evalúa**, con la ficha en PDF adjunta y un resumen (calificación, fortalezas, aspectos por mejorar y enlace para dar la conformidad). La ficha registra a quién, quién y cuándo se envió (el servidor fija la hora), y la lista de registros lo marca con «✉ Enviada».

La primera vez (y luego como máximo cada hora) Google pide permiso para «enviar correo en tu nombre». Como el proyecto de Google Cloud no pertenece a la organización de eightacademy, Google muestra antes el aviso **«Google no verificó esta app»**: se continúa con *Configuración avanzada › Ir a matriz-rctx-eight-academy*. Si Google o la institución bloquean el permiso, la ficha ofrece la alternativa: descargar el PDF y abrir Gmail con el mensaje ya redactado.

## Funcionamiento y protección de datos

- **Borrador automático:** la visita en curso se guarda en el dispositivo mientras se escribe. Si el navegador se cierra o se recarga, al volver aparece «Recuperar borrador».
- **Guardado atómico:** la visita y sus fotografías se guardan juntas en una transacción; el número `VA-fecha-NNN` se reserva en el servidor, así que dos observadores que guardan a la vez nunca se sobrescriben.
- **Sin conexión:** si no hay internet, el guardado se detiene a los 25 s con un aviso; el borrador sigue en el dispositivo para reintentar.
- **Autoría:** cada visita registra quién la creó y quién la modificó por última vez (visible al pie de la ficha).
- **Reglas de Firestore:** solo aceptan campos conocidos, secciones y fechas válidas, IDs con el formato correcto y autoría de quien escribe.
- **Respaldo JSON:** incluye visitas, listas, logo y fotografías. Importarlo valida cada registro y pide confirmación antes de reemplazar.
- **CSV:** protegido contra fórmulas maliciosas al abrirlo en Excel.

## Funciones para la administración (Ajustes)

- **Pesos por sección:** Kids, Primaria y Secundaria pueden tener ponderaciones propias (cada una suma 100). Cada visita guarda los pesos con que se calificó; cambiarlos no altera notas ya registradas.
- **Año lectivo y trimestres:** fechas de inicio y fin de cada trimestre. Alimentan los filtros del tablero, los registros y el historial del docente. *Las fechas iniciales son provisionales (régimen Sierra 2026-2027): ajústalas.*
- **Duración de las clases:** los botones de «Horario de la visita» (por defecto 40, 45, 80 y 90 min).
- **Nómina:** una línea por docente con `Nombre; correo; sección`. Se puede importar desde Excel (.xlsx) o CSV con columnas Docente (o Nombres/Apellidos), Correo, Sección, Observador y Asignatura, con vista previa antes de agregar.

## Conformidad del docente

Cada visita registra el correo institucional del docente. Al ingresar con esa cuenta, el docente ve el aviso de sus visitas pendientes, revisa la ficha y pulsa «Estoy conforme» o envía su conformidad con observaciones. Queda registrada con su correo y la hora del servidor, **una sola vez**, y nadie (ni la administración) puede modificarla. Si la ficha se edita después, se muestra el aviso correspondiente.

## Tablero

Filtros por día, 7/30 días, trimestre, año lectivo o todo; y por sección. Incluye seguimientos vencidos y próximos (7 días, con «Realizar seguimiento»), evolución mensual del promedio por sección, estadística por indicador (% Cumple / En proceso / No cumple y logro), conformidad de los docentes y cobertura de la nómina.

## Fichas y PDF

Cada ficha se puede imprimir o descargar en PDF (A4) en dos versiones: **PDF** (sin firmas) y **PDF con firmas** (líneas de firma con el nombre del docente y del observador). El historial del docente también se descarga en PDF, con su gráfico de progreso (calificación total y % de logro por bloque).

## Fotografías

Se guardan comprimidas en Firestore para mantener el plan gratuito (Spark). Cloud Storage requiere el plan Blaze.

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
