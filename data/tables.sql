DROP TABLE recherche;
DROP TABLE rechercheJoueur;
DROP TABLE amelioration;
DROP TABLE ameliorationVille;
DROP TABLE influence;
DROP TABLE ville;
DROP TABLE province;
DROP TABLE relation;
DROP TABLE joueur;

CREATE TABLE joueur (
    IdJoueur INTEGER 
    CONSTRAINT pk_joueur PRIMARY KEY,
    NomPays TEXT,
    RegimePays TEXT,
    DevisePays TEXT,
    DrapeauPays TEXT,
    PointMouvement INTEGER,
    Armee INTEGER,
    Marine INTEGER,
    Science INTEGER,
    Culture INTEGER,
    Religion INTEGER,
    Economie INTEGER,
    Territoire INTEGER
);

CREATE TABLE relation(
    Emmetteur INTEGER,
    Recepteur INTEGER,
    Statut TEXT
    CONSTRAINT ck_Status CHECK(Statut = "ALLIE" OR Statut = "ENNEMI" OR Statut = "NEUTRE" OR Statut = "SUZERAIN" OR Statut = "VASSAL"),
    Commentaire TEXT,
    CONSTRAINT fk_relation_emmeteur FOREIGN KEY (Emmetteur) REFERENCES joueur(IdJoueur),
    CONSTRAINT fk_relation_recepteur FOREIGN KEY (Recepteur) REFERENCES joueur(IdJoueur),
    CONSTRAINT pk_relation PRIMARY KEY(Emmetteur,Recepteur)
);

CREATE TABLE province(
    IdProvince INTEGER
    CONSTRAINT pk_province PRIMARY KEY,
    NomProvince TEXT,
    ProprietaireProvince INTEGER,
    CONSTRAINT fk_province_joueur FOREIGN KEY (ProprietaireProvince) REFERENCES joueur(IdJoueur)
);

CREATE TABLE ville(
    IdVille INTEGER
    CONSTRAINT pk_ville PRIMARY KEY,
    NomVille INTEGER,
    ProprietaireVille INTEGER,
    LaProvince INTEGER,
    CONSTRAINT fk_ville_joueur FOREIGN KEY (ProprietaireVille) REFERENCES joueur(IdJoueur),
    CONSTRAINT fk_ville_province FOREIGN KEY (LaProvince) REFERENCES province(IdProvince)
);

CREATE TABLE influence(
    VilleInfluencee INTEGER,
    JoueurInfluencant INTEGER,
    InfluenceReligieuse INTEGER,
    InfluenceEconomique INTEGER,
    CONSTRAINT fk_influence_ville FOREIGN KEY (VilleInfluencee) REFERENCES ville(IdVille),
    CONSTRAINT fk_influence_joueur FOREIGN KEY (JoueurInfluencant) REFERENCES joueur(IdJoueur),
    CONSTRAINT pk_influence PRIMARY KEY(VilleInfluencee,JoueurInfluencant)
);

CREATE TABLE ameliorationVille(
    LaVille INTEGER,
    LAmelioration INTEGER,
    CONSTRAINT fk_ameliorationVille_ville FOREIGN KEY (LaVille) REFERENCES ville(IdVille),
    CONSTRAINT fk_ameliorationVille_amelioration FOREIGN KEY (LAmelioration) REFERENCES amelioration(IdAmelioration),
    CONSTRAINT pk_ameliorationVille PRIMARY KEY(LaVille,LAmelioration)
);

CREATE TABLE amelioration(
    IdAmelioration INTEGER
    CONSTRAINT pk_amelioration PRIMARY KEY,
    NomAmelioration TEXT,
    DescritpionAmelioration TEXT,
    CoutAmelioration INTEGER
);

CREATE TABLE rechercheJoueur(
    LeJoueur INTEGER,
    LaRecherche INTEGER,
    CONSTRAINT fk_rechercheJoueur_joueur FOREIGN KEY (LeJoueur) REFERENCES joueur(IdJoueur),
    CONSTRAINT fk_rechercheJoueur_recherche FOREIGN KEY (LaRecherche) REFERENCES recherche(IdRecherche),
    CONSTRAINT pk_rechercheJoueur PRIMARY KEY(LeJoueur,LaRecherche)
);

CREATE TABLE recherche(
    IdRecherche INTEGER
    CONSTRAINT pk_recherche PRIMARY KEY,
    NomRecherche TEXT,
    DescritpionRecherche TEXT,
    CoutScienceRecherche INTEGER,
    CoutCultureRecherche INTEGER
);

INSERT INTO joueur (IdJoueur, NomPays) VALUES (0, "aucun joueur");
INSERT INTO province (IdProvince, NomProvince, ProprietaireProvince) VALUES (0, "aucune province", 0);

-- TODO : a enlever dans le futur et replacer par un autre script
INSERT INTO amelioration (IdAmelioration, NomAmelioration, DescritpionAmelioration, CoutAmelioration)
VALUES (1,"Amelioration 1", "la premère amélioration", 1);
INSERT INTO amelioration (IdAmelioration, NomAmelioration, DescritpionAmelioration, CoutAmelioration)
VALUES (2,"Amelioration 2", "la deuxième amélioration", 5);
INSERT INTO amelioration (IdAmelioration, NomAmelioration, DescritpionAmelioration, CoutAmelioration)
VALUES (3,"Amelioration 3", "la troisième amélioration", 10);

INSERT INTO recherche (IdRecherche, NomRecherche, DescritpionRecherche, CoutScienceRecherche, CoutCultureRecherche)
VALUES (1, "Recherche scientifique", "description 1",5,0);
INSERT INTO recherche (IdRecherche, NomRecherche, DescritpionRecherche, CoutScienceRecherche, CoutCultureRecherche)
VALUES (2, "Recherche scientifique", "description 2",0,5);
INSERT INTO recherche (IdRecherche, NomRecherche, DescritpionRecherche, CoutScienceRecherche, CoutCultureRecherche)
VALUES (3, "Recherche mixte", "description 3",5,5);
