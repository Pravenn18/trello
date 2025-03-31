import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { Card } from "../types/card";

const AddList = ({ setColumns }: any) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newColumn = {
      title: text.trim(),
      column: Math.random().toString(),
      headingColor: "text-blue-400",
    };

    setColumns((prev: Card[]) => [...prev, newColumn]);
    setAdding(false);
  };

  return (
    <div className="w-44 sm:w-48 md:w-52 lg:w-56 shrink-0">
      {adding ? (
        <motion.form layout onSubmit={handleSubmit} className="p-2 md:p-3">
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="List title..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-1.5 md:p-2 text-xs md:text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 md:mt-2 flex items-center justify-end gap-1 md:gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-2 md:px-3 py-1 md:py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1 md:gap-1.5 rounded bg-neutral-50 px-2 md:px-3 py-1 md:py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add List</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add List</span>
          <FiPlus />
        </motion.button>
      )}
    </div>
  );
};

export default AddList;
