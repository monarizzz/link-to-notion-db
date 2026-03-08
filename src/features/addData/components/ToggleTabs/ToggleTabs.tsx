import { Tabs, TabsList, TabsTrigger } from "@/libs/shadcn/assets/ui/tabs";

const ToggleTabs = ({}) => {
  return (
    //   bg-muted-foreground

    <Tabs defaultValue="start">
      <TabsList className="h-6">
        <TabsTrigger
          className="text-[11px] hover:text-muted-foreground"
          value="start"
        >
          開始基準
        </TabsTrigger>
        <TabsTrigger
          className="text-[11px]  hover:text-muted-foreground"
          value="end"
        >
          終了基準
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ToggleTabs;
