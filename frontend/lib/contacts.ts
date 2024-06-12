import * as Contacts from "expo-contacts";

function normalize(name: string | undefined) {
  if (name === undefined) {
    return "";
  }
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function sortContacts(contacts: Contacts.Contact[]) {
  return contacts.sort((a, b) => {
    const lastNameA = normalize(a.lastName);
    const lastNameB = normalize(b.lastName);
    const firstNameA = normalize(a.firstName);
    const firstNameB = normalize(b.firstName);

    if (lastNameA < lastNameB) return -1;
    if (lastNameA > lastNameB) return 1;

    if (firstNameA < firstNameB) return -1;
    if (firstNameA > firstNameB) return 1;

    return 0;
  });
}

function getStartingLetter(contact: Contacts.Contact) {
  let relevantName = contact.firstName;
  if (contact.firstName === undefined) {
    relevantName = contact.lastName;
  }
  if (contact.contactType === "company") {
    relevantName = contact.company;
  }
  relevantName = relevantName as string;

  let startingLetter = normalize(relevantName[0].toUpperCase());
  if (!/[A-Z]/.test(startingLetter)) {
    startingLetter = "#";
  }
  return startingLetter;
}

function sortAndIndex(contacts: Contacts.Contact[]) {
  sortContacts(contacts);
  let currentIndex = "";
  let res: Array<Contacts.Contact | string> = [];
  contacts.forEach((contact) => {
    const startingLetter = getStartingLetter(contact);
    if (currentIndex !== startingLetter) {
      currentIndex = startingLetter;
      res.push(startingLetter);
    }
    res.push(contact);
  });
  return res;
}

export async function getContacts() {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === "granted") {
    const res = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
    });

    const indexedContacts = sortAndIndex(res.data);

    const stickyHeaderIndices = indexedContacts
      .map((item, index) => {
        if (typeof item === "string") {
          return index;
        } else {
          return null;
        }
      })
      .filter((item) => item !== null) as number[];

    return {
      contacts: indexedContacts,
      stickyHeaderIndices: stickyHeaderIndices,
    };
  }
}
