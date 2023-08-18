PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "dictionnaire"(
   id	       INTEGER PRIMARY KEY NOT NULL
  ,francais    TEXT NOT NULL DEFAULT '[intraduisible]'
  ,pierrick    TEXT NOT NULL
  ,phonétique  TEXT NOT NULL
  ,classe      TEXT
  ,commentaire TEXT
  ,définition  TEXT
  ,étymologie  TEXT
  ,cyrilic TEXT
  ,hangeul TEXT
  ,soundexfr TEXT
  ,soundexprk TEXT);
INSERT INTO dictionnaire VALUES(1,'que','řō','ɻɔ̃','pron',NULL,'pronom relatif','a priori',NULL,NULL,'Q200','Ř000');
INSERT INTO dictionnaire VALUES(2,'[intraduisible]','řōs','ɻɔ̃s','pron',NULL,'indique que la proposition est cc de lieu','declinat de rō',NULL,NULL,NULL,'Ř800');
INSERT INTO dictionnaire VALUES(3,'[intraduisible]','řōþ','ɻɔ̃θ','pron',NULL,'indique que la proposition est cc de temps','declinat de rō',NULL,NULL,NULL,'Ř000');
INSERT INTO dictionnaire VALUES(4,'[intraduisible]','řōš','ɻɔ̃ʃ','pron',NULL,'indique que la proposition est cc de manière','declinat de rō',NULL,NULL,NULL,'Ř000');
INSERT INTO dictionnaire VALUES(5,'[intraduisible]','řōk','ɻɔ̃k','pron',NULL,'indique que la proposition est cc de moyen','declinat de rō',NULL,NULL,'M500','Ř200');
INSERT INTO dictionnaire VALUES(6,'[intraduisible]','řōð','ɻɔ̃ð','pron',NULL,'indique que la proposition est cc de but','declinat de rō',NULL,NULL,'B300','Ř000');
INSERT INTO dictionnaire VALUES(7,'[intraduisible]','řōf','ɻɔ̃f','pron',NULL,'indique que la proposition est cc de cause','declinat de rō',NULL,NULL,'C800','Ř900');
INSERT INTO dictionnaire VALUES(8,'[intraduisible]','řōfë','ɻɔ̃fø','pron',NULL,'indique que la proposition est cc de conséquence','declinat de rō',NULL,NULL,'C582','Ř900');
INSERT INTO dictionnaire VALUES(9,'[intraduisible]','řōv','ɻɔ̃v','pron',NULL,'indique que la proposition est cc d''hypothèse','declinat de rō',NULL,NULL,'H138','Ř900');
INSERT INTO dictionnaire VALUES(10,'[intraduisible]','řōg','ɻɔ̃g','pron',NULL,'indique que la proposition est cc de comparaison','declinat de rō',NULL,NULL,'C516','Ř700');
INSERT INTO dictionnaire VALUES(11,'[intraduisible]','řō','ɻɔ̃','pron',NULL,'indique que la proposition est cc de concession','declinat de rō',NULL,NULL,'C520','Ř000');
INSERT INTO dictionnaire VALUES(12,'[intraduisible]','řōhë','ɻɔ̃ʔø','pron',NULL,'indique que la proposition est cc d''opposition','declinat de rō',NULL,NULL,'O000','Ř000');
INSERT INTO dictionnaire VALUES(13,'[intraduisible]','kor','koʁ','pron',NULL,'renvoit au pronom de début de proposition','a priori',NULL,NULL,NULL,'K600');
INSERT INTO dictionnaire VALUES(15,'géminogenre','žeminogūřë','ʒɛmin̪ogɛɻø','nom',NULL,'désigne le fait de se sentir deux fois du même genre','emprunt au mot d''origine franco-anglais, lui même surement dérivé du latin gemino (jumeau) et genre',NULL,NULL,'G000','Ž000');
INSERT INTO dictionnaire VALUES(16,'dieu','Altër','altøʁ','nom p',NULL,'entité supérieur ayant créé le monde','Provient du pseudo Alterhis',NULL,NULL,'D000','A436');
INSERT INTO dictionnaire VALUES(17,'début','ðépu','ðepu','nom',NULL,'commencement','du francais début',NULL,NULL,'D132','Ð100');
INSERT INTO dictionnaire VALUES(18,'créer','krére','kʁeʁɛ','verbe',NULL,'Donner l’existence à quelque chose qui n’existait pas encore','du latin creare',NULL,NULL,'C000','K000');
INSERT INTO dictionnaire VALUES(19,'création','kréškio','kʁeʃkio','nom',NULL,'le fait de créer','du latin creatio',NULL,NULL,'C635','K620');
INSERT INTO dictionnaire VALUES(20,'ciel','këlu','kølu','nom',NULL,'Espace immense dans lequel se meuvent tous les astres.','du latin caelum',NULL,NULL,'C400','K400');
INSERT INTO dictionnaire VALUES(21,'terre','téra','teʁa','nom',NULL,'Sol sur lequel nous marchons, sur lequel les maisons sont construites, qui produit et nourrit les végétaux.','du latin terra',NULL,NULL,'T000','T600');
INSERT INTO dictionnaire VALUES(22,'et','tie','tiɛ','conj',NULL,'Concatène plusieurs concepts dans une même relation.','de l''indo-européen commun *eti',NULL,NULL,'E300','T000');
INSERT INTO dictionnaire VALUES(23,'être','ðeřë','ðɛɻø','verbe',NULL,'renvoit au pronom de début de proposition','du latin vulguaire *essĕre',NULL,NULL,'E360','Ð000');
INSERT INTO dictionnaire VALUES(24,'forme','vòrm','vɔʁm','nom',NULL,NULL,NULL,NULL,NULL,'F650','V650');
INSERT INTO dictionnaire VALUES(25,'informe','izvòrm','izvɔʁm','adj',NULL,NULL,NULL,NULL,NULL,'I596','I896');
INSERT INTO dictionnaire VALUES(26,'sans','diz','diz','adv',NULL,NULL,NULL,NULL,NULL,'S580','D800');
INSERT INTO dictionnaire VALUES(27,'chose','rez','ʁɛz','nom',NULL,NULL,NULL,NULL,NULL,'C817','R800');
INSERT INTO dictionnaire VALUES(28,'vide','dizrez','dizʁɛz','adj',NULL,NULL,NULL,NULL,NULL,'V300','D868');
INSERT INTO dictionnaire VALUES(29,'lumière','lümé','lyme','nom',NULL,NULL,NULL,NULL,NULL,'L560','L500');
INSERT INTO dictionnaire VALUES(30,'obscurité','dizlümé','dizlyme','nom',NULL,NULL,NULL,NULL,NULL,'O182','D845');
INSERT INTO dictionnaire VALUES(31,'au dessus de','desursu','dɛsuʁsu','adv',NULL,NULL,NULL,NULL,NULL,'A300','D868');
INSERT INTO dictionnaire VALUES(32,'abime','büssë','byssø','nom',NULL,NULL,NULL,NULL,NULL,'A157','B000');
INSERT INTO dictionnaire VALUES(33,'avoir','war','waʁ','verbe',NULL,NULL,NULL,NULL,NULL,'A960','W600');
INSERT INTO dictionnaire VALUES(34,'y','ü','y','adv',NULL,NULL,NULL,NULL,NULL,'U000','U000');
INSERT INTO dictionnaire VALUES(35,'pierrick','Piéritšk','pieʁitʃk','nom p',NULL,NULL,NULL,NULL,NULL,'P000','P632');
INSERT INTO dictionnaire VALUES(36,'pierrickistan','Piéritškistan','pieʁitʃkistan̪','nom p',NULL,NULL,NULL,NULL,NULL,'P000','P632');
INSERT INTO dictionnaire VALUES(37,'pierrikistanais','Linigwa-Piéritškistan','lin̪igwa-pieʁitʃkistan̪','nom',NULL,NULL,NULL,NULL,NULL,'P000','L571');
INSERT INTO dictionnaire VALUES(38,'eau','hüdor','ʔydoʁ','nom',NULL,NULL,NULL,NULL,NULL,'E000','H360');
INSERT INTO dictionnaire VALUES(39,'dire','déiktik','deiktik','verbe',NULL,NULL,NULL,NULL,NULL,'D600','D232');
INSERT INTO dictionnaire VALUES(40,'bonne','béar','beaʁ','adj',NULL,NULL,NULL,NULL,NULL,'B000','B600');
INSERT INTO dictionnaire VALUES(41,'séparer','sevar','sɛvaʁ','verbe',NULL,NULL,NULL,NULL,NULL,'S100','S960');
INSERT INTO dictionnaire VALUES(42,'donner','dar','daʁ','verbe',NULL,NULL,NULL,NULL,NULL,'D000','D600');
INSERT INTO dictionnaire VALUES(43,'nom','nòm','n̪ɔm','nom',NULL,NULL,NULL,NULL,NULL,'N500','N500');
INSERT INTO dictionnaire VALUES(44,'Appeler','nòmdar','n̪ɔmdaʁ','verbe',NULL,'donner un nom','contraction de nom et donner',NULL,NULL,'A000','N536');
INSERT INTO dictionnaire VALUES(45,'jour','diel','diɛl','nom',NULL,NULL,NULL,NULL,NULL,'J600','D400');
INSERT INTO dictionnaire VALUES(46,'nuit','nokt','n̪okt','nom',NULL,NULL,NULL,NULL,NULL,'N300','N230');
INSERT INTO dictionnaire VALUES(47,'ensuite','sa','sa','adv',NULL,NULL,NULL,NULL,NULL,'E583','S000');
INSERT INTO dictionnaire VALUES(48,'ainsi','sařōfë','saɻɔ̃fø','adv',NULL,NULL,NULL,NULL,NULL,'A580','S900');
INSERT INTO dictionnaire VALUES(49,'soir','fidiel','fidiɛl','nom',NULL,NULL,NULL,NULL,NULL,'S600','F340');
INSERT INTO dictionnaire VALUES(50,'fin','figo','figo','nom',NULL,NULL,NULL,NULL,NULL,'F500','F700');
INSERT INTO dictionnaire VALUES(51,'matin','finokt','fin̪okt','nom',NULL,NULL,NULL,NULL,NULL,'M350','F523');
INSERT INTO dictionnaire VALUES(52,'journée','dielsa','diɛlsa','nom','(déroulement d’un jour)',NULL,NULL,NULL,NULL,'J650','D480');
INSERT INTO dictionnaire VALUES(53,'ô','o','o','interjection',NULL,NULL,NULL,NULL,NULL,'O000','O000');
INSERT INTO dictionnaire VALUES(54,'saint','þākio','θãkio','nom',NULL,NULL,NULL,NULL,NULL,'S530','Þ200');
INSERT INTO dictionnaire VALUES(55,'saint','þākiopua','θãkiopua','adj',NULL,NULL,NULL,NULL,NULL,'S530','Þ210');
INSERT INTO dictionnaire VALUES(56,'fils','batrapë','batʁapø','nom p',NULL,'au sens biblique du terme',NULL,NULL,NULL,'F480','B361');
INSERT INTO dictionnaire VALUES(57,'De','dum','dum','prep',NULL,'preposition introduisant un cdn',NULL,NULL,NULL,'D000','D500');
INSERT INTO dictionnaire VALUES(58,'pureté','pudo','pudo','nom',NULL,NULL,NULL,NULL,NULL,'P630','P300');
INSERT INTO dictionnaire VALUES(59,'sagesse','sapia','sapia','nom',NULL,NULL,NULL,NULL,NULL,'S700','S100');
INSERT INTO dictionnaire VALUES(60,'sentir','sapire','sapiʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'S536','S160');
INSERT INTO dictionnaire VALUES(61,'symbole','sünibalo','syn̪ibalo','nom',NULL,NULL,NULL,NULL,NULL,'S514','S514');
INSERT INTO dictionnaire VALUES(62,'toi','té','te','pronom',NULL,NULL,NULL,NULL,NULL,'T000','T000');
INSERT INTO dictionnaire VALUES(63,'guérir','glibére','glibeʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'G000','G416');
INSERT INTO dictionnaire VALUES(64,'plaie','piaga','piaga','nom',NULL,NULL,NULL,NULL,NULL,'P414','P700');
INSERT INTO dictionnaire VALUES(65,'blesser','piagare','piagaʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'B400','P760');
INSERT INTO dictionnaire VALUES(66,'protéger','protegore','pʁotɛgoʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'P637','P637');
INSERT INTO dictionnaire VALUES(67,'avoir une maladie','gaere','gaɛʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'A960','G600');
INSERT INTO dictionnaire VALUES(68,'donner la capacité','darapture','daʁaptuʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'D000','D613');
INSERT INTO dictionnaire VALUES(69,'félicité','félika','felika','nom',NULL,NULL,NULL,NULL,NULL,'F423','F420');
INSERT INTO dictionnaire VALUES(70,'avoir la félicité','félikawar','felikawaʁ','verbe',NULL,NULL,NULL,NULL,NULL,'A964','F426');
INSERT INTO dictionnaire VALUES(71,'tout','tut','tut','nom',NULL,'le tout, l''ensemble des choses existantes',NULL,NULL,NULL,'T300','T300');
INSERT INTO dictionnaire VALUES(72,'beaucoup de','butut','butut','adv',NULL,NULL,NULL,NULL,NULL,'B213','B000');
INSERT INTO dictionnaire VALUES(73,'récolter','reko[ligo]re','ʁɛko[ligoʁɛ]','verbe',NULL,NULL,NULL,NULL,NULL,'R243','R247');
INSERT INTO dictionnaire VALUES(74,'récolte','rekoli[go]','ʁɛkoli[go]','nom',NULL,NULL,NULL,NULL,NULL,'R243','R247');
INSERT INTO dictionnaire VALUES(75,'pieu','pio','pio','nom',NULL,NULL,NULL,NULL,NULL,'P000','P000');
INSERT INTO dictionnaire VALUES(76,'impie','mipui','mipui','nom',NULL,NULL,NULL,NULL,NULL,'I510','M100');
INSERT INTO dictionnaire VALUES(77,'Loue','lòdare','lɔdaʁɛ','verbe',NULL,'chanter les louange',NULL,NULL,NULL,'L457','L360');
INSERT INTO dictionnaire VALUES(78,'Loué','lòdarea','lɔdaʁɛa','adj',NULL,NULL,NULL,NULL,NULL,'L457','L360');
INSERT INTO dictionnaire VALUES(79,'Amen','amen','amɛn̪','adv',NULL,'Clos une prière',NULL,NULL,NULL,'A000','A000');
INSERT INTO dictionnaire VALUES(80,'étendue','ketādo','kɛtãdo','nom',NULL,NULL,NULL,NULL,NULL,'E353','K000');
INSERT INTO dictionnaire VALUES(81,'entre','nétrë','n̪etʁø','adv',NULL,NULL,NULL,NULL,NULL,'E536','N360');
INSERT INTO dictionnaire VALUES(82,'avec','nūtr','n̪ɛ̃tʁ','adv',NULL,NULL,NULL,NULL,NULL,'A923','N360');
INSERT INTO dictionnaire VALUES(83,'en dessous de','desubsu','dɛsubsu','adv',NULL,NULL,NULL,NULL,NULL,'E530','D818');
INSERT INTO dictionnaire VALUES(84,'que','kë','kø','adv','adverbial',NULL,NULL,NULL,NULL,'Q000','K000');
INSERT INTO dictionnaire VALUES(85,'vers quelque chose','vesu','vɛsu','adv',NULL,NULL,NULL,NULL,NULL,'V682','V800');
INSERT INTO dictionnaire VALUES(86,'paraître','parér','paʁeʁ','verbe',NULL,NULL,NULL,NULL,NULL,'P636','P000');
INSERT INTO dictionnaire VALUES(87,'mer','maré','maʁe','nom',NULL,NULL,NULL,NULL,NULL,'M600','M600');
INSERT INTO dictionnaire VALUES(88,'sec','dizhüdor','dizʔydoʁ','nom',NULL,NULL,NULL,NULL,NULL,'S200','D836');
INSERT INTO dictionnaire VALUES(89,'voir','vidére','videʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'V600','V360');
INSERT INTO dictionnaire VALUES(90,'vert','wiri','wiʁi','adj',NULL,NULL,NULL,NULL,NULL,'V630','W600');
INSERT INTO dictionnaire VALUES(91,'verdure','wirdi','wiʁdi','nom',NULL,NULL,NULL,NULL,NULL,'V636','W630');
INSERT INTO dictionnaire VALUES(92,'produire','prodere','pʁodɛʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'P636','P636');
INSERT INTO dictionnaire VALUES(93,'herbe','gramën','gʁamøn̪','nom',NULL,NULL,NULL,NULL,NULL,'H610','G600');
INSERT INTO dictionnaire VALUES(94,'porter','p[h]er','f[ʔ]ɛʁ','verbe',NULL,NULL,NULL,NULL,NULL,'P636','P696');
INSERT INTO dictionnaire VALUES(95,'semence','sémen','semɛn̪','nom',NULL,NULL,NULL,NULL,NULL,'S000','S000');
INSERT INTO dictionnaire VALUES(96,'planter','sém[ene]re','sem[ɛn̪ɛ]ʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'P453','S000');
INSERT INTO dictionnaire VALUES(97,'En – de','-su','-su','particule',NULL,NULL,NULL,NULL,NULL,'E530','-800');
INSERT INTO dictionnaire VALUES(98,'fonction','füno','fyn̪o','nom',NULL,NULL,NULL,NULL,NULL,'F523','F500');
INSERT INTO dictionnaire VALUES(99,'espèce','speki','spɛki','nom',NULL,NULL,NULL,NULL,NULL,'E812','S120');
INSERT INTO dictionnaire VALUES(100,'arbre','rabo[s]','ʁabo[s]','nom',NULL,NULL,NULL,NULL,NULL,'A616','R180');
INSERT INTO dictionnaire VALUES(101,'fruit','fr[ükt]us','fʁ[ykt]us','nom',NULL,NULL,NULL,NULL,NULL,'F630','F623');
INSERT INTO dictionnaire VALUES(102,'du','dulé','dule','det','contraction de dum et le',NULL,NULL,NULL,NULL,'D000','D400');
INSERT INTO dictionnaire VALUES(103,'luminaire','lümé[né]r','lyme[n̪e]ʁ','nom',NULL,NULL,NULL,NULL,NULL,'L000','L000');
INSERT INTO dictionnaire VALUES(104,'pour faire qqchs','to','to','prep',NULL,NULL,NULL,NULL,NULL,'P696','T000');
INSERT INTO dictionnaire VALUES(105,'signe','sig','sig','nom',NULL,NULL,NULL,NULL,NULL,'S750','S700');
INSERT INTO dictionnaire VALUES(106,'marquer','markré','maʁkʁe','verbe',NULL,NULL,NULL,NULL,NULL,'M626','M626');
INSERT INTO dictionnaire VALUES(107,'époque','épošé','epoʃe','nom',NULL,NULL,NULL,NULL,NULL,'E120','E100');
INSERT INTO dictionnaire VALUES(108,'année','anno','an̪o','nom',NULL,NULL,NULL,NULL,NULL,'A000','A000');
INSERT INTO dictionnaire VALUES(109,'éclairer','lümére','lymeʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'E240','L560');
INSERT INTO dictionnaire VALUES(110,'servir','serwire','sɛʁwiʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'S696','S000');
INSERT INTO dictionnaire VALUES(111,'présider','présidere','pʁesidɛʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'P683','P683');
INSERT INTO dictionnaire VALUES(112,'grand','mag[a]nu[pua]','mag[a]n̪u[pua]','adj',NULL,NULL,NULL,NULL,NULL,'G653','M751');
INSERT INTO dictionnaire VALUES(113,'étoiles','stéla','stela','nom',NULL,NULL,NULL,NULL,NULL,'E348','S340');
INSERT INTO dictionnaire VALUES(114,'petit','puter','putɛʁ','adj',NULL,NULL,NULL,NULL,NULL,'P000','P360');
INSERT INTO dictionnaire VALUES(115,'aussi','héil','ʔeil','adv',NULL,NULL,NULL,NULL,NULL,'A000','H400');
INSERT INTO dictionnaire VALUES(116,'Langue','linigwa','lin̪igwa','nom','ce qu’on parle',NULL,NULL,NULL,NULL,'L570','L570');
INSERT INTO dictionnaire VALUES(117,'placer','plater','platɛʁ','verbe',NULL,NULL,NULL,NULL,NULL,'P426','P436');
INSERT INTO dictionnaire VALUES(118,'année','annuata','an̪uata','nom',NULL,NULL,NULL,NULL,NULL,'A000','A000');
INSERT INTO dictionnaire VALUES(119,'anneau','annuo','an̪uo','nom',NULL,NULL,NULL,NULL,NULL,'A000','A000');
INSERT INTO dictionnaire VALUES(120,'en forme d’anneau','annualis','an̪ualis','adj','avancement du o en i | particule alis',NULL,NULL,NULL,NULL,'E596','A000');
INSERT INTO dictionnaire VALUES(121,'déjà','jam','jam','prép',NULL,NULL,NULL,NULL,NULL,'D700','J500');
INSERT INTO dictionnaire VALUES(122,'fruit','vrug','vʁug','nom',NULL,NULL,NULL,NULL,NULL,'F630','V670');
INSERT INTO dictionnaire VALUES(123,'fructueux','vrugpua','vʁugpua','adj',NULL,NULL,NULL,NULL,NULL,'F623','V671');
INSERT INTO dictionnaire VALUES(124,'infructueux','izvrugpua','izvʁugpua','adj',NULL,NULL,NULL,NULL,NULL,'I596','I896');
INSERT INTO dictionnaire VALUES(125,'tenter','téndo','ten̪do','verbe',NULL,NULL,NULL,NULL,NULL,'T536','T530');
INSERT INTO dictionnaire VALUES(126,'tentation','téndat','ten̪dat','nom',NULL,NULL,NULL,NULL,NULL,'T500','T500');
INSERT INTO dictionnaire VALUES(127,'tentative','téndativa','ten̪dativa','nom',NULL,NULL,NULL,NULL,NULL,'T500','T500');
INSERT INTO dictionnaire VALUES(128,'unique','nuda','n̪uda','adj',NULL,NULL,NULL,NULL,NULL,'U520','N300');
INSERT INTO dictionnaire VALUES(129,'là','ijik','ijik','préposition','locatif',NULL,NULL,NULL,NULL,'L000','I720');
INSERT INTO dictionnaire VALUES(130,'moment','movtén','movten̪','moment',NULL,NULL,NULL,NULL,NULL,'M000','M935');
INSERT INTO dictionnaire VALUES(131,'temps','ténbu','ten̪bu','nom',NULL,NULL,NULL,NULL,NULL,'T518','T510');
INSERT INTO dictionnaire VALUES(132,'mouvoir','movére','moveʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'M960','M960');
INSERT INTO dictionnaire VALUES(133,'par','pér','peʁ','prép',NULL,NULL,NULL,NULL,NULL,'P600','P600');
INSERT INTO dictionnaire VALUES(134,'linguistique','linikwa','lin̪ikwa','nom',NULL,NULL,NULL,NULL,NULL,'L578','L520');
INSERT INTO dictionnaire VALUES(135,'linguistique','linikwapua','lin̪ikwapua','adj',NULL,NULL,NULL,NULL,NULL,'L578','L521');
INSERT INTO dictionnaire VALUES(136,'annexe','anek','an̪ɛk','nom',NULL,NULL,NULL,NULL,NULL,'A000','A520');
INSERT INTO dictionnaire VALUES(137,'Pratiquer','praktiškere','pʁaktiʃkɛʁɛ','verbe','s’entrainer',NULL,NULL,NULL,NULL,'P632','P623');
INSERT INTO dictionnaire VALUES(138,'boire','potere','potɛʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'B600','P360');
INSERT INTO dictionnaire VALUES(139,'potable','potéabis','poteabis','adj',NULL,NULL,NULL,NULL,NULL,'P314','P318');
INSERT INTO dictionnaire VALUES(140,'aboutir','ifigore','ifigoʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'A136','I976');
INSERT INTO dictionnaire VALUES(141,'prendre','kapior','kapioʁ','verbe','élision du E final',NULL,NULL,NULL,NULL,'P653','K160');
INSERT INTO dictionnaire VALUES(142,'chemin','kamano','kaman̪o','nom',NULL,NULL,NULL,NULL,NULL,'C000','K000');
INSERT INTO dictionnaire VALUES(143,'lent','lā','lã','adj',NULL,NULL,NULL,NULL,NULL,'L530','L000');
INSERT INTO dictionnaire VALUES(144,'texte','tekš','tɛkʃ','nom',NULL,NULL,NULL,NULL,NULL,'T830','T200');
INSERT INTO dictionnaire VALUES(145,'traduction','tréduškio','tʁeduʃkio','nom',NULL,NULL,NULL,NULL,NULL,'T632','T632');
INSERT INTO dictionnaire VALUES(146,'tuer','tütare','tytaʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'T600','T360');
INSERT INTO dictionnaire VALUES(147,'sacrer','skare','skaʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'S200','S260');
INSERT INTO dictionnaire VALUES(148,'sacré','skarpua','skaʁpua','adj',NULL,NULL,NULL,NULL,NULL,'S260','S261');
INSERT INTO dictionnaire VALUES(149,'main','mā','mã','nom',NULL,NULL,NULL,NULL,NULL,'M500','M000');
INSERT INTO dictionnaire VALUES(150,'peuple','poblo','poblo','nom',NULL,NULL,NULL,NULL,NULL,'P140','P140');
INSERT INTO dictionnaire VALUES(151,'comme','kam','kam','adv','à quel point',NULL,NULL,NULL,NULL,'C000','K500');
INSERT INTO dictionnaire VALUES(152,'respect','sepk','sɛpk','nom',NULL,NULL,NULL,NULL,NULL,'R812','S120');
INSERT INTO dictionnaire VALUES(153,'respecter','sepkre','sɛpkʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,'R812','S126');
INSERT INTO dictionnaire VALUES(154,'ennemi','inik','in̪ik','nom',NULL,NULL,NULL,NULL,NULL,'E000','I520');
INSERT INTO dictionnaire VALUES(155,'ennemi','iniks','in̪iks','adj',NULL,NULL,NULL,NULL,NULL,'E000','I528');
INSERT INTO dictionnaire VALUES(156,'âme','anima','an̪ima','nom',NULL,NULL,NULL,NULL,NULL,'A500','A000');
INSERT INTO dictionnaire VALUES(157,'emporter','waf[h]er','waf[ʔ]ɛʁ','verbe',NULL,NULL,NULL,NULL,NULL,'E516','W961');
INSERT INTO dictionnaire VALUES(159,'[intraduisible]','na','n̪a','conjug',NULL,'indique que le verbe est au présent de l''indicatif','a priori',NULL,NULL,NULL,'N000');
INSERT INTO dictionnaire VALUES(160,'[intraduisible]','žé','ʒe','conjug',NULL,'indique que le verbe est au parfait de l''indicatif','a priori',NULL,NULL,NULL,'Ž000');
INSERT INTO dictionnaire VALUES(161,'[intraduisible]','še','ʃɛ','conjug',NULL,'indique que le verbe est à l''imparfait de l''indicatif','a priori',NULL,NULL,NULL,'Š000');
INSERT INTO dictionnaire VALUES(162,'[intraduisible]','šò','ʃɔ','conjug',NULL,'indique que le verbe est au subjonctif présent','a priori',NULL,NULL,NULL,'Š000');
INSERT INTO dictionnaire VALUES(163,'[intraduisible]','an- -re → i','an̪- -ʁɛ → i','conjug','préfix- -suffix -marque sur verbe','indique que le verbe est un participe présent','a priori',NULL,NULL,NULL,'A560');
INSERT INTO dictionnaire VALUES(164,'[intraduisible]','an- -rë','an̪- -ʁø','conjug','préfix- -suffix','indique que le verbe est un participe passé','a priori',NULL,NULL,NULL,'A560');
INSERT INTO dictionnaire VALUES(165,'[intraduisible]','','',NULL,'absence de marque','indique que le verbe est à l''impératif','a priori',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(167,'tu','tu','tu','conjug',NULL,'indique que le verbe est à la deuxième personne du singulier',NULL,NULL,NULL,NULL,'T000');
INSERT INTO dictionnaire VALUES(168,'il','li','li','conjug',NULL,'indique que le verbe est à la troisième personne du singulier',NULL,NULL,NULL,NULL,'L000');
INSERT INTO dictionnaire VALUES(169,'nous','mu','mu','conjug',NULL,'indique que le verbe est à la première personne du pluriel',NULL,NULL,NULL,NULL,'M000');
INSERT INTO dictionnaire VALUES(170,'ils','lia','lia','conjug',NULL,'indique que le verbe est à la troisième personne du pluriel',NULL,NULL,NULL,NULL,'L000');
INSERT INTO dictionnaire VALUES(171,'[intraduisible]','fë','fø','conjug',NULL,'pronom réfléchis global, sa personne doit être reprécisé par un conjugateur',NULL,NULL,NULL,NULL,'F000');
INSERT INTO dictionnaire VALUES(172,'[intraduisible]','ë','ø','pron',NULL,'pronom tonique global, sa personne doit être reprécisé par un conjugateur',NULL,NULL,NULL,NULL,'E000');
INSERT INTO dictionnaire VALUES(174,'le','le','lɛ','det',NULL,NULL,NULL,NULL,NULL,'L000','L000');
INSERT INTO dictionnaire VALUES(175,'les','la','la','det',NULL,NULL,NULL,NULL,NULL,'L800','L000');
INSERT INTO dictionnaire VALUES(176,'un','de','dɛ','det',NULL,NULL,NULL,NULL,NULL,'U500','D000');
INSERT INTO dictionnaire VALUES(177,'des','da','da','det',NULL,NULL,NULL,NULL,NULL,'D800','D000');
INSERT INTO dictionnaire VALUES(178,'ce','þe','θɛ','det',NULL,NULL,NULL,NULL,NULL,'C232','Þ000');
INSERT INTO dictionnaire VALUES(179,'ces','þa','θa','det',NULL,NULL,NULL,NULL,NULL,'C800','Þ000');
INSERT INTO dictionnaire VALUES(180,'mon','me','mɛ','det',NULL,'sa personne est définie par un conjugateur',NULL,NULL,NULL,'M535','M000');
INSERT INTO dictionnaire VALUES(181,'mes','ma','ma','det',NULL,'sa personne est définie par un conjugateur',NULL,NULL,NULL,'M830','M000');
INSERT INTO dictionnaire VALUES(183,'1','nu','n̪u','cardinal',NULL,NULL,NULL,NULL,NULL,NULL,'N000');
INSERT INTO dictionnaire VALUES(184,'premier','nuar','n̪uaʁ','nom',NULL,NULL,NULL,NULL,NULL,'P656','N600');
INSERT INTO dictionnaire VALUES(185,'premier','nuarpua','n̪uaʁpua','adj',NULL,NULL,NULL,NULL,NULL,'P656','N610');
INSERT INTO dictionnaire VALUES(186,'2','dwò','dwɔ','cardinal',NULL,NULL,NULL,NULL,NULL,NULL,'D000');
INSERT INTO dictionnaire VALUES(187,'second','dwòr','dwɔʁ','nom',NULL,NULL,NULL,NULL,NULL,'S253','D600');
INSERT INTO dictionnaire VALUES(188,'second','dwòrpua','dwɔʁpua','adj',NULL,NULL,NULL,NULL,NULL,'S253','D610');
INSERT INTO dictionnaire VALUES(189,'3','tra','tʁa','cardinal',NULL,NULL,NULL,NULL,NULL,NULL,'T600');
INSERT INTO dictionnaire VALUES(190,'troisième','trar','tʁaʁ','nom',NULL,NULL,NULL,NULL,NULL,'T685','T000');
INSERT INTO dictionnaire VALUES(191,'troisième','tra[r]pua','tʁa[ʁ]pua','adj',NULL,NULL,NULL,NULL,NULL,'T685','T000');
INSERT INTO dictionnaire VALUES(192,'4','kwadr','kwadʁ','cardinal',NULL,NULL,NULL,NULL,NULL,NULL,'K360');
INSERT INTO dictionnaire VALUES(193,'quatrième','kwadr','kwadʁ','nom',NULL,NULL,NULL,NULL,NULL,'Q365','K360');
INSERT INTO dictionnaire VALUES(194,'quatrième','kwad[ra]pua','kwad[ʁa]pua','adj',NULL,NULL,NULL,NULL,NULL,'Q365','K361');
INSERT INTO dictionnaire VALUES(196,'ex-','ke-','kɛ-','particule',NULL,NULL,NULL,NULL,NULL,'E800','K000');
INSERT INTO dictionnaire VALUES(197,'superlatif','nu-','n̪u-','particule',NULL,NULL,NULL,NULL,NULL,'S164','N000');
INSERT INTO dictionnaire VALUES(198,'qui appartient à','-ališ','-aliʃ','particule','ex : rectangulaire',NULL,NULL,NULL,NULL,'Q000','-400');
INSERT INTO dictionnaire VALUES(199,'in-','iz','iz','particule',NULL,NULL,'de la marque latine -aris',NULL,NULL,'I500','I800');
INSERT INTO dictionnaire VALUES(200,'[intraduisible]','-pua','-pua','particule','marqueur d’adjectif',NULL,NULL,NULL,NULL,NULL,'-100');
INSERT INTO dictionnaire VALUES(201,'-if','-iva','-iva','particule',NULL,NULL,NULL,NULL,NULL,'-900','-900');
INSERT INTO dictionnaire VALUES(202,'-ique','-ika','-ika','particule','marqueur d’appartenance',NULL,NULL,NULL,NULL,'-200','-200');
INSERT INTO dictionnaire VALUES(203,'-able','-abis','-abis','particule','marqueur de capacité',NULL,NULL,NULL,NULL,'-140','-180');
INSERT INTO dictionnaire VALUES(204,'-ation','-škio','-ʃkio','particule','marqueur de substantif verbal',NULL,NULL,NULL,NULL,'-350','-200');
INSERT INTO dictionnaire VALUES(205,'vallée','řola','/ɻola/','nom',NULL,'creux entre deux montagnes','du latin vola',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(206,'vallée','řola','ɻola','nom',NULL,'creu entre deux montagnes','du latin vola',NULL,NULL,'V000','Ř400');
INSERT INTO dictionnaire VALUES(207,'combe','kōm','kɔ̃m','nom',NULL,'pli de terrain, lieu bas entouré de colline','du breton komm',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(208,'montagne','mënū','møn̪ɛ̃','nom','mont','relief topographique présentant des versants prononcés','de l''IE commun *men',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(209,'montagne','mënū','møn̪ɛ̃','nom','mont','relief topographique présentant des versants prononcés','de l''IE commun *men',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(210,'vallée','řola','/ɻola/',NULL,NULL,'creux entre deux montagnes','du latin vola',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(211,'combe','kōm','/kɔ̃m/',NULL,NULL,'pli de terrain, lieu bas entouré de collines','du breton komm',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(212,'fond','buþus','/buθus/',NULL,NULL,'limite, point extrême','de l IE commun *bʰudʰ-',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(213,'mont','mënū','/møn̪ɛ̃/',NULL,NULL,'Relief topographique présentant des versant prononcés','de l IE commun *men',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(214,'froid','širiog','/ʃiʁioɡ/',NULL,NULL,'Qui est privé de chaleur','de l IE communs *srigos',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(215,'ville','brug','/bʁuɡ/',NULL,NULL,'Municipalité autonome','du bas latin burgus',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(216,'brume','břu','/bɻu/',NULL,NULL,'Un amas de fines gouttelettes d eau, ou parfois de fins cristaux de glace, plus ou moins épais, et ordinairement froid, qui obscurcit l’air.','du gallo-roman brodiculare',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(217,'haut','hò','/ʔɔ/',NULL,NULL,'qui est élevé','du francique *hoh',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(218,'sommet','sumirüs','/sumiʁys/',NULL,NULL,'point le plus élevé','du latin supremus',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(219,'noir','svarž','/svaʁʒ/',NULL,NULL,'Qui absorbe toute la lumière visible qu’il reçoit, donne l’impression d’obscurité ; la plus sombre des couleurs.','du vieil haut-allemand svar',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(220,'forêt','hila','/ʔila/',NULL,NULL,'vaste terrain couvert de bois, de nombreux arbres proches','du latin hyle',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(221,'plaine','planea','/plan̪ɛa/',NULL,NULL,'Espace géographique, caractérisé par une surface plane, avec des pentes relativement faible','du latin planae, declinaison de planus',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(222,'notre','noš','/n̪oʃ/',NULL,NULL,'qui nous appartient. (Plusieurs possesseur dont l un d eux est le locuteur)','du latin nos',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(223,'père','paře','/paɻɛ/',NULL,NULL,'individu mâle qui a pris le rôle et la responsabilité paternelle dans la vie d un enfant','du latin pater',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(224,'sanctifier','þākiore','/θãkioʁɛ/',NULL,NULL,'rendre saint','de þākio',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(225,'volonté','wulutš','/wulutʃ/',NULL,NULL,'Faculté de vouloir, de se déterminer à quelque chose ; en particulier, cette faculté même en tant qu’elle est plus ou moins agissante.','du latin voluntas',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(226,'comme','aso','/aso/',NULL,'dans le sens autant que','autant que','de l allemand also, évolution similaire à l anglais',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(227,'pain','pani','/pan̪i/',NULL,NULL,'Pâte cuite au four, à base de farine, d’eau et de levure de boulanger ou de levain.','de l ancien francais pan et sous influence du moyen francais pain',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(228,'pardonner','pedonare','/pɛdon̪aʁɛ/',NULL,NULL,'accorder le pardon d une faute commise, ne garder aucun ressentiment d une injure recue','du latin perdonare',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(229,'pardon','pedona','/pɛdon̪a/',NULL,NULL,'action de pardonner une faute, une offense','deverbal de pedonare',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(230,'offense','ofesu','/ofɛsu/',NULL,NULL,'injure de fait ou de parole; manquement à dieu','du latin offensus',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(231,'offenser','ofesur','/ofɛsuʁ/',NULL,NULL,'rendre offense','de ofesu avec le verbale -re dont le e est élidé',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(232,'faire','makonore','/makon̪oʁɛ/',NULL,NULL,'Opérer, effectuer, exécuter, accomplir, réaliser, que ce soit d’ordre physique ou d’ordre moral. ','du germanique *makōn avec le verbal -re',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(233,'règne','régo','/ʁeɡo/',NULL,NULL,'Exercice du pouvoir souverain, la plupart du temps dans un état monarchique','du latin regno',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(234,'venir','vūře','/vɛ̃ɻɛ/',NULL,NULL,'venir','de l ancien francais venrat',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(235,'celui','ikli','/ikli/',NULL,NULL,'utilisé pour remplacer la personne ou la chose dont on parle','emprunté au francais icelui',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(236,'ceux','ikla','/ikla/',NULL,NULL,'même sens','pluriel de ikli',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(237,'ne','ne','/n̪ɛ/',NULL,NULL,'négation','du latin ne',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(238,'laisser','lasare','/lasaʁɛ/',NULL,NULL,'Ne pas changer l état dans lequel se trouve une personne, une chose','du latin laxare',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(239,'entrer','iniare','/in̪iaʁɛ/',NULL,NULL,'se mettre; se placer; s engager dans qq chose','du latin intrare',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(240,'en','ū','/ɛ̃/',NULL,NULL,'préposition utilisée après certains verbes','du latin in',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(241,'mais','mag','/maɡ/',NULL,NULL,'Conjonction qui ser généralement à marquer une opposition, une exception, une différence','du latin magis',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(242,'mal','mel','/mɛl/',NULL,NULL,'mauvais','de l IE *mel-',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(243,'délivrer','leudre','/lɛudʁɛ/',NULL,NULL,'Rendre libre de ce qui oppresse, de ce qui fait souffrir, de ce qui incommode.','de l IE *h₁leudʰ',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(244,'monde','mūds','/mɛ̃ds/',NULL,NULL,'l ensemble des choses et des êtres','du latin mundus',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(245,'nouveau','newū','/n̪ɛwɛ̃/',NULL,NULL,'qui n existait pas avant','de l IE *néwos',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(246,'qui','řō','ɻɔ̃','pron',NULL,'pronom relatif','a priori',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(247,'commencement','ðépu','ðepu','nom',NULL,'commencement','du francais début',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(248,'objet','rez','ʁɛz','nom',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(249,'gouffre','büssë','byssø','nom',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(250,'st esprit','Piéritšk','pieʁitʃk','nom p',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(251,'sevrer','sevar','sɛvaʁ','verbe',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(252,'nommer','nòmdar','n̪ɔmdaʁ','verbe',NULL,'donner un nom','contraction de nom et donner',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(253,'après','sa','sa','adv',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(254,'blessure','piaga','piaga','nom',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(255,'être malade','gaere','gaɛʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(256,'permettre','darapture','daʁaptuʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(257,'être très heureux','félikawar','felikawaʁ','verbe',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(258,'recueillir','reko[ligo]re','ʁɛko[ligoʁɛ]','verbe',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(259,'louanger','lòdare','lɔdaʁɛ','verbe',NULL,'chanter les louange',NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(260,'louangé','lòdarea','lɔdaʁɛa','adj',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(261,'dans','nūtr','n̪ɛ̃tʁ','adv',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(262,'recueillement','rekoli[go]','ʁɛkoli[go]','nom',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(263,'semer','sém[ene]re','sem[ɛn̪ɛ]ʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(264,'à','ijik','ijik','préposition','locatif',NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(265,'graine','sémen','semɛn̪','nom',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(266,'cet','þe','θɛ','det',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(267,'ton','me','mɛ','det',NULL,'sa personne est définie par un conjugateur',NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(268,'tes','ma','ma','det',NULL,'sa personne est définie par un conjugateur',NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(269,'rassembler','reko[ligo]re','ʁɛko[ligoʁɛ]','verbe',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(270,'porter','f[h]er','f[ʔ]ɛʁ','verbe',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(271,'rassemblement','rekoli[go]','ʁɛkoli[go]','nom',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(272,'ensemencer','sém[ene]re','sem[ɛn̪ɛ]ʁɛ','verbe',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(273,'emporter','wap[h]er','waf[ʔ]ɛʁ','verbe',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(274,'cette','þe','θɛ','det',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(275,'son','me','mɛ','det',NULL,'sa personne est définie par un conjugateur',NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(276,'ses','ma','ma','det',NULL,'sa personne est définie par un conjugateur',NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(277,'ma','me','mɛ','det',NULL,'sa personne est définie par un conjugateur',NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(278,'ta','me','mɛ','det',NULL,'sa personne est définie par un conjugateur',NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(279,'sa','me','mɛ','det',NULL,'sa personne est définie par un conjugateur',NULL,NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(297,'jusque','tir','/tiʁ/','adv','','vers un point ultérieur dans le temps','du P-Germanique til (vers) et tila (point dans le temps)',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(298,'foie','libřa','/libɻa/','nom',NULL,'organe qui traite le sang, produit la bile, stocke les sucres etc','du proto-germanique *libru',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(280,'gras','kraš','/kʁaʃ/','adj',NULL,'qui contient de la graisse','du latin crassus',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(281,'maigre','maže','/maʒɛ/','adj',NULL,'qui ne contient pas de graisse','du latin macer',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(282,'ou','wo','/wo/','conj','ou exclusif uniquement','Indique une disjonction exclusive : un seul dans la liste est envisageable à la fois','du latin aut',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(283,'article','atigul','/atiɡul/','nom',NULL,'Texte qui forme une division ou subdivision d’un écrit, sous forme d''un rapport ou compte rendu sur un thème ou événement précis. Ce texte peut faire l''objet d''une publication dans un journal, une revue scientifique une revue spécialisée, des comptes rendus de conférence, voire une encyclopédie. ','du latin articulus',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(284,'tous','tuts','/tus/','pron',NULL,'pl de tout | tout le monde','de tut décliné au régime pluriel',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(285,'tous','tuta','/tuta/','det',NULL,'pl de tout lorsque déterminant','de tut avec le pluriel -a',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(286,'être','ðeřë','/ðɛɻø/','nom',NULL,'substantif du verbe de même orthographe, chose qui est (vivante obligatoirement)','du verbe ðeřë',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(287,'humain','manišo','/man̪iʃo/','nom',NULL,'créature appartenant à l''espece homo sapiens','du vieil allemand mannisco',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(288,'[intraduisible]','-an','/an̪/','particule',NULL,'particule d''origine (ablatif)','du latin -anus',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(289,'humain','manišona','/man̪iʃon̪a/','adj',NULL,'qui provient de l''Homme, généralisé à tout ce qui est lié à l''homme','de manišo avec le suffixe -an, ici inversé à cause de la cohérence phonologique',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(290,'libre','anleudrë','/an̪lɛudʁø/','adj',NULL,'qui est délivré','adjectivation du participe passé de leudre',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(291,'égal','warzo','/warzo/','adj',NULL,'littéralement qui a autant que , qui a la même chose, égal','composé de war (avoir) et aso (comme/autant que)',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(292,'digne','diugan','/diuɡan̪/','adj',NULL,'Qui a de l’honnêteté, de la probité, qui mérite l’estime.','du latin dignus',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(293,'dignité','diuganatë','/diuɡan̪atø/','nom',NULL,'Qui est digne / Fait que la personne humaine ne doive jamais être traitée seulement comme un moyen, mais toujours aussi comme une fin en soi.','de diugan avec -të',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(294,'-té','-të','/tø/','particule',NULL,'indique un état','du latin -tas',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(295,'droit','rešt','/ʁɛʃt/','nom',NULL,'Ensemble des règles générales et obligatoires posées et sanctionnées par l’autorité étatique (ou sous son contrôle) en vue d’organiser la vie sociale. | autorisation légale de faire quelque chose','du germanique reht',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire VALUES(296,'naitre','našore','/n̪aʃoʁɛ/','verbe',NULL,'venir au monde, commencer à exister','du latin nascor',NULL,NULL,NULL,NULL);
INSERT INTO dictionnaire (francais, pierrick, classe, phonétique, définition, étymologie) VALUES ("manger", "edere", "verbe", "/ɛdɛʁɛ/", "Mâcher et avaler un aliment dans le but de se nourrir. ", "du latin edo");
INSERT INTO dictionnaire (francais, pierrick, classe, phonétique, définition, étymologie) VALUES ("nuitée", "noktaa", "nom", "/nokta/", "indique une quantité de nuit", "de nokt avec le suffixe dérivé du latin -aa");
INSERT INTO dictionnaire (francais, pierrick, classe, phonétique, définition, étymologie) VALUES ("-ée", "-aa", "particule", "/a:/", "indique une quantité", "du latin -ata");
INSERT INTO dictionnaire (francais, pierrick, classe, phonétique, définition, étymologie) VALUES ("aller", "ere", "verbe", "/ɛʁɛ/", "indique un déplacement", "du latin ire");
INSERT INTO dictionnaire (francais, pierrick, classe, phonétique, définition, étymologie) VALUES ("bras", "brak", "nom", "bʁak", "Chacun des deux membres supérieurs de l'homme, allant de l'épaule,sur laquelle ils s'articulent,à la main.", "du latin brachium");
INSERT INTO dictionnaire (francais, pierrick, classe, phonétique, définition, étymologie) VALUES ("Morphée", "Morpheus", "nom p", "/mɔʁfɛus/", "Dieu des rêves dans la mythologie grecque", "du grec Μορφεύς");
INSERT INTO dictionnaire (francais, pierrick, classe, phonétique, définition, étymologie) VALUES ("partir", "ližjën", "verbe", "/liʒjøn/", "Quitter un lieu", "du proto-Germanique occidental *laibijan");
INSERT INTO dictionnaire (francais, pierrick, classe, phonétique, définition, étymologie) VALUES ("dans", "inus", "préposition", "/inus/", "au sein de,à l'intérieur de ,idée d'immobilitée", "du latin intus");
INSERT INTO dictionnaire (francais, pierrick, classe, phonétique, définition, étymologie) VALUES ("je", "o", "conjug", "/o/", "indique que le verbe est à la première personne", "du latin ego");
INSERT INTO dictionnaire (francais, pierrick, classe, phonétique, définition, étymologie) VALUES ("de", "dë", "prep", "/dø/", "indique la provenance/un lien de possession", "du latin de");
INSERT INTO dictionnaire (francais, pierrick, classe, phonétique, définition, étymologie) VALUES ("chat", " felej", " nom", " /fɛlɛj/", "  Mammifère carnivore félin de taille moyenne, au museau court et arrondi, domestiqué, apprivoisé ou encore à l'état sauvage. ", " du latin felis, feles");
INSERT INTO dictionnaire (francais, pierrick, classe, phonétique, définition, étymologie) VALUES ("chat", " felei", " nom", " /fɛlɛj/", "  Mammifère carnivore félin de taille moyenne, au museau court et arrondi, domestiqué, apprivoisé ou encore à l'état sauvage. ", " du latin felis, feles");
INSERT INTO dictionnaire (francais, pierrick, classe, phonétique, définition, étymologie) VALUES ("souris", "  sorxe", " nom", " /sorksɛ/", " Petit rongeur de la famille des muridés, du genre Mus, en général la souris commune Mus musculus", " du latin sorex");
UPDATE dictionnaire SET francais = '[intraduisible]' WHERE francais = '' or francais = NULL;
COMMIT;
CREATE VIRTUAL TABLE IF NOT EXISTS fts USING fts4(francais, pierrick, id);
INSERT INTO fts SELECT francais, pierrick, id FROM dictionnaire;
CREATE VIRTUAL TABLE IF NOT EXISTS pierrick USING spellfix1;
CREATE VIRTUAL TABLE IF NOT EXISTS francais USING spellfix1;
INSERT INTO pierrick(word) SELECT pierrick FROM fts;
INSERT INTO francais(word) SELECT francais FROM fts;
BEGIN TRANSACTION;

CREATE TRIGGER insert_fts
AFTER INSERT ON dictionnaire
BEGIN
INSERT INTO fts (francais, pierrick, id)
VALUES (new.francais, new.pierrick, new.id);
END;

CREATE TRIGGER update_fts
AFTER UPDATE ON dictionnaire
BEGIN
UPDATE fts SET francais = new.francais, pierrick = new.pierrick, id = new.id
WHERE id = old.id;
END;

CREATE TRIGGER delete_fts
AFTER DELETE ON dictionnaire
BEGIN
DELETE FROM fts WHERE id = old.id;
END;

CREATE TRIGGER insert_pierrick
AFTER INSERT ON fts
BEGIN
INSERT INTO pierrick (word) VALUES (new.pierrick);
END;

CREATE TRIGGER update_pierrick
AFTER UPDATE ON fts
BEGIN
UPDATE pierrick SET word = new.pierrick WHERE word = old.pierrick;
END;

CREATE TRIGGER delete_pierrick
AFTER DELETE ON fts
BEGIN
DELETE FROM pierrick WHERE word = old.pierrick;
END;

CREATE TRIGGER insert_francais
AFTER INSERT ON fts
BEGIN
INSERT INTO francais (word) VALUES (new.francais);
END;

CREATE TRIGGER update_francais
AFTER UPDATE ON fts
BEGIN
UPDATE francais SET word = new.francais WHERE word = old.francais;
END;

CREATE TRIGGER delete_francais
AFTER DELETE ON fts
BEGIN
DELETE FROM francais WHERE word = old.francais;
END;
COMMIT;