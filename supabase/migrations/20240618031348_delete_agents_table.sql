revoke delete on table "public"."agents" from "anon";

revoke insert on table "public"."agents" from "anon";

revoke references on table "public"."agents" from "anon";

revoke select on table "public"."agents" from "anon";

revoke trigger on table "public"."agents" from "anon";

revoke truncate on table "public"."agents" from "anon";

revoke update on table "public"."agents" from "anon";

revoke delete on table "public"."agents" from "authenticated";

revoke insert on table "public"."agents" from "authenticated";

revoke references on table "public"."agents" from "authenticated";

revoke select on table "public"."agents" from "authenticated";

revoke trigger on table "public"."agents" from "authenticated";

revoke truncate on table "public"."agents" from "authenticated";

revoke update on table "public"."agents" from "authenticated";

revoke delete on table "public"."agents" from "service_role";

revoke insert on table "public"."agents" from "service_role";

revoke references on table "public"."agents" from "service_role";

revoke select on table "public"."agents" from "service_role";

revoke trigger on table "public"."agents" from "service_role";

revoke truncate on table "public"."agents" from "service_role";

revoke update on table "public"."agents" from "service_role";

alter table "public"."clients" drop constraint "public_clients_agent_id_fkey";

alter table "public"."agents" drop constraint "agents_pkey";

drop index if exists "public"."agents_pkey";

drop table "public"."agents";

alter table "public"."clients" drop column "agent_id";

alter table "public"."clients" add column "kinde_id" text not null;


