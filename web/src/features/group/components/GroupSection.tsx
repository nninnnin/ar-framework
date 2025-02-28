import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";

import GroupItem from "@/features/group/components/GroupItem";
import useGroups from "@/features/group/hooks/useGroups";
import { useSelectedGroup } from "@/features/group/hooks/useSelectedGroup";
import GroupCreationDialog from "@/features/group/components/GroupCreationDialog";
import useCreateGroup from "@/features/group/hooks/useCreateGroup";
import Plus from "@/shared/components/icons/Plus";
import Overlay from "@/shared/components/Overlay";

const GroupSection = () => {
  const { data: groups } = useGroups();
  const overlay = useOverlay();

  const { setSelectedGroup, selectedGroup } =
    useSelectedGroup();

  useEffect(() => {
    if (
      !selectedGroup &&
      groups &&
      groups.length > 0
    ) {
      setSelectedGroup(groups[0]);
    }
  }, [selectedGroup, groups]);

  const { mutate: create } = useCreateGroup();

  const handleCreateGroupClick = () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <Overlay isOpen={isOpen}>
          <GroupCreationDialog
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
        border-right: 1px solid black;

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
                background-color: ${groupItem.uid ===
                selectedGroup?.uid
                  ? "black !important"
                  : "white"};

                color: ${groupItem.uid ===
                selectedGroup?.uid
                  ? "white"
                  : "initial"};
              `}
            >
              {groupItem.name}
            </GroupItem>
          );
        })}

      <GroupItem onClick={handleCreateGroupClick}>
        <Plus />
      </GroupItem>
    </div>
  );
};

export default GroupSection;
