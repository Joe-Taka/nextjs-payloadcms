import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_privilegio" AS ENUM('admin', 'editor', 'usuário');
  ALTER TABLE "users" ADD COLUMN "privilegio" "enum_users_privilegio" DEFAULT 'Usuário' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" DROP COLUMN IF EXISTS "privilegio";
  DROP TYPE "public"."enum_users_privilegio";`)
}
