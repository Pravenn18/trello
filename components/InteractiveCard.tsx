import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";
/**
 *
 * @Components
 * 1. DropIndicator a violet line to tell on which column we are dropping/dragging the card
 * @param title
 * @returns
 */
const InteractiveCard = ({
  title,
  id,
  column,
  description,
  dueDate,
  handleDragStart,
  onCardClick,
}: {
  title: string;
  id: string;
  column: number;
  description?: string;
  dueDate?: string;
  handleDragStart: any;
  startTime?: Date;
  authors?: string[];
  onCardClick?: any;
}) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e, { title, id, column, description, dueDate })
        }
        onClick={() => onCardClick({ id, title, column, description, dueDate })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-2 md:p-3 active:cursor-grabbing"
      >
        <p className="text-xs sm:text-sm text-neutral-100">{title}</p>
        {dueDate && (
          <p className="text-xs text-neutral-400 mt-1">
            Due: {new Date(dueDate).toLocaleDateString()}
          </p>
        )}
      </motion.div>
    </>
  );
};

export default InteractiveCard;
