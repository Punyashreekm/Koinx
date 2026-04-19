import { Loader } from "lucide-react";

const Spinner = () => {
  return (
    <div className="grid h-screen w-full place-items-center">
      <Loader className="animate-spin font-extrabold" size={50} />
    </div>
  );
};

export default Spinner;
