"use client";

import React, { FC, useEffect } from "react";
import { useField } from "formik";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { FormControl } from "@/components/molecules/form/FormControl";

interface CustomWysivygProps {
  name: string;
}

const CustomWysivyg: FC<CustomWysivygProps> = ({ name }) => {
  const [{ value }, meta, helper] = useField(name);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value || "",
    onUpdate: ({ editor }) => {
      helper.setValue(editor.getHTML());
    },
  });

  // Sync external value (important for Formik reset)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <FormControl
      tw={"max-w-full xl:max-w-md mb-3"}
      name={name}
      error={meta.error}
    >
      {/* Toolbar */}
      <div className="border rounded-t-md p-2 flex gap-2 bg-gray-50">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b>
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <u>U</u>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <s>S</s>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear
        </button>
      </div>

      {/* Editor */}
      <div className="border border-t-0 rounded-b-md p-3 min-h-[120px]">
        <EditorContent editor={editor} />
      </div>
    </FormControl>
  );
};

export default CustomWysivyg;