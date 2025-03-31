// InteractiveColumn.tsx - Added delete button functionality
import { useState } from "react";
import { Card } from "../types/card";
import DropIndicator from "./DropIndicator";
import InteractiveCard from "./InteractiveCard";
import AddCard from "./AddCard";
import { TrashIcon } from "@heroicons/react/24/outline"; // Make sure you have this package installed

const InteractiveColumn = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
  handleColumnDragStart,
  onCardClick,
  onDeleteList,
}: {
  title: string;
  cards: any;
  setCards: any;
  column: string;
  headingColor: string;
  handleColumnDragStart: any;
  onCardClick: any;
  onDeleteList: any; // New prop for delete functionality
}) => {
  // For hover
  const [active, setActive] = useState(false);
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    setActive(false);
    clearHighlights();
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };
      copy = copy.filter((c) => c.id !== cardId);
      const moveToBack = before === "-1";
      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
      setCards(copy);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const clearHighlights = (els?: NodeListOf<HTMLElement>) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      (i as HTMLElement).style.opacity = "0";
    });
  };

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();
    clearHighlights(indicators as any);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: any
  ) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest: any, child: any) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c: Card) => c.column === column);

  return (
    <div
      className="w-44 sm:w-48 md:w-52 lg:w-56 shrink-0"
      draggable="true"
      onDragStart={(e) => handleColumnDragStart(e, column)}
    >
      <div className="mb-2 md:mb-3 flex items-center justify-between cursor-grab active:cursor-grabbing">
        <h3 className={`text-sm md:text-base font-medium ${headingColor}`}>
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="rounded text-xs md:text-sm text-neutral-400">
            {filteredCards.length}
          </span>
          <button
            onClick={() => onDeleteList(column)}
            className="text-neutral-400 hover:text-red-500 transition-colors"
            title="Delete list"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c: any) => {
          return (
            <InteractiveCard
              key={c.id}
              {...c}
              handleDragStart={handleDragStart}
              onCardClick={onCardClick}
            />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

export default InteractiveColumn;
