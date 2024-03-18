import MainSpinner from "@/components/main-spinner";

const LoadingPage = () => {
  return (
    <div className="w-full h-[60vh]  flex items-center justify-center">
      <MainSpinner />
    </div>
  );
};

export default LoadingPage;
