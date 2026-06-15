# PROMPT MAESTRO — OcanaTurismo
### Sitio web oficial de turismo del municipio de Ocaña, Norte de Santander

> **Instrucciones de uso:** Este prompt está listo para pegarse directamente en Claude Code CLI
> o en cualquier sesión de Claude. Contiene la arquitectura, los datos de semilla reales
> del Plan de Desarrollo Turístico 2023-2034 y todas las decisiones tomadas para el MVP.

---

## ROL Y CONTEXTO

Actúa como arquitecto senior full-stack y desarrollador principal. Construirás el sitio web oficial de turismo del municipio de Ocaña, Norte de Santander, Colombia, llamado **OcanaTurismo** (dominio: `www.ocanaturismo.com`).

Este sitio es una herramienta institucional de promoción turística, alineada con:
- El **Plan de Desarrollo Municipal "Ocaña Renovada 2024-2027"**, línea estratégica **"Ocaña Potencia Regional"**
- El **Plan de Desarrollo Turístico Convencional del Municipio de Ocaña 2023-2034**, adoptado como hoja de ruta oficial del sector, formulado por Freider Avendaño Jácome bajo la alcaldía de Samir Fernando Casadiego Sanjuan y la Secretaría de Educación, Cultura y Turismo (Ibeth Karina Claro Sabbagh).

**Visión oficial del Plan (horizonte 2034):**
> "Para el año 2034, Ocaña se consolidará como principal destino turístico de connotación histórica, religiosa y natural del departamento Norte de Santander, asociado a la fortaleza de su clima y amabilidad de su gente; con reconocimiento nacional e internacional por el aprovechamiento responsable de sus recursos naturales y culturales."

---

## STACK TÉCNICO

- **Framework:** Next.js 14+ con TypeScript (App Router)
- **CMS:** Payload CMS v3 (panel de administración headless)
- **Base de datos:** PostgreSQL (compatible con Neon o Railway para despliegue económico)
- **Estilos:** Tailwind CSS v3
- **Despliegue:** Vercel (frontend + API routes) + Neon PostgreSQL (gratis hasta 0.5 GB)
- **Diseño:** Mobile-first, responsive, enfoque visual/fotográfico
- **SEO:** Metadatos básicos con next/metadata, sitemap.xml, robots.txt
- **Arquitectura:** Monorepo con Payload CMS integrado en el mismo proyecto Next.js

---

## ARQUITECTURA PROPUESTA

```
ocanaturismo/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (frontend)/             # Rutas públicas del sitio
│   │   │   ├── page.tsx            # Inicio
│   │   │   ├── descubre/           # Descubre Ocaña
│   │   │   ├── atractivos/         # Listado y detalle de atractivos
│   │   │   ├── rutas/              # Rutas turísticas
│   │   │   ├── eventos/            # Agenda de eventos
│   │   │   ├── directorio/         # Directorio de prestadores
│   │   │   ├── noticias/           # Blog/noticias
│   │   │   ├── institucional/      # Info institucional
│   │   │   └── contacto/           # Contacto
│   │   └── (payload)/              # Panel admin de Payload CMS
│   ├── collections/                # Colecciones de Payload CMS
│   ├── components/                 # Componentes reutilizables
│   └── lib/                        # Utilidades, tipos, helpers
├── public/
├── payload.config.ts
└── next.config.ts
```

---

## COLECCIONES DE PAYLOAD CMS

### 1. `atractivos` — Atractivos Turísticos
```
- nombre (text, requerido)
- slug (text, auto-generado desde nombre)
- categoria (select): turismo-religioso | turismo-historico | turismo-naturaleza | cultura-patrimonio | gastronomia
- descripcion (richText)
- imagenes (array de upload)
- ubicacion (text) — referencia geográfica / dirección
- coordenadas (group): latitud (number), longitud (number)
- horarios (text)
- costo (text)
- recomendaciones (richText)
- declaratoria (text) — acto administrativo de protección si aplica
- puntaje (number) — valoración MinCIT (0-100)
- destacado (checkbox)
- estado (select): borrador | publicado
- orden (number)
```

### 2. `rutas` — Rutas Turísticas
```
- nombre (text, requerido)
- slug (text, auto-generado)
- descripcion (richText)
- imagen (upload)
- atractivos (relationship → atractivos, hasMany)
- duracion (text) — ej: "3 horas"
- dificultad (select): baja | media | alta
- distancia (text)
- destacado (checkbox)
- estado (select): borrador | publicado
```

### 3. `eventos` — Agenda de Eventos
```
- nombre (text, requerido)
- slug (text, auto-generado)
- descripcion (richText)
- imagen (upload)
- fechaInicio (date, requerido)
- fechaFin (date)
- lugar (text)
- tipo (select): cultural | religioso | deportivo | gastronomico | folclorico | otro
- organizador (text)
- destacado (checkbox)
- estado (select): borrador | publicado
```

### 4. `prestadores` — Directorio Turístico
```
- nombre (text, requerido)
- slug (text, auto-generado)
- tipo (select): hotel | restaurante | agencia | artesano | transporte | otro
- descripcion (text)
- direccion (text)
- telefono (text)
- email (email)
- sitioWeb (text)
- imagen (upload)
- destacado (checkbox)
- estado (select): borrador | publicado
```

### 5. `noticias` — Blog / Noticias
```
- titulo (text, requerido)
- slug (text, auto-generado)
- extracto (textarea)
- contenido (richText)
- imagen (upload)
- autor (text)
- fecha (date)
- categoria (select): noticias | turismo | cultura | naturaleza | gastronomia
- destacado (checkbox)
- estado (select): borrador | publicado
```

### 6. `paginas` — Páginas Estáticas
```
- titulo (text, requerido)
- slug (text)
- contenido (richText)
- estado (select): borrador | publicado
```

### 7. `galerias` — Galerías de Fotos
```
- titulo (text, requerido)
- descripcion (text)
- imagenes (array de upload)
- estado (select): borrador | publicado
```

### 8. `usuarios` — Administradores (nativo de Payload)
```
- email, password, rol (admin | editor)
```

---

## PÁGINAS PÚBLICAS

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio con hero, mensaje "Ocaña Potencia Regional", destacados |
| `/descubre` | Historia, geografía, clima, datos generales de Ocaña |
| `/atractivos` | Grid de atractivos con filtro por categoría |
| `/atractivos/[slug]` | Detalle de atractivo: galería, descripción, mapa, info práctica |
| `/rutas` | Listado de rutas turísticas |
| `/rutas/[slug]` | Detalle de ruta con atractivos incluidos |
| `/eventos` | Agenda de eventos culturales y turísticos |
| `/eventos/[slug]` | Detalle de evento |
| `/directorio` | Directorio de prestadores con filtro por tipo |
| `/noticias` | Listado de noticias/blog |
| `/noticias/[slug]` | Artículo individual |
| `/institucional` | Info de la Secretaría, Plan Turístico, Consejo de Turismo |
| `/contacto` | Formulario y datos de contacto |

---

## DATOS DE SEMILLA OFICIALES
### (Extraídos del Plan de Desarrollo Turístico Convencional 2023-2034)

### ATRACTIVOS TURÍSTICOS — Turismo Religioso

```json
[
  {
    "nombre": "Santuario de Nuestra Señora de las Gracias de Torcoroma",
    "categoria": "turismo-religioso",
    "puntaje": 100,
    "ubicacion": "Vereda Agua de la Virgen",
    "descripcion": "Principal atractivo turístico de Ocaña y uno de los más importantes del departamento Norte de Santander. Declarado Bien de Interés Cultural de Carácter Nacional mediante Decreto 1425 del 16 de julio de 1972. Lugar de peregrinación donde los feligreses celebran la aparición de la imagen de María en 1711. Su festividad principal se celebra el 15 y 16 de agosto.",
    "declaratoria": "Decreto 1425 de 16 de julio de 1972",
    "destacado": true
  },
  {
    "nombre": "Capilla de Nuestra Señora de las Gracias de Torcoroma",
    "categoria": "turismo-religioso",
    "puntaje": 94,
    "ubicacion": "Calle 11 No 10-90, Barrio El Centro",
    "descripcion": "Capilla histórica declarada Bien de Interés Cultural de Carácter Nacional. Punto de partida de las procesiones religiosas hacia el Santuario.",
    "declaratoria": "Decreto 2861 del 26 de noviembre de 1984"
  },
  {
    "nombre": "Iglesia Santuario Jesús Cautivo",
    "categoria": "turismo-religioso",
    "puntaje": 88,
    "ubicacion": "Calle 12 con Carrera 6A (esquina), Barrio El Carretero",
    "descripcion": "Santuario que conmemora la aparición de la imagen de Jesús en una piedra. Su fiesta principal se celebra el segundo domingo de julio. Declarado Bien de Interés Cultural de Carácter Departamental.",
    "declaratoria": "Decreto 1044 del 31 de diciembre de 2003, Gobernación de Norte de Santander"
  },
  {
    "nombre": "Templo de San Francisco",
    "categoria": "turismo-religioso",
    "puntaje": 87,
    "ubicacion": "Calle 11 con Carrera 9, Barrio San Francisco",
    "descripcion": "Antiguo convento franciscano construido entre 1583 y 1584. Forma parte del Complejo Histórico de la Gran Convención. Es el escenario donde se celebró la Gran Convención de Ocaña en 1828. Bien de Interés Cultural de Carácter Nacional.",
    "declaratoria": "Ley 75 del 22 de septiembre de 1937"
  },
  {
    "nombre": "Catedral de Santa Ana",
    "categoria": "turismo-religioso",
    "puntaje": 84,
    "ubicacion": "Carrera 12 con Calle 11 (esquina), Barrio El Centro",
    "descripcion": "Catedral principal del municipio de Ocaña, sede de la diócesis. Declarada Bien de Interés Cultural de Carácter Departamental.",
    "declaratoria": "Decreto 1044 del 31 de diciembre de 2003"
  },
  {
    "nombre": "Iglesia San Agustín",
    "categoria": "turismo-religioso",
    "puntaje": 80,
    "ubicacion": "Carrera 16 con Calle 11, Barrio San Agustín",
    "descripcion": "Iglesia de gran valor arquitectónico e histórico, declarada Bien de Interés Cultural de Carácter Departamental. Ubicada en el pintoresco barrio de San Agustín.",
    "declaratoria": "Decreto 1044 del 31 de diciembre de 2003"
  },
  {
    "nombre": "Iglesia San Antonio de Padua",
    "categoria": "turismo-religioso",
    "puntaje": 78,
    "ubicacion": "Carrera 11 No 15-552, Barrio La Piñuela",
    "descripcion": "Templo parroquial con festividad el 13 de junio, organizada por la Parroquia y las JAC de los barrios San Antonio y Tacaloa.",
    "declaratoria": "Decreto 1044 del 31 de diciembre de 2003"
  },
  {
    "nombre": "Capilla de los Dulcísimos Nombres de Jesús y María",
    "categoria": "turismo-religioso",
    "puntaje": 76,
    "ubicacion": "Carrera 13, Barrio Calle del Dulce Nombre",
    "descripcion": "Capilla colonial de alto valor patrimonial ubicada en el tradicional barrio Calle del Dulce Nombre.",
    "declaratoria": "Acuerdo 01 de 2015"
  },
  {
    "nombre": "Palacio Episcopal",
    "categoria": "turismo-religioso",
    "puntaje": 73,
    "ubicacion": "Carrera 12 No 10-66, frente a la Plaza del 29 de Mayo",
    "descripcion": "Sede de la diócesis de Ocaña, edificio de arquitectura religiosa institucional ubicado en el corazón histórico de la ciudad.",
    "declaratoria": "Acuerdo 01 de 2015"
  },
  {
    "nombre": "Monasterio Monjas Dominicas Contemplativas",
    "categoria": "turismo-religioso",
    "puntaje": 70,
    "ubicacion": "Calle 10 No 8A-15, Barrio San Francisco",
    "descripcion": "Monasterio de vida contemplativa con arquitectura colonial. Parte importante del patrimonio religioso de Ocaña.",
    "declaratoria": "Acuerdo 01 de 2015"
  }
]
```

### ATRACTIVOS TURÍSTICOS — Turismo Histórico

```json
[
  {
    "nombre": "Complejo Histórico de la Gran Convención",
    "categoria": "turismo-historico",
    "puntaje": 87,
    "ubicacion": "Calle 11 con Carrera 9, Barrio San Francisco",
    "descripcion": "Entre el 9 de abril y el 11 de junio de 1828, se desarrolló aquí la Gran Convención de Ocaña, cuyo objeto fue la reforma de la Constitución expedida en Cúcuta en 1821. El complejo está constituido por el Templo de San Francisco y la Plazuela de la Gran Convención. Alberga la Biblioteca Pública Municipal 'Luis Eduardo Páez Courvel', la Academia de Historia de Ocaña, el Museo de la Gran Convención y la Secretaría de Educación, Cultura y Turismo. Declarado Bien de Interés Cultural de Carácter Nacional.",
    "declaratoria": "Ley 75 del 22 de septiembre de 1937",
    "destacado": true
  },
  {
    "nombre": "Museo de la Gran Convención",
    "categoria": "turismo-historico",
    "puntaje": 88,
    "ubicacion": "Calle 11 con Carrera 9, Barrio San Francisco",
    "descripcion": "El museo tiene por objetivo adquirir, conservar, divulgar, investigar y exhibir objetos que hicieron parte de la Convención Constituyente de 1828 reunida en Ocaña. Tiene arquitectura institucional religiosa de la colonia, construido entre 1583 y 1584. Sus salones fueron antiguas celdas del convento franciscano. Hace parte de la Red Nacional de Museos. Declarado Bien de Interés Cultural de Carácter Nacional.",
    "declaratoria": "Ley 10 del 21 de enero de 1977"
  },
  {
    "nombre": "Museo Antón García de Bonilla",
    "categoria": "turismo-historico",
    "puntaje": 88,
    "ubicacion": "Calle 11 No 16-41, Barrio San Agustín",
    "descripcion": "Arquitectura colonial doméstica urbana del siglo XVII con paredes en tapia pisada, cubierta de madera, caña brava y teja española. El Museo se encarga de investigar, preservar, exhibir y divulgar la historia de Ocaña y su antigua provincia. Cuenta con siete salas: personajes, arte religioso, vida cotidiana XIX, siglos XIX y XX, época prehispánica y exposiciones temporales. Área de exposición de 226,6 m². Bien de Interés Cultural Departamental.",
    "declaratoria": "Decreto 1044 del 31 de diciembre de 2003"
  },
  {
    "nombre": "Columna de la Libertad de los Esclavos",
    "categoria": "turismo-historico",
    "puntaje": 90,
    "ubicacion": "Plaza del 29 de Mayo",
    "descripcion": "Único testimonio material existente en Colombia que conmemora la abolición de la esclavitud en el país. El monumento está formado por cinco anillos concéntricos que simbolizan los cinco países libertados por Simón Bolívar. Declarado Bien de Interés Cultural de Carácter Nacional.",
    "declaratoria": "Resolución 620 del 11 de abril de 2002",
    "destacado": true
  },
  {
    "nombre": "Plaza del 29 de Mayo",
    "categoria": "turismo-historico",
    "puntaje": 76,
    "ubicacion": "Entre las Calles 10 y 11 y Carrera 12 y 13, Barrio El Centro",
    "descripcion": "Plaza central del municipio, escenario de los principales eventos históricos y cívicos de Ocaña. Alberga la Columna de la Libertad de los Esclavos y el Monumento a Nuestra Señora de las Gracias de Torcoroma.",
    "declaratoria": "Acuerdo 01 de 2015"
  },
  {
    "nombre": "Colegio Nacional José Eusebio Caro",
    "categoria": "turismo-historico",
    "puntaje": 78,
    "ubicacion": "Calle 11 No 9-81, Barrio San Francisco",
    "descripcion": "Centro educativo considerado el Alma mater de Ocaña, fundado en 1911 con raíces en la época colonial. Fue construido en terrenos donde nació el ilustre poeta y político José Eusebio Caro. Allí se formaron grandes personalidades de Ocaña. Declarado Patrimonio Arquitectónico Educativo y Cultural de la Nación.",
    "declaratoria": "Ley 1987 del 30 de julio de 2019"
  },
  {
    "nombre": "Palacio Municipal",
    "categoria": "turismo-historico",
    "puntaje": 76,
    "ubicacion": "Carrera 12 No 10-42, frente a la Plaza 29 de Mayo",
    "descripcion": "Edificio gubernamental de arquitectura institucional, sede de la administración municipal. Declarado Bien de Interés Cultural de Carácter Departamental.",
    "declaratoria": "Decreto 1044 del 31 de diciembre de 2003"
  },
  {
    "nombre": "Casa donde se hospedó Simón Bolívar (1813)",
    "categoria": "turismo-historico",
    "puntaje": 65,
    "ubicacion": "Calle 11 No 9-48, Barrio El Centro (actualmente Club Ocaña)",
    "descripcion": "Arquitectura tradicional restaurada donde se hospedó el Libertador Simón Bolívar en su primera visita a Ocaña en 1813. En su interior se pueden observar placas conmemorativas. Bien de Interés Cultural Departamental.",
    "declaratoria": "Decreto 1044 del 31 de diciembre de 2003"
  },
  {
    "nombre": "Plazuela San Agustín",
    "categoria": "turismo-historico",
    "puntaje": 70,
    "ubicacion": "Entre Calle 11 con Carrera 16, Barrio San Agustín",
    "descripcion": "Plazuela histórica del barrio San Agustín, uno de los espacios públicos más representativos y tradicionales de Ocaña.",
    "declaratoria": "Decreto 1044 del 31 de diciembre de 2003"
  },
  {
    "nombre": "Plazuela San Francisco",
    "categoria": "turismo-historico",
    "puntaje": 72,
    "ubicacion": "Calle 11 con Carrera 9A, Barrio San Francisco",
    "descripcion": "Plazuela histórica adyacente al Complejo de la Gran Convención, corazón del barrio más antiguo de Ocaña.",
    "declaratoria": "Acuerdo 01 de 2015"
  }
]
```

### ATRACTIVOS TURÍSTICOS — Turismo de Naturaleza

```json
[
  {
    "nombre": "Reserva Natural ProAves Hormiguero de Torcoroma",
    "categoria": "turismo-naturaleza",
    "puntaje": 85,
    "ubicacion": "Vereda Agua de la Virgen",
    "descripcion": "Reserva natural de 35 hectáreas reconocida internacionalmente por albergar el Hormiguero Pico de Hacha (Clytoctantes alixii), especie catalogada como en peligro de extinción redescubierta en 2006. Cuenta con un circuito de senderos para observar avifauna, fauna y flora. Se pueden avistar 79 especies de aves según el inventario de Fontur y la Cámara de Comercio de Ocaña. Entre las aves más importantes: Perdiz Carinegra (Odontophorus atrifrons), Arañero Pechigris (Basileuterus cinereicollis), Gorrión-montés Bigotudo (Atlapetes albofrenatus) y Frutero Pechidorado (Pipreola aureopectus). También hay mamíferos como la Paca, el Perezoso Bayo, la Zarigüeya Lanuda y el Kinkajú.",
    "destacado": true
  },
  {
    "nombre": "Jardín Botánico Jorge Enrique Quintero Arenas",
    "categoria": "turismo-naturaleza",
    "puntaje": 82,
    "ubicacion": "Universidad Francisco de Paula Santander Ocaña",
    "descripcion": "Zona de conservación de 31.28 hectáreas con formación vegetal de Bosque Seco Tropical y gran diversidad de flora. Proyectado como instrumento importante de investigación de fauna y flora por parte de la comunidad universitaria. Busca crear espacios de conservación, educación e investigación."
  },
  {
    "nombre": "Camino de Herradura al Santuario de Torcoroma",
    "categoria": "turismo-naturaleza",
    "puntaje": 75,
    "ubicacion": "Desde el Barrio Villanueva hasta el Santuario (1.57 km)",
    "descripcion": "Sendero de 1.57 kilómetros desde el barrio Villanueva hasta el Santuario de Nuestra Señora de las Gracias de Torcoroma. Ruta alterna de senderismo y peregrinación donde los fieles elevan plegarias y cumplen promesas. Permite apreciar el paisaje y es ideal para fotografía.",
    "recomendaciones": "Usar calzado cómodo. Recorrido de dificultad baja a media. Llevar agua."
  },
  {
    "nombre": "Cerro Azul — Vereda Las Liscas",
    "categoria": "turismo-naturaleza",
    "puntaje": 65,
    "ubicacion": "Detrás de la Universidad Francisco de Paula Santander",
    "descripcion": "Lugar natural ideal para disfrutar de la naturaleza. Ruta utilizada para practicar senderismo y ciclismo de montaña con vistas panorámicas al municipio."
  },
  {
    "nombre": "Vereda Quebrada Seca",
    "categoria": "turismo-naturaleza",
    "puntaje": 60,
    "ubicacion": "Área rural de Ocaña",
    "descripcion": "Lugar ideal para caminatas ecológicas, deporte y senderismo. En uno de los predios se puede apreciar una maravillosa cascada de agua."
  },
  {
    "nombre": "Vereda La Pradera",
    "categoria": "turismo-naturaleza",
    "puntaje": 62,
    "ubicacion": "Vereda La Pradera, área rural de Ocaña",
    "descripcion": "Lugar para senderismo que permite una simbiosis entre deporte, cultura y medio ambiente. En el recorrido se encuentra la Hacienda Villa Barbosa, donde se dice que el General Francisco de Paula Santander descansaba durante la Gran Convención de Ocaña."
  },
  {
    "nombre": "Vereda La Rinconada",
    "categoria": "turismo-naturaleza",
    "puntaje": 58,
    "ubicacion": "Vereda La Rinconada, área rural de Ocaña",
    "descripcion": "Lugar ideal para ciclismo de montaña, caminatas ecológicas y senderismo. Acoge la Finca Encenillo Ecolodge, único alojamiento rural registrado en esta vereda."
  },
  {
    "nombre": "Río Algodonal",
    "categoria": "turismo-naturaleza",
    "puntaje": 60,
    "ubicacion": "Balnearios del Corregimiento de la Ermita",
    "descripcion": "Río con balnearios naturales en el Corregimiento de la Ermita, espacio de recreación y contacto con la naturaleza para habitantes y visitantes."
  }
]
```

### ATRACTIVOS TURÍSTICOS — Gastronomía

```json
[
  {
    "nombre": "Gastronomía Ocañera — Patrimonio Inmaterial",
    "categoria": "gastronomia",
    "descripcion": "La gastronomía de Ocaña es un patrimonio cultural inmaterial que identifica la región. Entre los platos y productos insignia se destacan:",
    "destacado": true,
    "recomendaciones": "Los mejores lugares para degustar la gastronomía típica son el Mercado Público y los restaurantes del centro histórico. La arepa con pellejo y café negro es infaltable en cualquier desayuno ocañero.",
    "platos": [
      "Arepa con pellejo y Café Negro (plato insignia)",
      "Pasteles o tamales ocañeros",
      "Ajiaco ocañero",
      "Pan ocañero",
      "Platos elaborados con la flor del Barbatusco",
      "Cebollitas ocañeras (producto agroindustrial regional)",
      "Conserva de papaya con higos o brevas",
      "Buñuelos ocañeros",
      "Sancocho de gallina",
      "Las Cocotas",
      "Dulces: mantequillados, arifuque, solteritas, cochas, delicados"
    ]
  }
]
```

### RUTAS TURÍSTICAS

```json
[
  {
    "nombre": "Ruta de la Gran Convención",
    "descripcion": "Ruta histórica que abarca los municipios de Ocaña, El Carmen, Ábrego, La Playa de Belén y Río de Oro. Su objetivo es visibilizar y potencializar la riqueza del patrimonio histórico con un recorrido que genera turismo regional, nacional e internacional. Fortalece la oferta turística, la preservación del patrimonio, la promoción de la historia, fiestas y costumbres tradicionales de estos municipios.",
    "destacado": true,
    "atractivos_principales": ["Complejo Histórico de la Gran Convención", "Museo de la Gran Convención", "Plaza del 29 de Mayo", "Columna de la Libertad de los Esclavos", "Plazuela San Francisco"]
  },
  {
    "nombre": "Ruta Religiosa",
    "descripcion": "Recorrido por los principales templos y espacios de fe de Ocaña, reconocida como eje estratégico del turismo religioso a nivel departamental. Incluye los atractivos de mayor puntaje en patrimonio religioso.",
    "destacado": true,
    "atractivos_principales": ["Santuario de Nuestra Señora de las Gracias de Torcoroma", "Catedral de Santa Ana", "Iglesia San Agustín", "Capilla de los Dulcísimos Nombres", "Monasterio Monjas Dominicas"]
  },
  {
    "nombre": "Ruta Histórica y Patrimonial",
    "descripcion": "Recorrido por el centro histórico de Ocaña, declarado 'Ocaña Independiente' por Simón Bolívar. Visita inmuebles patrimoniales, plazuelas, museos y espacios que narran la historia de la ciudad desde la época prehispánica hasta el siglo XX.",
    "destacado": false,
    "atractivos_principales": ["Museo Antón García de Bonilla", "Colegio Nacional José Eusebio Caro", "Casa donde se hospedó Simón Bolívar", "Palacio Municipal", "Plazuela San Agustín"]
  },
  {
    "nombre": "Ruta de Naturaleza y Ecoturismo",
    "descripcion": "Ruta de naturaleza que conecta los principales sitios naturales del municipio: desde la reserva de aves más importante hasta senderos rurales y el jardín botánico universitario. Ideal para avistamiento de aves, senderismo, ciclismo y fotografía de naturaleza.",
    "destacado": false,
    "atractivos_principales": ["Reserva Natural ProAves Hormiguero de Torcoroma", "Jardín Botánico Jorge Enrique Quintero Arenas", "Camino de Herradura al Santuario de Torcoroma", "Cerro Azul Las Liscas", "Vereda Quebrada Seca"]
  },
  {
    "nombre": "Ruta Camino al Milagro",
    "descripcion": "Recorrido turístico por los barrios Villanueva, El Llanito y El Espinazo, con motivo de la celebración de la Virgen Nuestra Señora de las Gracias de Torcoroma. Permite apreciar el patrimonio cultural material e inmaterial del sector, siendo que el barrio Villanueva fue en la época colonial la entrada principal a la ciudad.",
    "destacado": false
  }
]
```

### EVENTOS CULTURALES Y TURÍSTICOS

```json
[
  {
    "nombre": "Desfile de los Genitores",
    "fechaReferencia": "29 de diciembre",
    "tipo": "cultural",
    "descripcion": "Escenificación de la historia de Ocaña desde la época prehispánica hasta entrado el siglo XX. Se compone de comparsas que recorren la ciudad con más de 800 participantes. Patrimonio Cultural de la Nación.",
    "organizador": "Corporación Cultural y Artística Desfile de los Genitores",
    "declaratoria": "Ley 1046 del 26 de julio de 2006",
    "destacado": true
  },
  {
    "nombre": "Fiesta a la Virgen de Torcoroma",
    "fechaReferencia": "15 y 16 de agosto",
    "tipo": "religioso",
    "descripcion": "Conmemoración de la aparición de la imagen de María en 1711, a través de actos litúrgicos y procesiones hacia el Santuario. Uno de los eventos religiosos más importantes del departamento.",
    "destacado": true
  },
  {
    "nombre": "Semana Santa",
    "fechaReferencia": "Marzo o abril (variable)",
    "tipo": "religioso",
    "descripcion": "Conmemoración de la vida, pasión y muerte de Jesucristo a través de actos litúrgicos y procesiones. Bien de Interés Cultural de Carácter Departamental.",
    "organizador": "Alcaldía de Ocaña y Hermandad de Jesús Nazareno",
    "declaratoria": "Decreto 1044 del 31 de diciembre de 2003",
    "destacado": true
  },
  {
    "nombre": "Día del Barbatusco",
    "fechaReferencia": "Miércoles Santo",
    "tipo": "cultural",
    "descripcion": "Celebración tradicional ocañera única que conmemora la flor del barbatusco, planta endémica de la región con la que se elaboran platos gastronómicos típicos.",
    "organizador": "Alcaldía de Ocaña"
  },
  {
    "nombre": "Fiesta a Jesús Cautivo",
    "fechaReferencia": "Segundo domingo de julio",
    "tipo": "religioso",
    "descripcion": "Conmemora la aparición de la imagen de Jesús en una piedra. Organizada por la Parroquia Santuario Jesús Cautivo y las JAC del barrio."
  },
  {
    "nombre": "Concurso Folclórico Bambuco Ocañerita",
    "fechaReferencia": "Noviembre y diciembre",
    "tipo": "folclorico",
    "descripcion": "Concurso folclórico de nivel institucional, municipal, departamental y nacional que celebra el bambuco como expresión musical y dancística de la región.",
    "organizador": "Fundación Folclórica Nancy García Pérez (Funancyfolk)"
  },
  {
    "nombre": "Fiesta de la Fundación de Ocaña",
    "fechaReferencia": "14 de diciembre",
    "tipo": "cultural",
    "descripcion": "Celebración del aniversario de la fundación de Ocaña el 14 de diciembre de 1570 por Francisco Fernández de Contreras.",
    "organizador": "Alcaldía de Ocaña"
  },
  {
    "nombre": "Carnaval de Ocaña",
    "fechaReferencia": "4, 5 y 6 de enero",
    "tipo": "cultural",
    "descripcion": "Carnaval que abre las festividades del año en Ocaña, con comparsas, música y expresiones culturales de la región.",
    "organizador": "Alcaldía de Ocaña"
  },
  {
    "nombre": "Reinado de la Tercera Edad",
    "fechaReferencia": "2 de enero",
    "tipo": "cultural",
    "descripcion": "Tradicional reinado que celebra y reconoce a los adultos mayores del municipio.",
    "organizador": "Alcaldía de Ocaña"
  },
  {
    "nombre": "Festival de Ballet al Parque",
    "fechaReferencia": "Segunda semana de agosto",
    "tipo": "cultural",
    "organizador": "Fundación Ecoturística Tarigua"
  },
  {
    "nombre": "Semana de la Fraternidad y la Integración Regional",
    "fechaReferencia": "Última semana de junio",
    "tipo": "cultural",
    "organizador": "Alcaldía de Ocaña"
  }
]
```

### PRESTADORES TURÍSTICOS — Hoteles destacados

```json
[
  { "nombre": "Hotel El Príncipe Campestre", "tipo": "hotel", "direccion": "CR 10 No 9B-14", "telefono": "3138849810", "habitaciones": 61 },
  { "nombre": "Hotel Tarigua Ocaña", "tipo": "hotel", "direccion": "CR 12 No 8-47, Barrio El Torito", "telefono": "3106067667", "habitaciones": 52 },
  { "nombre": "Hotel El Príncipe", "tipo": "hotel", "direccion": "CL 10 No 10-49, El Centro", "telefono": "3187075937", "habitaciones": 47 },
  { "nombre": "Hotel Dr Juan José", "tipo": "hotel", "direccion": "CR 16B No 8-07, La Rotina", "telefono": "3224700586", "habitaciones": 55 },
  { "nombre": "Hotel San Francisco Ocaña", "tipo": "hotel", "direccion": "CR 11 No 40-40, Circunvalar", "telefono": "3012243343", "habitaciones": 41 },
  { "nombre": "Hotel Hacaritama Ocaña", "tipo": "hotel", "direccion": "CL 10 No 12-57, El Centro", "telefono": "3178303882", "habitaciones": 45 },
  { "nombre": "Hotel Plaza Real Ocaña", "tipo": "hotel", "direccion": "CR 13 No 11-25, El Centro", "telefono": "3138003935", "habitaciones": 20 },
  { "nombre": "Doña María Hotel Boutique", "tipo": "hotel", "direccion": "CL 10 No 10-30, El Centro", "telefono": "3103298726", "habitaciones": 8 },
  { "nombre": "San Agustín Plaza Hotel", "tipo": "hotel", "direccion": "CL 11 No 16-93, San Agustín", "telefono": "3102775848", "habitaciones": 31 },
  { "nombre": "Encenillo Ecolodge", "tipo": "hotel", "direccion": "Vereda La Rinconada", "telefono": "3219856225", "descripcion": "Finca turística rural con alojamiento en naturaleza" },
  { "nombre": "Piedra Partida Alojamiento Campestre", "tipo": "hotel", "direccion": "Finca Villa Lina, El Panche", "telefono": "3223081094", "descripcion": "Finca turística campestre" }
]
```

### ARTESANOS REGISTRADOS (muestra)

```json
[
  { "nombre": "Artesanías Eloim — Jorge Eliécer Bermúdez Cuéllar", "tipo": "artesano", "telefono": "3137992088", "especialidad": "Bisutería, macramé, manualidades en madera, pirograbado, semillas, alambre, cuero" },
  { "nombre": "Artesanía El Roble — Eduardo Jácome Páez", "tipo": "artesano", "telefono": "3167194339", "especialidad": "Manualidades en madera" },
  { "nombre": "Crearte las Heliconias — Miryam Rodríguez García", "tipo": "artesano", "telefono": "3128030764", "especialidad": "Bisutería, macramé, crochet, sublimado, Belenismo" },
  { "nombre": "Arte Creativo Yolima — Yolima López Angarita", "tipo": "artesano", "telefono": "3173116986", "especialidad": "Bisutería, macramé, manualidades en bambú y madera" }
]
```

---

## INFORMACIÓN INSTITUCIONAL

### Secretaría de Educación, Cultura y Turismo
- Dependencia responsable del fomento del turismo en el municipio de Ocaña
- Secretaria (E): Ibeth Karina Claro Sabbagh
- Ubicación: Complejo Histórico de la Gran Convención, Calle 11 con Carrera 9, Barrio San Francisco

### Consejo Municipal de Turismo
Organismo encargado de impulsar el desarrollo, promoción y competitividad del sector turístico. Integrado por representantes de:
- Sector hotelero
- Restaurantes y bares
- Agencias de viajes
- Artesanos
- Transporte terrestre
- UFPSO (Universidad Francisco de Paula Santander Ocaña)
- Policía de Turismo

### Plan de Desarrollo Turístico 2023-2034
- Formulador: Freider Avendaño Jácome
- Alcalde: Samir Fernando Casadiego Sanjuan
- 93 atractivos turísticos inventariados: 72 Patrimonio Cultural Material, 4 Sitios Naturales, 14 Festividades y Eventos, 3 Patrimonio Cultural Inmaterial
- 5 líneas estratégicas: Desarrollo de productos turísticos, Marketing turístico, Recursos Humanos y Capacitación, Infraestructura turística, Fortalecimiento institucional

### Superestructura turística (instituciones clave)
- SENA: Formación técnica en turismo
- Cámara de Comercio de Ocaña
- UFPSO (Universidad Francisco de Paula Santander Ocaña)
- CORPONOR (Corporación Autónoma Regional)
- COMFANORTE (con carrera en Administración Turística y Hotelera)
- Cemprendo (Centro de empleo y emprendimiento)
- Museo de la Gran Convención (Red Nacional de Museos)
- Museo Antón García de Bonilla

---

## DATOS GENERALES DE OCAÑA (para página "Descubre Ocaña")

- **Fundación:** 14 de diciembre de 1570, por Francisco Fernández de Contreras
- **Departamento:** Norte de Santander
- **Apodo histórico:** "Ocaña Independiente" (Simón Bolívar)
- **Evento histórico más importante:** La Gran Convención de 1828 (reforma constitucional)
- **Clima:** Favorable para el turismo durante todo el año (fortaleza reconocida en el DOFA)
- **Conectividad terrestre:** Cúcuta–Ábrego–Ocaña (6h), Bucaramanga–Aguachica–Ocaña (5h), Bogotá–Aguachica–Ocaña (5h), Barranquilla–Aguachica–Ocaña (8h)
- **Aeropuerto:** Aguas Claras (vuelos chárter disponibles, comerciales suspendidos desde 2013)
- **Capacidad hotelera:** 78 establecimientos, 1.012 habitaciones, 1.463 camas (datos 2022)
- **Planta turística:** 8 empresas de transporte intermunicipal, múltiples restaurantes, 3 agencias de viajes, 28 artesanos registrados

---

## ENTREGABLES DEL PROYECTO

1. Crear el proyecto completo Next.js + Payload CMS
2. Configurar todas las colecciones descritas
3. Crear las páginas públicas principales
4. Implementar los datos de semilla con la información oficial del Plan 2023-2034
5. Crear `README.md` con instrucciones para:
   - Instalación y ejecución local
   - Creación de usuario administrador
   - Variables de entorno necesarias
   - Despliegue en Vercel + Neon PostgreSQL
   - Conexión del dominio `www.ocanaturismo.com`
6. Proporcionar la ruta de despliegue económico recomendada

---

## RUTA DE DESPLIEGUE ECONÓMICA RECOMENDADA

| Servicio | Plan | Costo |
|----------|------|-------|
| **Vercel** | Hobby (Frontend + Serverless) | Gratis |
| **Neon** | Free tier (PostgreSQL 0.5 GB) | Gratis |
| **Cloudinary** | Free (hasta 25 GB media) | Gratis |
| **Dominio** | ocanaturismo.com (Namecheap/GoDaddy) | ~$12 USD/año |

**Total MVP: ~$12 USD/año**

Cuando crezca el contenido multimedia:
- Neon Pro: $19 USD/mes
- Vercel Pro: $20 USD/mes
- O migrar a Railway (PostgreSQL + deploy): ~$20 USD/mes todo incluido

---

## ARQUITECTURA PREPARADA PARA FUTURAS FUNCIONALIDADES

El proyecto debe dejar los cimientos para:
- **Mapa interactivo:** Mapbox GL JS o Leaflet (campos de coordenadas ya incluidos en atractivos)
- **Multilenguaje:** i18n con `next-intl` (estructura de carpetas lista)
- **Formularios de inscripción:** Para eventos, con envío por email (Resend o Nodemailer)
- **Analítica:** Vercel Analytics + Google Analytics
- **Calendario avanzado:** react-big-calendar o FullCalendar
- **Integración redes sociales:** Meta embed API
- **PWA:** `next-pwa` o Workbox

---

## DECISIONES DE DISEÑO

- **Paleta de colores principal:** Tonos cálidos (terracota/dorado) para patrimonio + verde oscuro para naturaleza + blanco institucional
- **Tipografía:** Playfair Display (encabezados históricos) + Inter (cuerpo)
- **Imágenes:** Placeholders con Unsplash temáticas hasta cargar contenido oficial
- **Hero:** Video o imagen panorámica de Ocaña con overlay oscuro y texto "Ocaña, Potencia Regional"
- **Cards:** Con imagen grande, categoría coloreada, nombre y descripción corta
- **Footer:** Institucional con logo, redes sociales, Secretaría, aviso oficial del municipio

---

## INSTRUCCIONES DE EJECUCIÓN

Avanza paso a paso en este orden:
1. Crear la estructura del proyecto con `create-next-app` + instalar Payload CMS v3
2. Configurar `payload.config.ts` con las colecciones
3. Configurar PostgreSQL (local con Docker o Neon en producción)
4. Crear los componentes de UI (Layout, Header, Footer, Cards)
5. Crear las páginas públicas empezando por `/` (inicio)
6. Crear el seed con los datos oficiales
7. Crear el `README.md`

**No hagas preguntas innecesarias. Toma decisiones razonables para un MVP institucional turístico. Prioriza que funcione bien antes que ser perfecto.**
