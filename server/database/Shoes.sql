-- SELECT Brand.Brand, Size, ChestCM_min,ChestCM_max, WaistCM_min WaistCM_max, HipCM_min, HipCM_max,ChestIN_min,ChestIN_max, WaistIN_min WaistIN_max, HipIN_min, HipIN_max FROM TopsMan INNER JOIN Brand ON Brand.Id = TopsMan.BrandId
-- WHERE ChestCM_min <= 130 AND ChestCM_max >= 130 AND HipCM_min <= 126 AND HipCM_max >= 126 AND WaistCM_min <= 120 AND WaistCM_max >= 120
SELECT
    Brand.Brand, Size, ChestCM_min, ChestCM_max, WaistCM_min, WaistCM_max, HipCM_min, HipCM_max, ChestIN_min, ChestIN_max, WaistIN_min, WaistIN_max, HipIN_min, HipIN_max
FROM TopsMan INNER JOIN Brand ON Brand.Id = TopsMan.BrandId