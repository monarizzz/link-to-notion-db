type Props = {
  label: string;
  setLabel: boolean;
  onClick?: () => void;
};

const TaskBtn = ({ label, setLabel, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs rounded-full py-2 px-4 border-[1.5px] transition-colors whitespace-nowrap ${
        setLabel
          ? "bg-foreground text-background border-foreground"
          : "bg-background-2 text-muted-foreground border-border hover:border-border-hover hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
};

export default TaskBtn;
