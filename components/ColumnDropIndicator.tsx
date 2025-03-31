import { ColumnDropIndicatorProps } from "../types/card";

const ColumnDropIndicator: React.FC<ColumnDropIndicatorProps> = ({
  beforeId,
}) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-board="column-indicator"
      className="opacity-0 w-1 h-full min-h-[8rem] bg-violet-400 rounded transition-opacity"
    />
  );
};
export default ColumnDropIndicator;
