import { Separator } from "@/components/ui/separator";
import InputsParams from "./_components/inputs-params";
import { Button } from "@/components/ui/button";
import { FileBarChart2, Upload } from "lucide-react";
import { PathSlash } from "@/components/path-slash";
const Releve = () => {
  return (
    <div className="  h-screen  p-4  ">
      <PathSlash />
      <div className="bg-white h-full rounded-2xl mt-4 p-4">
        <header className="flex items-cents justify-between p-5 ">
          <span className="flex items-center justify-center gap-2">
            <FileBarChart2 />
            <h1 className="text-2xl font-semibold">Relevé</h1>
          </span>

          <Button className="flex gap-2">
            <Upload size={20} /> Imprimer
          </Button>
        </header>
        <Separator className="w-full mb-8" />
        <div className=" w-[300px]">
          <InputsParams />
        </div>
      </div>
    </div>
  );
};

export default Releve;
