import * as SQLite from "expo-sqlite";
import * as migrations from "./migrations/index";

async function tableExists(db: SQLite.SQLiteDatabase, table: string) {
  const res = await db.getFirstAsync(
    "SELECT name FROM sqlite_master WHERE type='table' AND name= ?;",
    table,
  );
  return Boolean(res);
}

async function getDBVersion(db: SQLite.SQLiteDatabase) {
  try {
    const exists = await tableExists(db, "db_version");
    if (!exists) return -1;
    const row: { version: number } | null = await db.getFirstAsync(
      "SELECT version from db_version;",
    );
    if (row === null) return -1;
    return row["version"];
  } catch (err) {
    console.log(err);
    return 0;
  }
}

async function updateVersion(db: SQLite.SQLiteDatabase, version: number) {
  await db.runAsync("UPDATE db_version SET version = ?;", version);
}

/**
 * @param initialVersion current version of the database
 * @param targetVersion version number to which the system migrates
 * Calls every up migration up to the given target version exported by ./migrations/index.ts
 */
export async function migrate(
  db: SQLite.SQLiteDatabase,
  targetVersion?: number,
) {
  const initialVersion = await getDBVersion(db);
  for (const migration of Object.values(migrations)) {
    const currentVersion = migration.version;
    console.log("migration " + currentVersion);
    if (currentVersion <= initialVersion) continue;
    if (targetVersion && currentVersion > targetVersion) break;
    await db.withExclusiveTransactionAsync(async () => {
      try {
        await migration.up(db);
      } catch (e) {
        console.log(e);
      }
      await updateVersion(db, currentVersion);
    });
  }
}
