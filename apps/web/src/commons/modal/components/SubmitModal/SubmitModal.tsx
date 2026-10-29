"use client";

import CommonSeparator from "@/commons/layout/components/CommonSeparator/CommonSeparator";
import { useFormContext, useWatch } from "react-hook-form";
import dayjs from "dayjs";
import "@/libs/dayjs/config";
import { Input } from "@/libs/shadcn/assets/ui/input";
import Plain from "@public/plain.svg";
import ModalContents from "@/commons/modal/components/ModalContents/ModalContents";
import type { Label } from "@/infra/api/client";

type Props = {
  labels: Label[];
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubmitModal = ({ labels, isOpenModal, setIsOpenModal }: Props) => {
  const [start, end] = useWatch({
    name: ["start", "end"],
  });
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const dur = dayjs.duration(dayjs(end).diff(dayjs(start)));
  const total = `${Math.floor(dur.asHours())}時間${dur.minutes()}分`;

  return (
    <>
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-125 overflow-hidden rounded-4xl bg-background">
            <div className="flex flex-col gap-2.5 p-6">
              <span className="text-[11px] font-semibold text-primary-foreground">
                作業時間
              </span>
              <span className="text-[32px] font-bold text-foreground">
                {total}
              </span>
            </div>
            <CommonSeparator />
            <div className="flex flex-col gap-4 px-6 py-5">
              <span className="text-[12px] text-primary-foreground">
                何をしましたか？
              </span>
              <Input
                className="px-3.5 py-3 text-[14px] text-foreground"
                {...register("title")}
              />
              <ModalContents labels={labels} />
              {errors.end?.message && (
                <p role="alert" className="text-[12px] text-[#E05252]">
                  {String(errors.end.message)}
                </p>
              )}
            </div>
            <CommonSeparator />
            <div className="flex justify-between gap-3 px-5 pt-4 pb-5">
              <button
                type="submit"
                className="flex w-full cursor-pointer rounded-xl bg-accent-lime py-3.5"
              >
                <div className="m-auto flex gap-3">
                  <Plain
                    className="size-4.5 text-foreground-dark"
                    alt="submit"
                  />
                  <span className="text-[14px] font-bold text-foreground-dark">
                    これでOK！
                  </span>
                </div>
              </button>
              <div className="shrink-0 rounded-xl bg-[#2A1515] px-4.5 py-3.5">
                <button
                  type="button"
                  className="cursor-pointer text-[14px] font-semibold whitespace-nowrap text-[#E05252]"
                  onClick={() => {
                    setValue("end", null);
                    setIsOpenModal(false);
                  }}
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmitModal;
