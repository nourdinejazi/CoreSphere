import MainSpinner from "@/components/main-spinner";
import { cn } from "@/lib/utils";

const LoadingPage = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full h-[90vh]  flex items-center justify-center",
        className
      )}
    >
      <MainSpinner />
    </div>
  );
};

export default LoadingPage;
