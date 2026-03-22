import BottomBar from "@/commons/layout/components/BottomBar/BottomBar";
import NowDisplay from "../NowDisplay/NowDisplay";
import TaskCard from "@/commons/taskCard/components/TaskCard";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  labels: string[];
};

const userSchema = z.object({
  start: z.string().min(1, "開始日時を入力してください"),
});

type UserData = z.infer<typeof userSchema>;

// TODO:仮置き
const time = "00:12:34";
const work = "デザイン修正";

const HomePageMain = ({ labels }: Props) => {
  const methods = useForm<UserData>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<UserData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="relative flex flex-col h-screen w-screen items-center justify-center bg-[#2C2C2C]">
            <NowDisplay isTimer={false} />
            <div className="m-14">
              <TaskCard
                isInput="input"
                labels={labels}
                work={work}
                time={time}
              />
            </div>
            <div className="absolute bottom-5">
              <BottomBar />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default HomePageMain;
