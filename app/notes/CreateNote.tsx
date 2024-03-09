"use client";

import { useState } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";

const pb = new PocketBase("http://127.0.0.1:8090");

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const addNote = async (event) => {
    event.preventDefault();
    await pb
      .collection("notes")
      .create({ title, content }, { requestKey: "test" });

    router.refresh();
  };

  return (
    <form className="container mx-auto flex flex-col" onSubmit={addNote}>
      <fieldset>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="content">Content</label>
        <input
          name="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </fieldset>
      <button onClick={addNote}>Add note</button>
    </form>
  );
}
