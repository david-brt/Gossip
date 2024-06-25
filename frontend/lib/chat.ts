import { PhoneNumber } from "expo-contacts";
import { SQLiteDatabase } from "expo-sqlite";
import { getContactByIdAsync } from "expo-contacts";

async function userExists(db: SQLiteDatabase, userId: string) {
  const query = `SELECT count(1) as found FROM user WHERE contact_id = ?;`;
  const row = (await db.getFirstAsync(query, userId)) as { found: number };
  if (row === null || row === undefined) {
    throw new Error("Could not query local database");
  }
  return row.found === 1;
}

export async function uuidExists(db: SQLiteDatabase, uuid: string) {
  const query = `SELECT count(1) as found FROM chat WHERE chat_id = ?`;
  const row = (await db.getFirstAsync(query, uuid)) as { found: number };
  if (row === null || row === undefined) {
    throw new Error("Could not query local database");
  }
  return row.found === 1;
}

export async function createChat(
  db: SQLiteDatabase,
  uuid: string,
  userName: string,
  contactId: string,
) {
  if (userName === undefined) return;
  const createChatQuery = `
      INSERT INTO chat (chat_id, name)
      VALUES (?, ?);
    `;
  await db.runAsync(createChatQuery, uuid, userName);
  let userId;
  if (!(await userExists(db, contactId))) {
    const contact = await getContactByIdAsync(contactId, ["phoneNumbers"]);
    const number = contact?.phoneNumbers?.[0];
    const createUserQuery = `
        INSERT INTO user (contact_id, name, profile_picture)
        VALUES (?, ?, ?);
      `;
    const res = await db.runAsync(createUserQuery, contactId, userName, "");
    userId = res.lastInsertRowId;
    const createPhoneNumberQuery = `
      INSERT INTO phone_number (country_code, digits, number, user_id)
      VALUES (?, ?, ?, ?);
    `;
    await db.runAsync(
      createPhoneNumberQuery,
      number?.countryCode || "",
      number?.digits || "",
      number?.number || "",
      userId,
    );
  }
  const createChatUserQuery = `
      INSERT INTO chat_user (chat_id, user_id)
      VALUES (?, (
        SELECT user_id from user WHERE contact_id = ?
      ));
    `;
  await db.runAsync(createChatUserQuery, uuid, contactId as string);
}
