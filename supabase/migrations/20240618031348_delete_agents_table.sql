
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."asset_types" AS ENUM (
    'Cash',
    'Stocks',
    'Bonds',
    'Real Estate',
    'Mutual Funds',
    'Retirement Account',
    'Crypto',
    'Life Insurance'
);

ALTER TYPE "public"."asset_types" OWNER TO "postgres";

CREATE TYPE "public"."provinces" AS ENUM (
    'AB',
    'BC',
    'MB',
    'NB',
    'NL',
    'NS',
    'NT',
    'NU',
    'ON',
    'PE',
    'QC',
    'SK',
    'YT'
);

ALTER TYPE "public"."provinces" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."asset_beneficiaries" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "allocation" smallint NOT NULL,
    "asset_id" bigint NOT NULL,
    "beneficiary_id" bigint NOT NULL,
    "already_assigned" boolean DEFAULT true NOT NULL
);

ALTER TABLE "public"."asset_beneficiaries" OWNER TO "postgres";

ALTER TABLE "public"."asset_beneficiaries" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."asset_beneficiaries_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."assets" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "initial_value" numeric NOT NULL,
    "current_value" numeric NOT NULL,
    "year_acquired" integer NOT NULL,
    "rate" smallint NOT NULL,
    "term" smallint NOT NULL,
    "type" "public"."asset_types" NOT NULL,
    "is_taxable" boolean NOT NULL,
    "is_liquid" boolean NOT NULL,
    "to_be_sold" boolean NOT NULL,
    "client_id" bigint NOT NULL
);

ALTER TABLE "public"."assets" OWNER TO "postgres";

ALTER TABLE "public"."assets" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."assets_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."beneficiaries" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "allocation" smallint NOT NULL,
    "client_id" bigint NOT NULL
);

ALTER TABLE "public"."beneficiaries" OWNER TO "postgres";

ALTER TABLE "public"."beneficiaries" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."beneficiaries_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."businesses" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "valuation" numeric NOT NULL,
    "ebitda" numeric NOT NULL,
    "appreciation_rate" smallint NOT NULL,
    "term" smallint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "client_id" bigint NOT NULL
);

ALTER TABLE "public"."businesses" OWNER TO "postgres";

ALTER TABLE "public"."businesses" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."businesses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."clients" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "birth_date" "date" NOT NULL,
    "expected_retirement_age" smallint NOT NULL,
    "province" "public"."provinces" NOT NULL,
    "annual_income" numeric NOT NULL,
    "income_multiplier" smallint NOT NULL,
    "kinde_id" "text" NOT NULL
);

ALTER TABLE "public"."clients" OWNER TO "postgres";

ALTER TABLE "public"."clients" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."clients_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."debts" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "initial_value" numeric NOT NULL,
    "year_acquired" integer NOT NULL,
    "rate" smallint NOT NULL,
    "term" smallint NOT NULL,
    "annual_payment" numeric NOT NULL,
    "insurable_future_value_dollars" numeric NOT NULL,
    "client_id" bigint NOT NULL
);

ALTER TABLE "public"."debts" OWNER TO "postgres";

ALTER TABLE "public"."debts" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."debts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."goals" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "amount" numeric NOT NULL,
    "philanthropic" boolean NOT NULL,
    "client_id" bigint NOT NULL
);

ALTER TABLE "public"."goals" OWNER TO "postgres";

ALTER TABLE "public"."goals" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."goals_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."shareholders" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "share_percentage" smallint NOT NULL,
    "insurance_coverage" numeric NOT NULL,
    "ebitda_contribution_percentage" smallint NOT NULL,
    "business_id" bigint NOT NULL
);

ALTER TABLE "public"."shareholders" OWNER TO "postgres";

ALTER TABLE "public"."shareholders" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."shareholders_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY "public"."asset_beneficiaries"
    ADD CONSTRAINT "assetBeneficiaries_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."assets"
    ADD CONSTRAINT "assets_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."beneficiaries"
    ADD CONSTRAINT "beneficiaries_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."businesses"
    ADD CONSTRAINT "businesses_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."clients"
    ADD CONSTRAINT "client_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."debts"
    ADD CONSTRAINT "debts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."goals"
    ADD CONSTRAINT "goals_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."shareholders"
    ADD CONSTRAINT "shareholders_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."asset_beneficiaries"
    ADD CONSTRAINT "public_assetBeneficiaries_assetId_fkey" FOREIGN KEY ("asset_id") REFERENCES "public"."assets"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."asset_beneficiaries"
    ADD CONSTRAINT "public_assetBeneficiaries_beneficaryId_fkey" FOREIGN KEY ("beneficiary_id") REFERENCES "public"."beneficiaries"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."assets"
    ADD CONSTRAINT "public_assets_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id");

ALTER TABLE ONLY "public"."beneficiaries"
    ADD CONSTRAINT "public_beneficiaries_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id");

ALTER TABLE ONLY "public"."businesses"
    ADD CONSTRAINT "public_businesses_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id");

ALTER TABLE ONLY "public"."debts"
    ADD CONSTRAINT "public_debts_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id");

ALTER TABLE ONLY "public"."goals"
    ADD CONSTRAINT "public_goals_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id");

ALTER TABLE ONLY "public"."shareholders"
    ADD CONSTRAINT "public_shareholders_businessId_fkey" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE;

ALTER TABLE "public"."asset_beneficiaries" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."assets" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."beneficiaries" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."businesses" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."clients" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."debts" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."goals" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."shareholders" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."asset_beneficiaries" TO "anon";
GRANT ALL ON TABLE "public"."asset_beneficiaries" TO "authenticated";
GRANT ALL ON TABLE "public"."asset_beneficiaries" TO "service_role";

GRANT ALL ON SEQUENCE "public"."asset_beneficiaries_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."asset_beneficiaries_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."asset_beneficiaries_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."assets" TO "anon";
GRANT ALL ON TABLE "public"."assets" TO "authenticated";
GRANT ALL ON TABLE "public"."assets" TO "service_role";

GRANT ALL ON SEQUENCE "public"."assets_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."assets_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."assets_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."beneficiaries" TO "anon";
GRANT ALL ON TABLE "public"."beneficiaries" TO "authenticated";
GRANT ALL ON TABLE "public"."beneficiaries" TO "service_role";

GRANT ALL ON SEQUENCE "public"."beneficiaries_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."beneficiaries_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."beneficiaries_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."businesses" TO "anon";
GRANT ALL ON TABLE "public"."businesses" TO "authenticated";
GRANT ALL ON TABLE "public"."businesses" TO "service_role";

GRANT ALL ON SEQUENCE "public"."businesses_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."businesses_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."businesses_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."clients" TO "anon";
GRANT ALL ON TABLE "public"."clients" TO "authenticated";
GRANT ALL ON TABLE "public"."clients" TO "service_role";

GRANT ALL ON SEQUENCE "public"."clients_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."clients_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."clients_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."debts" TO "anon";
GRANT ALL ON TABLE "public"."debts" TO "authenticated";
GRANT ALL ON TABLE "public"."debts" TO "service_role";

GRANT ALL ON SEQUENCE "public"."debts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."debts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."debts_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."goals" TO "anon";
GRANT ALL ON TABLE "public"."goals" TO "authenticated";
GRANT ALL ON TABLE "public"."goals" TO "service_role";

GRANT ALL ON SEQUENCE "public"."goals_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."goals_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."goals_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."shareholders" TO "anon";
GRANT ALL ON TABLE "public"."shareholders" TO "authenticated";
GRANT ALL ON TABLE "public"."shareholders" TO "service_role";

GRANT ALL ON SEQUENCE "public"."shareholders_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."shareholders_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."shareholders_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;

--
-- Dumped schema changes for auth and storage
--

