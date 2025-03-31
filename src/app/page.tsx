import React from "react";
import CustomKanban from "../../components/Board";

const HomeScreen = () => {
  return (
    <div className="h-screen w-full overflow-hidden bg-neutral-900 text-neutral-50">
      <div>
        <CustomKanban />
      </div>
    </div>
  );
};

export default HomeScreen;
