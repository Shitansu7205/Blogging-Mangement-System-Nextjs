"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import { useState } from "react";
export default function TiptapEditor({ value, onChange }) {

  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);


  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Heading, Link],
    content: value,
    // onUpdate: ({ editor }) => onChange(editor.getHTML()),
    onUpdate: ({ editor }) => {
      const text = editor.getText(); // Get plain text

      setCharCount(text.length); // Character count
      setWordCount(text.trim().split(/\s+/).filter(Boolean).length); // Word count

      onChange(editor.getHTML()); // Update content
    },
  });

  if (!editor) {
    return <div>Loading Editor...</div>;
  }

  // ✅ Prevent form submission when pressing Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      editor.chain().focus().enter().run(); // Allows new lines in editor
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4 bg-gray-100 p-2 rounded-md shadow-inner">
        <button
          type="button" // ✅ Prevents form submission
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Bold
        </button>
        <button
          type="button" // ✅ Prevents form submission
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Italic
        </button>
        <button
          type="button" // ✅ Prevents form submission
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
        >
          H1
        </button>
        <button
          type="button" // ✅ Prevents form submission
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
        >
          H2
        </button>
        <button
          type="button" // ✅ Prevents form submission
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className="px-3 py-1 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition"
        >
          Link
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="border p-4 min-h-[400px] rounded-md shadow-inner focus:outline-none bg-gray-50"
        onKeyDown={handleKeyDown} // ✅ Prevent default form submission

      />
      {/* Word & Character Count */}
      <div className="flex justify-between mt-3 p-3 bg-gray-100 rounded-md text-gray-700 text-sm font-medium shadow-inner border border-gray-300">
        <span className="flex items-center gap-1">
          📝 <span>Words: {wordCount}</span>
        </span>
              {/* Reading Time */}
      <span className="mt-2 text-sm text-gray-600">
        ⏳ Estimated Reading Time: {Math.ceil(wordCount / 200)} min
      </span>
        <span className="flex items-center gap-1">
          🔠 <span>Characters: {charCount}</span>
        </span>
      </div>



    </div>

  );
}
