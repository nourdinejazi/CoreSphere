import { cn } from "@/lib/utils";

const AnimatedLink = ({
  text,
  selected,
}: {
  text: string;
  selected: boolean;
}) => {
  return (
    <span
      className={cn(
        "bg-left-bottom bg-gradient-to-r pb-1 from-primary to-primary bg-[length:0%_1px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-400 ease-out",
        selected && " text-primary hover:bg-[length:0%] "
      )}
    >
      {text}
    </span>
  );
};

export default AnimatedLink;
