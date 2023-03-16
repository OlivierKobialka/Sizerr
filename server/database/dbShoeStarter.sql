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


---------------------------------------------------------------------------------






create table topsMan
(
    ID TINYINT NOT NULL IDENTITY(1,1),
    Brand VARCHAR(50) NOT NULL,
    Size VARCHAR(6) NOT NULL,
    ChestIN_min DECIMAL(3,1) NOT NULL,
    ChestIN_max DECIMAL(3,1) NOT NULL,
    ChestCM_min TINYINT NOT NULL,
     ChestCM_max VARCHAR(10) NOT NULL,
    WaistIN_min DECIMAL(3,1) NOT NULL,
    WaistIN_max DECIMAL(3,1) NOT NULL,
    WaistCM_min TINYINT NOT NULL,
    WaistCM_max TINYINT NOT NULL,
    HipIN_min DECIMAL(3,1) NOT NULL,
    HipIN_max DECIMAL(3,1) NOT NULL,
    HipCM_min TINYINT NOT NULL,
    HipCM_max TINYINT NOT NULL,
    HeightIN_min DECIMAL(3,1) NOT NULL,
    HeightIN_max DECIMAL(3,1) NOT NULL,
    HeightCM_min TINYINT NOT NULL,
    HeightCM_max TINYINT NOT NULL)


create table topsWoman
(
  ID TINYINT NOT NULL IDENTITY(1,1),
    Brand VARCHAR(50) NOT NULL,
    Size VARCHAR(6) NOT NULL,
    ChestIN_min DECIMAL(3,1) NOT NULL,
    ChestIN_max DECIMAL(3,1) NOT NULL,
    ChestCM_min TINYINT NOT NULL,
     ChestCM_max VARCHAR(10) NOT NULL,
    WaistIN_min DECIMAL(3,1) NOT NULL,
    WaistIN_max DECIMAL(3,1) NOT NULL,
    WaistCM_min TINYINT NOT NULL,
    WaistCM_max TINYINT NOT NULL,
    HipIN_min DECIMAL(3,1) NOT NULL,
    HipIN_max DECIMAL(3,1) NOT NULL,
    HipCM_min TINYINT NOT NULL,
    HipCM_max TINYINT NOT NULL,
)



INSERT INTO topsMan (Brand, Size, ChestIN_min, ChestIN_max, ChestCM_min, ChestCM_max, WaistIN_min, WaistIN_max, WaistCM_min, WaistCM_max, HipIN_min, HipIN_max, HipCM_min, HipCM_max, HeightIN_min, HeightIN_max, HeightCM_min, HeightCM_max)
VALUES 
('Nike','XXS',28.1 ,31.5,72,80,22.5,25.5,57,65,	28.5,31.5,72,80,0,5.7,0,170)
,('Nike','XS',31.5,35,80,88,25.5,29,65,73,31.5,35,80,88,5.7,6,170,183)
,('Nike','S',35,37.5,88,96,29,32,73,81,35,37.5,88,96,5.7,6.0,170,183),
('Nike','M',37.5,41,96,104,32,35,81,89,37.5,41,96,104,5.7,6.0,170,183),
('Nike','L',41,44,104,112,35,38,89,97,41,44,104,112,5.7,6.0,170,183),
('Nike','XL',44,48.5,112,124,38,43,97,109,44,47,112,120,5.7,6.0,170,183),
('Nike','XXL',48.5,53.5,124,136,43,47.5,109,121,47,50.5,120,128,5.7,6.0,170,183),
('Nike','XXXL',53.5,58,136,148,47.5,52.5,121,133,50.5,53.5,128,136,5.7,6.0,170,183)



insert into topsWoman (Brand, Size, ChestIN_min, ChestIN_max, ChestCM_min, ChestCM_max, WaistIN_min, WaistIN_max, WaistCM_min, WaistCM_max, HipIN_min, HipIN_max, HipCM_min, HipCM_max)
VALUES 
('Nike','XXS',27.5 ,29.5,70,76,21.5,23.5,54,60,	30.5,33,78,84),
('NIke','XS',29.5,32.5,76,83,23.5,26,60,67,33,35.5,84,91),
('Nike','S',32.5,35.5,83,90,26,29,67,74,35.5,38.5,91,98),
('Nike','M',35.5,38,90,97,29,31.5,74,81,38,40.5,98,105),
('Nike','L',38,41,97,104,31.5,34.5,81,88,40.5,43,105,112),
('Nike','XL',41,44.5,104,114,34.5,38.5,88,98,43,45.5,112,120),
('Nike','XXL',44.5,48.5,114,124,38.5,42.5,98,108,45.5,48,120,128)



------------------------------------------------------------------

create table bottomsMan
(
    ID TINYINT NOT NULL IDENTITY(1,1),
    Brand VARCHAR(50) NOT NULL,
    Size VARCHAR(6) NOT NULL,
    WaistIN_min DECIMAL(3,1) NOT NULL,
    WaistIN_max DECIMAL(3,1) NOT NULL,
    WaistCM_min TINYINT NOT NULL,
    WaistCM_max TINYINT NOT NULL,
    HipIN_min DECIMAL(3,1) NOT NULL,
    HipIN_max DECIMAL(3,1) NOT NULL,
    HipCM_min TINYINT NOT NULL,
    HipCM_max TINYINT NOT NULL,
    HeightIN_min DECIMAL(3,1) NOT NULL,
    HeightIN_max DECIMAL(3,1) NOT NULL,
    HeightCM_min TINYINT NOT NULL,
    HeightCM_max TINYINT NOT NULL)


create table bottomsWoman
(
     ID TINYINT NOT NULL IDENTITY(1,1),
    Brand VARCHAR(50) NOT NULL,
    Size VARCHAR(6) NOT NULL,
    WaistIN_min DECIMAL(3,1) NOT NULL,
    WaistIN_max DECIMAL(3,1) NOT NULL,
    WaistCM_min TINYINT NOT NULL,
    WaistCM_max TINYINT NOT NULL,
    HipIN_min DECIMAL(3,1) NOT NULL,
    HipIN_max DECIMAL(3,1) NOT NULL,
    HipCM_min TINYINT NOT NULL,
    HipCM_max TINYINT NOT NULL,
    HeightIN_min DECIMAL(3,1) NOT NULL,
    HeightIN_max DECIMAL(3,1) NOT NULL,
    HeightCM_min TINYINT NOT NULL,
    HeightCM_max TINYINT NOT NULL)


insert into bottomsMan (Brand, Size, WaistIN_min, WaistIN_max, WaistCM_min, WaistCM_max, HipIN_min, HipIN_max, HipCM_min, HipCM_max, HeightIN_min, HeightIN_max, HeightCM_min, HeightCM_max)
VALUES
('Nike','XXS',22.5,25.5,57,65,28.5,31.5,72,80,0,5.7,0,170),
('Nike','XS',25.5,29,65,73,31.5,35,80,88,5.7,6,170,183),
('Nike','S',29,32,73,81,35,37.5,88,96,5.7,6.0,170,183),
('Nike','M',32,35,81,89,37.5,41,96,104,5.7,6.0,170,183),
('Nike','L',35,38,89,97,41,44,104,112,5.7,6.0,170,183),
('Nike','XL',38,43,97,109,44,47,112,120,5.7,6.0,170,183),
('Nike','XXL',43,47.5,109,121,47,50.5,120,128,5.7,6.0,170,183),
('Nike','XXXL',47.5,52.5,121,133,50.5,53.5,128,136,5.7,6.0,170,183)




insert into bottomsWoman (Brand, Size, WaistIN_min, WaistIN_max, WaistCM_min, WaistCM_max, HipIN_min, HipIN_max, HipCM_min, HipCM_max, HeightIN_min, HeightIN_max, HeightCM_min, HeightCM_max)
VALUES
('Nike','XXS',21.25,23.5,54,60,30.5,33,78,84,0,5.7,0,170),
('Nike','XS',23.5,26,60,67,33,35.5,84,91,5.7,6,170,183),
('Nike','S',26,29,67,74,35.5,38.5,91,98,5.7,6.0,170,183),
('Nike','M',29,31.5,74,81,38,40.5,98,105,5.7,6.0,170,183),
('Nike','L',31.5,34.5,81,88,40.5,43,105,112,5.7,6.0,170,183),
('Nike','XL',34.5,38.5,88,98,43,45.5,112,120,5.7,6.0,170,183),
('Nike','XXL',38.5,42.5,98,108,45.5,48,120,128,5.7,6.0,170,183)
