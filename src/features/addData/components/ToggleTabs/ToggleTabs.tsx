import { AddDataForm } from "@/commons/addData/components/AddData";
import { Tabs, TabsList, TabsTrigger } from "@/libs/shadcn/assets/ui/tabs";
import { Controller, useFormContext } from "react-hook-form";

const ToggleTabs = () => {
  const { control } = useFormContext<AddDataForm>();
  return (
    <Controller
      control={control}
      name="isStart"
      render={({ field }) => (
        <Tabs
          value={field.value ? "start" : "end"}
          onValueChange={(v) => field.onChange(v === "start")}
        >
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
      )}
    />
  );
};

export default ToggleTabs;
