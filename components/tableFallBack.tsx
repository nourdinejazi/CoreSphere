import "/loader.css";

const TableFallBack = () => {
  return (
    <div className="w-full bg-white rounded-xl  flex items-center justify-center h-[90vh] ">
      {/* <div classNameNameNameName="fastLoader border-[4px] border-primary "></div> */}
      <svg viewBox="0 0 240 240" height="240" width="240" className="pl">
        <circle
          stroke-linecap="round"
          stroke-dashoffset="-330"
          stroke-dasharray="0 660"
          stroke-width="20"
          stroke="#000"
          fill="none"
          r="105"
          cy="120"
          cx="120"
          className="pl__ring stroke-primary"
        ></circle>
        <circle
          stroke-linecap="round"
          stroke-dashoffset="-110"
          stroke-dasharray="0 220"
          stroke-width="20"
          stroke="#000"
          fill="none"
          r="35"
          cy="120"
          cx="120"
          className="pl__ring pl__ring--b"
        ></circle>
        <circle
          stroke-linecap="round"
          stroke-dasharray="0 440"
          stroke-width="20"
          stroke="#000"
          fill="none"
          r="70"
          cy="120"
          cx="85"
          className="pl__ring pl__ring--c"
        ></circle>
        <circle
          stroke-linecap="round"
          stroke-dasharray="0 440"
          stroke-width="20"
          stroke="#000"
          fill="none"
          r="70"
          cy="120"
          cx="155"
          className="pl__ring stroke-primary"
        ></circle>
      </svg>
    </div>
  );
};

export default TableFallBack;
