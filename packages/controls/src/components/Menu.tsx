import React from "react";
import clsx from "clsx";

import SelectModel from "./SelectModel";
import {
  useMenuStore,
  useModelStore,
} from "../stores";
import Item from "./Item";
import { ControllingSubject } from "../types";
import { uxWrite } from "../constants/uxWrite";
import { useControlStore } from "../stores/controls";

const Menu = () => {
  const { toggle } = useMenuStore();
  const { models, selectedModelName } =
    useModelStore();
  const { controls, setControllingSubject } =
    useControlStore();

  const handleItemClick =
    (subject: ControllingSubject) => () => {
      setControllingSubject(subject);

      toggle();
    };
  const handleCloseClick = () => toggle();

  return (
    <div
      className={clsx(
        "bg-white p-[20px]",
        "w-[300px] h-[400px]",
        "flex flex-col",
        "border-[1px] border-solid border-black",
        "overflow-auto"
      )}
    >
      <div
        className={clsx(
          "flex-1",
          "flex flex-col space-y-[10px]"
        )}
      >
        {Boolean(models.length) && <SelectModel />}

        {Object.values(ControllingSubject).map(
          (subject: ControllingSubject) => {
            return (
              <Item
                disabled={
                  !selectedModelName ||
                  subject ===
                    ControllingSubject.FaceTarget // 미완성
                }
                onClick={handleItemClick(subject)}
              >
                {uxWrite.menuItem[subject]}
              </Item>
            );
          }
        )}

        <Item
          className={"!bg-yellow-400"}
          onClick={() => {
            if (navigator.share) {
              const memo = prompt(
                "메모와 함께 공유됩니다."
              );
              const controlValues = JSON.stringify({
                ...controls,
                memo: memo,
              });

              navigator
                .share({
                  title: memo,
                  text: controlValues, // JSON 데이터를 문자열로 변환하여 공유
                })
                .then(() => console.log("공유 성공!"))
                .catch((error) =>
                  console.error("공유 실패:", error)
                );
            } else {
              alert(
                "Web Share API를 지원하지 않는 브라우저입니다."
              );
            }
          }}
        >
          설정값 공유하기
        </Item>

        <Item
          className={"!bg-black text-white mt-auto"}
          onClick={handleCloseClick}
        >
          닫기
        </Item>
      </div>
    </div>
  );
};

export default Menu;
