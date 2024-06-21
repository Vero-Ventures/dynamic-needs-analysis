alter table "public"."clients" alter column "liquidity_allocated_towards_goals" set default '0'::smallint;

alter table "public"."clients" alter column "liquidity_allocated_towards_goals" drop not null;


