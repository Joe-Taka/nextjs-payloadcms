import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_eventos_campus" AS ENUM('apucarana', 'campo-mourao', 'cornelio-procopio', 'curitiba', 'dois-vizinhos', 'francisco-beltrao', 'guarapuava', 'londrina', 'medianeira', 'pato-branco', 'ponta-grossa', 'reitoria', 'santa-helena', 'toledo');
  CREATE TYPE "public"."enum_eventos_modalidade" AS ENUM('online', 'presencial', 'hibrido');
  CREATE TABLE IF NOT EXISTS "eventos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descricao" varchar NOT NULL,
  	"image_id" integer,
  	"inicio" timestamp(3) with time zone NOT NULL,
  	"termino" timestamp(3) with time zone,
  	"aberto" boolean,
  	"campus" "enum_eventos_campus",
  	"modalidade" "enum_eventos_modalidade" NOT NULL,
  	"local" varchar,
  	"url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "eventos_id" integer;
  DO $$ BEGIN
   ALTER TABLE "eventos" ADD CONSTRAINT "eventos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "eventos_image_idx" ON "eventos" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "eventos_updated_at_idx" ON "eventos" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "eventos_created_at_idx" ON "eventos" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_eventos_fk" FOREIGN KEY ("eventos_id") REFERENCES "public"."eventos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_eventos_id_idx" ON "payload_locked_documents_rels" USING btree ("eventos_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "eventos" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "eventos" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_eventos_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_eventos_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "eventos_id";
  DROP TYPE "public"."enum_eventos_campus";
  DROP TYPE "public"."enum_eventos_modalidade";`)
}
