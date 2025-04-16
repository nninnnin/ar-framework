import React, { useEffect, useRef } from "react";
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
import useUpdateModel from "../hooks/useUpdateModel";
import useModelElement from "../hooks/useModelElement";

const Menu = () => {
  const { toggle } = useMenuStore();
  const { models, selectedModelName } =
    useModelStore();
  const {
    controls,
    setControllingSubject,
    setVisibility,
  } = useControlStore();

  const { modelElement } = useModelElement();

  const { updateModel, isUpdating } = useUpdateModel();

  const handleItemClick =
    (subject: ControllingSubject) => () => {
      setControllingSubject(subject);

      toggle();
    };

  const handleCloseClick = () => toggle();

  const currentModelVisible = controls[
    selectedModelName as string
  ]
    ? controls[selectedModelName as string][
        "visibility"
      ]
    : null;

  const isVisibilityChanged = useRef(false);

  useEffect(() => {
    if (currentModelVisible === null) {
      return;
    }

    if (!isVisibilityChanged.current) {
      return;
    }

    (async function () {
      await updateModel();
    })();
  }, [currentModelVisible]);

  return (
    <div
      className={clsx(
        "bg-white p-[20px]",
        "w-[300px] h-[400px] rounded-[10px]",
        "flex flex-col",
        "border-[1px] border-solid border-black",
        "overflow-auto"
      )}
    >
      {isUpdating && (
        <div
          className={clsx(
            "fixed top-0 left-0 z-[9999]",
            "w-[100vw] h-[100dvh]",
            "flex justify-center items-center",
            "bg-black bg-opacity-50",
            "text-2xl text-white font-bold"
          )}
        >
          업데이트 중..
        </div>
      )}

      <div
        className={clsx(
          "flex-1",
          "flex flex-col space-y-[10px]"
        )}
      >
        {Boolean(models.length) && <SelectModel />}

        <Item
          disabled={
            !selectedModelName ||
            currentModelVisible === null
          }
          onClick={async () => {
            if (currentModelVisible === null) return;

            isVisibilityChanged.current = true;

            if (currentModelVisible) {
              setVisibility(
                selectedModelName as string,
                false
              );

              modelElement.setAttribute(
                "visible",
                "false"
              );
            } else {
              setVisibility(
                selectedModelName as string,
                true
              );

              modelElement.setAttribute(
                "visible",
                "true"
              );
            }
          }}
        >
          {currentModelVisible === true &&
            "모델 숨기기"}
          {currentModelVisible === false &&
            "모델 보이기"}
          {currentModelVisible === null &&
            "가시성 조정하기"}
        </Item>

        {[
          ControllingSubject.Position,
          ControllingSubject.Scale,
          ControllingSubject.Rotation,
        ].map((subject) => (
          <Item
            key={subject}
            className="bg-green-300"
            disabled={!selectedModelName}
            onClick={handleItemClick(subject)}
          >
            {uxWrite.menuItem[subject]}
          </Item>
        ))}

        <Item
          disabled={!selectedModelName}
          onClick={handleItemClick(
            ControllingSubject.LocationCoordinate
          )}
        >
          {
            uxWrite.menuItem[
              ControllingSubject.LocationCoordinate
            ]
          }
        </Item>

        <Item
          className={"!bg-[#00ceff] mt-auto"}
          onClick={handleCloseClick}
        >
          닫기
        </Item>

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
      </div>
    </div>
  );
};

export default Menu;
