import axios from "axios";

export async function createUser(phoneNumber: string) {
  const route = `${process.env.EXPO_PUBLIC_DATA_ROUTE}/signup`;
  try {
    await axios.post(route, { number: phoneNumber });
  } catch (e) {
    throw e;
  }
}
