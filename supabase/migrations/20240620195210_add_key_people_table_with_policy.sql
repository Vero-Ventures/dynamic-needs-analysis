create table "public"."key_people" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "ebitda_contribution_percentage" smallint not null,
    "business_id" bigint not null,
    "insurance_coverage" numeric not null
);


alter table "public"."key_people" enable row level security;

alter table "public"."clients" add column "liquidity_allocated_towards_goals" smallint not null;

alter table "public"."shareholders" drop column "ebitda_contribution_percentage";

CREATE UNIQUE INDEX key_person_pkey ON public.key_people USING btree (id);

alter table "public"."key_people" add constraint "key_person_pkey" PRIMARY KEY using index "key_person_pkey";

alter table "public"."key_people" add constraint "public_key_person_business_id_fkey" FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE not valid;

alter table "public"."key_people" validate constraint "public_key_person_business_id_fkey";

grant delete on table "public"."key_people" to "anon";

grant insert on table "public"."key_people" to "anon";

grant references on table "public"."key_people" to "anon";

grant select on table "public"."key_people" to "anon";

grant trigger on table "public"."key_people" to "anon";

grant truncate on table "public"."key_people" to "anon";

grant update on table "public"."key_people" to "anon";

grant delete on table "public"."key_people" to "authenticated";

grant insert on table "public"."key_people" to "authenticated";

grant references on table "public"."key_people" to "authenticated";

grant select on table "public"."key_people" to "authenticated";

grant trigger on table "public"."key_people" to "authenticated";

grant truncate on table "public"."key_people" to "authenticated";

grant update on table "public"."key_people" to "authenticated";

grant delete on table "public"."key_people" to "service_role";

grant insert on table "public"."key_people" to "service_role";

grant references on table "public"."key_people" to "service_role";

grant select on table "public"."key_people" to "service_role";

grant trigger on table "public"."key_people" to "service_role";

grant truncate on table "public"."key_people" to "service_role";

grant update on table "public"."key_people" to "service_role";

create policy "Authenticated users can read, insert, update, delete key_person"
on "public"."key_people"
as permissive
for all
to public
using ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) IS NOT NULL));



