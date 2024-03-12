import { cn } from "@/lib/utils";

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
  onblur?: any;
  className?: string;
}

const FilterInput: React.FC<InputProps> = ({
  id,
  onChange,
  value,
  label,
  type,
  onblur,
  className,
}) => {
  return (
    <div className="relative">
      <input
        value={value}
        type={type}
        onChange={onChange}
        onBlur={onblur}
        id={id}
        className={cn(
          `
                block
                rounded-md
                border-2
                border-gray-300
                pl-6
                pt-4
                pb-1        
                text-md
                text-black
                sm:w-[150px]
                max-w-[300px]
                focus:outline-none
                peer
                `,
          className
        )}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="
            absolute
            text-zinc-400
            duration-150
            transform
            -translate-y-3
            scale-75
            top-3
            text-sm
            z-10
            origin-[0]
            left-6
            peer-placeholder-shown:text-black
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-3
            "
      >
        {label}
      </label>
    </div>
  );
};

export default FilterInput;
