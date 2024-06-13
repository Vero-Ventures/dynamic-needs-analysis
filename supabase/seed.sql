-- Insert sample data into assets table
INSERT INTO "public"."assets" (name, initial_value, current_value, year_acquired, rate, term, type, taxable, liquid, to_be_sold)
VALUES 
    ('Cash Savings', 5000, 5000, 2020, 1, 0, 'Cash', true, true, false),
    ('Company Stocks', 20000, 25000, 2019, 5, 10, 'Stocks', true, true, false),
    ('Government Bonds', 10000, 12000, 2018, 3, 5, 'Bonds', false, false, false);

-- Insert sample data into beneficiaries table
INSERT INTO "public"."beneficiaries" (name, allocation)
VALUES 
    ('John Doe', 50),
    ('Jane Smith', 50);

-- Insert sample data into businesses table
INSERT INTO "public"."businesses" (name, valuation, ebitda, appreciation_rate, term)
VALUES 
    ('TechCorp', 1000000, 150000, 10, 5),
    ('HealthInc', 500000, 80000, 8, 7);

-- Insert sample data into clients table
INSERT INTO "public"."clients" (name, birth_date, expected_retirement_age, province, annual_income, income_mutiplier)
VALUES 
    ('Alice Johnson', '1985-05-15', 65, 'BC', 70000, 3),
    ('Bob Brown', '1978-11-22', 67, 'ON', 85000, 4);

-- Insert sample data into debts table
INSERT INTO "public"."debts" (name, initial_value, year_acquired, rate, term, annual_payment, insurable_future_value_dollars)
VALUES 
    ('Mortgage', 300000, 2015, 4, 25, 12000, 250000),
    ('Car Loan', 25000, 2020, 6, 5, 5000, 15000);

-- Insert sample data into goals table
INSERT INTO "public"."goals" (name, amount, philanthropic)
VALUES 
    ('Retirement Fund', 500000, false),
    ('Charity Donation', 100000, true);

-- Insert sample data into shareholders table
INSERT INTO "public"."shareholders" (name, share_percentage, insurance_coverage, ebitda_contribution_percentage, business_id)
VALUES 
    ('Catherine Green', 30, 100000, 20, 1),
    ('David Black', 70, 200000, 80, 2);

-- Insert sample data into asset_beneficiaries table
INSERT INTO "public"."asset_beneficiaries" (allocation, asset_id, beneficary_id)
VALUES 
    (50, 1, 1),
    (50, 2, 2),
    (100, 3, 1);