DROP TABLE a_user;
DROP TABLE a_message;
DROP TABLE a_vote;

CREATE TABLE a_user (
    IdUser TEXT 
    CONSTRAINT pk_user PRIMARY KEY,
    Weight NUMBER DEFAULT 1,
    UserScore NUMBER DEFAULT 0
);

CREATE TABLE a_message (
    IdMessage TEXT 
    CONSTRAINT pk_message PRIMARY KEY,
    MessageScore NUMBER DEFAULT 0
);

CREATE TABLE a_vote (
    voteUser TEXT,
    voteMessage TEXT,
    voteReciever TEXT,
    voteChannel TEXT,
    voteScore NUMBER DEFAULT 0,
    CONSTRAINT fk_vote_user FOREIGN KEY (voteUser) REFERENCES a_user(IdUser),
    CONSTRAINT fk_vote_reciever FOREIGN KEY (VoteReciever) REFERENCES a_user(IdUser),
    CONSTRAINT fk_vote_message FOREIGN KEY (voteMessage) REFERENCES a_message(IdMessage),
    CONSTRAINT pk_vote PRIMARY KEY (voteUser,voteMessage)
);

-- message null pour les /give
insert into a_message(IdMessage) values (0);