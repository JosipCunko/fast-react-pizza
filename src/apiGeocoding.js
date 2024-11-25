export async function getUserAddress({ lat, lng }) {
  //position object passed in
  const res = await fetch(`
    https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}
    `);
  if (!res.ok) throw new Error("Failed getting your address!");

  const data = await res.json();
  return data;
}
