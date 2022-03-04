-- db structure --
CREATE DATABASE IF NOT EXISTS forum;

USE forum;

CREATE TABLE IF NOT EXISTS `user` (
    `mail` VARCHAR(51) UNIQUE NOT NULL,
    `password` VARCHAR(51) NOT NULL,
    `name` VARCHAR(21) NOT NULL,
    `surname` VARCHAR(21) NOT NULL,
    `country` ENUM('Italy','France', 'Germany', 'USA', 'Spain', 'England'),
    PRIMARY KEY (mail)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `user_access` (
    `token` VARCHAR(128) UNIQUE NOT NULL,
    `creation_date` TIMESTAMP NOT NULL,
    `expired_date` TIMESTAMP NOT NULL,
    `user_id` VARCHAR(51) NOT NULL,
    PRIMARY KEY (token)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `post` (
    `post_id` VARCHAR(129) UNIQUE NOT NULL,
    `creation_date` TIMESTAMP NOT NULL,
    `topic` ENUM('Music', 'Work', 'Food', 'Love', 'Nature', 'Sport', 'Money', 'Shopping', 'Television'),
    `title` VARCHAR(101) NOT NULL,
    `description` TEXT NOT NULL,
    `user_id` VARCHAR(51) NOT NULL,
    PRIMARY KEY (post_id)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `like_content` (
    `id` INTEGER AUTO_INCREMENT NOT NULL,
    `post_id` VARCHAR(129) NOT NULL,
    `user_id` VARCHAR(51) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT UniqueLike UNIQUE (post_id,user_id)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `comment_content` (
    `id` INTEGER AUTO_INCREMENT NOT NULL,
    `creation_date` TIMESTAMP NOT NULL,
    `description` TEXT NOT NULL,
    `post_id` VARCHAR(129) NOT NULL,
    `user_id` VARCHAR(51) NOT NULL,
    PRIMARY KEY (id) 
)ENGINE=InnoDB;

-- db insert values --
INSERT INTO user VALUES(
    'corrieredellasera@gmail.com',
    'PiPoFgA5WUoziU9lZOGxNIu9egCI1CxKy3PurtWcAJ0=',
    'Corriere',
    'Sera',
    'Italy'
);

INSERT INTO post VALUES(
    '2277f752dae2f0dd731d50dbb12765219a0c375fbb04da2f1065cd3e28636687f046ee249f6f488f164c2003f008d5c59235f410eb66a3333be33df3f4f7f443',
    '2021-03-04 14:54:43',
    'Food',
    'Il diritto al cibo nel diritto internazionale',
    "Il diritto al cibo e' stato sancito per la prima volta nel 1948 all'interno dell' Articolo 25 della Dichiarazione Universale dei Diritti Umani, dove si esplicita il diritto di ogni individuo ad avere un tenore di vita sufficiente a garantire la salute e il benessere proprio e della propria famiglia, con particolare riguardo all'alimentazione. Nel 1966 la Convenzione (o Patto) Internazionale sui Diritti Economici, Sociali e Culturali (ICESCR), entrata in vigore nel 1976, riconosce, all'Articolo 11, il diritto di ognuno ad uno stile di vita adeguato che includa un adeguato accesso al cibo e il diritto fondamentale ad essere libero dalla fame. Ad oggi, 169 Paesi hanno ratificato la Convenzione, impegnandosi a intraprendere percorsi che ne facilitino l'attuazione e assicurino la tutela dei diritti per ogni individuo.
    Infatti, i Paesi sono tenuti ad adottare, individualmente e/o attraverso la cooperazione internazionale, tutte le misure concrete e necessarie per migliorare i metodi di produzione, conservazione e distribuzione delle derrate alimentari, per sviluppare e riformare i regimi agrari secondo le nuove conoscenze e tecnologie (migliorando anche l'uso delle risorse naturali), e per assicurare un'equa distribuzione delle risorse alimentari mondiali in relazione ai bisogni dei singoli Paesi, sia importatori che esportatori.",
    'corrieredellasera@gmail.com'
);

INSERT INTO post VALUES(
    '2277f752dae6f0dd731d50dbb12765219a0c375fbb04da2f1065cd3e28636687f046ee249f6f488f164c2003f008d5c59255f410eb66a3333be33df3f4f7f443',
    '2022-03-04 14:54:43',
    'Sport',
    'Inter-Salernitana',
    "All'andata in terra campana, fu un dominio incontrastato dell'Inter a caratterizzare il match, con un secco 0-5 a lanciare gli uomini di Inzaghi (gol di Perisic, Dumfries, Sanchez, Lautaro e Gagliardini). In realta' e' stata la prima vittoria nerazzurra in trasferta contro la Salernitana: negli altri due precedenti vinsero infatti i padroni di casa, nel 1948 e nel 1999. A Milano, invece, la storia racconta di un doppio successo interista per 2-1.",
    'corrieredellasera@gmail.com'
);

INSERT INTO post VALUES(
    '2277f752dae6f0dd731d50dbb12765219a0c375fbb04da2f1065cd3e28636687f026ee249f6f488f164c2003f008d5c59235f410eb66a3333be33df3f4f7f443',
    '2022-03-04 14:54:43',
    'Sport',
    "Murray, non c'e' due senza tre",
    "Dopo essersi separato da Jamie Delgado lo scorso dicembre, Andy non ha piu' trovato pace a livello tecnico. Solo un paio di tentativi, con Esteban Carril e de Witt, ma senza proseguire con la collaborazione. Alla fine, Andy ha deciso di tornare sulla strada che lo aveva portato a conquistare i suoi tre titoli dello Slam e due ori olimpici: Ivan Lendl. I due avevano gia' lavorato insieme dal 2012 al 2014 e da giugno 2016 a november 2017. Secondo quanto riporta la testata britannica, Murray e Lendl riprenderanno a lavorare insieme in Florida, dopo il Masters 1000 di Miami. L'ex numero 1 al mondo seguira' lo scozzese per i tornei sull'erba, nel frattempo Andy andra' alla ricerca di un coach che possa seguirlo anche stabilmente sul circuito. L'Andy Murray di adesso ha quasi 35 anni e soprattutto gioca con un protesi all'anca. Ha ricevuto diverse wild card negli ultimi tornei ma senza mai raggiungere buoni risultati. In passato, Lendl aveva aiutato lo scozzese soprattutto sul lato mentale, aiutandolo a non cedere ai suoi frequenti scatti d'ira sul campo. Riuscira', Ivan il terribile, a rilanciare ancora una volta Sir Andy?",
    'corrieredellasera@gmail.com'
);