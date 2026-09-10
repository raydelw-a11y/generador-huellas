import React, { useState, useEffect, useMemo } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const DEFAULT_TEMPLATE = `Actúa como un historiador, director de cine, y periodista profesional.

[?TIPO_PRODUCCION=TODO_INCLUIDO]
INSTRUCCIÓN OBLIGATORIA PARA LA IA: Has recibido el Manual Maestro completo con todas las bifurcaciones. Antes de redactar cualquier guion o tomar decisiones, DEBES PREGUNTAR AL USUARIO qué "Tipo de Producción" (ej. Reels [9:16 o 16:9], Inmersivo Contemplativo, Timelapse) desea generar para este episodio. No comiences a escribir hasta que el usuario te indique el formato elegido.
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=INMERSIVO_CONTEMPLATIVO]
PROTOCOLO SECUENCIAL DE EJECUCIÓN OBLIGATORIO (EN 3 ETAPAS POR SEPARADO):
La IA debe ejecutar obligatoriamente la producción en tres etapas separadas y secuenciales:

ETAPA 1: SELECCIÓN DEL TEMA Y TIPOLOGÍA
Antes de redactar cualquier prompt, clip o metadata, la IA DEBE PREGUNTAR OBLIGATORIAMENTE AL USUARIO qué tipo de video será este episodio. Preséntale las siguientes opciones y dale la oportunidad de elegir una o sugerir otras:
1. Un suceso histórico
2. Un lugar histórico
3. Un personaje
4. Un misterio sin resolver
5. Un true crime
6. Una conciencia o realidad colectiva
7. Una manipulación psicológica
8. Una curiosidad
9. O sugerir otras opciones creativas según la temática.
-> ALTO INQUEBRANTABLE: La IA debe detenerse aquí y esperar la respuesta del usuario con el tema y la tipología seleccionada. No generes ningún clip ni metadata hasta recibir esta confirmación.

ETAPA 2: GENERACIÓN DE LOS CLIPS DE VIDEO (PROMPTS Y DIRECCIÓN)
Una vez que el usuario confirme el tema y la tipología, la IA generará y entregará EXCLUSIVAMENTE los 3 clips de video (Clip 1 Hook de 4s, Clip 2 de 8s, Clip 3 de 8s). Al inicio de la entrega de los prompts, anteponer literalmente la orden operativa:
Actúa como un historiador, director de cine, y periodista profesional.
Cambia los nombres de los clips a las primeras 6 palabras literales del prompt proveído pegado y enviado que incluyen la numeración.
Usa omni flash para videos y banana pro para imágenes iniciales de cada clip.
Crea las imágenes primero y luego los clips usando cada imagen como fotograma inicial.

- Para el Clip 1 (Hook de 4s):
  1. Identificación del Clip y Selección de Cámara (plano, ángulo, movimiento, lente).
  2. Explicación Visual del Clip (contexto narrativo en español).
  3. Prompt de Imagen Inicial (en inglés para Banana Pro con 'no text', comenzando obligatoriamente con "Imagen 1: [prompt...]").
  4. Prompt de Movimiento de Video con Audio Foley Integrado (en inglés para Omni Flash, estrictamente sin música ni voz / 'no music, no speech', comenzando obligatoriamente con el tiempo que cubre en formato (##:## - ##:##): "Clip 1 (00:00 - 00:04): [prompt...]").
  5. Texto en Pantalla (Exclusivo Clip 1 para CapCut): Debe contener obligatoriamente Ciudad, País, Tiempo (año en dígitos o siglo en números romanos) y justo debajo el Título Gancho que resuma con intriga de qué va el video.

- Para el Clip 2 (8s) y Clip 3 (8s):
  1. Identificación del Clip y Selección de Cámara.
  2. Explicación Visual del Clip.
  3. Prompt de Imagen Inicial (en inglés para Banana Pro con 'no text', comenzando obligatoriamente con "Imagen [número]: [prompt...]").
  4. Prompt de Movimiento de Video con Audio Foley Integrado (en inglés para Omni Flash, estrictamente sin música ni voz / 'no music, no speech', comenzando obligatoriamente con el tiempo que cubre en formato (##:## - ##:##): "Clip 2 (00:04 - 00:12): [prompt...]", "Clip 3 (00:12 - 00:20): [prompt...]").
  (Los Clips 2 y 3 no llevan texto en pantalla).
-> ALTO: La IA entrega los clips y concluye su respuesta. NO incluyas la metadata de publicación en esta etapa.

ETAPA 3: GENERACIÓN DE METADATA PARA SUBIR EL VIDEO (ENTREGA POSTERIOR)
En una interacción posterior, la IA generará la metadata de publicación en formato "Todo Corrido" y SIN encabezados de sección (cero "Título:", cero "Descripción:", cero "Comentario Fijado:"):
- Regla Estricta de Extensión (2100 Caracteres Totales): Desde el inicio del título hasta el final de los hashtags (incluyendo título, descripción, nota IA, slogan y hashtags con sus espacios y saltos de línea), el bloque completo debe sumar exactamente 2100 caracteres contando los espacios.
- Regla de Años y Siglos: Todos los años deben escribirse siempre en números / dígitos (ej. 1888, 1945), jamás en palabras; y todos los siglos deben escribirse obligatoriamente en números romanos en las descripciones (ej. siglo XIX, siglo XXI), nunca en números arábigos ni en palabras.
- Estructura y Orden Inalterable de Entrega (Nota IA -> Slogan -> Hashtags):
  1. Título inmersivo directo (sin sufijos de marca ni de IA), con los años en números.
  2. Línea invisible con carácter braille (⠀).
  3. Descripción densa e histórica adaptada al formato vertical (con años en números y siglos obligatoriamente en números romanos).
  4. Línea invisible con carácter braille (⠀).
  5. Nota IA (Escudo de IA para videos cortos): (Nota: Este video inmersivo ha sido recreado utilizando herramientas de inteligencia artificial generativa basándonos estrictamente en registros históricos, tácticos y arquitectónicos de la época. Es posible que existan incongruencias o errores visuales).
  6. Línea invisible con carácter braille (⠀).
  7. Slogan de la marca: Cada historia deja una huella. Aquí seguimos sus rastros.
  8. Línea invisible con carácter braille (⠀).
  9. Exactamente 5 hashtags en formato #CamelCase referentes al tema del video (aquí concluye estrictamente el conteo de los 2100 caracteres totales).
  10. Línea invisible con carácter braille (⠀).
  11. Comentario fijado directo (CTA de suscripción/interacción sin etiqueta).
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=REELS]
PROTOCOLO SECUENCIAL DE EJECUCIÓN OBLIGATORIO: REELS (6 ETAPAS POR SEPARADO):
Este formato corresponde a un video cinematográfico ([?SUB_OPCION_REELS=9X16]vertical 9:16[/?SUB_OPCION_REELS][?SUB_OPCION_REELS=16X9]horizontal 16:9[/?SUB_OPCION_REELS]) con duración flexible definida por el usuario. La arquitectura de audio y video es estricta: los primeros 6 segundos de video no llevan voz en off (el primer clip [Clip 1 de 4 segundos] es un hook de puro impacto sensorial visual y Foley sin voz, y los primeros 2 segundos del Clip 2 se mantienen igualmente sin voz con exclusivo Foley). La locución narrativa (voz en off) entra obligatoriamente a los 2 segundos de haber iniciado el Clip 2 (exactamente en el segundo 6 del video total) y fluye de forma continua hasta el final. Por lo tanto, la duración total del video es la suma exacta de los 6 segundos iniciales sin voz más el tiempo de duración de la voz en off (Duración Total = 6s + Tiempo de Voz en Off; es decir, Tiempo de Voz en Off = Duración Total - 6s). La IA debe ejecutar obligatoriamente la producción en seis etapas separadas y secuenciales:

ETAPA 1: SELECCIÓN DEL TEMA Y TIPOLOGÍA
Antes de redactar la duración, voz en off, clips o metadata, la IA DEBE PREGUNTAR OBLIGATORIAMENTE AL USUARIO qué tema o tipología histórica abordará este video de Reels. Preséntale las siguientes opciones y dale la oportunidad de elegir una o sugerir otras:
1. Un suceso histórico
2. Un lugar histórico
3. Un personaje
4. Un misterio sin resolver
5. Un true crime
6. Una conciencia o realidad colectiva
7. Una manipulación psicológica
8. Una curiosidad
9. O sugerir otras opciones creativas según la temática.
-> ALTO INQUEBRANTABLE: La IA debe detenerse aquí y esperar la respuesta y confirmación del usuario con el tema elegido antes de avanzar. No pases a la siguiente etapa ni generes contenido hasta recibir esta confirmación.

ETAPA 2: DEFINICIÓN DE LA DURACIÓN DEL VIDEO
Una vez confirmado el tema por el usuario, la IA DEBE PREGUNTAR OBLIGATORIAMENTE AL USUARIO LA DURACIÓN EXACTA DESEADA PARA EL VIDEO.
Explícale al usuario la arquitectura de tiempos:
- Los primeros 6 segundos de video NO llevan voz en off (Clip 1 de 4s completo sin voz + los primeros 2 segundos del Clip 2 sin voz, con exclusivo diseño sonoro Foley).
- La voz en off entra obligatoriamente en el segundo 6 del video (a los 2 segundos de iniciar el Clip 2) y fluye de forma continua.
- Por tanto, la Duración Total del Video = 6 segundos iniciales sin voz + Tiempo de la Voz en Off (Tiempo de Voz en Off = Duración Total - 6s).
Preséntale opciones sugeridas y dale la opción de indicar cualquier otra duración:
1. 36 segundos (Clip 1 de 4s + 4 clips de 8s = 30s de voz en off / ~530 caracteres con espacios)
2. 44 segundos (Clip 1 de 4s + 5 clips de 8s = 38s de voz en off / ~671 caracteres con espacios)
3. 52 segundos (Clip 1 de 4s + 6 clips de 8s = 46s de voz en off / ~812 caracteres con espacios)
4. 60 segundos (Clip 1 de 4s + 7 clips de 8s = 54s de voz en off / ~954 caracteres con espacios)
5. 68 segundos (Clip 1 de 4s + 8 clips de 8s = 62s de voz en off / ~1095 caracteres con espacios)
6. 76 segundos (Clip 1 de 4s + 9 clips de 8s = 70s de voz en off / ~1236 caracteres con espacios)
7. 84 segundos (Clip 1 de 4s + 10 clips de 8s = 78s de voz en off / ~1377 caracteres con espacios)
8. 116 segundos / 1:56 min (Clip 1 de 4s + 14 clips de 8s = 110s de voz en off / ~1943 caracteres con espacios)
9. 120 segundos / 2 min exactos (Clip 1 de 4s + 14 clips de 8s + Clip 16 de 4s = 114s de voz en off / ~2013 caracteres con espacios)
10. 124 segundos / 2:04 min (Clip 1 de 4s + 15 clips de 8s = 118s de voz en off / ~2084 caracteres con espacios)
11. O especificar cualquier otra duración en segundos que el usuario prefiera.
-> ALTO INQUEBRANTABLE: La IA debe detenerse aquí y esperar a que el usuario indique la duración elegida antes de redactar el guion de locución.

ETAPA 3: GUION DE LA VOZ EN OFF (CALCULADA SEGÚN LA DURACIÓN)
Una vez confirmada la duración por el usuario, la IA redactará EXCLUSIVAMENTE el guion completo de la voz narrativa (voiceover):
- Regla Fundamental de Audio (Entrada de Voz en Segundo 6): Los primeros 6 segundos de video NO llevan voz en off bajo ningún concepto (Clip 1 de 4s completo sin voz + primeros 2 segundos del Clip 2 sin voz, con Foley ambiental puro). La locución entra obligatoriamente en el segundo 6 de video (a los 2 segundos de haber iniciado el Clip 2).
- Cálculo Matemático Exacto de Duración y Extensión (Tasa Calibrada de 17.66 caracteres/segundo):
  * Tiempo de Locución = Duración Total del Video - 6 segundos iniciales sin voz.
  * Tasa de Lectura Calibrada: Exactamente 17.66 caracteres por segundo de locución incluyendo los espacios (~141 caracteres por cada 8 segundos de locución continua).
  * Extensión Estricta del Guion: Se calcula mediante la fórmula matemática:
    Caracteres del Guion = (Duración Total del Video - 6s) x 17.66 caracteres con espacios.
    (Ejemplos exactos: 120s total -> 114s de voz = ~2013 caracteres con espacios; 116s total -> 110s de voz = ~1943 caracteres; 60s total -> 54s de voz = ~954 caracteres; 52s total -> 46s de voz = ~812 caracteres; 44s total -> 38s de voz = ~671 caracteres; 36s total -> 30s de voz = ~530 caracteres). La IA debe indicar obligatoriamente al pie del guion el recuento exacto de caracteres generados y el desglose de tiempo.
- Hook de Inicio Obligatorio (Estructura de Apertura al Segundo 6 / 2s del Clip 2): La locución arranca obligatoriamente a los 2 segundos de haber iniciado el Clip 2 (exactamente en el segundo 6 del video total) y su frase inicial DEBE ESTRUCTURARSE DE FORMA INNEGOCIABLE EN LA SIGUIENTE TRÍADA SECUENCIAL:
  1. Tiempo: Año o fecha exacta, con todos los años escritos obligatoriamente en números / dígitos (ej. "1888", "Invierno de 1789", "Mayo de 1943").
  2. Lugar, Ciudad y País: Anclaje geográfico completo especificando el lugar concreto, la ciudad y el país (ej. "en el callejón de Whitechapel, Londres, Inglaterra...", "en la Plaza de la Concordia, París, Francia...", "en las profundidades del Mar del Norte, Noruega...").
  3. Descripción Breve: Una descripción breve, directa y fascinante del lugar, suceso histórico, personaje o temática de la que trate el video (ej. "...el laberinto donde operaba un cazador nocturno que la policía jamás atrapó", "...el escenario sangriento donde una multitud enfurecida derrocó una monarquía milenaria", "...el médico militar que desafió las órdenes del estado mayor"), enlazando inmediatamente con la premisa intrigante, perturbadora o revelación que detenga el scroll al instante.
- Regla Estricta de Años en Número: Todos los años deben escribirse obligatoriamente en números / dígitos (ej. 1888, 1789, 1943), quedando totalmente prohibido escribirlos en letras o palabras completas (prohibido escribir "mil ochocientos ochenta y ocho"). Esta norma rige tanto para la fecha de apertura como para cualquier año mencionado en el guion y en la metadata.
- Tono documental inmersivo, periodístico, sobrio y cinematográfico.
- Sin silencios estructurales: Queda terminantemente prohibido incluir silencios estructurales o marcas de pausas artificiales (/2s, /#s). La voz en off debe fluir continua y limpia a lo largo de todo su tiempo asignado.
- Voz narrativa en tercera persona (Prohibido hablar en "nosotros"): La voz en off no debe hablar en primera persona del plural ("nosotros", "caminamos", "vemos", "nos encontramos", "nuestra historia"). La locución debe limitarse a narrar los hechos y la historia de forma directa, objetiva y cinematográfica en tercera persona.
- Referencias naturales a las personas (Cero anonimización forzada): No es necesario ni se debe decir "x tipo de persona o profesión anónimos" (ej. "campesinos anónimos", "un soldado anónimo", "testigos anónimos") ni emplear fórmulas artificiales para intentar anonimizar a las figuras históricas. Nombra a los protagonistas, testigos, colectivos o profesiones con total naturalidad según lo exija el relato histórico.
- Prohibición absoluta del uso de signos de exclamación (!).
- Prohibición estricta de las palabras "adultos", "muertos", "homicidio".
-> ALTO INQUEBRANTABLE: La IA entrega únicamente el guion de voz en off y concluye su respuesta. Espera la confirmación del usuario antes de pasar a la siguiente etapa.

ETAPA 4: PROMPTS DE IMÁGENES INICIALES Y CLIPS EN BLOQUES DE 10
Tras la validación del guion de voz en off, la IA generará y entregará los clips de video correspondientes a la duración elegida en bloques controlados de 10 clips (ej. Bloque 1: Clips 1 al 10; Bloque 2: Clips 11 al 16 o restantes):
- Cantidad de Clips y Cuadre Matemático Exacto:
  * Clip 1: 4 segundos de duración (Hook de impacto visual y auditivo). Estrictamente SIN voz en off.
  * Clips subsiguientes: Normalmente de 8 segundos cada uno (cubiertos por la voz en off continua).
  * Regla Inquebrantable de Cuadre Total: La suma exacta de los segundos de todos los clips generados DEBE coincidir con precisión milimétrica con la duración total acordada con el usuario, sin que falte ni sobre un solo segundo:
    - Si el usuario acordó 120 segundos (2 min exactos): La IA generará obligatoriamente Clip 1 (4s) + 14 clips de 8s (112s) + Clip 16 final de 4s (cierre/outro con plano macro de huella o cierre) = 120s exactos (4 + 112 + 4 = 120s). ¡Queda terminantemente prohibido redondear hacia abajo a 14 clips y dejar el video incompleto en 116 segundos!
    - Si el usuario acordó 116 segundos (1:56 min): Se generará Clip 1 (4s) + 14 clips de 8s (112s) = 116s exactos.
    - Si el usuario acordó 60 segundos (1 min): Se generará Clip 1 (4s) + 7 clips de 8s (56s) = 60s exactos.
    - Para cualquier otra duración personalizada, si (Duración Total - 4s) no es múltiplo exacto de 8, la IA añadirá un clip final con los segundos exactos restantes para completar la duración solicitada sin faltantes.

- Relación de Aspecto ([?SUB_OPCION_REELS=9X16]9:16 Vertical[/?SUB_OPCION_REELS][?SUB_OPCION_REELS=16X9]16:9 Horizontal[/?SUB_OPCION_REELS]):
  Todos los prompts de imagen inicial en Banana Pro deben configurarse obligatoriamente en relación de aspecto [?SUB_OPCION_REELS=9X16]vertical 9:16[/?SUB_OPCION_REELS][?SUB_OPCION_REELS=16X9]horizontal 16:9[/?SUB_OPCION_REELS]. El resto de la estructura de prompts, voz en off, tiempos y foley se mantiene exactamente idéntica.

- Protocolo Obligatorio de Entrega en Bloques de 10 Clips (Alto entre Bloques):
  * Si la producción tiene más de 10 clips en total (ej. un video de 120s con 16 clips, o de 116s con 15 clips), la IA generará y entregará en esta primera interacción ÚNICAMENTE el Bloque 1 correspondiente a los primeros 10 clips (Clips 1 al 10).
  * Al finalizar los 10 clips del Bloque 1, la IA DEBE DETENERSE OBLIGATORIAMENTE mediante la instrucción:
    -> ALTO INQUEBRANTABLE: La IA entrega el bloque de 10 clips (Clips 1 al 10) y concluye su respuesta deteniéndose. Espera la confirmación del usuario para generar y entregar el siguiente bloque (Clips 11 al 16 o restantes). NO entregues la metadata ni pases a la siguiente etapa hasta completar todos los clips.
  * Tras la confirmación del usuario, la IA entregará el Bloque 2 (Clips 11 al 16 o restantes) comenzando DIRECTAMENTE con los prompts (ej. Imagen 11:, Clip 11:) SIN repetir la orden operativa, ya que la orden operativa se da EXCLUSIVAMENTE y por única vez en el primer bloque de prompts (Bloque 1).
  * Si la producción tiene 10 clips o menos en total (ej. un video de 60s con 8 clips), la IA entregará la totalidad de los clips en un único bloque y se detendrá con el ALTO INQUEBRANTABLE antes de pasar a la siguiente etapa (Etapa 5: Texto en Pantalla).

- Formato Estricto de los Prompts (Orden Operativa EXCLUSIVA en el Primer Bloque):
  La IA entregará exclusivamente los prompts de forma limpia, directa y consecutiva en párrafos sin tablas ni bloques de código Markdown. Al comienzo obligatorio ÚNICAMENTE DEL PRIMER BLOQUE de prompts (Bloque 1: Clips 1 al 10), antes de listar cualquier clip, la IA DEBE ANTEPONER LITERALMENTE LA SIGUIENTE ORDEN OPERATIVA (quedando estrictamente prohibido repetirla en los bloques subsiguientes):

  Actúa como un historiador, director de cine, y periodista profesional.
  Cambia los nombres de los clips a las primeras 6 palabras literales del prompt proveído pegado y enviado que incluyen la numeración.
  Usa omni flash para videos y banana pro para imágenes iniciales de cada clip.
  Crea las imágenes primero y luego los clips usando cada imagen como fotograma inicial.

  Inmediatamente después de esta orden (en el Bloque 1), la IA entregará la secuencia de prompts correspondiente al bloque (incluyendo obligatoriamente en cada clip de video el tiempo que cubre en formato (##:## - ##:##)):

  Imagen 1: [prompt en inglés optimizado para Banana Pro en formato [?SUB_OPCION_REELS=9X16]vertical 9:16[/?SUB_OPCION_REELS][?SUB_OPCION_REELS=16X9]horizontal 16:9[/?SUB_OPCION_REELS] con 'no text', encuadre centrado, sujeto, atmósfera, iluminación y óptica, cerrando con: cinematic documentary realism, safe framing composition, no modern objects, no CGI look, no text, no speech, no music.]
  Clip 1 (00:00 - 00:04): [prompt técnico en inglés para Omni Flash de 4s de duración (Hook de impacto con puro diseño sonoro Foley ambiental, estrictamente sin voz en off), movimiento cinético lento, cerrando con: strictly no music, no speech, cinematic documentary realism, safe framing composition, no modern objects, no CGI look, no text, no speech, no music.]

  Imagen 2: [prompt en inglés para Banana Pro [?SUB_OPCION_REELS=9X16]9:16[/?SUB_OPCION_REELS][?SUB_OPCION_REELS=16X9]16:9[/?SUB_OPCION_REELS] con 'no text'...]
  Clip 2 (00:04 - 00:12): [prompt técnico en inglés para Omni Flash de 8s de duración (con Foley integrado; recordando que los primeros 2 segundos van sin voz en off y la locución arranca al segundo 2 de este clip [segundo 6 del video total] comenzando obligatoriamente por TIEMPO, LUGAR, CIUDAD Y PAÍS, y DESCRIPCIÓN BREVE del tema/suceso/personaje), cerrando con: strictly no music, no speech, cinematic documentary realism, safe framing composition, no modern objects, no CGI look, no text, no speech, no music.]

  (Continuar consecutivamente con Imagen 3: prompt, Clip 3 (00:12 - 00:20): prompt... Imagen 4: prompt, Clip 4 (00:20 - 00:28): prompt... indicando siempre en cada clip de video el tiempo que cubre en formato (##:## - ##:##) hasta completar el bloque de 10 clips [Clips 1 al 10]).
-> ALTO INQUEBRANTABLE: La IA entrega el bloque de 10 clips y concluye su respuesta deteniéndose. Espera la confirmación del usuario para entregar el siguiente bloque (Clips 11 en adelante, el cual iniciará directamente con Imagen 11: prompt, sin la orden operativa). Una vez completados y entregados todos los clips de video del proyecto, la IA pasará obligatoriamente a la Etapa 5. NO generes la metadata de publicación en esta etapa.

ETAPA 5: TEXTO EN PANTALLA PARA LOS PRIMEROS 6 SEGUNDOS DEL VIDEO
Una vez terminada la entrega de todos los prompts de video (ya sea tras el Bloque 1 en videos de hasta 10 clips, o tras el último bloque en producciones mayores), y ANTES de generar la metadata de publicación, la IA DEBE PREGUNTAR OBLIGATORIAMENTE AL USUARIO:
"¿Qué texto ponemos en los primeros 6 segundos del video?"
La IA debe explicar al usuario que este texto corresponde al letrero o rótulo de gancho visual en pantalla durante los primeros 6 segundos del video (la ventana del Hook sin voz en off: Clip 1 de 4s + primeros 2s de Clip 2, con exclusivo diseño sonoro Foley ambiental). Para facilitarle la decisión al usuario, la IA debe proponerle obligatoriamente de 2 a 3 opciones atractivas, intrigantes y de alto impacto adaptadas al tema del video, estructuradas obligatoriamente en el siguiente formato de dos líneas:
- Primera línea: Ciudad, País, Tiempo (con años en dígitos y siglos obligatoriamente en números romanos; ej. "Londres, Inglaterra, 1888" o "París, Francia, siglo XIX").
- Segunda línea (justo debajo): El Gancho (frase corta y contundente, enigma intrigante o revelación perturbadora que detenga el scroll al instante).
Ejemplo visual del formato a entregar:
[Ciudad], [País], [Tiempo]
[Frase de gancho intrigante o perturbadora]

Y darle al usuario la opción de elegir una de las opciones sugeridas, editarla o indicar su propio texto.
Se debe aclarar al usuario que dicho texto es para ser insertado manualmente durante la edición posterior en CapCut (los prompts de Banana Pro y Omni Flash se mantienen estrictamente con la directriz 'no text').
-> ALTO INQUEBRANTABLE: La IA debe detenerse aquí y esperar la respuesta y confirmación del usuario con el texto elegido para los primeros 6 segundos antes de pasar a la generación de la metadata.

ETAPA 6: METADATA PARA SUBIR EL VIDEO (ENTREGA POSTERIOR)
Una vez confirmado por el usuario el texto en pantalla de los primeros 6 segundos, en una interacción posterior la IA generará la metadata de publicación en formato "Todo Corrido" y SIN encabezados de sección (cero "Título:", cero "Descripción:", cero "Comentario Fijado:"):
- Regla Estricta de Extensión (2100 Caracteres Totales): Desde el inicio del título hasta el final de los hashtags (incluyendo título, descripción, nota IA, slogan y hashtags con sus espacios y saltos de línea), el bloque completo debe sumar exactamente 2100 caracteres contando los espacios. La IA debe calibrar la longitud de la descripción para cumplir con esta cifra matemática exacta.
- Regla de Años y Siglos: Todos los años deben escribirse siempre en número (dígitos, ej: 1888, 1945), nunca en letras; y todos los siglos deben escribirse obligatoriamente en números romanos en las descripciones y en el título (ej: siglo XIX, siglo XXI), jamás en números arábigos ni en letras.
- Estructura y Orden Inalterable de Entrega (Nota IA -> Slogan -> Hashtags):
  1. Título inmersivo y directo para formato [?SUB_OPCION_REELS=9X16]vertical[/?SUB_OPCION_REELS][?SUB_OPCION_REELS=16X9]horizontal[/?SUB_OPCION_REELS] (con los años en números y siglos en números romanos), terminando con un separador "|" y una palabra clave corta (sin sufijo de IA ni "| Huellas de la Humanidad").
  2. Línea invisible con carácter braille (⠀).
  3. Descripción densa, contextual y envolvente adaptada a formato [?SUB_OPCION_REELS=9X16]vertical[/?SUB_OPCION_REELS][?SUB_OPCION_REELS=16X9]horizontal[/?SUB_OPCION_REELS] (con todos los años en números y todos los siglos obligatoriamente en números romanos).
  4. Línea invisible con carácter braille (⠀).
  5. Nota IA (Escudo de IA obligatorio para videos cortos):
     (Nota: Este video inmersivo ha sido recreado utilizando herramientas de inteligencia artificial generativa basándonos estrictamente en registros históricos, tácticos y arquitectónicos de la época. Es posible que existan incongruencias o errores visuales).
  6. Línea invisible con carácter braille (⠀).
  7. Slogan de la marca:
     Cada historia deja una huella. Aquí seguimos sus rastros.
  8. Línea invisible con carácter braille (⠀).
  9. Exactamente 5 hashtags en español y formato #CamelCase referentes al tema del video.
     (Aquí concluye estrictamente el conteo de los 2100 caracteres totales).
  10. Línea invisible con carácter braille (⠀).
  11. Comentario fijado directo (CTA de suscripción/interacción sin etiqueta).
[/?TIPO_PRODUCCION]
### FICHA TÉCNICA DEL EPISODIO ###
INSTRUCCIONES PARA EL EPISODIO ACTUAL:
[?TIPO_PRODUCCION=REELS|INMERSIVO_CONTEMPLATIVO]
Tema del Video: [TEMA_DEL_VIDEO]
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=TIMELAPSE]
Tema del Video: [TEMA_DEL_VIDEO]
Contradicción Central: [CONTRADICCION_CENTRAL]
Promesa Narrativa (Antes del min 2:00): [PROMESA_NARRATIVA]
Anclaje del Hook (Fecha o Lugar): [ANCLAJE_DEL_HOOK]
Imagen Final del Episodio: [IMAGEN_FINAL]
[/?TIPO_PRODUCCION]
####################################

MANUAL MAESTRO DE PRODUCCIÓN ABSOLUTO Y DEFINITIVO: HUELLAS DE LA HUMANIDAD

VOLUMEN I: IDENTIDAD, FILOSOFÍA Y ARQUITECTURA NARRATIVA
Capítulo 1: La Razón de Ser y el Paradigma de la Experiencia
La historia, como disciplina, nunca ha carecido de información. Durante décadas, la humanidad ha redactado bibliotecas enteras, producido incontables documentales y erigido museos con el propósito fundamental de explicar el pasado. Sin embargo, la vasta mayoría de estos contenidos audiovisuales y literarios parten de una misma premisa estructural que hoy resulta obsoleta: observar los acontecimientos desde afuera. El ecosistema de producción de Huellas de la Humanidad nace con el imperativo de romper este paradigma. El objetivo del canal no radica en que el espectador memorice una fecha, aprenda el nombre de un monarca o entienda la táctica de una batalla de forma abstracta. El objetivo, mucho más ambicioso y complejo, es lograr que el usuario experimente de primera mano cómo pudo sentirse vivir dentro de ese preciso momento temporal.En este sistema, no nos limitamos a contar lo que ocurrió; nuestra función es reconstruir el mundo físico y emocional donde dicho evento tuvo lugar. Cuando se aborda la historia de una ciudad antigua, no se describe únicamente su topografía; se invita al espectador a caminar sensorialmente por sus calles. Cuando se narra la hegemonía de un imperio, se muestra cómo era despertar inmerso en su cotidianidad. Cada documental, cada plano y cada diseño sonoro debe trabajar en conjunto para reducir la distancia psicológica entre el presente y el pasado, hasta lograr que dicha distancia desaparezca por completo. El espectador debe dejar de sentirse frente a un producto audiovisual educativo y comenzar a percibir que está observando fragmentos orgánicos de una época desaparecida. Esa ilusión continua de presencia es el principio rector que define la identidad innegociable de Huellas de la Humanidad.Para el canal, la historia no se concibe como una sucesión árida de fechas o tratados, sino como la suma incalculable de millones de experiencias humanas. Cada edificación fue levantada por individuos que sufrían fatiga; cada imperio se sostuvo sobre familias, comerciantes, soldados y artesanos; cada desastre natural impactó a personas que, hasta unos minutos antes de la catástrofe, asumían que su jornada sería ordinaria. Cuando el guion y la imagen logran transmitir esta dimensión, la historia abandona su naturaleza de dato frío y se transmuta en una experiencia emocional irreversible. El compromiso editorial dicta que toda decisión creativa —desde la investigación hasta el diseño del prompt— debe responder a una única pregunta métrica: ¿Esto ayuda al espectador a vivir la historia desde dentro? Si la respuesta es afirmativa, el elemento pertenece al corte final; si es negativa, debe purgarse.

[?TIPO_PRODUCCION=TIMELAPSE]
Capítulo 2: La Promesa Narrativa (El Contrato Invisible)
Todo episodio que aspire a construir una audiencia leal requiere una promesa clara y transparente. Esta debe aparecer obligatoriamente antes del minuto 2:00 de cada episodio. No es un simple truco de marketing; es un contrato donde le aseguramos al espectador que no recibirá una clase de historia tradicional. Debe dejar claro de qué trata el episodio, qué enigma histórico, tensión social o perspectiva inédita descubrirá si se queda hasta el final, prometiéndole habitar el pasado desde adentro.
Para que este contrato se cumpla, la arquitectura del contenido opera simultáneamente en tres niveles de profundidad:
- Nivel de Información: Garantiza que el espectador comprenda los hechos fácticos de lo que ocurrió, manteniendo una precisión histórica inquebrantable.
- Nivel de Contexto: Explica las causas profundas y las condiciones sociales, económicas y geográficas que detonaron el acontecimiento, respondiendo al "por qué" de la historia.
- Nivel de Experiencia: Constituye el diferenciador absoluto del canal. Reconstruye la historia desde la percepción psicológica, sensorial y física, permitiendo al usuario sentir "cómo" se vivió aquel momento.
[/?TIPO_PRODUCCION]

Capítulo 3: Los Cinco Pilares Fundamentales
La coherencia operativa y estética del canal se apoya en cinco pilares que actúan como cimientos inamovibles. Si alguno de estos elementos es omitido durante la producción, el resultado deja de ser un documental de Huellas de la Humanidad para convertirse en un video histórico genérico.El primer pilar es el Rigor Histórico. La espectacularidad visual y la inteligencia artificial nunca pueden sustituir a la evidencia académica. Cada proyecto comienza con una investigación exhaustiva que identifica fuentes primarias y consensos. En casos de ambigüedad histórica, el contenido debe reflejar las diversas hipótesis sin imponer especulaciones como verdades absolutas. La credibilidad del mundo reconstruido depende enteramente de este rigor.El segundo pilar es la Inmersión Cinematográfica. La meta no es ilustrar un guion, sino crear un hábitat visual. La cámara generada por los motores de IA debe comportarse como un testigo invisible con masa y volumen físico dentro del escenario. Las texturas, la incidencia de la luz, el comportamiento de los materiales y el diseño acústico deben acatar una lógica coherente con el periodo histórico. Un solo anacronismo visual o tecnológico tiene el potencial de destruir la ilusión completa de inmersión.El tercer pilar se enfoca en la Narrativa Psicológica. La historia ocurre tanto en el mundo material como en la psique de quienes la experimentan. El documental debe insinuar de manera constante el miedo, la incertidumbre, la esperanza, la adaptación o la resignación de la población. Esta capa invisible transforma los hechos abstractos en tensiones humanas comprensibles y empáticas para la audiencia moderna.El cuarto pilar es la generación de un Asombro Basado en la Realidad. Queda terminantemente prohibido exagerar eventos o inventar fricciones narrativas para retener la atención. La espectacularidad nace de la escala colosal de los hechos reales: desastres abrumadores, innovaciones tecnológicas prematuras y el esfuerzo humano masivo. El asombro debe brotar de la revelación de una verdad histórica fascinante y cruda, no de una hipérbole artificial o efectos de Hollywood.El quinto pilar, la Humanización de la Historia, exige que el foco de la reconstrucción no recaiga en mapas abstractos o monarcas lejanos, sino en la población real. Las ciudades y las guerras fueron experimentadas por personas reales con rutinas y ansiedades cotidianas. Devolverle la escala humana a los macro-eventos es la misión fundamental que cohesiona a todos los pilares anteriores.

[?TIPO_PRODUCCION=TIMELAPSE]
Capítulo 4: Dimensión Dominante, Contradicción Central y la Imagen Final
Dimensión Dominante: Cada episodio debe tener un lente a través del cual analizamos la historia. Esto evita que el documental divague y nos permite enfocar el diseño sonoro y visual en esa dimensión específica. La IA debe evaluar la naturaleza del episodio y decidir si el enfoque principal del guion será: 1) Psicológico y Social, 2) Tecnológico y Arquitectónico, 3) Militar y Táctico, 4) Económico o Simbólico (u otra dimensión adecuada según la producción).
Contradicción Central (El Motor del Relato): Todo video debe orbitar sobre una paradoja. No hacemos listados de curiosidades. La narrativa tiene la obligación de contraponer dos fuerzas estructurales antagónicas. Ejemplo: La estructura monumental que se construyó para proteger a los habitantes, pero que terminó convirtiéndolos en prisioneros. O el gran avance tecnológico que prometía emancipación, pero que dependía del sacrificio físico de miles de operarios en condiciones extremas. La contradicción es el eje que estructura la progresión emocional del espectador.
La Imagen Final: Como culminación de esta tensión, el sistema establece una norma arquitectónica inversa: cada episodio debe construirse comenzando por el final. Antes de redactar la primera línea del relato, el director debe definir la Imagen Final del Episodio. Esta imagen constituye una síntesis emocional y visual que actuará como ancla en la memoria del espectador. Todo el metraje precedente, cada escena, cada foley y cada pausa, debe funcionar como un vector narrativo diseñado exclusivamente para desembocar en esa imagen y concepto final predefinidos.
[/?TIPO_PRODUCCION]

[?TIPO_PRODUCCION=TIMELAPSE]
VOLUMEN II: FORMATOS EDITORIALES Y BIFURCACIÓN VISUAL
El crecimiento de la productora requiere una diversificación de enfoques narrativos que permitan abordar la historia desde distintos ángulos periodísticos e institucionales. Por ello, se ha establecido una bifurcación exacta e innegociable en los formatos editoriales a ejecutar, dependiendo de las instrucciones del Productor Ejecutivo para cada episodio.

[?FORMATO_EDITORIAL=A_INSTITUCIONAL]
Capítulo 5: Formato A — El Documental Institucional (Inmersión Pura)
El Formato A representa el estándar operativo por defecto de Huellas de la Humanidad. Está diseñado para ofrecer una experiencia contemplativa, enciclopédica pero profundamente emocional, manteniendo una distancia respetuosa pero inmersiva con el sujeto histórico.Vibras y Tono: Se nutre de la estética de las producciones de alta gama de cadenas como Discovery Channel, Netflix Documentaries y BBC History. El tono es majestuoso, riguroso y poético.Leyes de Locución: La voz en off opera como una presencia omnisciente e impersonal. El guion debe redactarse utilizando estrictamente el "Plural Institucional" para fomentar un viaje compartido con la audiencia (ejemplos obligatorios: "Caminamos entre las ruinas", "Vemos cómo la sociedad colapsa"). El narrador no es un personaje dentro de la historia, sino un guía a través del tiempo.Regla de Lip-Sync vs Voiceover: En el Formato A, todo el peso interpretativo recae en la locución. Aunque los rostros humanos generados por IA están plenamente permitidos en pantalla, existe una prohibición absoluta de lip-sync forzado. Los personajes nunca hablan directamente a la cámara. Para evitar el denominado "valle inquietante" (la artificialidad en rostros IA), la dirección cinematográfica exige que los humanos sean anclados constantemente a acciones físicas (trabajando la tierra, forjando metal, observando el horizonte). Los encuadres deben priorizar siluetas a contraluz, perfiles y planos sobre el hombro (over-the-shoulder), permitiendo que la escena respire de forma orgánica.
[/?FORMATO_EDITORIAL]

[?FORMATO_EDITORIAL=B_CRONICA]
Capítulo 6: Formato B — La Crónica de [NOMBRE_CORRESPONSAL] (Corresponsal en el Tiempo)
El Formato B rompe deliberadamente la cuarta pared temporal. Está diseñado para episodios que requieren urgencia, inmersión cruda y una perspectiva visceral desde la primera línea de los acontecimientos.Vibras y Tono: La inspiración directa proviene de los reportajes de Vice News. El formato simula un periodismo de trinchera, donde un corresponsal de guerra o investigador documenta la historia en tiempo real, enfrentándose a la crudeza del entorno.Leyes de Locución y Lip-Sync: A diferencia del modelo institucional, el Formato B permite y requiere el uso de lip-sync exclusivamente para el personaje central, el corresponsal denominado "[NOMBRE_CORRESPONSAL]". Este personaje se dirige a la audiencia para reportar el caos, el contexto o la crisis, aportando un testimonio directo y urgente. El resto de la población histórica de fondo sigue sujeta a la regla de no hablar.Lenguaje Visual: La cinematografía abandona los planos majestuosos y estabilizados para adoptar un formato Handheld (cámara en mano) o Selfie Documental. Se instruye a los motores de generación a utilizar profundidades de campo reducidas (enfocando al corresponsal mientras el caos se desenfoca en el fondo) y a integrar texturas analógicas, grano fílmico o defectos de lente que simulen una transmisión histórica realista y accidentada.
[/?FORMATO_EDITORIAL]
[/?TIPO_PRODUCCION]

VOLUMEN III: REGLAS ESTRICTAS E INQUEBRANTABLES
La preservación del rigor, la seguridad algorítmica y la calidad inmersiva exigen el cumplimiento de reglas prohibitivas que no admiten interpretación. Cualquier desviación de este marco invalida automáticamente el clip o el guion generado.
Capítulo 7: Seguridad de Personajes y Lenguaje Narrativo
Prohibición Absoluta de Menores: Está terminantemente prohibido incluir niños, bebés, adolescentes o cualquier figura de un menor de edad en toda la cadena de producción. Esta restricción aplica al guion narrativo, a los personajes secundarios o de fondo, a los prompts de generación de video y a las miniaturas de YouTube. Si la escena histórica normalmente implicaría la presencia de menores, estos deben ser completamente omitidos. La reconstrucción de la vida y el drama histórico debe focalizarse de manera exclusiva en soldados, ancianos, artesanos, comerciantes y trabajadores.
Prohibición Total de la Palabra "Adulto": Queda terminantemente prohibido escribir las palabras "adulto", "adultos", "adult", "adults" en cualquier guion, descripción o prompt. Es redundante, innecesario y antiestético. La identidad y presencia de los personajes debe expresarse únicamente a través de sus oficios, roles o descripciones contextuales (ej. soldado, campesino, mujer, hombre, pescador, herrero, monje), sin etiquetarlos jamás como "adultos".
Prohibición de Anonimización Forzada: No es necesario decir "x tipo de persona o profesión anónimos" (ej. "campesinos anónimos", "un marinero anónimo", "soldados anónimos") ni recurrir a etiquetas artificiales para intentar anonimizar a las personas de la historia. Las personas, figuras y grupos deben mencionarse de forma orgánica y directa según el contexto histórico (ej. los campesinos, los monjes, el emperador, una mujer, los soldados), sin obligar al guion a calificarlos como "anónimos".
Prohibición de Lenguaje Violento Explícito: Por políticas estrictas de monetización algorítmica, queda terminantemente prohibido utilizar en los guiones palabras como "matar", "asesinar", "suicidar", "masacrar" o sus derivados. Para describir bajas históricas, la IA está obligada a utilizar eufemismos y lenguaje periodístico refinado (ej. "perdió la vida", "cayó en combate", "fue ejecutado", "pereció", "silenciado", "erradicado").
Regla Estricta de Años en Número: Todos los años deben escribirse obligatoriamente en números / dígitos (ej. 1888, 1789, 1943, 44 a.C.), quedando estrictamente prohibido escribirlos en letras o palabras (prohibido escribir "mil ochocientos ochenta y ocho"). Esta norma es universal para todo el ecosistema de Huellas de la Humanidad: aplica a los títulos, anclajes de fecha, guiones de locución TTS, textos en pantalla de CapCut, miniaturas, descripciones y metadata.
Regla Estricta de Siglos en Números Romanos: En todas las descripciones históricas y textos de metadata, los siglos deben escribirse obligatoriamente en números romanos con mayúsculas (ej. siglo XIX, siglo V a.C., siglo XXI), quedando terminantemente prohibido escribirlos en números arábigos (prohibido "siglo 19") o en palabras (prohibido "siglo diecinueve").
Estructura Obligatoria de Apertura de la Voz en Off (Hook Inicial): Al comenzar la narración (al segundo 6 en Reels), la frase de apertura debe estructurarse obligatoriamente con la siguiente tríada secuencial: 1) Tiempo (año o fecha exacta, con los años en números/dígitos), 2) Lugar, ciudad y país (anclaje geográfico completo detallando el sitio específico, la ciudad y la nación), y 3) Descripción breve del lugar, suceso histórico, personaje o tema central abordado en el video, enlazando directamente con la premisa intrigante o dramática que captura a la audiencia al instante.
[?TIPO_PRODUCCION=REELS|TIMELAPSE]
Regla de Cero Exclamaciones para el Motor TTS: En la redacción del guion final que será procesado por sistemas de Text-To-Speech (TTS) o interpretado por locutores, está totalmente prohibido el uso de signos de exclamación (!). La intensidad emocional, el drama y la urgencia de la historia no deben forzarse mediante gritos artificiales o entonaciones hiperbólicas. La gravedad narrativa se controla de forma exclusiva a través de la sobriedad vocal, el ritmo de lectura, la contención emocional, los silencios estructurales y el peso intrínseco de las palabras elegidas. La voz debe transmitir autoridad sin arrogancia y asombro sin melodrama.
[/?TIPO_PRODUCCION]
Capítulo 8: Integridad Visual y Tensión Psicológica
Para garantizar la estabilidad del contenido frente a las políticas de moderación de plataformas (YouTube, redes sociales) y para mantener un realismo documental sin recurrir al sensacionalismo violento, se aplican las siguientes normativas visuales:
Prohibición Absoluta de Sangre y Gore (Disociación de la Violencia): Queda estrictamente prohibido incluir palabras como "blood", "bloody", "gore", "mutilation" o descripciones de heridas abiertas en los prompts de generación visual, garantizando así la seguridad y monetización del canal. No necesitamos sangre gráfica para asustar al espectador; el terror táctico se construye a través de la tensión psicológica extrema. Se logra mediante el desgaste biomecánico, la asfixia acústica (ruidos abrumadores), el silencio prolongado, o el encierro claustrofóbico. Ejemplo: En lugar de mostrar la explosión de un cuerpo, mostramos las manos temblorosas de un soldado apretando un fusil en la oscuridad absoluta o el polvo cayendo del techo de un sótano.
Escudo Anti-Fuego Humano: En la recreación de batallas campales, asedios urbanos, catástrofes naturales o desastres industriales, está rigurosamente prohibido instruir a la IA para que coloque fuego directo sobre modelos humanos. Para retratar el horror de las llamas y la destrucción sin caer en el gore explícito, los personajes deben representarse a través de siluetas a contraluz situadas a distancias seguras. La tragedia se construye atmosféricamente utilizando el resplandor volcánico (volcanic glow), la refracción del humo, el colapso del entorno arquitectónico y la reacción corporal de los sobrevivientes.
Anulación de Estilos Anacrónicos: Queda prohibida la inclusión de elementos visuales modernos en épocas pasadas. Se veta el uso de modificadores como "3D", "CGI look", "hyperrealistic" o "cartoon", debiendo primar siempre el "realismo cinematográfico documental". Las consecuencias de la guerra se muestran mediante ruinas, abandono y silencio.
Sincronización Temática (No Literalidad Visual): La imagen no tiene la obligación de ser una traducción literal o calco exacto de lo que el narrador está relatando palabra por palabra. El objetivo es que los clips fluyan orgánicamente con la historia. Se fomenta el uso de metáforas visuales y planos atmosféricos que capturen la esencia de la escena, sin necesidad de ilustrar lo obvio de forma redundante (ej. si la voz habla del "colapso de la economía", la imagen puede mostrar un puesto de panadero vacío y polvoriento en lugar de monedas cayendo).

VOLUMEN IV: FLUJO DE TRABAJO Y ARQUITECTURA TEMPORAL
[?TIPO_PRODUCCION=TIMELAPSE]
Capítulo 9: Flujo de Trabajo Paso a Paso (Sincronización Inversa)
El proceso de manufactura audiovisual en Huellas de la Humanidad repudia la improvisación visual. Se rige por un principio operativo denominado Sincronización Inversa Absoluta. En la producción tradicional, a menudo la imagen dicta el ritmo; en nuestro sistema, la voz humana es el metrónomo inalterable. La generación de prompts sobre tiempos teóricos está prohibida. El flujo inquebrantable desde la investigación hasta la exportación consta de los siguientes pasos:Investigación Multidimensional (Filtro de Realidad): Toda producción comienza con una investigación organizada en cinco capas progresivas: 1) Hechos básicos y cronología; 2) Contexto estructural sociopolítico; 3) Experiencia humana a través de testimonios y reconstrucciones; 4) Interpretación y debate histórico; 5) Dimensión visual y arquitectónica real. Si un elemento no es historically verificable o lógicamente inferible, se descarta.Arquitectura Conceptual: El equipo define explícitamente la Contradicción Central, redacta la Promesa Narrativa y establece la Imagen Final hacia la cual convergerá el episodio.Redacción Cronometrada: El guion se escribe optimizado para mantener una cadencia rigurosa de 112 a 114 Palabras Por Minuto (WPM). Esta velocidad deliberada es crucial para permitir que la inmersión visual y los silencios acústicos respiren sin asfixiar al espectador con densidad verbal.Grabación de la Pista Maestra: La locución se registra respetando los tonos institucionales (Formato A) o de crónica (Formato B), y se masteriza como el eje de la producción.Construcción del Timeline Real: Una vez renderizado el audio, se mapean las marcas de tiempo milimétricas. El guion se transforma en una hoja de cálculo temporal. Si el locutor menciona "el colapso de la torre" en el minuto 03:14, el clip visual generado debe coordinar esa acción física exactamente en esa marca de tiempo.Diseño de Escenas y Asignación Foley: Se fragmenta el timeline en bloques de 10 segundos con Omni Flash, determinando la IA cuáles tendrán dos shots de 5 segundos cada uno y cuáles se mantendrán como un shot continuo de 10 segundos, asignando la acción visual precisa y el diseño acústico (Foley) que acompañará a cada escena.Ingeniería de Prompts y Renderizado: Redacción técnica de las instrucciones en inglés para el motor [MODELO_DE_IA] e inicio de la generación de lotes.Edición Invisible: Montaje en software con cortes motivados por la emoción o el cambio de espacio, aplicando una sincronización audiovisual total.Empaque SEO y QA: Elaboración de miniaturas, auditoría final mediante el checklist y configuración del algoritmo de publicación.
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=REELS]
Capítulo 9: Flujo de Trabajo (Formato Reels)
El formato "Reels" es un video cinematográfico ([?SUB_OPCION_REELS=9X16]vertical 9:16[/?SUB_OPCION_REELS][?SUB_OPCION_REELS=16X9]horizontal 16:9[/?SUB_OPCION_REELS]) estructurado con duración flexible definida por el usuario. Los primeros 6 segundos de video no llevan voz en off (Clip 1 Hook de 4s completo sin voz + los primeros 2 segundos del Clip 2 sin voz, dedicados exclusivamente al impacto visual y atmósfera sonora Foley). La locución narrativa entra obligatoriamente a los 2 segundos de haber iniciado el Clip 2 (segundo 6 del video total), con voz continua en tercera persona (estrictamente sin hablar en "nosotros", sin silencios estructurales /2s o /#s, y sin forzar anonimización con palabras como "anónimos"). La voz en off arranca obligatoriamente en ese segundo 6 con un preámbulo estructurado estrictamente en: 1) Tiempo (años en números/dígitos), 2) Lugar, ciudad y país, y 3) Descripción breve del lugar, suceso histórico, personaje o temática del video, capturando de inmediato al espectador con un elemento intrigante o perturbador. La duración total del video es igual a los 6 segundos iniciales sin voz más el tiempo de la voz en off (Tiempo de Voz en Off = Duración Total - 6s), calculando la extensión del guion con la métrica calibrada de 17.66 caracteres por segundo de locución (~141 caracteres por cada 8 segundos de locución). Se ejecuta de forma innegociable en 6 etapas por separado: 1) Selección del tema y tipología; 2) Pregunta y definición de la duración total del video; 3) Guion de voz en off continua proporcional a la duración (Duración Total - 6s) x 17.66 caracteres con espacios (ej. 114s de locución [video de 120s] = ~2013 caracteres; 54s de locución [video de 60s] = ~954 caracteres); 4) Generación y entrega de prompts de imágenes iniciales e indicando en cada clip de video el tiempo que cubre en formato (##:## - ##:##) en bloques de 10 clips (ej. Bloque 1: Clips 1 al 10 con ALTO INQUEBRANTABLE esperando confirmación para el Bloque 2: Clips 11 al 16) con Banana Pro ([?SUB_OPCION_REELS=9X16]9:16[/?SUB_OPCION_REELS][?SUB_OPCION_REELS=16X9]16:9[/?SUB_OPCION_REELS] 'no text') y Omni Flash con Foley integrado (strictly no music), anteponiendo la orden operativa EXCLUSIVAMENTE en el primer bloque de prompts (Bloque 1); 5) Pregunta y definición del texto en pantalla para los primeros 6 segundos del video (hook inicial sin voz en off estructurado obligatoriamente en: Ciudad, País, Tiempo en la primera línea, y justo debajo el Gancho) para edición manual en CapCut; 6) Metadata en formato Todo Corrido sin encabezados.
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=INMERSIVO_CONTEMPLATIVO]
Capítulo 9: Flujo de Trabajo (Inmersivo Contemplativo)
El formato "Inmersivo Contemplativo" es un reel ultra corto de 20 segundos. Por su brevedad, se omite deliberadamente la "Investigación Multidimensional" (no hay las 5 capas del Filtro de Realidad ni deep research).
Asimismo, quedan completamente descartadas la Contradicción Central, la Promesa Narrativa y la Imagen Final del Episodio. La IA debe enfocarse puramente en la inmersión visual y sonora inmediata para los 3 clips requeridos.
[/?TIPO_PRODUCCION]
Capítulo 10: Arquitectura Temporal y Tensión Narrativa
[?TIPO_PRODUCCION=TIMELAPSE]
El tiempo es tratado como una herramienta de ingeniería emocional. La distribución de los bloques narrativos se diseña para capturar y sostener la atención humana, estructurándose de la siguiente forma :El Hook Extremo (0–24s): Fase de impacto sensorial máximo diseñada para detener el desplazamiento (scroll) del usuario. Consta de 3 clips iniciales. La locución debe iniciar obligatoriamente con la tríada: 1) Tiempo (años en dígitos), 2) Lugar, ciudad y país, y 3) Descripción breve del lugar, suceso o personaje del video, sin explicaciones enciclopédicas. 
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=REELS]Texto en Pantalla (Primeros 6 Segundos - Edición Manual en CapCut): Durante los primeros 6 segundos del video (Clip 1 de 4s + primeros 2s de Clip 2, ventana que transcurre sin voz en off), se coloca un texto o letrero en pantalla para enganchar visualmente al espectador. Dicho texto debe estructurarse obligatoriamente incluyendo: Ciudad, País, Tiempo (años en dígitos o siglos en romanos) en la línea superior, y justo debajo la frase de Gancho intrigante o perturbadora. Dicho texto NO debe insertarse en los prompts de IA (los cuales llevan estrictamente 'no text'), sino que la IA debe preguntar y acordar con el usuario qué texto poner al terminar los prompts de video y antes de entregar la metadata, proponiendo de 2 a 3 opciones con esta estructura para ser colocado manualmente en CapCut durante el montaje. El resto del video permanece completamente limpio sin texto en pantalla.[/?TIPO_PRODUCCION][?TIPO_PRODUCCION=TIMELAPSE]Queda estrictamente prohibido incluir cualquier tipo de texto en pantalla para estos videos cortos; la imagen debe permanecer completamente limpia y visual.[/?TIPO_PRODUCCION][?TIPO_PRODUCCION=INMERSIVO_CONTEMPLATIVO]Texto en Pantalla (Edición Manual en CapCut): El texto en pantalla será exclusivo del Clip 1 e incluirá lugar, tiempo (año/siglo) y título que resuma con gancho de qué va el video. Este texto NO debe ser generado por herramientas de IA ni insertado en los prompts visuales (los prompts deben incluir estrictamente 'no text'). La IA debe especificar claramente en la ficha del Clip 1 qué texto colocar manualmente en CapCut durante la edición posterior. Los clips 2 y 3 no llevan texto en pantalla.[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=TIMELAPSE]
Silencios Narrativos Estructurales: Los silencios no son huecos por falta de contenido; son herramientas deliberadas para la asimilación emocional entre el Hook Extremo, el Hook Extendido y la Historia Principal. La IA NO debe escribir marcas de pausas ni silencios (/2s, /#s) en el texto del guion de locución, ya que todos los silencios y pausas se aplicarán manualmente por el editor en la línea de tiempo de postproducción.El Hook Extendido (26–144s): Una vez capturada la atención, este bloque expande el contexto histórico, establece las bases del conflicto y articula de forma natural la Promesa Narrativa del documental.La Historia Principal: Desarrollo profundo del relato con un ritmo de edición variable que fluctúa entre la densidad informativa y la contemplación visual, alternando entre planos humanos directos y amplios paisajes atmosféricos.
[/?TIPO_PRODUCCION]

Capítulo 11: Geometría del Encuadre y Relación de Aspecto
El proyecto exige la creación simultánea de entregables generados a partir de este único prompt maestro. El motor debe comprender las diferencias radicales de composición entre ambos:

[?TIPO_PRODUCCION=INMERSIVO_CONTEMPLATIVO]
- Regla de Títulos (Exclusión): Título inmersivo y directo. Queda terminantemente prohibido añadir el sufijo "| Huellas de la Humanidad", "| Documental Completo" o "(Reconstrucción con IA)".
- Restricciones Léxicas: Bajo ningún concepto utilices la palabra "muertos", "homicidio", u otros sinónimos banales de violencia directa. Mantén el tono periodístico e histórico.
- Formato de Fechas: Escribe los años utilizando números arábigos (ej. 1945, 1492) y los siglos obligatoriamente en números romanos (ej. siglo XX, siglo XV).
- Regla de Movimiento de Cámara (Lento): Paneos horizontales extremadamente lentos y panorámicos.
- Arquitectura del Reel Contemplativo Panorámico: El metraje se compone exactamente de tres clips: un clip inicial de 4 segundos para el hook, seguido de dos clips de 8 segundos (Total 20 segundos). Queda totalmente prohibida la edición acelerada.
- Audio y Tono Emocional: El video no lleva voz narrativa ni música en ningún clip. Su diseño acústico es exclusivamente Foley ambiental e imagen con el objetivo explícito de causar horror y angustia psicológica en el espectador.
- Herramientas de Generación: Utiliza "banana pro" para la generación de las imágenes iniciales estáticas de cada clip. Posteriormente, emplea el modelo de video "omni flash" para darle movimiento a dichas imágenes.
- Regla de Texto en Pantalla (Exclusivo Clip 1 - Edición Manual en CapCut): El texto en pantalla se coloca ÚNICA Y EXCLUSIVAMENTE en el Clip 1 (Hook). Los Clips 2 y 3 van completamente limpios sin texto en pantalla. En el Clip 1, el texto debe contener obligatoriamente: Ciudad, País, Tiempo (año/siglo) y justo debajo el Título Gancho que resuma con intriga de qué va el video. Dicho texto NO debe incluirse dentro de los prompts de generación de imagen/video (Google Flow debe recibir prompts con 'no text'). La IA debe suministrar en la entrega el texto exacto correspondiente para ser colocado manualmente en CapCut durante el montaje posterior.
- Estructura de Entrega Obligatoria para los 3 Clips:
  * CLIP 1 (HOOK DE 4s):
    1. Identificación del Clip y Selección de Cámara: Plano, angulación, movimiento de cámara y óptica seleccionados de los catálogos.
    2. Explicación Visual del Clip: Descripción narrativa y contextual en español explicando con precisión qué ocurre en la escena y cuál es la atmósfera psicológica que transmite el plano.
    3. Prompt de Imagen Inicial: En idioma inglés para 'banana pro' (con sufijos obligatorios y 'no text').
    4. Prompt de Movimiento de Video (con Audio Foley Integrado): En idioma inglés para 'omni flash' con diseño foley acústico integrado dentro del propio prompt.
    5. Texto en Pantalla (Manual CapCut): Ciudad, País, Tiempo (año/siglo) y justo debajo el Título Gancho.
  * CLIP 2 (8s) y CLIP 3 (8s):
    1. Identificación del Clip y Selección de Cámara: Plano, angulación, movimiento de cámara y óptica.
    2. Explicación Visual del Clip: Descripción narrativa y contextual en español.
    3. Prompt de Imagen Inicial: En idioma inglés para 'banana pro' (con sufijos obligatorios y 'no text').
    4. Prompt de Movimiento de Video (con Audio Foley Integrado): En idioma inglés para 'omni flash'.
    (Los Clips 2 y 3 van completamente limpios sin texto en pantalla).
- Tipos de Cámara a Utilizar (Escoge dependiendo de la historia y las escenas):
  1. ESCALA Y ENCUADRE (DISTANCIA PSICOLÓGICA):
  - Gran Plano General / Plano Panorámico: Despoja al ser humano de su agencia y lo convierte en una silueta devorada por el entorno. Transmite asombro melancólico, soledad absoluta e insignificancia ante la inmensidad del tiempo, la geografía o la arquitectura industrial.
  - Plano General (Wide Shot): Establece el contexto espacial, la arquitectura y las condiciones materiales de la escena. Permite situar la magnitud del suceso histórico sin perder la referencia de la presencia humana.
  - Plano Medio (Medium Shot): Encuadra al sujeto desde la cintura o el pecho. Funciona como el puente de la empatía cotidiana: rompe la distancia histórica y conecta al espectador directamente con el esfuerzo físico, la fatiga y la humanidad del individuo.
  - Primer Plano (Close-up): Aísla las emociones en su estado más puro. Arranca al sujeto de su contexto exterior para forzar a la audiencia a confrontar directamente el miedo, la desesperación, la duda o la determinación.
  - Plano Detalle / Macro: Genera una asfixia sensorial y táctil al enfocar micro-texturas (herramientas desgastadas, óxido, papel antiguo, manos temblorosas, sudor). Dirige la atención psicológica hacia la fragilidad material y la tensión acumulada.
  2. ANGULACIÓN DE CÁMARA (JERARQUÍAS Y PODER):
  - Plano Picado (High Angle): La cámara apunta de arriba hacia abajo, empequeñeciendo y oprimiendo visualmente al sujeto. Comunica vulnerabilidad, derrota, sumisión, inferioridad o impotencia frente a fuerzas superiores.
  - Plano Contrapicado (Low Angle): La cámara mira de abajo hacia arriba. Dota al personaje, máquina o estructura de monumentalidad, poder amenazante, autoridad incontestable o soberbia extrema.
  - Plano Cenital / Ojo de Dios (Overhead Shot - 90°): La lente se sitúa completamente perpendicular al suelo. Deshumaniza el caos o la tragedia reduciéndolos a patrones geométricos abstractos, induciendo en el espectador una sensación de fatalismo distante e inescapable.
  - Plano Nadir (90° hacia el cenit): Perspectiva vertical extrema desde el suelo apuntando hacia el cielo. Provoca una sensación de escala abrumadora, colapso inminente y vértigo arquitectónico.
  3. MOVIMIENTOS CINEMATOGRÁFICOS (CINÉTICA EMOCIONAL):
  - Cámara Fija (Locked-off Shot): Elimina cualquier artificio cinético para obligar al espectador a contemplar la pesadez del tiempo, el silencio y la crudeza de la escena sin filtros narrativos.
  - Slow Dolly Push-in: Acercamiento lento y deliberado hacia un sujeto u objeto fatal. Incrementa la claustrofobia, el suspense y la certeza psicológica de un destino ineludible.
  - Dolly Pull-out / Travelling de retroceso: La cámara se aleja lentamente del centro de atención, amplificando la sensación de abandono, pérdida irremediable o aislamiento en medio de un escenario vacío.
  - Inclinación Suave (Gentle Tilt Up / Down): Revela progresivamente la magnitud vertical de un edificio, ruina o figura humana. Dosifica la información visual para construir asombro o desolación de forma pausada.
  - Plano de Seguimiento (Tracking Shot): Acompaña el desplazamiento continuo del sujeto, arrastrando al espectador dentro del ritmo de la acción e induciendo una tensión constante.
  - Cámara en Mano Inmersiva (Handheld): Movimiento orgánico, reactivo e inestable que replica la mirada de un testigo real sobre el terreno. Transmite desorientación, adrenalina y peligro físico inmediato.
  - Plano Orbital (Orbit Shot - 360°): Gira en torno a un punto o personaje fijo, creando un vórtice visual que separa al elemento central del flujo exterior del tiempo y del mundo.
  - Despliegue Aéreo / Barrido (Drone Reveal): Ascenso o desplazamiento en altura que eleva la perspectiva para dimensionar la escala colosal de un territorio, cataclismo o proceso histórico.
  4. ÓPTICA Y PERSPECTIVA VISUAL:
  - Profundidad de Campo Reducida (Bokeh): Desenfoca agresivamente el fondo para obligar al ojo a concentrarse en un único elemento, aislando el drama emocional del ruido del entorno.
  - Gran Angular / Ultra Gran Angular (14mm - 24mm): Exagera la separación espacial y las líneas de fuga, acentuando la inmensidad de los recintos o la claustrofobia de los espacios cerrados.
  - Lente Teleobjetivo (85mm - 200mm+): Comprime los planos de profundidad, acercando el fondo al sujeto para generar una sensación de agobio, asfixia en masas o vigilancia distante.
  - Punto de Vista en Primera Persona (POV Spectator): Coloca la lente en la posición exacta de los ojos del testigo, eliminando la barrera psicológica para que la audiencia habite físicamente el acontecimiento histórico.
[/?TIPO_PRODUCCION]

[?TIPO_PRODUCCION=REELS]
2. ENTREGABLE: FORMATO REELS ([?SUB_OPCION_REELS=9X16]9:16 VERTICAL[/?SUB_OPCION_REELS][?SUB_OPCION_REELS=16X9]16:9 HORIZONTAL[/?SUB_OPCION_REELS])
(Video cinematográfico con duración definida por el usuario para Reels, TikTok, Shorts o YouTube)
- Composición de Planos: Encuadre centrado (center framed). La profundidad de campo debe comprimirse. El sujeto u objeto principal debe abarcar el 60% del cuadro vertical para retener la atención del escroleo rápido.
- Regla de Movimiento de Cámara: Estaticidad relativa o zoom in digital muy sutil. Se prohíben los paneos horizontales en el formato vertical para evitar desorientación espacial.
- Integración de Enlaces (CTA): Enlace de redirección ubicado exclusivamente en el Comentario Fijado.
- Ley Tipográfica de Seguridad: En los primeros clips del Hook, cualquier letrero exigido por el prompt debe estar perfectamente centrado, con un margen lateral de seguridad ancho y limpio para evitar que la interfaz nativa del móvil lo recorte.
- Arquitectura Temporal (Fórmula de Duración Total): La duración total del video se compone de: 6 segundos iniciales sin voz en off (Clip 1 de 4 segundos de hook de impacto puro Foley + primeros 2 segundos del Clip 2 de puro Foley), seguidos por la voz narrativa continua que entra en el segundo 6 de video (segundo 2 del Clip 2). La suma de los 6 segundos iniciales sin voz más el tiempo de duración de la voz en off da el total exacto del video (Total = 6s + Tiempo de Voz en Off; es decir, Tiempo de Voz en Off = Duración Total - 6s).
- Voz en Off y Foley: Acompañado de locución narrativa solemne y continua que arranca obligatoriamente en el segundo 6 del video (exactamente a los 2 segundos de haber iniciado el segundo clip, Clip 2). Los primeros 6 segundos (Clip 1 de 4s y primeros 2s de Clip 2) carecen por completo de locución para maximizar el misterio y el impacto sensorial visual con Foley. La extensión del texto de la voz en off debe calibrarse estrictamente con la métrica empírica de 17.66 caracteres por segundo de locución ((Duración Total - 6s) x 17.66 caracteres con espacios; ej. 114s de voz en off para un video de 120s = ~2013 caracteres; 54s de voz en off para un video de 60s = ~954 caracteres; equivalentes a ~141 caracteres por cada 8s de locución continua; estrictamente sin silencios estructurales ni pausas artificiales /2s o /#s), complementada con el paisaje sonoro de Foley integrado en cada prompt de video (estrictamente sin música en ningún clip). El preámbulo inicial de la voz en off (a los 2 segundos del Clip 2 / segundo 6 del video) debe estructurarse obligatoriamente en tres partes: 1) Tiempo (años siempre en números/dígitos), 2) Lugar, ciudad y país (ej: "...callejón de Whitechapel, Londres, Inglaterra..."), y 3) Descripción breve del lugar, suceso histórico, personaje o tema central abordado, capturando de inmediato con un gancho profundamente intrigante o terrorífico. La voz en off debe narrar en tercera persona de forma directa y cinematográfica, sin hablar jamás en primera persona del plural ("nosotros") y sin forzar anonimizaciones artificiales ("anónimos").
- Estructura de Generación de Clips en Bloques de 10: Para producciones con más de 10 clips, la IA debe entregar los prompts estrictamente en bloques controlados de 10 clips (ej. Bloque 1: Clips 1 al 10 con ALTO INQUEBRANTABLE esperando confirmación para el Bloque 2: Clips 11 al 16 o restantes). Al inicio EXCLUSIVO DEL PRIMER BLOQUE de entrega (Bloque 1), la IA debe anteponer la orden operativa:
Actúa como un historiador, director de cine, y periodista profesional.
Cambia los nombres de los clips a las primeras 6 palabras literales del prompt proveído pegado y enviado que incluyen la numeración.
Usa omni flash para videos y banana pro para imágenes iniciales de cada clip.
Crea las imágenes primero y luego los clips usando cada imagen como fotograma inicial.
(Esta orden operativa NO se repite en el Bloque 2 ni en bloques posteriores). Seguida obligatoriamente de la secuencia de prompts en formato limpio y consecutivo: Imagen 1: prompt, Clip 1 (00:00 - 00:04): prompt, Imagen 2: prompt, Clip 2 (00:04 - 00:12): prompt, etc. Prompt visual para generar la imagen inicial estática utilizando el modelo "banana pro" ([?SUB_OPCION_REELS=9X16]9:16[/?SUB_OPCION_REELS][?SUB_OPCION_REELS=16X9]16:9[/?SUB_OPCION_REELS] con 'no text', comenzando obligatoriamente con "Imagen [número]: [prompt]"), y prompt técnico de movimiento con Foley integrado para generar el clip de video utilizando el modelo "omni flash" (comenzando obligatoriamente con la numeración y el intervalo de tiempo exacto que cubre cada clip en formato (##:## - ##:##), ej. "Clip [número] (##:## - ##:##): [prompt]").
- Consulta Obligatoria de Texto en Pantalla (Primeros 6 Segundos): Una vez concluida la entrega de todos los prompts de video y antes de entregar la metadata, la IA preguntará obligatoriamente al usuario qué texto colocar durante los primeros 6 segundos del video (Clip 1 y primeros 2s de Clip 2), proponiéndole de 2 a 3 opciones de gancho visual estructuradas obligatoriamente en: Ciudad, País, Tiempo en la primera línea, y justo debajo la frase de Gancho intrigante, para ser aplicadas manualmente en CapCut (los prompts de Banana Pro y Omni Flash se mantienen estrictamente con 'no text').
[/?TIPO_PRODUCCION]

VOLUMEN V: INGENIERÍA DE PROMPTS Y GENERACIÓN VISUAL
Capítulo 12: Reglas de "Text para Flow" (Gestión del Prompter)
El operario o especialista en ingeniería de prompts encargado de alimentar el sistema de IA (Text para Flow) debe adherirse textual, estricta e incondicionalmente a las siguientes directrices de ejecución para salvaguardar la arquitectura del guion, la estabilidad de los servidores de generación y el orden del archivo [Instrucción de Usuario]:Cero Modificaciones: "No modifiques los prompts que te mando, mándalos así mismo y no les hagas cambios". La ingeniería semántica ya ha sido optimizada en la preproducción; la intervención del operario durante el copiado y pegado altera la matriz matemática de los descriptores.Nomenclatura Estricta de Archivos: "Cambia los nombres de los clips a las primeras 6 palabras literales del prompt proveído pegado y enviado que incluyen la numeración y los códigos de tiempo". Esta regla es vital para la sincronización inversa del editor; permite ubicar el clip visual instantáneamente dentro del timeline del audio.Tolerancia a Fallos: "No reintentes clips que hayan fallado, espera a ver si se generan primero". Saturar el motor con reintentos simultáneos degrada la calidad de renderizado general del servidor.Generación por Lotes (Batches): "Genera los clips en batches de 10". El ecosistema de producción se maneja en bloques controlados para auditar la calidad progresiva.Refrigeración del Motor: "Espera 20 segundos entre cada batch". Esta pausa técnica previene la asfixia del sistema de generación y asegura tiempos de respuesta óptimos.Coherencia Visual Perenne: "Asegúrate de mantener continuidad visual a lo largo de la historia". Si un batch de 10 clips desvía drásticamente la paleta de colores, la materialidad o la arquitectura respecto al bloque anterior, el especialista debe reportar la anomalía para ajustar la semilla, en lugar de continuar ciegamente.
Capítulo 13: Plantilla Base y Redundancia (omni flash / [MODELO_DE_IA])
A partir del hito técnico de la Versión V32, Huellas de la Humanidad abandona el uso de motores genéricos o versiones previas para consolidar toda su creación de movimiento y generación visual sobre el modelo de video omni flash (o [MODELO_DE_IA] si se especifica otro). Todo prompt debe redactarse en idioma inglés, conformando un único párrafo sólido sin saltos de línea, respetando un orden sintáctico algorítmicamente inalterable.
Prohibición de Bloques de Código / Plain Text: Queda terminantemente prohibido envolver los prompts dentro de bloques de código (evitar el uso de bloques de código Markdown, formato 'plain text' o cajas de código). La IA debe entregar todos los prompts como TEXTO NORMAL y continuo, facilitando su lectura y copiado directo sin cajas de código.
Prohibición de Voz Narrativa en Prompts: Está estrictamente prohibido incluir los diálogos, frases o el texto literal de la voz narrativa (voiceover) dentro de las instrucciones visuales enviadas al generador de video. Jamás se deben incluir las palabras que el locutor está pronunciando.
Integración de Audio Foley dentro del Prompt: La descripción acústica y sensorial de los efectos de sonido (Foley) debe quedar redactada e integrada directamente dentro del propio texto del prompt de video en idioma inglés, detallando los sonidos ambientales, acústica del entorno y texturas sonoras de la escena (ej. 'ambient sound of heavy wind, muffled impacts, creaking floorboards, no music, no speech').
Prohibición Absoluta de Música en Todos los Clips y Formatos (Regla de Cero Música): Queda terminantemente prohibido incluir música, bandas sonoras de fondo, melodías o pistas musicales en los prompts o en la generación de cualquier clip de video (aplicable sin excepciones a Reels, Inmersivo Contemplativo, Timelapse y cualquier otro formato). El paisaje sonoro de cada clip debe construirse única y exclusivamente a base de audio Foley ambiental y texturas acústicas reales. Todo prompt de movimiento para video debe contener explícitamente la directriz negativa 'no music'.
Hiper-Detalle Explicativo y Descriptivo: Los prompts generados no pueden ser escuetos ni genéricos (ej. "a medieval battle"). La IA tiene la obligación inquebrantable de redactar instrucciones visuales densas, inmersivas y altamente detalladas. Cada prompt debe pintar el escenario de forma exhaustiva, especificando meticulosamente la materialidad, las texturas, el estado atmosférico, la incidencia de la luz, la acción física específica y el movimiento exacto de la cámara (ej. "A tight macro shot of a weathered Roman soldier's mud-caked leather armor as heavy rain streaks across his exhausted face, dramatic chiaroscuro lighting casting deep shadows, slow continuous push-in tracking shot").
Nomenclatura Obligatoria de Entrada de Prompts:
- Orden Operativa Exclusiva del Primer Bloque de Prompts: Al inicio obligatorio del primer bloque de entrega de prompts de imágenes y videos (Bloque 1: Clips 1 al 10), la IA debe colocar obligatoriamente como preámbulo inicial la siguiente orden operativa textual (quedando estrictamente prohibido repetirla en los bloques subsiguientes):
  Actúa como un historiador, director de cine, y periodista profesional.
  Cambia los nombres de los clips a las primeras 6 palabras literales del prompt proveído pegado y enviado que incluyen la numeración.
  Usa omni flash para videos y banana pro para imágenes iniciales de cada clip.
  Crea las imágenes primero y luego los clips usando cada imagen como fotograma inicial.
- Prompts de Imagen Inicial: Todo prompt para generar la imagen fija inicial debe comenzar obligatoriamente con la frase literal y dos puntos: "Imagen [número]: " (ejemplos: "Imagen 1: [prompt...]", "Imagen 2: [prompt...]", etc.).
- Prompts de Clips de Video con Intervalo Temporal (##:## - ##:##): Todo prompt técnico de movimiento para generar el video con Foley integrado debe comenzar obligatoriamente indicando la numeración y el intervalo de tiempo exacto que cubre cada clip en formato (##:## - ##:##) seguido de dos puntos: "Clip [número] (##:## - ##:##): " (ejemplos: "Clip 1 (00:00 - 00:04): [prompt...]", "Clip 2 (00:04 - 00:12): [prompt...]", "Clip 3 (00:12 - 00:20): [prompt...]", etc.).
- Entrega en Bloques Controlados de 10 Clips: Si una producción supera los 10 clips en total (como un video de Reels de 120s), la IA tiene estrictamente prohibido entregar todos los prompts en una sola respuesta masiva. La entrega debe realizarse obligatoriamente en bloques de 10 clips (Clips 1 al 10; luego Clips 11 al 20, etc.), deteniéndose con un ALTO INQUEBRANTABLE al final de cada bloque de 10 para esperar la confirmación del usuario antes de proceder con el siguiente bloque.
Ley de Redundancia y Barrera Sonora (El Sufijo Obligatorio):
Para garantizar la estética documental, evitar mutaciones hacia el 3D o la fantasía, e impedir que la IA genere murmullos acústicos o pistas musicales, cada prompt debe finalizar cerrando matemáticamente con esta cadena literal:
cinematic documentary realism, safe framing composition, no modern objects, no CGI look, no text, no speech, no music.

Capítulo 14: Catálogos Íntegros de Parametrización
Con el fin de erradicar la ambigüedad que produce alucinaciones en la IA, los directores deben utilizar exclusivamente términos pertenecientes a los siguientes catálogos estandarizados para construir los bloques del prompt.

14.1 Banco de Planos y Movimientos Cinematográficos
Existe una auditoría visual implacable: Está terminantemente prohibido reutilizar el mismo tipo de plano o movimiento de cámara de forma idéntica en un rango de 6 a 8 clips consecutivos.
- Movimientos Clave: Orbit shot (movimiento orbital 360 para artefactos), Slow dolly push-in (acercamiento lento hacia un sujeto para tensión), Tracking shot (cámara de seguimiento tras un personaje), Gentle tilt up/down (inclinaciones verticales para revelaciones lentas).
- Perspectivas Aéreas y Escala: Drone reveal, Overhead, Fast aerial sweep, Crane up / Crane down.
- Inmersión y Textura: Macro / Rack focus, POV spectator, Handheld immersive (cámara en mano para crisis).
- Efectos Narrativos: Archival reel zoom, Silhouette / Shadow composition, Museum miniature, Reflection shot, Interior tracking, Timelapse / Hyperlapse, Push through smoke, Dolly in / Dolly out, Simulated TV news.

14.2 Óptica y Lentes (Textura Cinematográfica)
Para evitar el aspecto plástico hiperrealista (CGI), es obligatorio especificar la textura del lente:
- 35mm film grain: Textura clásica de cine histórico.
- 16mm vintage footage: Desgaste auténtico de celuloide antiguo (para evocar metraje de archivo, noticieros de época y conflictos bélicos del pasado reciente).
- Shallow depth of field (f/2.8): Enfoque nítido en el sujeto y fondo difuminado (bokeh) para aislar emociones en entornos caóticos.
- Anamorphic lens flare: Destellos horizontales cinemáticos ante luz directa o fuego de fondo.

14.3 Catálogo de Iluminación y Atmosférica
La luz prescribe la respuesta emocional antes de que se entienda la imagen:
- Ciclos de Claridad: Amanecer, dawn fog, golden hour, midday haze, overcast.
- Intimidad y Oscuridad: Torchlight, candlelight, oil lamp, gaslight. Esenciales para interiores de época.
- Tensión y Catástrofe: Moonlight, storm light, volcanic glow, industrial smoke diffusion.

14.4 Catálogo de Materialidad y Sustrato
El entorno carece de peso si no se especifica el origen de su materia:
- Telas y Vestimentas: Tattered linen (lino desgarrado), heavy wool (lana gruesa), rusted chainmail (cota de malla oxidada), faded silk (seda descolorida).
- Texturas de Época: Parchment paper (pergamino), cracked leather (cuero agrietado), cobblestone (adoquines).
- Estructuras Geológicas: Granite, limestone, sandstone, basalt, wet mud, volcanic ash.
- Ingeniería Humana y Metalurgia: Weathered timber, hemp rope, adobe, brick masonry, slate roof, cast iron, oxidized copper, brass.

14.5 Modificadores de Tiempo y Ritmo
Candados de velocidad para evitar animaciones erráticas en la generación de video:
- Ultra-slow motion: Para capturar micro-expresiones o destrucción detallada (ej. polvo cayendo).
- Steady pace / Deliberate movement: Mantiene el tono solemne y evita paneos frenéticos o temblorosos.

14.6 Catálogo de Emociones (El Paisaje Psicológico)
La historia ocurre tanto en el mundo material como en la psique de quienes la experimentan. Debemos insinuar de manera constante estas emociones en la población anónima para que el espectador conecte:
- Miedo e Incertidumbre: Ante lo desconocido o el peligro inminente (ej. observar el horizonte en completo silencio antes de un impacto o asedio).
- Desesperación y Agotamiento (Despair/Collapse): El colapso físico y mental ante situaciones extremas.
- Esperanza y Triunfo (Hope/Triumph): La resiliencia humana y la dignidad frente a la catástrofe.
- Soledad (Loneliness): El aislamiento en medio del caos o en la inmensidad de la historia.
- Adaptación y Resignación: Cómo la vida cotidiana continúa a pesar de que el mundo se desmorona.
- Asombro (Awe): Frente a la majestuosidad de la ingeniería o la fuerza de la naturaleza.

[?TIPO_PRODUCCION=TIMELAPSE]
Capítulo 15: Las 7 Leyes de Oro del Timelapse 3D Histórico (Módulo Veo 3.1)
1. La Arquitectura del Prompt "Punto A al Punto B": La IA no sabe hacer un timelapse por sí sola si le damos una idea abstracta; alucinará imágenes desconectadas. Hay que anclarla dándole los dos extremos de la transformación. La Fórmula Mágica: "Create a fast-paced [tipo] timelapse video showing [sujeto] gradually and smoothly from the first frame ([describir Imagen A]) to the final frame ([describir Imagen B])."
2. El Flujo de Trabajo en Cadena (Optimización de Copiado): Para que una secuencia de clips parezca un solo video ininterrumpido, la Imagen Final del Clip 1 se convierte automáticamente en la Imagen Inicial del Clip 2. Solo el Clip 1 necesita que escribas el "Prompt Imagen Inicial". Para el resto, solo necesitas definir hacia dónde van (Imagen Final) y cómo se mueven (Prompt de Video).
3. El Diccionario de la Fluidez (Prohibido el lenguaje agresivo): Usar palabras violentas confunde a la IA, haciéndole creer que ocurre un terremoto o explosión. Palabras Prohibidas: Violently, aggressively, rapidly, collapsing, crashing, sudden. Palabras Obligatorias: Smoothly assemble, organically weave, fluid transition, gradually melting, chronological progression, graceful decay. Todo debe sonar como una danza matemática elegante.
4. El Escudo Anti-Violencia y Alucinaciones: Cuando le pedimos a la IA que marchite o destruya un escenario, alucina destellos de artillería o fuego. Hay que declarar la zona geográficamente muerta. Comandos en el Prompt: Usar la frase "EMPTY of people / absolutely no people", y blindar con el comando negativo estricto: "No explosions, no artillery flashes, no smoke, no bombs, no sudden blasts, no fire, no violence." El drama debe ser climático, no bélico.
5. La Cámara Tridimensional Continua: Obligar a la cámara a mantener un movimiento direccional lento y constante (ej. continuous, steady 3D slow push-through o continuous 3D slow pull-back). El contraste entre el mundo transformándose en cámara rápida y la cámara moviéndose suavemente genera la hipnosis 3D.
6. El Diseño Sonoro (Foley) Transicional: El sonido debe mutar sincronizado con la imagen. El prompt de Foley debe indicar de dónde viene y hacia dónde va. Ejemplo: "Synchronized foley of melting ice dripping rapidly shifting smoothly into a gentle spring breeze, strictly no music." Estrictamente sin música ni melodías de fondo en ningún clip.
7. Cierres Orgánicos (Cero Pantallas Negras Artificiales): El último clip no debe ser un corte duro. La cámara debe avanzar suavemente hacia una sombra profunda del propio escenario (un callejón, un bosque oscuro) hasta que el ambiente oscurezca la pantalla. De ese negro natural emerge el logotipo. Queda estrictamente prohibido mostrar el logotipo en pantalla en cualquier otro momento del documental; su aparición es exclusiva del plano final.
[/?TIPO_PRODUCCION]

VOLUMEN VI: DISEÑO SONORO Y PAISAJES ACÚSTICOS
Capítulo 16: Ingeniería de Foley y Regla de Cero Música y No-Voces
El audio es la argamasa que consolida la reconstrucción tridimensional. En Huellas de la Humanidad, queda estrictamente prohibido el uso de música, bandas sonoras de fondo o cualquier pista melódica en todos los clips y formatos; se orquesta única y exclusivamente un paisaje acústico foley y ambiental de ultra realismo ('no music, no speech').
Regla de Cero Música y No-Voces IA: Queda terminantemente prohibida la inclusión de música o de voces humanas generadas por motores visuales en cualquier clip de cualquier formato. Las inteligencias artificiales de video a menudo alucinan pistas musicales no deseadas, coros fantasmales, risas inconexas o murmullos robóticos. Los prompts de video deben incluir obligatoriamente las directrices negativas 'no music, no spoken voice, no human speech' además del sufijo maestro 'no music, no speech'. La edición en postproducción debe silenciar cualquier filtración musical o vocal restante.
Foley Obligatorio por Shot Interno: La textura visual exige correspondencia sonora puramente ambiental. Cada clip general (de 8 segundos en Reels / formato vertical, o duración correspondiente según el formato), debe tener asignada una capa de diseño sonoro (Foley natural). El guionista o editor debe detallar el audio exacto para cada corte (ej. synchronized foley of a wooden cart creaking on cobblestone, strictly no music). Si la acción acústica fluye continuamente desde el plano anterior, se debe declarar la instrucción operativa: Continuation of previous shot's acoustic ambience.

[?TIPO_PRODUCCION=REELS|TIMELAPSE]
Anclaje Visual al Eslogan y Cierre:
- Para el Entregable Promocional (Reels): En la pista de audio / locución del video, queda estrictamente prohibida la locución del eslogan para maximizar la velocidad de consumo y evitar fugas de retención (sin logo al final de los Reels). Sin embargo, en la METADATA de publicación (texto de la descripción), el eslogan SÍ se incluye de forma obligatoria ubicado inmediatamente después de la Nota IA y antes de los hashtags ("Cada historia deja una huella. Aquí seguimos sus rastros.").
[/?TIPO_PRODUCCION]

VOLUMEN VII: EMPAQUE, SEO Y DISTRIBUCIÓN ALGORÍTMICA
Capítulo 17: Arquitectura del Empaque (YouTube / Redes)
La publicación del episodio requiere una estrategia algorítmica tan precisa como su creación visual, orientada a dominar el CTR (Click-Through Rate) y la retención profunda.1. Dirección de Arte para Miniaturas:
La miniatura funciona como un ancla psicológica pre-inmersiva, no como un fotograma pasivo.Debe inyectar una emoción dominante evidente y una contradicción visual que desestabilice las expectativas (ej. un monarca rodeado de miseria extrema).El texto impreso en la miniatura debe ser brutalmente conciso: un máximo inquebrantable de 1 a 3 palabras.Bajo ningún concepto el texto de la miniatura debe repetir el título del video; su función es complementarlo semánticamente.Toda la composición debe evaluarse reduciendo su tamaño a la escala de una pantalla móvil para asegurar legibilidad.En contextos históricos densos, la miniatura debe emplear el lugar y el año como ancla de autoridad.
2. Estrategia de la Metadata ("Todo Corrido" Sin Encabezados):
Regla del Título (Cero Menciones IA): Al proponer el título del video, queda terminantemente prohibido utilizar el sufijo "(Reconstrucción con IA)" o similares.
[?TIPO_PRODUCCION=REELS|TIMELAPSE]
Los títulos para videos de formato Reels y promocionales deben finalizar con un separador vertical "|" seguido de una palabra o frase muy corta y referente al tema (ej. " | Historia", " | Roma", " | Misterio"). Queda estrictamente prohibido utilizar "(Reconstrucción con IA)".
[/?TIPO_PRODUCCION]
Prohibición Absoluta de Encabezados y Subtítulos de Sección: Elimina de forma absoluta TODOS los encabezados, etiquetas y subtítulos de sección (Queda terminantemente prohibido escribir "Título:", "Descripción:", "Hashtags:", "Comentario Fijado:", etc.). Ningún texto debe llevar una etiqueta identificativa antes de su contenido. La redacción de la metadata debe aplicar el sistema "Todo Corrido": un flujo limpio, continuo y orgánico. Para separar cada bloque lógico de metadata, se debe dejar una línea en blanco utilizando obligatoriamente el carácter de espacio invisible braille (⠀) para forzar el salto de línea en las plataformas.

[?TIPO_PRODUCCION=REELS|TIMELAPSE|INMERSIVO_CONTEMPLATIVO]
Regla Estricta de Extensión (2100 Caracteres Totales desde el Título hasta los Hashtags):
En todos los formatos (Reels, Timelapse, Inmersivo Contemplativo), el bloque de publicación medido de forma continua e ininterrumpida DESDE el inicio del título HASTA el final de los hashtags (incluyendo título, descripción, nota IA, slogan y hashtags, con todos sus espacios y líneas de salto braille) debe sumar exactamente 2100 caracteres contando los espacios. La IA debe graduar la densidad y extensión de la descripción para que todo el conjunto alcance matemáticamente los 2100 caracteres.
[/?TIPO_PRODUCCION]

Regla Estricta de Fechas y Siglos en la Metadata: Todos los años mencionados en el título y en la descripción deben escribirse invariablemente en formato numérico (dígitos, ej: 1888, 1943), jamás en palabras o letras. Asimismo, todos los siglos deben escribirse obligatoriamente en números romanos en las descripciones (ej. siglo XIX, siglo IV a.C., siglo XXI), quedando terminantemente prohibido escribirlos en arábigos (ej. prohibido "siglo 19") o en palabras (ej. prohibido "siglo diecinueve").

[?TIPO_PRODUCCION=REELS|TIMELAPSE|INMERSIVO_CONTEMPLATIVO]
Regla de Capítulos: NO se necesita ni se debe incluir la sección de Capítulos en Reels ni videos promocionales. Omitir por completo los timestamps.
[/?TIPO_PRODUCCION]

[?TIPO_PRODUCCION=REELS|TIMELAPSE|INMERSIVO_CONTEMPLATIVO]
3. El Escudo de IA Obligatorio:
Como medida de protección comunitaria frente a detractores y políticas de revisión, se debe insertar literalmente la siguiente leyenda en la descripción:
(Nota: Este video inmersivo ha sido recreado utilizando herramientas de inteligencia artificial generativa basándonos estrictamente en registros históricos, tácticos y arquitectónicos de la época. Es posible que existan incongruencias o errores visuales).
[/?TIPO_PRODUCCION]

4. Orden Secuencial del Empaque y Hashtags (Nota IA -> Slogan -> Hashtags):
Para salvaguardar la presentación y el rendimiento algorítmico, los bloques de metadata deben entregarse en este orden riguroso:
[?TIPO_PRODUCCION=REELS|TIMELAPSE|INMERSIVO_CONTEMPLATIVO]
1) Título inmersivo (con los años en números)
   (⠀)
2) Descripción envolvente (con años en números y siglos obligatoriamente en números romanos)
   (⠀)
3) Nota IA (Escudo de IA obligatorio)
   (⠀)
4) Slogan oficial de la marca: "Cada historia deja una huella. Aquí seguimos sus rastros."
   (⠀)
5) Hashtags: Exactamente 5 hashtags en español y formato #CamelCase referentes al tema del video. (Con los hashtags concluye estrictamente la contabilización de los 2100 caracteres totales).
   (⠀)
6) Comentario Fijado: Directo (CTA de interacción), sin etiqueta.
[/?TIPO_PRODUCCION]
Comentario Fijado: El Comentario Fijado (CTA y enlaces) es obligatoriamente lo último que debe aparecer en la estructura del documento del empaque, cerrando la entrega (sin la palabra "Comentario Fijado:", solo el texto directo del mensaje).

VOLUMEN VIII: AUDITORÍA DE ÉLITE Y CONTROL DE CALIDAD
Capítulo 18: Checklist de Control de Calidad Final (QA)
La publicación de un documento de Huellas de la Humanidad es irreversible. Antes de presionar el botón de exportación y programar el video en la plataforma, el Director Ejecutivo, el Editor o el Arquitecto de Sistemas Audiovisuales debe confrontar el metraje final contra el siguiente escrutinio inflexible. Un solo fallo en este checklist implica la retención del episodio y la re-ingeniería del bloque defectuoso :[ ] 1. Contradicción Central: ¿La tensión histórica o paradoja planteada en el inicio permea de manera constante hasta la resolución del documental?[ ] 2. Promesa Narrativa: ¿El enigma, revelación o experiencia prometida antes del minuto 02:00 fue resuelta y entregada plenamente al espectador?[ ] 3. Filtro de Realidad (Anacronismos): ¿Se ha auditado visualmente cada plano para garantizar la inexistencia total de prendas, objetos de cristal moderno, arquitectura incoherente o tecnología anacrónica?[ ] 4. Auditoría Anti-Estancamiento (Planos): ¿Se ha verificado que ningún tipo de plano (ej. Drone reveal) se repita idénticamente en el rango cercano de los últimos 6 a 8 clips?[ ] 5. Auditoría Anti-Estancamiento (Cámara): ¿Se ha constatado que el mismo movimiento de cámara no se encadena consecutivamente sin una justificación narrativa extrema?[ ] 6. Continuidad Ambiental: ¿Las transiciones entre clips mantienen una coherencia impecable en el uso del catálogo de iluminación, la materialidad de las ruinas y la textura del espacio?[ ] 7. Sinergia de Miniatura: ¿La miniatura gráfica proyecta una emoción dominante que intriga y que es complementaria (jamás repetitiva) respecto al título del video?[ ] 8. Contención de Hashtags: ¿El bloque final de la descripción contiene un recuento estricto y exacto de cinco (5) hashtags?[ ] 9. Formato "Todo Corrido": ¿La descripción de la plataforma fluye orgánicamente sin el uso de subtítulos burocráticos ni encabezados ("Título:", "Descripción:"), separada únicamente por una línea de retorno de carro con braille (⠀) entre bloques?[ ] 10. Acoplamiento del Eslogan: ¿La pronunciación final del lema de la marca coincide milimétricamente con un plano de hipertextura que muestre una huella, rastro o marca física en un material histórico?[ ] 11. Sincronización Inversa Perfecta y Cero Marcas de Pausas: ¿La cadencia de la locución humana concuerda rítmicamente con los impactos visuales, entregando el guion completamente limpio y continuo sin marcas de pausas artificiales (/2s, /#s) para ser colocadas manualmente en edición, cumpliendo en Reels con la fórmula de caracteres proporcionales (Duración Total - 6s iniciales sin voz) x 17.66 caracteres con espacios (benchmark: 114s de locución para video de 120s = ~2013 caracteres; 54s de locución para video de 60s = ~954 caracteres)?[ ] 12. Arquitectura de Audio y Hook de Inicio (Reels): ¿Se ha verificado que los primeros 6 segundos de video carezcan de voz en off (Clip 1 de 4s completo + primeros 2s de Clip 2, con exclusivo Foley) y que la locución arranque en el segundo 6 de video (a los 2 segundos de Clip 2) comenzando obligatoriamente con la tríada: TIEMPO (años en números/dígitos), LUGAR, CIUDAD Y PAÍS, y DESCRIPCIÓN BREVE del lugar, suceso o personaje con premisa intrigante o perturbadora? ¿La voz en off relata en tercera persona sin hablar jamás en "nosotros", y se nombran las figuras históricas con naturalidad sin forzar etiquetas como "anónimos"?[ ] 13. Orden Operativa Exclusiva de Bloque 1, Nomenclatura, Bloques de 10 e Intervalos Temporales (##:## - ##:##): ¿La entrega de prompts arranca en el Bloque 1 obligatoriamente con la orden operativa de 4 líneas (Actúa como un historiador..., Cambia los nombres a las primeras 6 palabras..., Usa omni flash y banana pro..., Crea las imágenes primero y luego los clips...), asegurando que los bloques posteriores (Bloque 2 en adelante) NO repitan dicha orden y comiencen directamente con los prompts? ¿Se entrega estrictamente en bloques controlados de 10 clips (con ALTO INQUEBRANTABLE entre bloques para producciones de más de 10 clips), sigue la secuencia formateada como "Imagen [número]: " e incluye obligatoriamente en cada clip de video el tiempo exacto que cubre en formato (##:## - ##:##) (ej. Imagen 1: prompt, Clip 1 (00:00 - 00:04): prompt, Imagen 2: prompt, Clip 2 (00:04 - 00:12): prompt)? [ ] 14. Regla Estricta de Cero Música: ¿Se ha verificado que ningún clip de ningún tipo de video contenga música, melodías o pistas sonoras de fondo, garantizando que el diseño acústico de cada clip sea exclusivamente Foley ambiental con 'no music'?[ ] 15. Instrucción de Rol Universal: ¿El prompt comienza obligatoriamente con "Actúa como un historiador, director de cine, y periodista profesional." para todos los tipos de video?[ ] 16. Formato de Años y Siglos (Siglos en Romanos): ¿Todos los años en el título, anclajes de fecha, guion de locución y metadata están escritos estrictamente en dígitos numéricos (ej. 1888, 1943) sin palabras, y todos los siglos en las descripciones están escritos obligatoriamente en números romanos (ej. siglo XIX, siglo XXI) sin arábigos ni palabras?[ ] 17. Orden y Extensión de Metadata (2100 Caracteres): ¿En formato vertical, el bloque desde el título hasta los hashtags suma exactamente 2100 caracteres con espacios, y sigue el orden estricto: Título -> Descripción -> Nota IA -> Slogan -> Hashtags -> Comentario Fijado?[ ] 18. Cuadre Matemático de Clips y Entrega en Bloques de 10 (Reels): ¿La suma exacta de segundos de todos los clips coincide milimétricamente con la duración acordada (ej. 120s = 4s de Hook + 14 clips de 8s [112s] + Clip 16 de 4s [cierre] = 120s exactos) sin omitir ningún segundo, y si el video supera los 10 clips, la entrega se realiza estrictamente en bloques de 10 clips con un ALTO INQUEBRANTABLE entre cada bloque?[ ] 19. Consulta y Estructura de Texto en Pantalla de los Primeros 6 Segundos (Reels): ¿Se ha verificado que la IA, tras terminar la entrega de todos los prompts de video y antes de entregar la metadata, pregunte obligatoriamente al usuario qué texto colocar durante los primeros 6 segundos del video (ventana sin voz en off: Clip 1 de 4s + primeros 2s de Clip 2) proponiendo de 2 a 3 opciones estructuradas obligatoriamente con Ciudad, País, Tiempo en la primera línea y justo debajo la frase de Gancho intrigante, para ser colocadas manualmente en CapCut (manteniendo 'no text' en los prompts de IA)?

Este Manual Maestro de Producción no es un compendio de sugerencias; es el código genético inalterable que estructura el núcleo de Huellas de la Humanidad. Su ejecución meticulosa es el único mecanismo validado capaz de transformar simples secuencias algorítmicas en la reconstrucción viviente de nuestro pasado colectivo.
`;


const PromptGenerator = () => {
  const [activeTab, setActiveTab] = useState('generator');
  const [theme, setTheme] = useState(() => localStorage.getItem('huellas_theme') || 'dark');
  
  // History State for Undo/Redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [templateText, setTemplateText] = useState('');
  
  const [formData, setFormData] = useState({});

  // Sincronizar tema con el DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('huellas_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Cargar plantilla desde LocalStorage al iniciar
  useEffect(() => {
    const key = 'huellas_master_template_v80';
    const savedTemplate = localStorage.getItem(key);
    const initialText = savedTemplate ? savedTemplate : DEFAULT_TEMPLATE.trim();
    setTemplateText(initialText);
    setHistory([initialText]);
    setHistoryIndex(0);
  }, []);

  // Guardar plantilla en LocalStorage MANUALMENTE
  const saveTemplate = () => {
    const key = 'huellas_master_template_v80';
    localStorage.setItem(key, templateText);
    alert('✅ Plantilla Base guardada con éxito.');
  };

  const handleTemplateChange = (e) => {
    const newText = e.target.value;
    setTemplateText(newText);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newText);
    if (newHistory.length > 50) newHistory.shift(); // Max 50 states
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setTemplateText(history[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setTemplateText(history[newIndex]);
    }
  };

  // 1. Extraer condicionales y grupos de radio globalmente
  const { conditionals, radioGroups } = useMemo(() => {
    const conds = new Set();
    const groups = {}; 
    
    if (!templateText) return { conditionals: [], radioGroups: {} };

    // Buscar condicionales simples (Checkboxes): [#NOMBRE]
    const condRegex = /\[#([A-Z0-9_]+)\]/g;
    let match;
    while ((match = condRegex.exec(templateText)) !== null) {
      conds.add(match[1]);
    }

    // Buscar grupos mutuamente excluyentes (Radios): [?GRUPO=VALOR|VALOR2]
    const radioRegex = /\[\?([A-Z0-9_]+)=([A-Z0-9_\|]+)\]/g;
    while ((match = radioRegex.exec(templateText)) !== null) {
      const group = match[1];
      const values = match[2].split('|');
      if (!groups[group]) groups[group] = new Set();
      values.forEach(val => groups[group].add(val));
    }

    const finalGroups = {};
    const groupKeys = Object.keys(groups).sort((a, b) => {
      if (a === 'TIPO_PRODUCCION') return -1;
      if (b === 'TIPO_PRODUCCION') return 1;
      if (a === 'SUB_OPCION_REELS') return -1;
      if (b === 'SUB_OPCION_REELS') return 1;
      return a.localeCompare(b);
    });

    groupKeys.forEach(k => {
      let arr = Array.from(groups[k]);
      if (k === 'TIPO_PRODUCCION') {
        const order = ['REELS', 'INMERSIVO_CONTEMPLATIVO', 'TIMELAPSE', 'TODO_INCLUIDO'];
        arr.sort((a, b) => {
          const idxA = order.indexOf(a);
          const idxB = order.indexOf(b);
          return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
        });
      } else if (k === 'SUB_OPCION_REELS') {
        const order = ['9X16', '16X9'];
        arr.sort((a, b) => {
          const idxA = order.indexOf(a);
          const idxB = order.indexOf(b);
          return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
        });
      }
      finalGroups[k] = arr;
    });

    return { 
      conditionals: Array.from(conds),
      radioGroups: finalGroups
    };
  }, [templateText]);

  // Inicializar formData con el primer valor de cada radio group
  useEffect(() => {
    setFormData(prev => {
      const newData = { ...prev };
      Object.keys(radioGroups).forEach(group => {
        if (!newData[group] && radioGroups[group].length > 0) {
          newData[group] = radioGroups[group][0];
        }
      });
      return newData;
    });
  }, [radioGroups]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 2. Determinar variables visibles basado en los bloques activos
  const visibleVariables = useMemo(() => {
    if (!templateText) return [];
    let activeText = templateText;

    // Remover bloques de radio inactivos
    Object.keys(radioGroups).forEach(group => {
      const selectedValue = formData[group];
      const isTodoIncluido = group === 'TIPO_PRODUCCION' && selectedValue === 'TODO_INCLUIDO';
      
      const blockRegex = new RegExp(`\\[\\?${group}=([A-Z0-9_\\|]+)\\]([\\s\\S]*?)\\[\\/\\?${group}\\]`, 'g');
      activeText = activeText.replace(blockRegex, (match, valStr, content) => {
        if (isTodoIncluido) return content;
        const values = valStr.split('|');
        if (values.includes(selectedValue)) return content;
        return '';
      });
    });

    // Remover bloques condicionales inactivos
    conditionals.forEach(cond => {
      if (!formData[cond]) {
        const blockRegex = new RegExp(`\\[#${cond}\\]([\\s\\S]*?)\\[\\/${cond}\\]`, 'g');
        activeText = activeText.replace(blockRegex, '');
      }
    });

    // Encontrar variables solo en el texto resultante
    const vars = new Set();
    const varRegex = /\[([^#\/?][A-Z0-9_]+)\]/g;
    let match;
    while ((match = varRegex.exec(activeText)) !== null) {
      if (match[1].trim() !== '') {
        vars.add(match[1]);
      }
    }
    return Array.from(vars);
  }, [templateText, formData, conditionals, radioGroups]);

  // Función para compilar la plantilla con los datos actuales
  const compileTemplate = () => {
    if (!templateText) return '';
    let compiled = templateText;

    // Procesar bloques mutuamente excluyentes [?GRUPO=VALOR]...[/?GRUPO]
    Object.keys(radioGroups).forEach(group => {
      const selectedValue = formData[group];
      const isTodoIncluido = group === 'TIPO_PRODUCCION' && selectedValue === 'TODO_INCLUIDO';
      
      const blockRegex = new RegExp(`\\[\\?${group}=([A-Z0-9_\\|]+)\\]([\\s\\S]*?)\\[\\/\\?${group}\\]`, 'g');
      compiled = compiled.replace(blockRegex, (match, valStr, content) => {
        if (isTodoIncluido) return content;
        const values = valStr.split('|');
        if (values.includes(selectedValue)) return content;
        return '';
      });
    });

    // Procesar bloques condicionales simples [#COND]...[/COND]
    conditionals.forEach(cond => {
      const isChecked = !!formData[cond];
      const blockRegex = new RegExp(`\\[#${cond}\\]([\\s\\S]*?)\\[\\/${cond}\\]`, 'g');
      
      if (isChecked) {
        compiled = compiled.replace(blockRegex, '$1');
      } else {
        compiled = compiled.replace(blockRegex, '');
      }
    });

    // Procesar TODAS las variables para reemplazarlas en el texto final
    // (Incluso si no son visibles, aunque si no son visibles ya fueron borradas)
    const varRegexGlobal = /\[([^#\/?][A-Z0-9_]+)\]/g;
    let match;
    const allVars = new Set();
    while ((match = varRegexGlobal.exec(templateText)) !== null) {
      allVars.add(match[1]);
    }

    Array.from(allVars).forEach(v => {
      let value = formData[v];
      
      // Lógica de fallback para campos en blanco
      if (!value || value.trim() === '') {
        const deepResearchVars = ['CONTRADICCION_CENTRAL', 'PROMESA_NARRATIVA', 'ANCLAJE_DEL_HOOK', 'IMAGEN_FINAL'];
        if (deepResearchVars.includes(v)) {
          value = 'por definir en deep research';
        } else if (v === 'TEMA_DEL_VIDEO') {
          value = 'por definir';
        } else {
          value = `[${v}]`; // Marcador visual por defecto si no hay fallback
        }
      }

      const varRegex = new RegExp(`\\[${v}\\]`, 'g');
      compiled = compiled.replace(varRegex, value);
    });

    // Limpiar saltos de línea sobrantes por bloques eliminados
    compiled = compiled.replace(/\n{3,}/g, '\n\n').trim();

    return compiled;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(compileTemplate());
    alert('¡Guion copiado al portapapeles!');
  };

  const downloadDoc = async () => {
    const textContent = compileTemplate();
    if (!textContent) return;

    try {
      const lines = textContent.split('\n');
      const paragraphs = lines.map(line => {
        return new Paragraph({
          children: [
            new TextRun({
              text: line,
              font: "Arial",
              size: 24, // 12pt
            }),
          ],
        });
      });

      const doc = new Document({
        sections: [{
          properties: {},
          children: paragraphs,
        }],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Guion_Huellas_de_la_Humanidad.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error al generar DOCX:', err);
      alert('Hubo un error al generar el archivo DOCX.');
    }
  };

  const downloadDocAs = async () => {
    const textContent = compileTemplate();
    if (!textContent) return;

    try {
      const lines = textContent.split('\n');
      const paragraphs = lines.map(line => {
        return new Paragraph({
          children: [
            new TextRun({
              text: line,
              font: "Arial",
              size: 24, // 12pt
            }),
          ],
        });
      });

      const doc = new Document({
        sections: [{
          properties: {},
          children: paragraphs,
        }],
      });

      const blob = await Packer.toBlob(doc);

      if (window.showSaveFilePicker) {
        try {
          const defaultTitle = formData.TITULO_PRODUCCION || 'Huellas_de_la_Humanidad';
          const fileHandle = await window.showSaveFilePicker({
            suggestedName: `${defaultTitle.replace(/\s+/g, '_')}_Guion.docx`,
            types: [{
              description: 'Documento DOCX',
              accept: { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
            }],
          });
          const writable = await fileHandle.createWritable();
          await writable.write(blob);
          await writable.close();
        } catch (err) {
          if (err.name !== 'AbortError') {
             alert('Error al guardar el archivo: ' + err.message);
          }
        }
      } else {
        alert('Tu navegador actual no soporta seleccionar carpeta. Se usará la descarga normal.');
        downloadDoc();
      }
    } catch (error) {
      console.error('Error generando DOCX:', error);
      alert('Hubo un error al generar el archivo DOCX.');
    }
  };

  const downloadTemplateRaw = () => {
    if (!templateText) return;
    const blob = new Blob([templateText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const fileName = 'Plantilla_Base_Atemporal.txt';
    link.download = fileName;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      <div className="panel input-panel" style={{ display: 'flex', flexDirection: 'column', height: '92vh', overflow: 'hidden' }}>
        <div className="brand-header" style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Huellas de la Humanidad</h1>
            <p>Motor de Plantillas Maestro</p>
          </div>
          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title="Cambiar entre modo claro y oscuro"
          >
            {theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        </div>

        <div className="tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button 
            className={`btn ${activeTab === 'generator' ? '' : 'btn-secondary'}`} 
            onClick={() => setActiveTab('generator')}
          >
            Generador
          </button>
          <button 
            className={`btn ${activeTab === 'editor' ? '' : 'btn-secondary'}`} 
            onClick={() => setActiveTab('editor')}
          >
            Editor de Plantilla
          </button>
        </div>

        {activeTab === 'generator' && (
          <div className="generator-view" style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '1rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Datos del Nuevo Episodio</h3>
            
            {visibleVariables.length === 0 && conditionals.length === 0 && Object.keys(radioGroups).length === 0 && (
              <p>No se detectaron variables en la plantilla. Ve al editor y usa [VARIABLE] o [?GRUPO=VALOR].</p>
            )}

            {/* Renderizar Grupos Mutuamente Excluyentes (Radio / Selects) */}
            {Object.keys(radioGroups).length > 0 && (
              <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: 'rgba(197, 160, 89, 0.1)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ marginBottom: '1rem' }}>Configuración Exclusiva</h4>
                {Object.keys(radioGroups).map(group => {
                  if (group === 'SUB_OPCION_REELS' && formData.TIPO_PRODUCCION !== 'REELS' && formData.TIPO_PRODUCCION !== 'TODO_INCLUIDO') {
                    return null;
                  }

                  const groupTitle = group === 'TIPO_PRODUCCION' ? 'Tipo de Producción' :
                                     group === 'SUB_OPCION_REELS' ? 'Aspect Ratio / Sub-opción Reels' :
                                     group.replace(/_/g, ' ');

                  return (
                    <div className="form-group" key={group}>
                      <label>{groupTitle}</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {radioGroups[group].map(val => (
                          <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input 
                              type="radio" 
                              name={group} 
                              value={val}
                              checked={formData[group] === val}
                              onChange={handleInputChange}
                              style={{ accentColor: 'var(--accent-gold)' }}
                            />
                            <span>
                              {val === 'REELS' ? 'Reels' :
                               val === '9X16' ? '9:16 (Vertical)' :
                               val === '16X9' ? '16:9 (Horizontal)' :
                               val === 'INMERSIVO_CONTEMPLATIVO' ? 'Inmersivo Contemplativo' :
                               val === 'TIMELAPSE' ? 'Timelapse' :
                               val === 'TODO_INCLUIDO' ? 'Todo Incluido' :
                               val.replace(/_/g, ' ')}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Renderizar Inputs Textuales SOLO si son visibles en el template final */}
            {visibleVariables.map(v => (
              <div className="form-group" key={v}>
                <label>{v.replace(/_/g, ' ')}</label>
                <textarea 
                  className="form-control" 
                  name={v} 
                  value={formData[v] || ''} 
                  onChange={handleInputChange} 
                  placeholder={`Ingrese ${v.toLowerCase()}...`}
                  rows="2"
                />
              </div>
            ))}

            {/* Renderizar Checkboxes (Condicionales Simples) */}
            {conditionals.length > 0 && (
              <div className="form-group" style={{ marginTop: '2rem' }}>
                <label>Opciones Adicionales</label>
                <div style={{ display: 'grid', gap: '0.8rem', marginTop: '0.5rem' }}>
                  {conditionals.map(c => (
                    <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        name={c} 
                        checked={!!formData[c]} 
                        onChange={handleInputChange} 
                        style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--accent-gold)' }}
                      />
                      <span>Incluir: <strong>{c.replace(/_/g, ' ')}</strong></span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'editor' && (
          <div className="editor-view" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>Modificar el ADN</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={undo} 
                  disabled={historyIndex <= 0}
                  title="Deshacer"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
                >
                  ↩ Deshacer
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={redo} 
                  disabled={historyIndex >= history.length - 1}
                  title="Rehacer"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
                >
                  ↪ Rehacer
                </button>
                <button 
                  className="btn" 
                  onClick={saveTemplate}
                  style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
                >
                  💾 Guardar Cambios
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={downloadTemplateRaw}
                  style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
                >
                  ⬇️ Descargar Plantilla
                </button>
              </div>
            </div>
            
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem', color: 'var(--text-secondary)', flexShrink: 0 }}>
              Texto: <code>[VARIABLE]</code> | Checkbox: <code>[#CONDICION]...[/CONDICION]</code> | Excluyentes: <code>[?GRUPO=OPCION1]...[/?GRUPO]</code>
            </p>
            <textarea 
              className="form-control" 
              style={{ flexGrow: 1, minHeight: '0', fontFamily: 'monospace', fontSize: '0.9rem', resize: 'none' }}
              value={templateText}
              onChange={handleTemplateChange}
            />
          </div>
        )}
      </div>

      <div className="panel output-panel" style={{ display: 'flex', flexDirection: 'column', height: '92vh', overflow: 'hidden' }}>
        <div className="brand-header" style={{ flexShrink: 0 }}>
          <h2>Pergamino Final</h2>
        </div>
        <div className="result-box" style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '1rem' }}>
          {compileTemplate() || "Esperando datos..."}
        </div>
        <button className="btn btn-secondary" style={{ marginBottom: '1rem', flexShrink: 0 }} onClick={copyToClipboard}>Copiar al Portapapeles</button>
        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
          <button className="btn" style={{ flexGrow: 1 }} onClick={downloadDoc}>📄 Descarga Rápida</button>
          <button className="btn btn-secondary" style={{ flexGrow: 1 }} onClick={downloadDocAs}>📁 Descargar en...</button>
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;
