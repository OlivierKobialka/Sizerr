SELECT
    Brand.Brand, Size, HeightCM_min, HeightCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max, Heightin_min, Heightin_max, Waistin_min, Waistin_max, Hipin_min, Hipin_max
FROM BottomsMan INNER JOIN Brand ON Brand.Id = BottomsMan.BrandId
WHERE HipCM_min <= 126 AND HipCM_max >= 126 AND WaistCM_min <= 120 AND WaistCM_max >= 120