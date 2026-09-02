import React, { useState, useEffect, useMemo } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const DEFAULT_TEMPLATE = `
[?TIPO_PRODUCCION=TODO_INCLUIDO|REELS_16_SEG]
INSTRUCCIÓN OBLIGATORIA PARA LA IA: Has recibido el Manual Maestro completo con todas las bifurcaciones. Antes de redactar cualquier guion o tomar decisiones, DEBES PREGUNTAR AL USUARIO qué "Tipo de Producción" (ej. Principal 16:9, Inmersivo Contemplativo, Reels 9:16, Reels 16s Contemplativo, Timelapse) desea generar para este episodio. No comiences a escribir hasta que el usuario te indique el formato elegido.
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=INMERSIVO_CONTEMPLATIVO]
INSTRUCCIÓN OBLIGATORIA PREVIA PARA LA IA (INMERSIVO CONTEMPLATIVO):
Antes de generar los prompts de video, la metadata y la estructura final, la IA DEBE PREGUNTAR OBLIGATORIAMENTE AL USUARIO qué tipo de video será este episodio. Preséntale las siguientes opciones y dale la oportunidad de elegir una o sugerir otras:
1. Un suceso
2. Un personaje
3. Un misterio sin resolver
4. Un true crime
5. Una conciencia o realidad colectiva
6. Una manipulación psicológica
7. Una curiosidad
8. O sugerir otras opciones creativas según la temática.

NO comiences a redactar los prompts ni el contenido hasta que el usuario te haya respondido con el tipo de video seleccionado.
[/?TIPO_PRODUCCION]
### FICHA TÉCNICA DEL EPISODIO ###
INSTRUCCIONES PARA EL EPISODIO ACTUAL:
[?TIPO_PRODUCCION=PRINCIPAL_16_9|REELS_9_16|TIMELAPSE]
Tema del Video: [TEMA_DEL_VIDEO]
Contradicción Central: [CONTRADICCION_CENTRAL]
Promesa Narrativa (Antes del min 2:00): [PROMESA_NARRATIVA]
Anclaje del Hook (Fecha o Lugar): [ANCLAJE_DEL_HOOK]
Imagen Final del Episodio: [IMAGEN_FINAL]
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=INMERSIVO_CONTEMPLATIVO]
Tema del Reel Corto: [TEMA_DEL_VIDEO]
[/?TIPO_PRODUCCION]
####################################

MANUAL MAESTRO DE PRODUCCIÓN ABSOLUTO Y DEFINITIVO: HUELLAS DE LA HUMANIDAD

VOLUMEN I: IDENTIDAD, FILOSOFÍA Y ARQUITECTURA NARRATIVA
Capítulo 1: La Razón de Ser y el Paradigma de la Experiencia
La historia, como disciplina, nunca ha carecido de información. Durante décadas, la humanidad ha redactado bibliotecas enteras, producido incontables documentales y erigido museos con el propósito fundamental de explicar el pasado. Sin embargo, la vasta mayoría de estos contenidos audiovisuales y literarios parten de una misma premisa estructural que hoy resulta obsoleta: observar los acontecimientos desde afuera. El ecosistema de producción de Huellas de la Humanidad nace con el imperativo de romper este paradigma. El objetivo del canal no radica en que el espectador memorice una fecha, aprenda el nombre de un monarca o entienda la táctica de una batalla de forma abstracta. El objetivo, mucho más ambicioso y complejo, es lograr que el usuario experimente de primera mano cómo pudo sentirse vivir dentro de ese preciso momento temporal.En este sistema, no nos limitamos a contar lo que ocurrió; nuestra función es reconstruir el mundo físico y emocional donde dicho evento tuvo lugar. Cuando se aborda la historia de una ciudad antigua, no se describe únicamente su topografía; se invita al espectador a caminar sensorialmente por sus calles. Cuando se narra la hegemonía de un imperio, se muestra cómo era despertar inmerso en su cotidianidad. Cada documental, cada plano y cada diseño sonoro debe trabajar en conjunto para reducir la distancia psicológica entre el presente y el pasado, hasta lograr que dicha distancia desaparezca por completo. El espectador debe dejar de sentirse frente a un producto audiovisual educativo y comenzar a percibir que está observando fragmentos orgánicos de una época desaparecida. Esa ilusión continua de presencia es el principio rector que define la identidad innegociable de Huellas de la Humanidad.Para el canal, la historia no se concibe como una sucesión árida de fechas o tratados, sino como la suma incalculable de millones de experiencias humanas. Cada edificación fue levantada por individuos que sufrían fatiga; cada imperio se sostuvo sobre familias, comerciantes, soldados y artesanos; cada desastre natural impactó a personas que, hasta unos minutos antes de la catástrofe, asumían que su jornada sería ordinaria. Cuando el guion y la imagen logran transmitir esta dimensión, la historia abandona su naturaleza de dato frío y se transmuta en una experiencia emocional irreversible. El compromiso editorial dicta que toda decisión creativa —desde la investigación hasta el diseño del prompt— debe responder a una única pregunta métrica: ¿Esto ayuda al espectador a vivir la historia desde dentro? Si la respuesta es afirmativa, el elemento pertenece al corte final; si es negativa, debe purgarse.

[?TIPO_PRODUCCION=PRINCIPAL_16_9|REELS_9_16|TIMELAPSE]
Capítulo 2: La Promesa Narrativa (El Contrato Invisible)
Todo episodio que aspire a construir una audiencia leal requiere una promesa clara y transparente. Esta debe aparecer obligatoriamente antes del minuto 2:00 de cada episodio. No es un simple truco de marketing; es un contrato donde le aseguramos al espectador que no recibirá una clase de historia tradicional. Debe dejar claro de qué trata el episodio, qué enigma histórico, tensión social o perspectiva inédita descubrirá si se queda hasta el final, prometiéndole habitar el pasado desde adentro.
Para que este contrato se cumpla, la arquitectura del contenido opera simultáneamente en tres niveles de profundidad:
- Nivel de Información: Garantiza que el espectador comprenda los hechos fácticos de lo que ocurrió, manteniendo una precisión histórica inquebrantable.
- Nivel de Contexto: Explica las causas profundas y las condiciones sociales, económicas y geográficas que detonaron el acontecimiento, respondiendo al "por qué" de la historia.
- Nivel de Experiencia: Constituye el diferenciador absoluto del canal. Reconstruye la historia desde la percepción psicológica, sensorial y física, permitiendo al usuario sentir "cómo" se vivió aquel momento.
[/?TIPO_PRODUCCION]

Capítulo 3: Los Cinco Pilares Fundamentales
La coherencia operativa y estética del canal se apoya en cinco pilares que actúan como cimientos inamovibles. Si alguno de estos elementos es omitido durante la producción, el resultado deja de ser un documental de Huellas de la Humanidad para convertirse en un video histórico genérico.El primer pilar es el Rigor Histórico. La espectacularidad visual y la inteligencia artificial nunca pueden sustituir a la evidencia académica. Cada proyecto comienza con una investigación exhaustiva que identifica fuentes primarias y consensos. En casos de ambigüedad histórica, el contenido debe reflejar las diversas hipótesis sin imponer especulaciones como verdades absolutas. La credibilidad del mundo reconstruido depende enteramente de este rigor.El segundo pilar es la Inmersión Cinematográfica. La meta no es ilustrar un guion, sino crear un hábitat visual. La cámara generada por los motores de IA debe comportarse como un testigo invisible con masa y volumen físico dentro del escenario. Las texturas, la incidencia de la luz, el comportamiento de los materiales y el diseño acústico deben acatar una lógica coherente con el periodo histórico. Un solo anacronismo visual o tecnológico tiene el potencial de destruir la ilusión completa de inmersión.El tercer pilar se enfoca en la Narrativa Psicológica. La historia ocurre tanto en el mundo material como en la psique de quienes la experimentan. El documental debe insinuar de manera constante el miedo, la incertidumbre, la esperanza, la adaptación o la resignación de la población. Esta capa invisible transforma los hechos abstractos en tensiones humanas comprensibles y empáticas para la audiencia moderna.El cuarto pilar es la generación de un Asombro Basado en la Realidad. Queda terminantemente prohibido exagerar eventos o inventar fricciones narrativas para retener la atención. La espectacularidad nace de la escala colosal de los hechos reales: desastres abrumadores, innovaciones tecnológicas prematuras y el esfuerzo humano masivo. El asombro debe brotar de la revelación de una verdad histórica fascinante y cruda, no de una hipérbole artificial o efectos de Hollywood.El quinto pilar, la Humanización de la Historia, exige que el foco de la reconstrucción no recaiga en mapas abstractos o monarcas lejanos, sino en la población real. Las ciudades y las guerras fueron experimentadas por individuos anónimos con rutinas y ansiedades cotidianas. Devolverle la escala humana a los macro-eventos es la misión fundamental que cohesiona a todos los pilares anteriores.

[?TIPO_PRODUCCION=PRINCIPAL_16_9|REELS_9_16|TIMELAPSE]
Capítulo 4: Dimensión Dominante, Contradicción Central y la Imagen Final
Dimensión Dominante: Cada episodio debe tener un lente a través del cual analizamos la historia. Esto evita que el documental divague y nos permite enfocar el diseño sonoro y visual en esa dimensión específica. La IA debe evaluar la naturaleza del episodio y decidir si el enfoque principal del guion será: 1) Psicológico y Social, 2) Tecnológico y Arquitectónico, 3) Militar y Táctico, 4) Económico o Simbólico (u otra dimensión adecuada según la producción).
Contradicción Central (El Motor del Relato): Todo video debe orbitar sobre una paradoja. No hacemos listados de curiosidades. La narrativa tiene la obligación de contraponer dos fuerzas estructurales antagónicas. Ejemplo: La estructura monumental que se construyó para proteger a los habitantes, pero que terminó convirtiéndolos en prisioneros. O el gran avance tecnológico que prometía emancipación, pero que dependía del sacrificio físico de miles de operarios en condiciones extremas. La contradicción es el eje que estructura la progresión emocional del espectador.
La Imagen Final: Como culminación de esta tensión, el sistema establece una norma arquitectónica inversa: cada episodio debe construirse comenzando por el final. Antes de redactar la primera línea del relato, el director debe definir la Imagen Final del Episodio. Esta imagen constituye una síntesis emocional y visual que actuará como ancla en la memoria del espectador. Todo el metraje precedente, cada escena, cada foley y cada pausa, debe funcionar como un vector narrativo diseñado exclusivamente para desembocar en esa imagen y concepto final predefinidos.
[/?TIPO_PRODUCCION]

[?TIPO_PRODUCCION=PRINCIPAL_16_9|REELS_9_16|TIMELAPSE]
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
Prohibición Absoluta de Menores: Está terminantemente prohibido incluir niños, bebés, adolescentes o cualquier figura de un menor de edad en toda la cadena de producción. Esta restricción aplica al guion narrativo, a los personajes secundarios o de fondo, a los prompts de generación de video y a las miniaturas de YouTube. Si la escena histórica (como un mercado o un asedio) normalmente implicaría la presencia de menores, estos deben ser completamente omitidos. La reconstrucción de la vida y el drama histórico debe focalizarse de manera exclusiva en la demografía adulta: soldados, ancianos, artesanos, comerciantes y trabajadores.
Cero Redundancia de la Palabra "Adulto": Aunque la regla anterior exige la omisión de menores, los guionistas y especialistas en ingeniería de prompts tienen estrictamente prohibido redundar constantemente utilizando la palabra "adulto" en las descripciones (ej. evitar "un hombre adulto camina hacia una mujer adulta"). La naturaleza adulta de los personajes debe quedar implícita a través del uso de sustantivos profesionales, roles sociales o descriptores físicos apropiados.
Prohibición de Lenguaje Violento Explícito: Por políticas estrictas de monetización algorítmica, queda terminantemente prohibido utilizar en los guiones palabras como "matar", "asesinar", "suicidar", "masacrar" o sus derivados. Para describir bajas históricas, la IA está obligada a utilizar eufemismos y lenguaje periodístico refinado (ej. "perdió la vida", "cayó en combate", "fue ejecutado", "pereció", "silenciado", "erradicado").
[?TIPO_PRODUCCION=PRINCIPAL_16_9|REELS_9_16|TIMELAPSE]
Regla de Cero Exclamaciones para el Motor TTS: En la redacción del guion final que será procesado por sistemas de Text-To-Speech (TTS) o interpretado por locutores, está totalmente prohibido el uso de signos de exclamación (!). La intensidad emocional, el drama y la urgencia de la historia no deben forzarse mediante gritos artificiales o entonaciones hiperbólicas. La gravedad narrativa se controla de forma exclusiva a través de la sobriedad vocal, el ritmo de lectura, la contención emocional, los silencios estructurales y el peso intrínseco de las palabras elegidas. La voz debe transmitir autoridad sin arrogancia y asombro sin melodrama.
[/?TIPO_PRODUCCION]
Capítulo 8: Integridad Visual y Tensión Psicológica
Para garantizar la estabilidad del contenido frente a las políticas de moderación de plataformas (YouTube, redes sociales) y para mantener un realismo documental sin recurrir al sensacionalismo violento, se aplican las siguientes normativas visuales:
Prohibición Absoluta de Sangre y Gore (Disociación de la Violencia): Queda estrictamente prohibido incluir palabras como "blood", "bloody", "gore", "mutilation" o descripciones de heridas abiertas en los prompts de generación visual, garantizando así la seguridad y monetización del canal. No necesitamos sangre gráfica para asustar al espectador; el terror táctico se construye a través de la tensión psicológica extrema. Se logra mediante el desgaste biomecánico, la asfixia acústica (ruidos abrumadores), el silencio prolongado, o el encierro claustrofóbico. Ejemplo: En lugar de mostrar la explosión de un cuerpo, mostramos las manos temblorosas de un soldado apretando un fusil en la oscuridad absoluta o el polvo cayendo del techo de un sótano.
Escudo Anti-Fuego Humano: En la recreación de batallas campales, asedios urbanos, catástrofes naturales o desastres industriales, está rigurosamente prohibido instruir a la IA para que coloque fuego directo sobre modelos humanos. Para retratar el horror de las llamas y la destrucción sin caer en el gore explícito, los personajes deben representarse a través de siluetas a contraluz situadas a distancias seguras. La tragedia se construye atmosféricamente utilizando el resplandor volcánico (volcanic glow), la refracción del humo, el colapso del entorno arquitectónico y la reacción corporal de los sobrevivientes.
Anulación de Estilos Anacrónicos: Queda prohibida la inclusión de elementos visuales modernos en épocas pasadas. Se veta el uso de modificadores como "3D", "CGI look", "hyperrealistic" o "cartoon", debiendo primar siempre el "realismo cinematográfico documental". Las consecuencias de la guerra se muestran mediante ruinas, abandono y silencio.
Sincronización Temática (No Literalidad Visual): La imagen no tiene la obligación de ser una traducción literal o calco exacto de lo que el narrador está relatando palabra por palabra. El objetivo es que los clips fluyan orgánicamente con la historia. Se fomenta el uso de metáforas visuales y planos atmosféricos que capturen la esencia de la escena, sin necesidad de ilustrar lo obvio de forma redundante (ej. si la voz habla del "colapso de la economía", la imagen puede mostrar un puesto de panadero vacío y polvoriento en lugar de monedas cayendo).

VOLUMEN IV: FLUJO DE TRABAJO Y ARQUITECTURA TEMPORAL
[?TIPO_PRODUCCION=PRINCIPAL_16_9|REELS_9_16|TIMELAPSE]
Capítulo 9: Flujo de Trabajo Paso a Paso (Sincronización Inversa)
El proceso de manufactura audiovisual en Huellas de la Humanidad repudia la improvisación visual. Se rige por un principio operativo denominado Sincronización Inversa Absoluta. En la producción tradicional, a menudo la imagen dicta el ritmo; en nuestro sistema, la voz humana es el metrónomo inalterable. La generación de prompts sobre tiempos teóricos está prohibida. El flujo inquebrantable desde la investigación hasta la exportación consta de los siguientes pasos:Investigación Multidimensional (Filtro de Realidad): Toda producción comienza con una investigación organizada en cinco capas progresivas: 1) Hechos básicos y cronología; 2) Contexto estructural sociopolítico; 3) Experiencia humana a través de testimonios y reconstrucciones; 4) Interpretación y debate histórico; 5) Dimensión visual y arquitectónica real. Si un elemento no es historically verificable o lógicamente inferible, se descarta.Arquitectura Conceptual: El equipo define explícitamente la Contradicción Central, redacta la Promesa Narrativa y establece la Imagen Final hacia la cual convergerá el episodio.Redacción Cronometrada: El guion se escribe optimizado para mantener una cadencia rigurosa de 112 a 114 Palabras Por Minuto (WPM). Esta velocidad deliberada es crucial para permitir que la inmersión visual y los silencios acústicos respiren sin asfixiar al espectador con densidad verbal.Grabación de la Pista Maestra: La locución se registra respetando los tonos institucionales (Formato A) o de crónica (Formato B), y se masteriza como el eje de la producción.Construcción del Timeline Real: Una vez renderizado el audio, se mapean las marcas de tiempo milimétricas. El guion se transforma en una hoja de cálculo temporal. Si el locutor menciona "el colapso de la torre" en el minuto 03:14, el clip visual generado debe coordinar esa acción física exactamente en esa marca de tiempo.Diseño de Escenas y Asignación Foley: Se fragmenta el timeline en bloques de 8 segundos, asignando la acción visual precisa y el diseño acústico (Foley) que acompañará a cada micro-plano.Ingeniería de Prompts y Renderizado: Redacción técnica de las instrucciones en inglés para el motor [MODELO_DE_IA] e inicio de la generación de lotes.Edición Invisible: Montaje en software con cortes motivados por la emoción o el cambio de espacio, aplicando una sincronización audiovisual total.Empaque SEO y QA: Elaboración de miniaturas, auditoría final mediante el checklist y configuración del algoritmo de publicación.
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=INMERSIVO_CONTEMPLATIVO]
Capítulo 9: Flujo de Trabajo (Inmersivo Contemplativo)
El formato "Inmersivo Contemplativo" es un reel ultra corto de 20 segundos. Por su brevedad, se omite deliberadamente la "Investigación Multidimensional" (no hay las 5 capas del Filtro de Realidad ni deep research).
Asimismo, quedan completamente descartadas la Contradicción Central, la Promesa Narrativa y la Imagen Final del Episodio. La IA debe enfocarse puramente en la inmersión visual y sonora inmediata para los 3 clips requeridos.
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=REELS_16_SEG]
Capítulo 9: Flujo de Trabajo (Reels 16s Contemplativos)
El proceso se rige puramente por la estética visual contemplativa. El flujo consta de: 1) Investigación para encontrar un anclaje visual histórico poderoso. 2) Redacción del prompt de 2 clips continuos de 8 segundos sin cortes frenéticos. 3) Asignación rigurosa de Foley para mantener la inmersión sin depender de la voz narrativa. 4) Redacción de una descripción extensa y densa de aproximadamente 2100 caracteres para retener al espectador.
[/?TIPO_PRODUCCION]
Capítulo 10: Arquitectura Temporal y Tensión Narrativa
[?TIPO_PRODUCCION=PRINCIPAL_16_9|REELS_9_16|TIMELAPSE]
El tiempo es tratado como una herramienta de ingeniería emocional. La distribución de los bloques narrativos se diseña para capturar y sostener la atención humana, estructurándose de la siguiente forma :El Hook Extremo (0–24s): Fase de impacto sensorial máximo diseñada para detener el desplazamiento (scroll) del usuario. Consta de 3 clips iniciales. Debe iniciar con un anclaje fuerte (una fecha, un lugar o la contradicción central) sin explicaciones enciclopédicas. 
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=PRINCIPAL_16_9]Para maximizar el impacto cognitivo en formato horizontal, los clips 2 y 3 deben finalizar con un corte dramático a una pantalla negra acompañada de texto centrado.[/?TIPO_PRODUCCION][?TIPO_PRODUCCION=REELS_9_16|TIMELAPSE|REELS_16_SEG]Queda estrictamente prohibido incluir cualquier tipo de texto en pantalla para estos videos cortos; la imagen debe permanecer completamente limpia y visual.[/?TIPO_PRODUCCION][?TIPO_PRODUCCION=INMERSIVO_CONTEMPLATIVO]Texto en Pantalla (Edición Manual en CapCut): Los clips SÍ llevarán texto en pantalla breve y contundente para potenciar la narrativa psicológica y el horror. Sin embargo, este texto NO debe ser generado por Google Flow ni insertado en los prompts de IA (los prompts visuales deben incluir estrictamente 'no text'). La IA debe especificar claramente en el guion qué texto colocar manualmente en CapCut en cada uno de los 3 clips durante la edición posterior.[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=PRINCIPAL_16_9|REELS_9_16|TIMELAPSE]
Silencios Narrativos Estructurales: Los silencios no son huecos por falta de contenido; son herramientas deliberadas para la asimilación emocional. Es obligatorio insertar un silencio absoluto de 2 segundos entre el final del Hook Extremo y el inicio del Hook Extendido, así como otro silencio de 2 segundos entre el Hook Extendido y la Historia Principal.El Hook Extendido (26–144s): Una vez capturada la atención, este bloque expande el contexto histórico, establece las bases del conflicto y articula de forma natural la Promesa Narrativa del documental.La Historia Principal: Desarrollo profundo del relato con un ritmo de edición variable que fluctúa entre la densidad informativa y la contemplación visual, alternando entre planos humanos directos y amplios paisajes atmosféricos.
[/?TIPO_PRODUCCION]

Capítulo 11: Geometría del Encuadre y Relación de Aspecto
El proyecto exige la creación simultánea de dos entregables, generados a partir de este único prompt maestro. El motor debe comprender las diferencias radicales de composición entre ambos:

[?TIPO_PRODUCCION=PRINCIPAL_16_9]
1. ENTREGABLES HORIZONTALES (16:9)
(Videos largos inmersivos para YouTube y Facebook)
- Composición de Planos: Profundidad de campo panorámica. Las figuras humanas deben ubicarse en los tercios laterales, permitiendo que el entorno arquitectónico o natural domine el centro del cuadro.
- Integración de Enlaces (CTA): Llamado a la acción ubicado tanto en la Descripción como en el Comentario Fijado.
- Pausas Estructurales y Atmosféricas en la Locución: La voz narrativa debe incluir siempre pausas explícitas marcadas en el guion. Existen las pausas fijas obligatorias ("/2s") en tres momentos clave (al inicio absoluto, después del eslogan completo del segundo hook, y justo antes del eslogan corto final). Además, la IA debe insertar estratégicamente pausas variables adicionales (indicadas como "/#s", por ejemplo "/4s" o "/6s") en diferentes partes del documental donde la voz narrativa calla temporalmente y la imagen junto con el audio Foley asumen el peso total de la inmersión narrativa.
- Regla de Movimiento de Cámara (Estándar): Paneos horizontales lentos (slow pan) o travellings de aproximación milimétrica (slow push-in). Queda prohibido el movimiento de cámara en mano (shaky cam) a menos que la escena describa un combate bélico o pánico extremo.
- Ritmo de Montaje (Pacing Dinámico para Retención): Hasta el clip 11, todos los clips de 8 segundos deben fragmentarse hiperactivamente en 4 shots de 2 segundos cada uno. Este bloque inicial debe ir acompañado de un audio inmersivo, cinematográfico foley e intenso para retener al espectador y evitar el skip. A partir del clip 12, el ritmo se relaja y los clips pueden tener un solo shot de 8 segundos o dos shots de cualquier combinación matemática que sume 8 segundos.
[/?TIPO_PRODUCCION]

[?TIPO_PRODUCCION=INMERSIVO_CONTEMPLATIVO]
INSTRUCCIÓN DE ROL: Actúa como un historiador, director de cine, y periodista profesional.
- Regla de Títulos (Exclusión): Título inmersivo y directo. Queda terminantemente prohibido añadir el sufijo "| Huellas de la Humanidad", "| Documental Completo" o "(Reconstrucción con IA)".
- Restricciones Léxicas: Bajo ningún concepto utilices la palabra "muertos", "homicidio", u otros sinónimos banales de violencia directa. Mantén el tono periodístico e histórico.
- Formato de Fechas: Escribe los años utilizando números arábigos (ej. 1945, 1492) y los siglos obligatoriamente en números romanos (ej. siglo XX, siglo XV).
- Regla de Movimiento de Cámara (Lento): Paneos horizontales extremadamente lentos y panorámicos.
- Arquitectura del Reel Contemplativo Panorámico: El metraje se compone exactamente de tres clips: un clip inicial de 4 segundos para el hook, seguido de dos clips de 8 segundos (Total 20 segundos). Queda totalmente prohibida la edición acelerada.
- Audio y Tono Emocional: El video no lleva voz narrativa ni música. Su diseño acústico es exclusivamente Foley e imagen con el objetivo explícito de causar horror y angustia psicológica en el espectador.
- Herramientas de Generación: Utiliza "banana pro" para la generación de las imágenes iniciales estáticas de cada clip. Posteriormente, emplea el modelo de video configurado en "lower priority" para darle movimiento a dichas imágenes.
- Regla de Texto en Pantalla (Edición Manual en CapCut): El video incluye texto en pantalla breve, enigmático y contundente para cada clip. Dicho texto NO debe incluirse dentro de los prompts de generación de imagen/video (Google Flow debe recibir prompts con 'no text'). La IA debe suministrar en la entrega el texto exacto correspondiente a cada clip para ser colocado manualmente en CapCut durante el montaje posterior.
- Estructura de Entrega Obligatoria para los 3 Clips (Clip 1 Hook de 4s, Clip 2 de 8s, Clip 3 de 8s):
  Para cada uno de los 3 clips, la IA debe entregar de forma clara y estructurada:
  1. Identificación del Clip y Selección de Cámara: Especificar el tipo de plano, angulación, movimiento de cámara y óptica seleccionados de los catálogos.
  2. Explicación Visual del Clip: Descripción narrativa y contextual en español explicando con precisión qué ocurre en la escena, qué acción física o acontecimiento se desenvuelve y cuál es la atmósfera psicológica que transmite el plano.
  3. Prompt de Imagen Inicial: En idioma inglés para 'banana pro' (con sufijos obligatorios y 'no text').
  4. Prompt de Movimiento de Video: En idioma inglés configurado en 'lower priority'.
  5. Diseño Foley: Descripción del audio foley acústico y envolvente (sin música).
  6. Texto en Pantalla: Texto corto y contundente para agregar manualmente en CapCut durante el montaje.
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

[?TIPO_PRODUCCION=REELS_9_16|TIMELAPSE]
2. ENTREGABLE PROMOCIONAL: FORMATO VERTICAL (9:16)
(Gancho de 30-60 segundos para Reels, TikTok, Shorts)
- Composición de Planos: Encuadre centrado (center framed). La profundidad de campo debe comprimirse. El sujeto u objeto principal debe abarcar el 60% del cuadro vertical para retener la atención del escroleo rápido.
- Regla de Movimiento de Cámara: Estaticidad relativa o zoom in digital muy sutil. Se prohíben los paneos horizontales en el formato vertical para evitar desorientación espacial.
- Integración de Enlaces (CTA): Enlace de redirección (para llevar tráfico al video largo) ubicado exclusivamente en el Comentario Fijado.
- Ley Tipográfica de Seguridad: En los primeros 3 clips del Hook, cualquier letrero exigido por el prompt debe estar perfectamente centrado, con un margen lateral de seguridad ancho y limpio para evitar que la interfaz nativa del móvil lo recorte.
- Tabla de Generación de Clips (Exclusivo 9:16): La IA debe entregar obligatoriamente una tabla estructurada de producción para cada uno de los clips de este formato. La tabla debe contener: 1) Número y descripción del clip, 2) Prompt visual para generar la imagen inicial estática utilizando el modelo "nano banana pro", y 3) Prompt técnico de movimiento para generar el clip de video a partir de dicha imagen.
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=REELS_16_SEG]
3. ENTREGABLE PROMOCIONAL: REELS 16 SEG CONTEMPLATIVO (9:16)
(Videos ultra-cortos de 16 segundos)
- Composición de Planos: Encuadre centrado (center framed).
- Estructura y Ritmo: El video consta de exactamente 2 clips. Cada clip es un solo shot de 8 segundos continuos. Las escenas deben ser netamente contemplativas.
- Restricción de Audio: Queda estrictamente prohibida la inclusión de voz narrativa. El video no lleva locución.
- Restricción de Texto: Cero texto en pantalla.
- Tabla de Generación de Clips: Entregar una tabla con los 2 clips detallando el prompt visual y el técnico de movimiento.
[/?TIPO_PRODUCCION]

VOLUMEN V: INGENIERÍA DE PROMPTS Y GENERACIÓN VISUAL
Capítulo 12: Reglas de "Text para Flow" (Gestión del Prompter)
El operario o especialista en ingeniería de prompts encargado de alimentar el sistema de IA (Text para Flow) debe adherirse textual, estricta e incondicionalmente a las siguientes directrices de ejecución para salvaguardar la arquitectura del guion, la estabilidad de los servidores de generación y el orden del archivo [Instrucción de Usuario]:Cero Modificaciones: "No modifiques los prompts que te mando, mándalos así mismo y no les hagas cambios". La ingeniería semántica ya ha sido optimizada en la preproducción; la intervención del operario durante el copiado y pegado altera la matriz matemática de los descriptores.Nomenclatura Estricta de Archivos: "Cambia los nombres de los clips a las primeras 6 palabras literales del prompt proveído pegado y enviado que incluyen la numeración y los códigos de tiempo". Esta regla es vital para la sincronización inversa del editor; permite ubicar el clip visual instantáneamente dentro del timeline del audio.Tolerancia a Fallos: "No reintentes clips que hayan fallado, espera a ver si se generan primero". Saturar el motor con reintentos simultáneos degrada la calidad de renderizado general del servidor.Generación por Lotes (Batches): "Genera los clips en batches de 10". El ecosistema de producción se maneja en bloques controlados para auditar la calidad progresiva.Refrigeración del Motor: "Espera 20 segundos entre cada batch". Esta pausa técnica previene la asfixia del sistema de generación y asegura tiempos de respuesta óptimos.Coherencia Visual Perenne: "Asegúrate de mantener continuidad visual a lo largo de la historia". Si un batch de 10 clips desvía drásticamente la paleta de colores, la materialidad o la arquitectura respecto al bloque anterior, el especialista debe reportar la anomalía para ajustar la semilla, en lugar de continuar ciegamente.
Capítulo 13: Plantilla Base y Redundancia ([MODELO_DE_IA])
A partir del hito técnico de la Versión V32, Huellas de la Humanidad abandona el uso de motores genéricos o versiones previas para consolidar toda su creación visual sobre [MODELO_DE_IA]. Todo prompt debe redactarse en idioma inglés, conformando un único párrafo sólido sin saltos de línea, respetando un orden sintáctico algorítmicamente inalterable.
Prohibición de Voz Narrativa en Prompts: Está estrictamente prohibido incluir los diálogos, frases o el texto literal de la voz narrativa (voiceover) dentro de las instrucciones visuales enviadas al generador de video. El prompt debe contener exclusivamente descriptores de imagen, iluminación, acción física, cámara y Foley. Jamás se deben incluir las palabras que el locutor está pronunciando.
Hiper-Detalle Explicativo y Descriptivo: Los prompts generados no pueden ser escuetos ni genéricos (ej. "a medieval battle"). La IA tiene la obligación inquebrantable de redactar instrucciones visuales densas, inmersivas y altamente detalladas. Cada prompt debe pintar el escenario de forma exhaustiva, especificando meticulosamente la materialidad, las texturas, el estado atmosférico, la incidencia de la luz, la acción física específica y el movimiento exacto de la cámara (ej. "A tight macro shot of a weathered Roman soldier's mud-caked leather armor as heavy rain streaks across his exhausted face, dramatic chiaroscuro lighting casting deep shadows, slow continuous push-in tracking shot").
Estructura Maestra del Prompt:
\`.Ley de Redundancia y Barrera Sonora (El Sufijo Obligatorio):
Para garantizar la estética documental, evitar mutaciones hacia el 3D o la fantasía, e impedir que la IA genere murmullos acústicos, cada prompt debe finalizar cerrando matemáticamente con esta cadena literal:
cinematic documentary realism, safe framing composition, no modern objects, no CGI look, no text, no speech..\`

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
La historia ocurre tanto en el mundo material como en la psique de quienes la experimentan. Debemos insinuar de manera constante estas emociones en la población adulta anónima para que el espectador conecte:
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
6. El Diseño Sonoro (Foley) Transicional: El sonido debe mutar sincronizado con la imagen. El prompt de Foley debe indicar de dónde viene y hacia dónde va. Ejemplo: "Synchronized foley of melting ice dripping rapidly shifting smoothly into a gentle spring breeze."
7. Cierres Orgánicos (Cero Pantallas Negras Artificiales): El último clip no debe ser un corte duro. La cámara debe avanzar suavemente hacia una sombra profunda del propio escenario (un callejón, un bosque oscuro) hasta que el ambiente oscurezca la pantalla. De ese negro natural emerge el logotipo. Queda estrictamente prohibido mostrar el logotipo en pantalla en cualquier otro momento del documental; su aparición es exclusiva del plano final.
[/?TIPO_PRODUCCION]

VOLUMEN VI: DISEÑO SONORO Y PAISAJES ACÚSTICOS
Capítulo 16: Ingeniería de Foley y Regla de No-Voces
El audio es la argamasa que consolida la reconstrucción tridimensional. En Huellas de la Humanidad, no se emplean pistas genéricas musicales que ahoguen la escena; se orquesta un paisaje acústico preciso.Regla de No-Voces IA: El "valle inquietante" no solo afecta lo visual, sino también lo auditivo. Las inteligencias artificiales de video a menudo alucinan coros fantasmales, risas inconexas o murmullos robóticos. Queda prohibida la inclusión de voces humanas generadas por motores visuales. La directriz no spoken voice, no human speech del prompt es el primer filtro; la edición en postproducción debe silenciar cualquier filtración restante.Foley Obligatorio por Shot Interno: La textura visual exige correspondencia sonora. Cada clip general de 8 segundos, o cada micro-plano de 2 segundos en el formato vertical, debe tener asignada una capa de diseño sonoro (Foley). El guionista o editor debe detallar el audio exacto para cada corte (ej. synchronized foley of a wooden cart creaking on cobblestone). Si la acción acústica fluye continuamente desde el plano anterior, se debe declarar la instrucción operativa: Continuation of previous shot's acoustic ambience.

[?TIPO_PRODUCCION=PRINCIPAL_16_9|REELS_9_16|TIMELAPSE]
Anclaje Visual al Eslogan y Cierre (Dualidad de Formatos):
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=PRINCIPAL_16_9]
- Para el Entregable Principal (Horizontal 16:9): La redacción de los eslóganes y cierres en la locución es de cumplimiento estricto. La IA debe estructurarlos textualmente de la siguiente manera:
  1) Pregunta de Retención (antes del Eslogan Completo): Justo al final del segundo hook (antes del minuto 2) y antes de recitar el Eslogan Completo, la IA debe formular una pregunta intrigante directa al espectador relacionada con la trama del documental.
  2) Eslogan Completo (después del segundo hook): "Si quieres seguir cruzando el umbral del tiempo para vivir la historia desde dentro, dale like a este video y suscríbete a Huellas de la Humanidad. Cada historia deja una huella. Aquí seguimos sus rastros."
  3) Resolución y Eslogan Final (al cierre del documental): Al finalizar el documental, la IA debe volver a hacer referencia a la misma pregunta formulada en el punto 1, dándole una respuesta reveladora o reflexiva. Inmediatamente después, debe cerrar con el eslogan final: "Ha sido toda una aventura... [IA: Crea aquí una breve frase conectora relacionada con la conclusión de este documental específico]. Cada historia deja una huella. Aquí seguimos sus rastros."
  4) Visualización Referencial (Cero Pantallas Negras): Los clips visuales asignados a los segmentos de estos eslóganes NO deben ser pantallas oscuras. Tienen que ser descritos como escenas inmersivas que hagan referencia a la historia. Específicamente para la marca auditiva final ("Cada historia deja una huella..."), el montaje tiene la obligación estricta de empalmar esta frase con un plano detalle (macro shot) de altísima textura que evidencie una marca física real en el entorno (ej. una pisada profunda en ceniza volcánica, un cincelado en arenisca o el óxido en un cobre abandonado).
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=REELS_9_16|TIMELAPSE|REELS_16_SEG]
- Para el Entregable Promocional (Vertical 9:16): Queda estrictamente prohibida la inclusión del eslogan del canal en los videos cortos. El relato debe culminar sin esta marca auditiva para maximizar la velocidad de consumo y evitar fugas de retención. Además, está expresamente prohibido incluir el logo del canal al final del metraje (sin logo al final de los Reels).
[/?TIPO_PRODUCCION]

VOLUMEN VII: EMPAQUE, SEO Y DISTRIBUCIÓN ALGORÍTMICA
Capítulo 17: Arquitectura del Empaque (YouTube / Redes)
La publicación del episodio requiere una estrategia algorítmica tan precisa como su creación visual, orientada a dominar el CTR (Click-Through Rate) y la retención profunda.1. Dirección de Arte para Miniaturas:
La miniatura funciona como un ancla psicológica pre-inmersiva, no como un fotograma pasivo.Debe inyectar una emoción dominante evidente y una contradicción visual que desestabilice las expectativas (ej. un monarca rodeado de miseria extrema).El texto impreso en la miniatura debe ser brutalmente conciso: un máximo inquebrantable de 1 a 3 palabras.Bajo ningún concepto el texto de la miniatura debe repetir el título del video; su función es complementarlo semánticamente.Toda la composición debe evaluarse reduciendo su tamaño a la escala de una pantalla móvil para asegurar legibilidad.En contextos históricos densos, la miniatura debe emplear el lugar y el año como ancla de autoridad.
2. Estrategia del Título y Subtítulos ("Todo Corrido"):
Regla del Título (Cero Menciones IA): Al proponer el título del video, queda terminantemente prohibido utilizar el sufijo "(Reconstrucción con IA)" o similares.
[?TIPO_PRODUCCION=PRINCIPAL_16_9]
Todo título generado para documentales horizontales debe finalizar obligatoriamente con el sufijo " | Documental Completo".
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=REELS_9_16|TIMELAPSE|REELS_16_SEG]
Los títulos para videos verticales y promocionales deben finalizar con un separador vertical "|" seguido de una palabra o frase muy corta y referente al tema (ej. " | Historia", " | Roma", " | Misterio"). Queda estrictamente prohibido utilizar "(Reconstrucción con IA)".
[/?TIPO_PRODUCCION]
El algoritmo de las plataformas prioriza descripciones que fluyen como ensayos estructurados. Regla de Subtítulos (Ocultación Total): Elimina de forma absoluta todos los subtítulos genéricos y de sección ("Descripción:", "Hashtags:", "Tags:", "Comentario Fijado:", etc.). El único subtítulo permitido al inicio del documento es "Título". La redacción de la metadata debe aplicar el sistema "Todo Corrido": un flujo continuo y orgánico. Para separar cada párrafo lógico, sección o bloque de metadata, se debe dejar una línea en blanco utilizando obligatoriamente el carácter de espacio invisible braille (⠀) para forzar el salto de línea en las plataformas.
[?TIPO_PRODUCCION=REELS_16_SEG|INMERSIVO_CONTEMPLATIVO]
Regla de Descripción Larga (Retención Textual): Al carecer de voz en off, el texto de la descripción asume el peso narrativo. La descripción (metadata) generada debe ser densa, rica en contexto histórico y tener una extensión estricta de aproximadamente 2100 caracteres.
[/?TIPO_PRODUCCION]

Regla de Capítulos según Destino de Publicación:
[?TIPO_PRODUCCION=PRINCIPAL_16_9]
- Exclusivo para YouTube (Video Largo): Se permite y exige el subtítulo "Capítulos" para los timestamps. Esta sección debe contener exactamente 10 capítulos obligatorios.
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=REELS_9_16|TIMELAPSE|REELS_16_SEG|INMERSIVO_CONTEMPLATIVO]
- Para Videos Cortos / Reels / Otras Redes: NO se necesita ni se debe incluir la sección de Capítulos. Omitir por completo los timestamps.
[/?TIPO_PRODUCCION]
3. El Escudo de IA Obligatorio (Variantes):
Como medida de protección comunitaria frente a detractores y políticas de revisión, se debe insertar literalmente la siguiente leyenda en la descripción, ajustando una sola palabra según el formato:
[?TIPO_PRODUCCION=PRINCIPAL_16_9]
- Para el Entregable Principal (Documentales Largos Horizontales):
(Nota: Este documental inmersivo ha sido recreado utilizando herramientas de inteligencia artificial generativa basándonos estrictamente en registros históricos, tácticos y arquitectónicos de la época. Es posible que existan incongruencias o errores visuales).
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=REELS_9_16|TIMELAPSE|REELS_16_SEG|INMERSIVO_CONTEMPLATIVO]
- Para el Entregable Promocional (Reels / Shorts / Videos Cortos):
(Nota: Este video inmersivo ha sido recreado utilizando herramientas de inteligencia artificial generativa basándonos estrictamente en registros históricos, tácticos y arquitectónicos de la época. Es posible que existan incongruencias o errores visuales).
[/?TIPO_PRODUCCION]

4. Hashtags, Tags y Comentario Fijado (Orden Estricto):
[?TIPO_PRODUCCION=PRINCIPAL_16_9]
Límite Estricto de Hashtags (Horizontales): La descripción principal concluirá con exactamente 5 hashtags (en español, formato #CamelCase), ni uno más, ni uno menos. Los dos primeros hashtags son obligatorios e inamovibles: #DocumentalEnEspañol y #AmantesDeLaHistoria. Los otros 3 hashtags deben ser creados referentes al tema específico del video.
[/?TIPO_PRODUCCION]
[?TIPO_PRODUCCION=REELS_9_16|TIMELAPSE|REELS_16_SEG|INMERSIVO_CONTEMPLATIVO]
Límite Estricto de Hashtags (Verticales/Promocionales/Reels): La descripción principal concluirá con exactamente 5 hashtags (en español, formato #CamelCase) referentes al tema del video, ni uno más, ni uno menos.
[/?TIPO_PRODUCCION]
Regla de Tags (Cajón Oculto): Los tags van a continuación de los hashtags. Ninguna palabra que ya haya sido empleada en el Título o en la Descripción debe aparecer duplicada aquí. El investigador SEO debe extraer sinónimos de nicho profundo y términos de cola larga que no fueron mencionados textualmente.
Comentario Fijado: El Comentario Fijado (CTA y enlaces) es obligatoriamente lo último que debe aparecer en la estructura del documento del empaque, cerrando la entrega.

VOLUMEN VIII: AUDITORÍA DE ÉLITE Y CONTROL DE CALIDAD
Capítulo 18: Checklist de Control de Calidad Final (QA)
La publicación de un documento de Huellas de la Humanidad es irreversible. Antes de presionar el botón de exportación y programar el video en la plataforma, el Director Ejecutivo, el Editor o el Arquitecto de Sistemas Audiovisuales debe confrontar el metraje final contra el siguiente escrutinio inflexible. Un solo fallo en este checklist implica la retención del episodio y la re-ingeniería del bloque defectuoso :[ ] 1. Contradicción Central: ¿La tensión histórica o paradoja planteada en el inicio permea de manera constante hasta la resolución del documental?[ ] 2. Promesa Narrativa: ¿El enigma, revelación o experiencia prometida antes del minuto 02:00 fue resuelta y entregada plenamente al espectador?[ ] 3. Filtro de Realidad (Anacronismos): ¿Se ha auditado visualmente cada plano para garantizar la inexistencia total de prendas, objetos de cristal moderno, arquitectura incoherente o tecnología anacrónica?[ ] 4. Auditoría Anti-Estancamiento (Planos): ¿Se ha verificado que ningún tipo de plano (ej. Drone reveal) se repita idénticamente en el rango cercano de los últimos 6 a 8 clips?[ ] 5. Auditoría Anti-Estancamiento (Cámara): ¿Se ha constatado que el mismo movimiento de cámara no se encadena consecutivamente sin una justificación narrativa extrema?[ ] 6. Continuidad Ambiental: ¿Las transiciones entre clips mantienen una coherencia impecable en el uso del catálogo de iluminación, la materialidad de las ruinas y la textura del espacio?[ ] 7. Sinergia de Miniatura: ¿La miniatura gráfica proyecta una emoción dominante que intriga y que es complementaria (jamás repetitiva) respecto al título del video?[ ] 8. SEO de Precisión: ¿Los tags ocultos han sido curados para evitar la duplicación de cualquier término ya escrito en el título y en el cuerpo de la descripción?[ ] 9. Contención de Hashtags: ¿El bloque final de la descripción contiene un recuento estricto y exacto de cinco (5) hashtags?[ ] 10. Formato "Todo Corrido": ¿La descripción de la plataforma fluye orgánicamente sin el uso de subtítulos burocráticos, separada únicamente por una línea de retorno de carro entre párrafos?[ ] 11. Acoplamiento del Eslogan: ¿La pronunciación final del lema de la marca coincide milimétricamente con un plano de hipertextura que muestre una huella, rastro o marca física en un material histórico?[ ] 12. Sincronización Inversa Perfecta: ¿La cadencia de la locución humana (112-114 WPM) concuerda rítmicamente con los impactos visuales, y los silencios estructurales de 2 segundos han sido respetados para permitir la decantación emocional?

Este Manual Maestro de Producción no es un compendio de sugerencias; es el código genético inalterable que estructura el núcleo de Huellas de la Humanidad. Su ejecución meticulosa es el único mecanismo validado capaz de transformar simples secuencias algorítmicas en la reconstrucción viviente de nuestro pasado colectivo.
`;


const PromptGenerator = () => {
  const [activeTab, setActiveTab] = useState('generator');
  
  // History State for Undo/Redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [templateText, setTemplateText] = useState('');
  
  const [formData, setFormData] = useState({});

  // Cargar plantilla desde LocalStorage al iniciar
  useEffect(() => {
    const key = 'huellas_master_template_v47';
    const savedTemplate = localStorage.getItem(key);
    const initialText = savedTemplate ? savedTemplate : DEFAULT_TEMPLATE.trim();
    setTemplateText(initialText);
    setHistory([initialText]);
    setHistoryIndex(0);
  }, []);

  // Guardar plantilla en LocalStorage MANUALMENTE
  const saveTemplate = () => {
    const key = 'huellas_master_template_v47';
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
    Object.keys(groups).forEach(k => {
      finalGroups[k] = Array.from(groups[k]);
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
                {Object.keys(radioGroups).map(group => (
                  <div className="form-group" key={group}>
                    <label>{group.replace(/_/g, ' ')}</label>
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
                          <span>{val.replace(/_/g, ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
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
          <button className="btn" style={{ backgroundColor: '#2a2218', color: '#f5eedc', flexGrow: 1 }} onClick={downloadDoc}>📄 Descarga Rápida</button>
          <button className="btn" style={{ backgroundColor: '#3e3224', color: '#f5eedc', flexGrow: 1 }} onClick={downloadDocAs}>📁 Descargar en...</button>
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;
