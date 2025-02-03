import React from "react";
import { css } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";

import GroupItem from "@/components/home/GroupItem";
import Overlay from "@/components/common/Overlay";
import GroupCreationDialog from "@/components/home/GroupCreationDialog";
import useGroups from "@/hooks/useGroups";

const GroupSection = () => {
  const { data: groups } = useGroups();
  const overlay = useOverlay();

  const handleCreateGroupClick = () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <Overlay isOpen={isOpen}>
          <GroupCreationDialog close={close} />
        </Overlay>
      );
    });
  };

  return (
    <div
      css={css`
        background-color: gray;
        padding: 1em;

        display: flex;
        flex-direction: column;

        gap: 1em;
      `}
    >
      {groups &&
        groups.map((groupItem) => {
          return (
            <GroupItem key={groupItem.uid} onClick={() => {}}>
              {groupItem.name}
            </GroupItem>
          );
        })}

      <GroupItem type="creation" onClick={handleCreateGroupClick}>
        그룹 만들기
      </GroupItem>
    </div>
  );
};

export default GroupSection;
