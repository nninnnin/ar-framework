import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";

import GroupItem from "@/components/Group/GroupItem";
import Overlay from "@/components/common/Overlay";
import useGroups from "@/hooks/useGroups";
import { useSelectedGroup } from "@/hooks/useSelectedGroup";
import CreationDialog from "@/components/common/CreationDialog";
import useCreateGroup from "@/hooks/useCreateGroup";

const GroupSection = () => {
  const { data: groups } = useGroups();
  const overlay = useOverlay();

  const { setSelectedGroup, selectedGroup } = useSelectedGroup();

  useEffect(() => {
    if (!selectedGroup && groups && groups.length > 0) {
      setSelectedGroup(groups[0]);
    }
  }, [selectedGroup, groups]);

  const { mutate: create } = useCreateGroup();

  const handleCreateGroupClick = () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <Overlay isOpen={isOpen}>
          <CreationDialog
            message="그룹 이름을 입력해주세요."
            onCancelClick={close}
            onConfirmClick={async (name: string) => {
              await create(name);
              close();
            }}
          />
        </Overlay>
      );
    });
  };

  return (
    <div
      css={css`
        background-color: violet;
        width: 200px;
        padding: 1em;

        display: flex;
        flex-direction: column;

        gap: 1em;
      `}
    >
      {groups &&
        groups.map((groupItem) => {
          const handleGroupItemClick = () => {
            setSelectedGroup(groupItem);
          };

          return (
            <GroupItem
              key={groupItem.uid}
              onClick={handleGroupItemClick}
              cssOverlap={css`
                background-color: ${groupItem.uid === selectedGroup?.uid
                  ? "black"
                  : "white"};

                color: ${groupItem.uid === selectedGroup?.uid
                  ? "white"
                  : "initial"};
              `}
            >
              {groupItem.name}
            </GroupItem>
          );
        })}

      <GroupItem onClick={handleCreateGroupClick}>
        <span
          css={css`
            font-size: 1em;
            transform: scale(2);
          `}
        >
          +
        </span>
      </GroupItem>
    </div>
  );
};

export default GroupSection;
