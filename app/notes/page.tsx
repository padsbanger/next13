import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

async function getNotes() {
  const { token } = await pb.admins.authWithPassword(
    process.env.NEXT_PUBLIC_DB_USER as string,
    process.env.NEXT_PUBLIC_DB_PASS as string
  );

  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records",
    {
      headers: { Authorization: token },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data.items;
}

function Note({ note }) {
  const { title, content } = note;
  return (
    <div className="flex flex-col bg-slate-400 p-2 gap-2">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default async function NotesPage() {
  "use client";
  const data = await getNotes();

  return (
    <div className="flex flex-col">
      <h1>Notes list</h1>
      <div className="container mx-auto flex gap-4">
        {data.map((el) => (
          <Note key={el.id} note={el} />
        ))}
      </div>
    </div>
  );
}
