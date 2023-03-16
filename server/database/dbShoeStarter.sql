--! DONT RUN THIS FILE! IT IS ONLY FOR REFERENCE
CREATE DATABASE Sizes

create table shoesWoman
(
    brand varchar(50) not null,
    sizeUE DECIMAL(3,1) not null,
    sizeUS DECIMAL(3,1) not null,
    sizeUK DECIMAL(3,1) not null,
    sizeCM DECIMAL(3,1) not null,
    sizeIN DECIMAL(3,1) not null
)

create table shoesMan
(
    brand varchar(50) not null,
    sizeUE DECIMAL(3,1) not null,
    sizeUS DECIMAL(3,1) not null,
    sizeUK DECIMAL(3,1) not null,
    sizeCM DECIMAL(3,1) not null,
    sizeIN DECIMAL(3,1) not null
)
INSERT INTO shoesMan
    (brand, sizeUE, sizeUS, sizeUK, sizeCM, sizeIN)
VALUES
    ('Nike', 35.5, 3.5, 3.0, 22.0, 8.66),
    ('Nike', 36.0, 4.0, 3.5, 22.5, 8.86),
    ('Nike', 36.5, 4.5, 4.0, 23.0, 9.06),
    ('Nike', 37.5, 5.0, 4.5, 23.5, 9.25),
    ('Nike', 38.0, 5.5, 5.0, 24.0, 9.45),
    ('Nike', 38.5, 6.0, 5.5, 24.5, 9.65),
    ('Nike', 39.0, 6.5, 6.0, 25.0, 9.84),
    ('Nike', 39.5, 7.0, 6.0, 25.5, 10.04),
    ('Nike', 40.0, 7.5, 6.5, 26.0, 10.24),
    ('Nike', 40.5, 8.0, 7.0, 26.5, 10.43),
    ('Nike', 41.0, 8.5, 7.5, 27.0, 10.63),
    ('Nike', 42.0, 9.0, 8.0, 27.5, 10.83),
    ('Nike', 42.5, 9.5, 8.5, 28.0, 11.02),
    ('Nike', 43.0, 10.0, 9.0, 28.5, 11.22),
    ('Nike', 44.0, 10.5, 9.5, 29.0, 11.42),
    ('Nike', 44.5, 11.0, 10.0, 29.5, 11.61),
    ('Nike', 45.0, 11.5, 10.5, 30.0, 11.81),
    ('Nike', 45.5, 12.0, 11.0, 30.5, 12.01),
    ('Nike', 46.0, 12.5, 11.5, 31.0, 12.20),
    ('Nike', 47.0, 13.0, 12.0, 31.0, 12.20),
    ('Nike', 47.5, 13.5, 12.5, 31.5, 12.40),
    ('Nike', 48.0, 14.0, 13.0, 32.0, 12.60),
    ('Nike', 48.5, 14.5, 13.5, 32.5, 12.80),
    ('Nike', 49.5, 15.0, 14.0, 33.5, 13.19),
    ('Nike', 50.5, 16.0, 15.0, 34.5, 13.58),
    ('Adidas', 38.0, 5.5, 5.0, 24.0, 9.45),
    ('Adidas', 38.5, 6.0, 5.5, 24.5, 9.65),
    ('Adidas', 39.5, 6.5, 6.0, 25.0, 9.84),
    ('Adidas', 40.0, 7.0, 6.5, 25.5, 10.04),
    ('Adidas', 40.5, 7.5, 7.0, 25.75, 10.13),
    ('Adidas', 41.5, 8.0, 7.5, 26.0, 10.24),
    ('Adidas', 42.0, 8.5, 8.0, 26.5, 10.43),
    ('Adidas', 42.5, 9.0, 8.5, 27.0, 10.63),
    ('Adidas', 43.0, 9.5, 9.0, 27.5, 10.83),
    ('Adidas', 44.0, 10.0, 9.5, 28.0, 11.02),
    ('Adidas', 44.5, 10.5, 10.0, 28.25, 11.12),
    ('Adidas', 45.0, 11.0, 10.5, 28.5, 11.22),
    ('Adidas', 46.0, 11.5, 11.0, 29.0, 11.42),
    ('Adidas', 46.5, 12.0, 11.5, 29.5, 11.61),
    ('Adidas', 47.0, 12.5, 12.0, 30.0, 11.81),
    ('Adidas', 48.0, 13.0, 12.5, 30.5, 12.01),
    ('Adidas', 48.5, 13.5, 13.0, 31.0, 12.20),
    ('Adidas', 49.0, 14.0, 13.5, 31.25, 12.30),
    ('Adidas', 50.0, 14.5, 14.0, 31.5, 12.40),
    ('Adidas', 50.5, 15.0, 14.5, 32.0, 12.60);








INSERT INTO shoesWoman
    (brand, sizeUE, sizeUS, sizeUK, sizeCM, sizeIN)
VALUES
    ('NikeWoman', 35.0, 4.5, 2.0, 22.0, 8.66),
    ('NikeWoman', 35.5, 5.0, 2.5, 22.5, 8.86),
    ('NikeWoman', 36.0, 5.5, 3.0, 23.0, 9.06),
    ('NikeWoman', 36.5, 6.0, 3.5, 23.5, 9.25),
    ('NikeWoman', 37.5, 6.5, 4, 23.5, 9.45),
    ('NikeWoman', 38.0, 7.0, 4.5, 24.0, 9.45),
    ('NikeWoman', 38.5, 7.5, 5, 24.5, 9.65),
    ('NikeWoman', 39.0, 8.0, 5.5, 25.0, 9.84),
    ('NikeWoman', 40.0, 8.5, 6, 25.5, 10.04),
    ('NikeWoman', 40.5, 9.0, 6.5, 26.0, 10.24),
    ('NikeWoman', 41.0, 9.5, 7.0, 26.5, 10.43),
    ('NikeWoman', 42.0, 10.0, 7.5, 27.0, 10.63),
    ('NikeWoman', 42.5, 10.5, 8.0, 27.5, 10.83),
    ('NikeWoman', 43.0, 11.0, 8.5, 28.0, 11.02),
    ('NikeWoman', 44.0, 11.5, 9.0, 28.5, 11.22),
    ('NikeWoman', 44.5, 12.0, 9.5, 29.0, 11.42),
    ('NikeWoman', 45.0, 12.5, 10.0, 29.5, 11.61),
    ('AdidasWoman', 36.0, 5.5, 4.0, 22.9, 9.02),
    ('AdidasWoman', 36.5, 6.0, 4.5, 23.3, 9.17),
    ('AdidasWoman', 37.0, 6.5, 5.0, 23.8, 9.37),
    ('AdidasWoman', 38.0, 7.0, 5.5, 24.2, 9.53),
    ('AdidasWoman', 38.5, 7.5, 6.0, 24.6, 9.69),
    ('AdidasWoman', 39.0, 8.0, 6.5, 25.1, 9.88),
    ('AdidasWoman', 40.0, 8.5, 7.0, 25.5, 10.04),
    ('AdidasWoman', 40.5, 9.0, 7.5, 25.9, 10.20),
    ('AdidasWoman', 41.0, 9.5, 8.0, 26.3, 10.35),
    ('AdidasWoman', 42.0, 10.0, 8.5, 26.7, 10.51),
    ('AdidasWoman', 42.5, 10.5, 9.0, 27.1, 10.67),
    ('AdidasWoman', 43.0, 11.0, 9.5, 27.6, 10.87),
    ('AdidasWoman', 44.0, 11.5, 10.0, 28.0, 11.02),
    ('AdidasWoman', 44.5, 12.0, 10.5, 28.4, 11.18),
    ('AdidasWoman', 45.0, 12.5, 11.0, 28.9, 11.38),
    ('AdidasWoman', 46.0, 13.0, 11.5, 29.3, 11.54),
    ('AdidasWoman', 46.5, 13.5, 12.0, 29.7, 11.69),
    ('AdidasWoman', 47.0, 14.0, 12.5, 30.1, 11.85),
    ('AdidasWoman', 48.0, 14.5, 13.0, 30.5, 12.01),
    ('AdidasWoman', 48.5, 15.0, 13.5, 31.0, 12.20);



