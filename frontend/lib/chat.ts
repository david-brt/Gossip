import * as SQLite from "expo-sqlite";

export async function uuidExists(db: SQLite.SQLiteDatabase, uuid: string) {
  const query = `SELECT count(1) as found FROM chat WHERE chat_id = ?`;
  const row = (await db.getFirstAsync(query, uuid)) as { found: number };
  if (row === null || row === undefined) {
    throw new Error("Could not query local database");
  }
  return row.found === 1;
}
