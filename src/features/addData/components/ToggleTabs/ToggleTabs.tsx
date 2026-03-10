import { Tabs, TabsList, TabsTrigger } from "@/libs/shadcn/assets/ui/tabs";

const ToggleTabs = ({}) => {
  return (
    <Tabs defaultValue="start">
      <TabsList className="h-8! rounded-sm">
        <TabsTrigger
          className="rounded-sm py-0 text-[11px] hover:text-muted-foreground"
          value="start"
        >
          開始基準
        </TabsTrigger>
        <TabsTrigger
          className="rounded-sm py-0 text-[11px] hover:text-muted-foreground"
          value="end"
        >
          終了基準
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ToggleTabs;
