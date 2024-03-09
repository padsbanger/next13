import Link from "next/link";
import PocketBase from "pocketbase";
import CreateNote from "./CreateNote";
import { useRouter } from "next/navigation";
import Note from "./Note";

const pb = new PocketBase("http://127.0.0.1:8090");

async function getNotes() {
  const data = await pb.collection("notes").getFullList({ requestKey: "test" });
  return data;
}

export default async function NotesPage() {
  const data = await getNotes();

  return (
    <div>
      <div className="flex flex-col">
        <h1>Notes list</h1>
        <div className="container mx-auto flex gap-4">
          {data.map((el) => (
            <Note key={el.id} note={el} />
          ))}
        </div>
      </div>
      <CreateNote />
    </div>
  );
}
