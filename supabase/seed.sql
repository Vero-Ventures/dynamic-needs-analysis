-- Seed data for assets table
INSERT INTO public.assets (name, initialValue, currentValue, yearAcquired, rate, term, type, taxable, liquid, toBeSold) VALUES
('Cash Savings', 5000.00, 5500.00, 2020, 1, 1, 'Cash', true, true, false),
('Stock Portfolio', 10000.00, 15000.00, 2018, 7, 10, 'Stocks', true, true, false),
('Family Home', 200000.00, 250000.00, 2015, 3, 30, 'Real Estate', false, false, false),
('Mutual Fund', 5000.00, 7000.00, 2019, 5, 5, 'Mutual Funds', true, true, true),
('Retirement Account', 30000.00, 35000.00, 2017, 6, 20, 'Retirement Account', false, false, true);

-- Seed data for beneficiaries table
INSERT INTO public.beneficiaries (name, allocation) VALUES
('Alice Smith', 50),
('Bob Johnson', 50),
('Carol Williams', 100);

-- Seed data for businesses table
INSERT INTO public.businesses (name, valuation, ebitda, appreciationRate, term) VALUES
('Tech Corp', 1000000.00, 100000.00, 10, 5),
('Retail Inc', 500000.00, 50000.00, 5, 10);

-- Seed data for clients table
INSERT INTO public.clients (name, birthDate, expectedRetirementAge, province, annualIncome, incomeMultiplier) VALUES
('John Doe', '1980-05-15', 65, 'ON', 80000.00, 2),
('Jane Smith', '1975-07-20', 60, 'BC', 90000.00, 3);

-- Seed data for debts table
INSERT INTO public.debts (name, initialValue, yearAcquired, rate, term, annualPayment, insurableFutureValueDollars) VALUES
('Mortgage', 200000.00, 2015, 3, 30, 12000.00, 180000.00),
('Car Loan', 25000.00, 2019, 5, 5, 5000.00, 20000.00);

-- Seed data for goals table
INSERT INTO public.goals (name, amount, philanthropic) VALUES
('Retirement Fund', 500000.00, false),
('Charity Fund', 100000.00, true);

-- Seed data for shareholders table
INSERT INTO public.shareholders (name, sharePercentage, insuranceCoverage, ebitdaContributionPercentage, businessId) VALUES
('David Brown', 50, 200000.00, 50, 1),
('Emma Davis', 50, 200000.00, 50, 2);

-- Seed data for assetBeneficiaries table
INSERT INTO public.assetBeneficiaries (allocation, assetId, beneficaryId) VALUES
(50, 1, 1),
(50, 1, 2),
(100, 2, 3);