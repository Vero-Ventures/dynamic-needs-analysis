drop policy "Authenticated users can read, insert, update, delete their own " on "public"."clients";

create policy "Authenticated users can add clients"
on "public"."asset_beneficiaries"
as permissive
for insert
to public
with check ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) IS NOT NULL));


create policy "Authenticated user can add new clients"
on "public"."clients"
as permissive
for insert
to public
with check ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) = kinde_id));


create policy "Authenticated user can only read their own clients"
on "public"."clients"
as permissive
for select
to public
using ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) IS NOT NULL));


create policy "Authenticated users can only delete their own clients"
on "public"."clients"
as permissive
for delete
to public
using ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) = kinde_id));


create policy "Authenticated users can only update their own clients"
on "public"."clients"
as permissive
for update
to public
using ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) = kinde_id));



