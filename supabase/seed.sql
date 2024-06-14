-- Insert seed data into assets table
INSERT INTO public.assets (name, initial_value, current_value, year_acquired, rate, term, type, taxable, liquid, to_be_sold) VALUES
('Emergency Fund', 10000.00, 10500.00, 2021, 1, 1, 'Cash', true, true, false),
('Google Stocks', 15000.00, 20000.00, 2019, 5, 10, 'Stocks', true, true, false),
('Corporate Bonds', 10000.00, 11000.00, 2018, 3, 5, 'Bonds', true, true, false),
('Family Home', 300000.00, 350000.00, 2010, 2, 20, 'Real Estate', false, false, false),
('Growth Mutual Fund', 20000.00, 25000.00, 2020, 4, 15, 'Mutual Funds', true, true, true),
('401(k) Account', 50000.00, 60000.00, 2015, 3, 25, 'Retirement Account', false, true, false),
('Bitcoin', 5000.00, 15000.00, 2017, 10, 0, 'Crypto', true, true, true),
('Life Insurance Policy', 200000.00, 200000.00, 2012, 2, 30, 'Life Insurance', false, false, false);

-- Insert seed data into beneficiaries table
INSERT INTO public.beneficiaries (name, allocation) VALUES
('Alice Smith', 50),
('Bob Johnson', 30),
('Carol Williams', 20);

-- Insert seed data into businesses table
INSERT INTO public.businesses (name, valuation, ebitda, appreciation_rate, term) VALUES
('Tech Solutions Inc.', 500000.00, 75000.00, 5, 10),
('Green Energy LLC', 300000.00, 50000.00, 4, 8);

-- Insert seed data into clients table
INSERT INTO public.clients (name, birth_date, expected_retirement_age, province, annual_income, income_mutiplier) VALUES
('John Doe', '1980-05-15', 65, 'BC', 75000.00, 2);

-- Insert seed data into debts table
INSERT INTO public.debts (name, initial_value, year_acquired, rate, term, annual_payment, insurable_future_value_dollars) VALUES
('Mortgage', 300000.00, 2010, 4, 30, 15000.00, 150000.00),
('Car Loan', 25000.00, 2018, 6, 5, 5000.00, 5000.00);

-- Insert seed data into goals table
INSERT INTO public.goals (name, amount, philanthropic) VALUES
('Vacation Fund', 5000.00, false),
('College Fund', 20000.00, false),
('Charity Donation', 10000.00, true);

-- Insert seed data into shareholders table
INSERT INTO public.shareholders (name, share_percentage, insurance_coverage, ebitda_contribution_percentage, business_id) VALUES
('Dave Brown', 40, 200000.00, 60, 1),
('Emma Davis', 60, 300000.00, 40, 1),
('Frank Harris', 50, 150000.00, 70, 2),
('Grace Lee', 50, 150000.00, 30, 2);

-- Insert seed data into asset_beneficiaries table
INSERT INTO public.asset_beneficiaries (allocation, asset_id, beneficary_id, already_assigned) VALUES
(60, 1, 1, true),
(40, 1, 2, true),
(70, 2, 1, true),
(30, 2, 3, true),
(50, 3, 2, true),
(50, 3, 3, true);