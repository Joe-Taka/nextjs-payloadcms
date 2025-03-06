import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_privilegio" AS ENUM('admin', 'editor', 'usuario');
  CREATE TABLE IF NOT EXISTS "users_privilegio" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_privilegio",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "users_privilegio" ADD CONSTRAINT "users_privilegio_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_privilegio_order_idx" ON "users_privilegio" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "users_privilegio_parent_idx" ON "users_privilegio" USING btree ("parent_id");
  ALTER TABLE "users" DROP COLUMN IF EXISTS "name";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_privilegio" CASCADE;
  ALTER TABLE "users" ADD COLUMN "name" varchar;
  DROP TYPE "public"."enum_users_privilegio";`)
}
