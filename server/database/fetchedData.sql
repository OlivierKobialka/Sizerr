create DATABASE fetchedData

CREATE TABLE Comment
(
    email varchar(max) NOT NULL,
    comment varchar(150) NOT NULL,
    category varchar(10) NOT NULL,
)

CREATE TABLE avgShoeSize
(
    sizeUK int,
    sizeUS int,
    sizeEU int,
)
