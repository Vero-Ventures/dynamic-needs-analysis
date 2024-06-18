create policy "Authenticated users can read, insert, update, delete asset bene"
on "public"."asset_beneficiaries"
as permissive
for all
to public
using ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) IS NOT NULL));


create policy "Authenticated users can read, insert, update, delete assets"
on "public"."assets"
as permissive
for all
to public
using ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) IS NOT NULL));


create policy "Authenticated users can read, insert, update, delete beneficiar"
on "public"."beneficiaries"
as permissive
for all
to public
using ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) IS NOT NULL));


create policy "Authenticated users can read, insert, update, delete businesses"
on "public"."businesses"
as permissive
for all
to public
using ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) IS NOT NULL));


create policy "Authenticated users can read, insert, update, delete clients."
on "public"."clients"
as permissive
for all
to public
using ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) IS NOT NULL));


create policy "Authenticated users can read, insert, update, delete their own "
on "public"."clients"
as permissive
for all
to public
using ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) = kinde_id));


create policy "Authenticated users can read, insert, update, delete debts"
on "public"."debts"
as permissive
for all
to public
using ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) IS NOT NULL));


create policy "Authenticated users can read, insert, update, delete goals"
on "public"."goals"
as permissive
for all
to public
using ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) IS NOT NULL));


create policy "Authenticated users can read, insert, update, delete shareholde"
on "public"."shareholders"
as permissive
for all
to public
using ((NULLIF(((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text), ''::text) IS NOT NULL));



