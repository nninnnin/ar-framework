import React, { useEffect } from "react";
import { create } from "zustand";
import { useOverlay } from "@toss/use-overlay";
import { css } from "@emotion/react";
import ContextMenu from "@/shared/components/ContextMenu";

interface ContextMenuStore {
  isOpen: boolean;
  position: {
    x: number;
    y: number;
  };
}

export const contextMenuStore =
  create<ContextMenuStore>((set) => ({
    isOpen: false,
    position: {
      x: 0,
      y: 0,
    },
  }));

const useContextMenu = () => {
  const overlay = useOverlay();

  const open = (
    e: MouseEvent | React.MouseEvent,
    ContentsComponent: () => React.ReactNode
  ) => {
    overlay.open(({ isOpen, close }) => {
      useEffect(() => {
        window.addEventListener("click", (e) => {
          const parentElement = (
            e.target as HTMLElement
          ).parentElement;

          if (
            !parentElement ||
            parentElement.id !== "context-container"
          ) {
            close();
          }
        });
      }, []);

      return (
        <>
          {isOpen && (
            <ContextMenu.Container
              position={{
                x: e.clientX,
                y: e.clientY,
              }}
            >
              <ContentsComponent />
            </ContextMenu.Container>
          )}
        </>
      );
    });
  };

  return {
    open,
  };
};

export default useContextMenu;
