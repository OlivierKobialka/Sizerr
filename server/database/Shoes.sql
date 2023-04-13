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
from Brand

SELECT
    Brand.Brand, SizeCM, SizeIN, SizeEU, SizeUK, SizeUS
FROM ShoesMan INNER JOIN Brand ON Brand.Id = ShoesMan.BrandID

SELECT *
from Brand