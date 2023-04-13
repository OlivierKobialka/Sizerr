-- SELECT *
-- FROM shoesWoman
-- WHERE sizeCM = 26

-- select *
-- FROM Comment
-- select *
-- FROM genderCount
-- SELECT *
-- from TopsMan
-- SELECT *
-- from TopsWoman
-- SELECT *
-- from ShoesMan
-- where SizeCm = 31
-- SELECT *
-- from ShoesWoman

-- UPDATE genderCount SET Male += 1

-- select *
-- from Comment



SELECT *
from TopsMan

SELECT
    Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max
FROM TopsMan INNER JOIN Brand ON Brand.Id = TopsMan.BrandId
WHERE ChestCM_min <= 100 AND ChestCM_max >= 100 AND WaistCM_min <= 80 AND WaistCM_max >= 80 AND HipCM_min <= 100 AND HipCM_max >= 100

































SELECT *
from Brand

SELECT
    Brand.Brand, SizeCM, SizeIN, SizeEU, SizeUK, SizeUS
FROM ShoesMan INNER JOIN Brand ON Brand.Id = ShoesMan.BrandID

SELECT *
from Brand