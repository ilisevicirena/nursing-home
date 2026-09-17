INSERT INTO [dbo].[FunctionalStatusOption] (Category, Value, IsHighRisk) VALUES
-- Mobility
('mobility', 'independent',         0),
('mobility', 'assistive_device',    0),
('mobility', 'requires_assistance', 0),
('mobility', 'non_ambulatory',      1),
-- Cognitive
('cognitive', 'intact',               0),
('cognitive', 'mild_impairment',      0),
('cognitive', 'moderate_impairment',  0),
('cognitive', 'severe_impairment',    1),
('cognitive', 'dementia',             1),
-- Fall risk
('fallRisk', 'low',      0),
('fallRisk', 'moderate', 0),
('fallRisk', 'high',     1),
-- Visual
('visual', 'normal',    0),
('visual', 'corrected', 0),
('visual', 'impaired',  0),
('visual', 'blind',     1),
-- Hearing
('hearing', 'normal',        0),
('hearing', 'mild_loss',     0),
('hearing', 'moderate_loss', 0),
('hearing', 'severe_loss',   1),
('hearing', 'deaf',          1);
