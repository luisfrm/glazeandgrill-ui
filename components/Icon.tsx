import { cn } from "@/helper/helper";

interface Props {
  children: React.ReactNode;
}

interface Props {
  children: React.ReactNode;
  clickable?: boolean;
  rounded?: boolean;
  className?: string;
  changeOnHover?: boolean;
}

const Icon = ({ children, clickable = false, rounded = false, className = "", changeOnHover = false }: Props) => {
  const classes = cn(
    "material-symbols-outlined",
    clickable ? "cursor-pointer" : "",
    rounded ? "rounded-full" : "",
    changeOnHover ? "hover:text-sweet transition-colors" : "",
    className,
  )

  return <span className={classes}>{children}</span>;
};

export default Icon