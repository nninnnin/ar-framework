import React from "react";
import { css } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";

import GroupItem from "@/components/home/GroupItem";
import Overlay from "@/components/common/Overlay";
import useGroups from "@/hooks/useGroups";
import { useSelectedGroup } from "@/hooks/useSelectedGroup";
import CreationDialog from "@/components/common/CreationDialog";
import useCreateGroup from "@/hooks/useCreateGroup";

const GroupSection = () => {
  const { data: groups } = useGroups();
  const { setSelectedGroup } = useSelectedGroup();
  const overlay = useOverlay();

  const handleCreateGroupClick = () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <Overlay isOpen={isOpen}>
          <CreationDialog
            message="그룹 이름을 입력해주세요."
            creationHook={useCreateGroup}
            close={close}
          />
        </Overlay>
      );
    });
  };

  return (
    <div
      css={css`
        background-color: violet;
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
            <GroupItem key={groupItem.uid} onClick={handleGroupItemClick}>
              {groupItem.name}
            </GroupItem>
          );
        })}

      <GroupItem type="creation" onClick={handleCreateGroupClick}>
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
