export async function signup() {
  const response = await fetch(`${process.env.PUBLIC_DATA_ROUTE}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      number: "",
    }),
  });
  return response.json();
}
