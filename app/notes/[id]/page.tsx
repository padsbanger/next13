import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

async function getNote(id) {
  const { token } = await pb.admins.authWithPassword(
    process.env.NEXT_PUBLIC_DB_USER as string,
    process.env.NEXT_PUBLIC_DB_PASS as string
  );

  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${id}`,
    {
      headers: { Authorization: token },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export default async function Note({ params }) {
  const note = await getNote(params.id);
  console.log(note);

  return <div>{note.title}</div>;
}
