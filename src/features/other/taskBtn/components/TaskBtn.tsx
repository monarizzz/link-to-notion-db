type Props = {
  select: string;
};

const TaskButton = ({ select }: Props) => {
  return (
    <div>
      <div className="text-xs rounded-full text-muted-foreground py-1.5 px-3 bg-background-2 border-[1.5px] border-border hover:border-border-hover hover:text-foreground">
        {select}
      </div>
    </div>
  );
};

export default TaskButton;
