import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_privilegio" AS ENUM('admin', 'editor', 'leitor');
  CREATE TYPE "public"."enum_eventos_modalidade" AS ENUM('online', 'presencial', 'hibrido');
  CREATE TABLE IF NOT EXISTS "subcategories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "subcategories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "users_privilegio" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_privilegio",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "eventos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descricao" varchar NOT NULL,
  	"image_id" integer,
  	"inicio" timestamp(3) with time zone NOT NULL,
  	"termino" timestamp(3) with time zone,
  	"aberto" boolean,
  	"campus_id" integer,
  	"modalidade" "enum_eventos_modalidade" NOT NULL,
  	"local" varchar,
  	"url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "categories" ADD COLUMN "description" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "subcategories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "eventos_id" integer;
  DO $$ BEGIN
   ALTER TABLE "subcategories_rels" ADD CONSTRAINT "subcategories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."subcategories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "subcategories_rels" ADD CONSTRAINT "subcategories_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users_privilegio" ADD CONSTRAINT "users_privilegio_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "eventos" ADD CONSTRAINT "eventos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "eventos" ADD CONSTRAINT "eventos_campus_id_subcategories_id_fk" FOREIGN KEY ("campus_id") REFERENCES "public"."subcategories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "subcategories_slug_idx" ON "subcategories" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "subcategories_updated_at_idx" ON "subcategories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "subcategories_created_at_idx" ON "subcategories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "subcategories_rels_order_idx" ON "subcategories_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "subcategories_rels_parent_idx" ON "subcategories_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "subcategories_rels_path_idx" ON "subcategories_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "subcategories_rels_categories_id_idx" ON "subcategories_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "users_privilegio_order_idx" ON "users_privilegio" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "users_privilegio_parent_idx" ON "users_privilegio" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "eventos_image_idx" ON "eventos" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "eventos_campus_idx" ON "eventos" USING btree ("campus_id");
  CREATE INDEX IF NOT EXISTS "eventos_updated_at_idx" ON "eventos" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "eventos_created_at_idx" ON "eventos" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subcategories_fk" FOREIGN KEY ("subcategories_id") REFERENCES "public"."subcategories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_eventos_fk" FOREIGN KEY ("eventos_id") REFERENCES "public"."eventos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_subcategories_id_idx" ON "payload_locked_documents_rels" USING btree ("subcategories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_eventos_id_idx" ON "payload_locked_documents_rels" USING btree ("eventos_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "subcategories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "subcategories_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_privilegio" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "eventos" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "subcategories" CASCADE;
  DROP TABLE "subcategories_rels" CASCADE;
  DROP TABLE "users_privilegio" CASCADE;
  DROP TABLE "eventos" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_subcategories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_eventos_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_subcategories_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_eventos_id_idx";
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "subcategories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "eventos_id";
  DROP TYPE "public"."enum_users_privilegio";
  DROP TYPE "public"."enum_eventos_modalidade";`)
}
