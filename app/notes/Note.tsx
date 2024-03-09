"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export default function Note({ note }) {
  const { title, content, id } = note;
  const router = useRouter();

  const deleteNote = async () => {
    await pb.collection("notes").delete(id);
    router.refresh();
  };

  return (
    <div className="flex flex-col bg-slate-400 p-2 gap-2">
      <Link href={`/notes/${id}`}>
        <h2>{title}</h2>
        <p>{content}</p>
      </Link>
      <button onClick={deleteNote}>Delete</button>
    </div>
  );
}
