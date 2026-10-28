--DDL PARA LA CREACIÓN DE TABLAS DEL SAPFPI---------
--**************************************************************************

--Borrado de las tablas
--**************************************************************************
DROP TABLE IF EXISTS tab_horas_instructores_planta;
DROP TABLE IF EXISTS tab_acontecimientos_x_jornadas;
DROP TABLE IF EXISTS tab_acontecimientos_x_afectados;
DROP TABLE IF EXISTS tab_acontecimientos;
DROP TABLE IF EXISTS tab_eventos_x_dias;
DROP TABLE IF EXISTS tab_eventos;
DROP TABLE IF EXISTS tab_fichas_complementarias;
DROP TABLE IF EXISTS tab_programas_complementarios;
DROP TABLE IF EXISTS tab_rutas_de_aprendizaje_x_raps_det;
DROP TABLE IF EXISTS tab_rutas_de_aprendizaje_det;
DROP TABLE IF EXISTS tab_fichas_tituladas;
DROP TABLE IF EXISTS tab_instructores_x_fichas;
DROP TABLE IF EXISTS tab_historial_lideres;
DROP TABLE IF EXISTS tab_plan_peda_x_com_x_raps;
DROP TABLE IF EXISTS tab_planeaciones_pedagogicas_det;
DROP TABLE IF EXISTS tab_planeaciones_pedagogicas_enc;
DROP TABLE IF EXISTS tab_programas;
DROP TABLE IF EXISTS tab_actividades_del_proyecto_x_competencias;
DROP TABLE IF EXISTS tab_actividades_del_proyecto;
DROP TABLE IF EXISTS tab_raps_x_competencias;
DROP TABLE IF EXISTS tab_raps;
DROP TABLE IF EXISTS tab_instructores_x_competencias;
DROP TABLE IF EXISTS tab_competencias;
DROP TABLE IF EXISTS tab_red_x_instructor;
DROP TABLE IF EXISTS tab_area_x_instructor;
DROP TABLE IF EXISTS tab_users;
DROP TABLE IF EXISTS tab_areas;
DROP TABLE IF EXISTS tab_redes;
DROP TABLE IF EXISTS tab_ambientes;
DROP TABLE IF EXISTS tab_instructores;
DROP TABLE IF EXISTS tab_cargos;

--Creación de la tabla de Cargos--
--**************************************************************************
CREATE TABLE tab_cargos(
    id_cargo            DECIMAL(1,0)        NOT NULL,   --Identifiación del cargo que se crea en el sistema
    nom_cargo           VARCHAR             NOT NULL,   --Nombre del cargo que se crea en el sistema
    ind_directivo       BOOLEAN             NOT NULL,   --TRUE=Si es directivo False=No es directivo
    usr_insert          VARCHAR             NOT NULL,
    fec_insert          TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update          VARCHAR,
    fec_update          TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_cargo)
);
--**************************************************************************

--Creación de la tabla de Instructores--
--**************************************************************************
CREATE TABLE tab_instructores(
    id_instruc          DECIMAL(11,0)     NOT NULL,                     --Identifiación del trabajdor que se crea en el sistema
    nom_instruc         VARCHAR           NOT NULL,                     --Nombre del instructor que se crea en el sistema
    apelli_instruc      VARCHAR           NOT NULL,                     --Apellido del instructor que se crea en el sistema
    tele_instruc        DECIMAL(10,0)     NOT NULL,                     --Teléfono del instructor que se crea en el sistema
    correo_instruc      VARCHAR           NOT NULL,                     --Correo del instructor que se crea en el sistema
    id_cargo            DECIMAL(1,0)      NOT NULL,                     --Identifiación del cargo que tiene el instructor en la institución
    ind_planta          BOOLEAN           NOT NULL,                     --True=Intructor es de planta / False=Instructor de contrato
    fec_ini_contrat     DATE,                                           --Fecha de contratación del instructor
    fec_fin_contrat     DATE,                                           --Fecha de finalizacion del contrato del instructor
    ind_disponib        BOOLEAN           NOT NULL,                     --TRUE=Este instructor está disponible False=No está disponible
    ind_estado          BOOLEAN           NOT NULL,                     --TRUE=Este instructor tiene contrato activo False=No tiene contrato disponible o no trabaja ya con la institución
    ind_lider_ficha     BOOLEAN           NOT NULL    DEFAULT FALSE,    --TRUE=Este instructor es lider de ficha False=No es intructor lider
    usr_insert          VARCHAR           NOT NULL,
    fec_insert          TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update          VARCHAR,
    fec_update          TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_instruc),
    FOREIGN KEY(id_cargo) REFERENCES tab_cargos(id_cargo)
);

--Creación de la tabla de ambientes--
--**************************************************************************
CREATE TABLE tab_ambientes(
    id_ambiente             DECIMAL(3,0)        NOT NULL,   --Identifiación del ambiente que se crea en el sistema
    nom_ambiente            VARCHAR             NOT NULL,   --Nombre del ambiente que se crea en el sistema
    tipo_ambiente           VARCHAR             NOT NULL,   --'TI'=TIC 'EM'=Empresarial 'NO'=Normal Tipo del ambiente que se crea en el sistema
    ambiente_con_aire       BOOLEAN             NOT NULL,   --TRUE=Con / FALSE=Sin. El ambiente que se crea en el sistema tiene aire acondicionado
    numero_de_pc            DECIMAL(2,0)        NOT NULL,   --Cantidad de pc en el ambiente que se crea en el sistema
    ind_borrado             BOOLEAN             NOT NULL,
    usr_insert              VARCHAR             NOT NULL,
    fec_insert              TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update              VARCHAR,
    fec_update              TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_ambiente)
);

--Creación de la tabla de Red--
--**************************************************************************
CREATE TABLE tab_redes(
    id_red          DECIMAL(2,0)        NOT NULL,   --Identifiación de la red que se crea en el sistema
    nom_red         VARCHAR             NOT NULL,   --Nombre de la red que se crea en el sistema
    id_instruc      DECIMAL(11,0)       NOT NULL,   --Instructor Líder de la red
    ind_borrado     BOOLEAN             NOT NULL,
    usr_insert      VARCHAR             NOT NULL,
    fec_insert      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update      VARCHAR,
    fec_update      TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_red),
    FOREIGN KEY(id_instruc) REFERENCES tab_instructores(id_instruc)
);

--Creación de la tabla de Áreas--
--**************************************************************************
CREATE TABLE tab_areas(
    id_area         DECIMAL(2,0)        NOT NULL,       --Identifiación de la área que se crea en el sistema
    nom_area        VARCHAR             NOT NULL,       --Nombre de la área que se crea en el sistema
    id_red          DECIMAL(2,0)        NOT NULL,       --Identifiación de la red a la que pertenece el área que se crea en el sistema
    ind_borrado     BOOLEAN             NOT NULL,
    usr_insert      VARCHAR             NOT NULL,
    fec_insert      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update      VARCHAR,
    fec_update      TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_area),
    FOREIGN KEY(id_red) REFERENCES tab_redes(id_red)
);

--Creación de la tabla de Usuarios--
--**************************************************************************
CREATE TABLE tab_users(
    id_user         DECIMAL(11,0)     NOT NULL,   --Identifiación del usuario que puede entrar al sistema
    pass_user       VARCHAR           NOT NULL,   --Contraseña del usuario que puede entrar al sistema
    usr_insert      VARCHAR           NOT NULL,
    fec_insert      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update      VARCHAR,
    fec_update      TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_user)
);

--Creación de la tabla de Áreas x Instructor--
--**************************************************************************
CREATE TABLE tab_area_x_instructor(
    id_area         DECIMAL(2,0)        NOT NULL,       --Identificación de la área a la que pertenece el instructor
    id_instruc      DECIMAL(11,0)       NOT NULL,       --Identificación del instructor al que se le va a asignar un área
    usr_insert      VARCHAR             NOT NULL,
    fec_insert      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update      VARCHAR,
    fec_update      TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_area,id_instruc)
);

--Creación de la tabla de Redes x Instructor--
--**************************************************************************
CREATE TABLE tab_red_x_instructor(
    id_red          DECIMAL(2,0)        NOT NULL,   --Identificación de la red a la que pertenece el instructor
    id_inst         DECIMAL(11,0)       NOT NULL,   --Identificación del instructor al que se le va a asignar una red
    ind_lider       BOOLEAN             NOT NULL,   --TRUE=El instructor es el lider de esta red / False=El instructor no es el lider de la red
    usr_insert      VARCHAR             NOT NULL,
    fec_insert      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update      VARCHAR,
    fec_update      TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_red,id_inst)
);

--Creación de la tabla de Competenias--
--**************************************************************************
CREATE TABLE tab_competencias(
    id_competen                 DECIMAL(11,0)       NOT NULL,                   --Identifiación de la competencia que se crea en el sistema
    nom_competen                VARCHAR             NOT NULL,                   --Nombre de la competencia que se crea en el sistema
    ind_tipo_competen           VARCHAR             NOT NULL    DEFAULT 'Tn',   --Tipo de la competencia Tn=Técnica / Tr=Transversal
    val_duracion_competen       DECIMAL(3,0)        NOT NULL,                   --Duración en horas de la competencia que se crea en el sistema
    ind_borrado                 BOOLEAN             NOT NULL,
    usr_insert                  VARCHAR NOT NULL,
    fec_insert                  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update                  VARCHAR,
    fec_update                  TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_competen)
);

--Creación de la tabla de instructores x competencias--
--****************************************************************************************
CREATE TABLE tab_instructores_x_competencias(
    id_instruc      DECIMAL(11,0)     NOT NULL,       --Identifiación del instructor al que se le va a asignar una competencia
    id_competen     DECIMAL(11,0)     NOT NULL,       --Identifiación de la competencia que se va a aasignar
    usr_insert      VARCHAR           NOT NULL,
    fec_insert      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update      VARCHAR,
    fec_update      TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_instruc,id_competen)
);

--Creación de la tabla de resultados de aprendizaje--
--**************************************************************************
CREATE TABLE tab_raps(
    id_rap              DECIMAL(10,0)        NOT NULL,       --Identificación del resultado de aprendizaje que se crea en el sistema
    nom_rap             VARCHAR             NOT NULL,       --Nombre del resultado de aprendizaje que se crea en el sistema
    usr_insert          VARCHAR             NOT NULL,
    fec_insert          TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update          VARCHAR,
    fec_update          TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_rap)
);

--Creación de la tabla de competencias x resultados de aprendizaje--
--**************************************************************************
CREATE TABLE tab_raps_x_competencias(
    id_competen          DECIMAL(11,0)      NOT NULL,   --Identificación de la competencia
    id_rap               DECIMAL(3,0)       NOT NULL,   --Identificación del resultado de aprendizaje
    val_orden            DECIMAL(1,0)       NOT NULL,   --Ordén en los que se ven los resultado de aprendizaje
    usr_insert           VARCHAR            NOT NULL,
    fec_insert           TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update           VARCHAR,
    fec_update           TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_competen,id_rap)
);

--Creación de la tabla de actividades del proyecto--
--**************************************************************************
CREATE TABLE tab_actividades_del_proyecto(
    id_actividad_proyec         DECIMAL(11,0)       NOT NULL,   --Identificación de la actividad del proyecto de la competencia
    nom_actividad_proyec        VARCHAR             NOT NULL,   --Nombre del de la actividad del proyecto se crea en el sistema
    usr_insert                  VARCHAR             NOT NULL,
    fec_insert                  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update                  VARCHAR,
    fec_update                  TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_actividad_proyec)
);

--Creación de la tabla de actividades del proyecto x competencias--
--**************************************************************************
CREATE TABLE tab_actividades_del_proyecto_x_competencias(
    id_actividad_proyec     DECIMAL(11,0)       NOT NULL,     --Identificación de la actividad del proyecto que se le va a asignar a la competencia
    id_competen             DECIMAL(11,0)       NOT NULL,     --Identificación de la competencia que se le va asignar la actividad del proyecto
    usr_insert              VARCHAR             NOT NULL,
    fec_insert              TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update              VARCHAR,
    fec_update              TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_actividad_proyec,id_competen)
);

--Creación de la tabla de programas de formacion títulada--
--**************************************************************************
CREATE TABLE tab_programas(
    id_programa_titul       DECIMAL(11,0)       NOT NULL,        --Identificación del programa de formacion títulada que se crea en el sistema
    nom_programa_titul      VARCHAR             NOT NULL,        --Nombre del programa de formacion que se crea en el sistema
    tip_programa_titul      CHAR(2)             NOT NULL,        --Tipo de programa de formación Tn=Técnico / To=Tecnólogo / Es=Especialización
    dur_programa_titul      DECIMAL(4,0)        NOT NULL,        --Duración del programa de formacion en horas que se crea en el sistema
    ind_borrado             BOOLEAN             NOT NULL,
    usr_insert              VARCHAR             NOT NULL,
    fec_insert              TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update              VARCHAR,
    fec_update              TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_programa_titul)
);

--Creación de la tabla de planeación pedagógica encabezado--
--**************************************************************************
CREATE TABLE tab_planeaciones_pedagogicas_enc(
    id_planeacion_pedago        DECIMAL(11,0)       NOT NULL,   --Identificación de la planeación pedagógica que se crea en el sistema
    id_programa_titul           DECIMAL(11,0)       NOT NULL,   --Identifiación del programa de formacion títulada que se le esta asignando una planeación pedagógica
    usr_insert                  VARCHAR             NOT NULL,
    fec_insert                  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update                  VARCHAR,
    fec_update                  TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_planeacion_pedago),
    FOREIGN KEY(id_programa_titul) REFERENCES tab_programas(id_programa_titul)
);

--Creación de la tabla de planeación pedagógica detalle--
--**************************************************************************
CREATE TABLE tab_planeaciones_pedagogicas_det(
    id_planeacion_pedago          DECIMAL(11,0)       NOT NULL,     --Identificación de la planeación pedagógica a la que pertenecen
    nom_fase                      VARCHAR             NOT NULL,     --Nombre de la fase en la que se ve la competencia
    id_actividad_proyec           DECIMAL(11,0)       NOT NULL,     --Identificación de la actividad del proyecto que esta en la planeación pedagógica
    id_competen                   DECIMAL(11,0)       NOT NULL,     --Identificación de la competencia que esta en la planeación pedagógica
    id_area_instruc               DECIMAL(2,0)        NOT NULL,     --Identificación de la área que se requiere para el instructor que esta en la planeación pedagógica
    id_red_instruc                DECIMAL(2,0)        NOT NULL,     --Identificación de la área que se requiere para el instructor que esta en la planeación pedagógica
    horas_competen                DECIMAL(3,0)        NOT NULL,     --Cantidad de horas necesarias para ver la competencia
    usr_insert                    VARCHAR             NOT NULL,
    fec_insert                    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update                    VARCHAR,
    fec_update                    TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_planeacion_pedago,id_competen),
    FOREIGN KEY(id_actividad_proyec)    REFERENCES tab_actividades_del_proyecto(id_actividad_proyec),
    FOREIGN KEY(id_area_instruc)        REFERENCES tab_areas(id_area),
	FOREIGN KEY(id_red_instruc)         REFERENCES tab_redes(id_red)
);

--Creación de la tabla de planeación pedagógica detalle x resultados de aprendizaje--
--**************************************************************************
CREATE TABLE tab_plan_peda_x_com_x_raps(
    id_planeacion_pedago        DECIMAL(11,0)       NOT NULL,     --Identificación de la planeación pedagógica 
    id_competen                 DECIMAL(11,0)       NOT NULL,     --Identificación de la competencia
    id_rap                      DECIMAL(3,0)        NOT NULL,     --Identificación del resultado de aprendizaje
    usr_insert                  VARCHAR             NOT NULL,
    fec_insert                  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update                  VARCHAR,
    fec_update                  TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_planeacion_pedago,id_competen,id_rap)
);

--Creación de la tabla de fichas de formación titulada--
--**************************************************************************
CREATE TABLE tab_fichas_tituladas(
    id_ficha                    DECIMAL(11,0)       NOT NULL,                   --Identifiación de la ficha que se crea en el sistema
    id_programa_titul           DECIMAL(11,0)       NOT NULL,                   --Identifiación del programa de formación al que pertenece la ficha que se crea en el sistema
    ind_jornada                 VARCHAR(1)          NOT NULL,                   --Jornada a la que pertenece la ficha / 'M'=Mañana / 'T'=Tarde / 'N'=Noche
    id_instruc_lider            DECIMAL(11,0)       NOT NULL,                   --Identifiación del instructor lider de la ficha que se crea en el sistema
    id_ambiente                 DECIMAL(2,0)        NOT NULL,                   --Identificación del ambiente al que pertenece la ficha
    ind_modalidad               CHAR(1)             NOT NULL,                   --Identificación de la modalidad a la que pertenece la ficha / 'P'=Presencial / 'V'=Virtual / 'D'=Dual
    fec_ini                     DATE                NOT NULL,                   --Fecha que inicia la ficha que se crea en el sistema
    fec_fin                     DATE                NOT NULL,                   --Fecha que finaliza la ficha que se crea en el sistema
    fec_ini_etapa_produc        DATE                NOT NULL,                   --Fecha que inicia la ficha la etapa productiva que se crea en el sistema
    ind_etapa_produc            BOOLEAN             NOT NULL    DEFAULT FALSE,  --TRUE=La ficha está en etapa productiva / FALSE=La ficha no está en etapa productiva
    usr_insert                  VARCHAR             NOT NULL,
    fec_insert                  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update                  VARCHAR,
    fec_update                  TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_ficha),
    FOREIGN KEY(id_instruc_lider)   REFERENCES tab_instructores(id_instruc),
    FOREIGN KEY(id_ambiente)		REFERENCES tab_ambientes(id_ambiente),
    FOREIGN KEY(id_programa_titul)  REFERENCES tab_programas(id_programa_titul)
);

--Creación de la tabla de instructores por fichas para saber si es el lider de la ficha--
--**************************************************************************
CREATE TABLE tab_instructores_x_fichas(
    id_instruc      DECIMAL(11,0)       NOT NULL,   --Identificación del instructor
    id_ficha        DECIMAL(11,0)       NOT NULL,   --Identificación de la ficha
    ind_lider       BOOLEAN             NOT NULL,   --TRUE=Si el instructor es el líder de la ficha / FALSE=Si el instructor no es el lider de la ficha
    PRIMARY KEY(id_instruc,id_ficha)
);

--Creación de la tabla de Historial de líderes que han habido en una ficha--
--**************************************************************************
CREATE TABLE tab_historial_lideres(
    id_instruc      DECIMAL(11,0)       NOT NULL,   --Identificación del instructor
    id_ficha        DECIMAL(11,0)       NOT NULL,   --Identificación de la ficha
    fecha_inicio    DATE                NOT NULL,   --Cuando se le dío al instructor la ficha
    fecha_fin       DATE                NOT NULL,   --Cuando dejo de ser el líder de la ficha
    PRIMARY KEY(id_instruc,id_ficha)
);

--Creación de la tabla de rutas de aprendizaje detalle--
--**************************************************************************
CREATE TABLE tab_rutas_de_aprendizaje_det(
    id_ruta_aprendi         DECIMAL(11,0)       NOT NULL,   --Identificación de la ruta de aprendizaje
    nom_fase                VARCHAR             NOT NULL,   --Nombre de la fase a la que pertenece la competencia
    id_actividad_proyec     DECIMAL(11,0)       NOT NULL,   --Identificación de la actividad del proyecto
    id_competen             DECIMAL(11,0)       NOT NULL,   --Identificación de la competencia
    id_instruc              DECIMAL(11,0)       NULL,       --Identificación del instructor que dio la competencia
    ind_horas               DECIMAL(3,0)        NOT NULL,   --Cantidad de horas necesarias para la competencia
    hora_inicio             TIME                NOT NULL,   --Hora de inicio de la competencia
    hora_fin                TIME                NOT NULL,   --Hora de finalización de la competencia
    ind_dias                DECIMAL(3,0)        NOT NULL,   --Cantidad de días necesarios para la competencia
    fec_ini                 DATE                NOT NULL,   --Fecha inicio de la competencia
    fec_fin                 DATE                NOT NULL,   --Fecha fin de la competencia
	id_red                  DECIMAL(2,0)        NOT NULL,   --Identificación de la red a la que pertenece la competencia
    ind_jornada             VARCHAR(1)          NOT NULL,                   --Jornada a la que pertenece la ficha / 'M'=Mañana / 'T'=Tarde / 'N'=Noche
    usr_insert              VARCHAR             NOT NULL,
    fec_insert              TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update              VARCHAR,
    fec_update              TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_ruta_aprendi,id_competen),
    FOREIGN KEY(id_instruc)           REFERENCES tab_instructores(id_instruc),
    FOREIGN KEY(id_red)               REFERENCES tab_redes(id_red),
    FOREIGN KEY(id_actividad_proyec)  REFERENCES tab_actividades_del_proyecto(id_actividad_proyec)
);

--Creación de la tabla de rutas de aprendizaje detalle x resultados de aprendizaje--
--**************************************************************************
CREATE TABLE tab_rutas_de_aprendizaje_x_raps_det(
    id_ruta_aprendi     DECIMAL(11,0)       NOT NULL,   --Identificación de la ruta de aprendizaje 
    id_competen         DECIMAL(11,0)       NOT NULL,   --Identificación de la competencia que se le va a asignar un resultado de aprendizaje
    id_rap              DECIMAL(2,0)        NOT NULL,   --Identificación del resultado de aprendizaje que se la va a asignar a una competencia
    val_orden           DECIMAL(1,0)        NOT NULL,   --Ordén en los que se ven los resultado de aprendizaje
    usr_insert          VARCHAR             NOT NULL,
    fec_insert          TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update          VARCHAR,
    fec_update          TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_ruta_aprendi,id_competen,id_rap)
);

--Creación de la tabla de programas de formacion complementaria--
--**************************************************************************
CREATE TABLE tab_programas_complementarios(
    id_programa_complemen       DECIMAL(11,0)       NOT NULL,   --Identificación del programa de formacion complementario que se crea en el sistema
    nom_programa_complemen      VARCHAR             NOT NULL,   --Nombre del programa de formacion que se crea en el sistema
    id_competen_orienta         DECIMAL(11,0)       NOT NULL,   --Identificación de la competencia que se da en el programa de formación 
    dur_programa_complemen      DECIMAL(2,0)        NOT NULL,   --Duración del programa de formacion en horas que se crea en el sistema
    usr_insert                  VARCHAR             NOT NULL,
    fec_insert                  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update                  VARCHAR,
    fec_update                  TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_programa_complemen),
    FOREIGN KEY(id_competen_orienta) REFERENCES tab_competencias(id_competen)
);

--Creación de la tabla de fichas de formación complementaria--
--**************************************************************************
CREATE TABLE tab_fichas_complementarias(
    id_ficha_complemen          DECIMAL(11,0)       NOT NULL,   --Identificación de la ficha de formacion complementaria que se crea en el sistema
    id_programa_complemen       DECIMAL(11,0)       NOT NULL,   --Identificación del programa de formación al que pertenece la ficha que se crea en el sistema
    ind_modalidad               CHAR(1)             NOT NULL,   --P si es presencial /V si es virtual
    id_ambiente                 DECIMAL(3,0)        NOT NULL,   --Identificación del ambiente que se va a dar la competencia
    instruc_orienta             DECIMAL(11,0)       NOT NULL,   --Identificación del instructor que va a orientar la competencia asignada
    fec_inicio                  DATE                NOT NULL,   --Fecha de inicio de la ficha que se crea en el sistema
    fec_fin                     DATE                NOT NULL,   --Fecha que finaliza la ficha que se crea en el sistema
    hora_inicio                 TIME                NOT NULL,   --Hora de inicio de la jornada de la ficha
    hora_fin                    TIME                NOT NULL,   --Hora que finaliza la la jornada de la ficha
    ind_estado                  BOOLEAN             NOT NULL,   --La ficha esta activa o no
    usr_insert                  VARCHAR             NOT NULL,
    fec_insert                  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update                  VARCHAR,
    fec_update                  TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_ficha_complemen),
    FOREIGN KEY(id_programa_complemen)  REFERENCES tab_programas_complementarios(id_programa_complemen),
    FOREIGN KEY(id_ambiente)            REFERENCES tab_ambientes(id_ambiente),
    FOREIGN KEY(instruc_orienta)           REFERENCES tab_instructores(id_instruc)
);

--Creación de la tabla de eventos--
--**************************************************************************
CREATE TABLE tab_eventos(
    id_evento           DECIMAL(11,0)       NOT NULL,   --Identificación del evento que se va a crear(Entero Incrementable)
    id_ficha            DECIMAL(11,0)       NOT NULL,   --Identificación de la ficha que va a estar involucrada en el evento
    id_instruc          DECIMAL(11,0)       NOT NULL,   --Identificación del insructor que va a estar involucrado en el evento
    id_ambiente         DECIMAL(11,0)       NOT NULL,   --Identificación del ambiente donde se va a realizar el evento
    id_competen         DECIMAL(11,0)       NOT NULL,   --Identificación de la competencia que se va a ver en el evento
    fecha_inicio        DATE                NOT NULL,   --Fecha de inicio del evento
    fecha_fin           DATE                NOT NULL,   --Fecha fin del evento
    hora_inicio         TIME                NOT NULL,   --Hora de inicio de la jornada de la ficha
    hora_fin            TIME                NOT NULL,   --Hora que finaliza la la jornada de la ficha
    ind_jornada         VARCHAR(1)          NOT NULL,   --Jornada a la que pertenece la ficha / 'M'=Mañana / 'T'=Tarde / 'N'=Noche
    usr_insert          VARCHAR             NOT NULL,
    fec_insert          TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update          VARCHAR,
    fec_update          TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_evento),
    FOREIGN KEY(id_ficha)       REFERENCES tab_fichas_tituladas(id_ficha),
    FOREIGN KEY(id_instruc)     REFERENCES tab_instructores(id_instruc),
    FOREIGN KEY(id_ambiente)    REFERENCES tab_ambientes(id_ambiente),
    FOREIGN KEY(id_competen)    REFERENCES tab_competencias(id_competen)
);

--Creación de la tabla de eventos x días--
--**************************************************************************
CREATE TABLE tab_eventos_x_dias(
    id_evento       DECIMAL(11,0)         NOT NULL,   --Identificación del evento
    ind_dias        DECIMAL(1,0)          NOT NULL,   --Identificación de los dias donde 0=Domingo / 1=Lunes / 2=Martes / 3=Miercoles / 4=Jueves / 5=Viernes / 6=Sabado
    usr_insert      VARCHAR               NOT NULL,
    fec_insert      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update      VARCHAR,
    fec_update      TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_evento,ind_dias)
);

--Creación de la tabla de acontecimientos--
--**************************************************************************
CREATE TABLE tab_acontecimientos(
    id_acontecimiento       DECIMAL(11,0)       NOT NULL,   --Identificación del acontecimiento que se va a crear
    nom_acontecimiento      VARCHAR             NOT NULL,   --Tipo de acontecimiento que se va a crear
    fec_inicio              DATE                NOT NULL,   --Fecha de inicio del acontecimiento
    fec_fin                 DATE                NOT NULL,   --Fecha de finalización del acontecimiento
    hora_inicio             DATE                NOT NULL,   --Fecha de inicio del acontecimiento
    hora_fin                DATE                NOT NULL,   --Fecha de finalización del acontecimiento
    ind_estado              BOOLEAN             NOT NULL,   --True=Si el acontecimiento ya sucedio / False=Si el acontecimiento no a sucedido
    usr_insert              VARCHAR             NOT NULL,
    fec_insert              TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update              VARCHAR,
    fec_update              TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_acontecimiento)
);

--Creación de la tabla de acontecimientos x afectados--
--**************************************************************************
CREATE TABLE tab_acontecimientos_x_afectados(
    id_acontecimiento       DECIMAL(11,0)       NOT NULL,   --Identificación del acontecimiento 
    id_afectado             DECIMAL(11,0)       NOT NULL,   --Identificación de los afectados en el acontecimiento
    usr_insert              VARCHAR             NOT NULL,
    fec_insert              TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update              VARCHAR,
    fec_update              TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_acontecimiento,id_afectado)
);

--Creación de la tabla de acontecimientos x jornadas--
--**************************************************************************
CREATE TABLE tab_acontecimientos_x_jornadas(
    id_acontecimiento       DECIMAL(11,0)       NOT NULL,   --Identificación del acontecimiento
    ind_jornada             VARCHAR(1)          NOT NULL,   --Jornada a la que pertenece la ficha / 'M'=Mañana / 'T'=Tarde / 'N'=Noche
    usr_insert              VARCHAR             NOT NULL,
    fec_insert              TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update              VARCHAR,
    fec_update              TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(id_acontecimiento,ind_jornada)
);

--INSERT INTO tab_acontecimientos_x_jornadas VALUES(1,'M')

--Creación de la tabla de horas de instructores de planta--
--**************************************************************************
CREATE TABLE tab_horas_instructores_planta(
    ind_mes                 DECIMAL(2,0)        NOT NULL,   --Mes del año donde 1=Enero / 2=Febrero / 3=Marzo / 4=Abril / 5=Mayo / 6=Junio / 7=Julio / 8=Agosto / 9=Septiembre / 10=Octubre / 11=Noviembre / 12=Diciembre
    año_actual              DECIMAL(4,0)        NOT NULL,   --Año actual
    hora_directa            DECIMAL(3,0)        NOT NULL,   --Horas directas en el mes
    hora_alistamiento       DECIMAL(3,0)        NOT NULL,   --Horas de alistamiento en el mes
    hora_totales            DECIMAL(3,0)        NOT NULL,   --Horas totales en el mes
    usr_insert              VARCHAR             NOT NULL,
    fec_insert              TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usr_update              VARCHAR,
    fec_update              TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY(ind_mes,año_actual)
);

--CREACIÓN DEL LA FUNCION PARA LA INSERCIÓN Y ACTUALIZACION DE LAS TABLAS(AUDITORIA)
--**************************************************************************
CREATE OR REPLACE FUNCTION fun_act_tabla() RETURNS TRIGGER AS
$$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            NEW.usr_insert = CURRENT_USER;
            NEW.fec_insert = CURRENT_TIMESTAMP;
        END IF;
        IF TG_OP = 'UPDATE' THEN
            NEW.usr_update = CURRENT_USER;
            NEW.fec_update = CURRENT_TIMESTAMP;
        END IF;
        RETURN NEW;
    END;
$$
LANGUAGE PLPGSQL;

--Creación de los TRIGGERS PARA LA AUDITORÍA--
--**************************************************************************
CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_cargos
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_redes
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_areas
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_instructores
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_area_x_instructor
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_red_x_instructor
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_competencias
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_instructores_x_competencias
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_raps
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_raps_x_competencias
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_actividades_del_proyecto
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_actividades_del_proyecto_x_competencias
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_programas
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_planeaciones_pedagogicas_enc
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_planeaciones_pedagogicas_det
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_plan_peda_x_com_x_raps
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_fichas_tituladas
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_rutas_de_aprendizaje_det
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_rutas_de_aprendizaje_x_raps_det
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_ambientes
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_programas_complementarios
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_fichas_complementarias
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_eventos
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_eventos_x_dias
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_acontecimientos
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_acontecimientos_x_afectados
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_acontecimientos_x_jornadas
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

CREATE OR REPLACE TRIGGER tri_act_tabla BEFORE INSERT OR UPDATE ON tab_horas_instructores_planta
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();


--Trigger para la creación de la tabla instructores y competencias
--**************************************************************************
/*CREATE OR REPLACE FUNCTION fun_ins_act_tabla() RETURNS TRIGGER AS
$$
    DECLARE wareacompetencia tab_competencias.id_competen%TYPE;
    DECLARE wredcompetencia tab_competencias.id_red_competen%TYPE;
    BEGIN
        IF TG_OP = 'INSERT' THEN
            IF EXISTS (SELECT 1 FROM tab_instructores WHERE id_instruc = NEW.id_instruc) THEN
                RAISE NOTICE 'El instructor si existe';
            ELSE
                RAISE NOTICE 'Instructor no existe... Primero creelo y luego hablamos';
                ROLLBACK;
            END IF;
            IF EXISTS (SELECT 1 FROM tab_competencias WHERE id_competen = NEW.id_competen) THEN
                RAISE NOTICE 'La competencia si existe';
            ELSE
                RAISE NOTICE 'Competencia no existe... Primero creelo y luego hablamos';
                ROLLBACK;
            END IF;

            SELECT a.id_area_competen INTO wareacompetencia FROM tab_competencias AS a
            WHERE a.id_competen = NEW.id_competen;

            INSERT INTO tab_area_x_instructor VALUES(wareacompetencia,NEW.id_instruc);
            IF FOUND THEN
                RAISE NOTICE 'Funciono';
            ELSE
                RAISE NOTICE 'No Funciono';
                ROLLBACK;
            END IF;

            SELECT a.id_red_competen INTO wredcompetencia FROM tab_competencias AS a
            WHERE a.id_competen = NEW.id_competen;

            INSERT INTO tab_red_x_instructor VALUES(NEW.id_instruc,wredcompetencia);
            IF FOUND THEN
                RAISE NOTICE 'Funciono';
            ELSE
                RAISE NOTICE 'No Funciono';
                ROLLBACK;
            END IF;
        END IF;
        IF TG_OP = 'UPDATE' THEN

            SELECT a.id_area_competen INTO wareacompetencia FROM tab_competencias AS a
            WHERE a.id_competen = NEW.id_competen;

            INSERT INTO tab_area_x_instructor VALUES(wareacompetencia,NEW.id_instruc);
            IF FOUND THEN
                RAISE NOTICE 'Funciono';
            ELSE
                RAISE NOTICE 'No Funciono';
                ROLLBACK;
            END IF;

            SELECT a.id_red_competen INTO wredcompetencia FROM tab_competencias AS a
            WHERE a.id_competen = NEW.id_competen;

            INSERT INTO tab_red_x_instructor VALUES(NEW.id_instruc,wredcompetencia);
            IF FOUND THEN
                RAISE NOTICE 'Funciono';
            ELSE
                RAISE NOTICE 'No Funciono';
                ROLLBACK;
            END IF;
        END IF;
        RETURN NEW;
    END;
$$
LANGUAGE PLPGSQL;*/


--Trigger para actualizar la tabla de areas y redes--
--******************************************************************************************---
/*CREATE OR REPLACE TRIGGER tri_inst_act_tabla AFTER INSERT OR UPDATE ON tab_instructores_x_competencias
FOR EACH ROW EXECUTE PROCEDURE fun_ins_act_tabla();*/


--INSERT INTO tab_instructores_x_competencias VALUES(1005297014,22589)
--INSERT INTO tab_roles VALUES(1,'m');
--INSERT INTO tab_instructores VALUES(25555,1,'msmsm','maic','essss','sadsada',3232,false);

--INSERT INTO tab_roles VALUES(1,'m');
--INSERT INTO tab_redes VALUES(1,'Bilinguismo');
--INSERT INTO tab_areas VALUES(3,1,'ingles');
--INSERT INTO tab_areas VALUES(2,1,'señas');
--INSERT INTO tab_competencias VALUES(2222,3,1,'Transversal','Interactuar',80);

--(25555,1,'msmsm','maic','essss','sadsada',3232,TRUE,false);-

--INSERT INTO tab_instructores_x_competencias VALUES(25555,2222)