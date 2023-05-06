select * from ShoesMan
update  GenderCount SET Female += 1
-- UPDATE FeedbackCount SET suggestion += 1
-- update FeedbackCount set complain += 1

-- SELECT *
-- from TopsMan

-- SELECT
--     Brand.Brand, Size, HeightCM_min, HeightCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max, Heightin_min, Heightin_max, Waistin_min, Waistin_max, Hipin_min, Hipin_max
-- FROM BottomsMan INNER JOIN Brand ON Brand.Id = BottomsMan.BrandId

-- SELECT
--     Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max, ChestIN_min, ChestIN_max, WaistIN_min, WaistIN_max, HipIN_min, HipIN_max
-- FROM TopsMan INNER JOIN Brand ON Brand.Id = TopsMan.BrandId
-- WHERE Brand.Brand = 'Adidas' AND Size = 'XXL'

-- SELECT
--     Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max
-- FROM TopsMan INNER JOIN Brand ON Brand.Id = TopsMan.BrandId
-- WHERE ChestCM_min <= 130 AND ChestCM_max >= 130 AND WaistCM_min <= 110 AND WaistCM_max >= 110 AND HipCM_min <= 126 AND HipCM_max >= 126

-- select *
-- from TopsMan
-- where ChestCM_min <= 130 AND ChestCM_max >= 130






-- -- select *from Comment

-- select * from GenderCount
-- UPDATE GenderCount SET Male += 1

-- UPDATE GenderCount SET Female += 1


-- SELECT Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min WaistCM_max, HipCM_min, HipCM_max, ChestIN_min, ChestIN_max, WaistIN_min WaistIN_max, HipIN_min, HipIN_max
-- FROM TopsWoman INNER JOIN Brand ON Brand.Id = TopsWoman.BrandId 





-- SELECT Brand.Brand, SizeCM, SizeIN, SizeEU, SizeUK, SizeUS
-- FROM ShoesMan
--     INNER JOIN Brand ON Brand.Id = ShoesMan.BrandID






-- SELECT
--     Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max, ChestIN_min, ChestIN_max, WaistIN_min, WaistIN_max, HipIN_min, HipIN_max
-- FROM TopsWoman INNER JOIN Brand ON Brand.Id = TopsWoman.BrandId


-- SELECT
--     Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max
-- FROM TopsWoman INNER JOIN Brand ON Brand.Id = TopsWoman.BrandId
-- where Brand.brand = 'Adidas' AND Size = 'XXL'


-- SELECT *
-- from Brand

-- SELECT
--     Brand.Brand, SizeCM, SizeIN, SizeEU, SizeUK, SizeUS
-- FROM ShoesMan INNER JOIN Brand ON Brand.Id = ShoesMan.BrandID

-- SELECT *
-- from Brand