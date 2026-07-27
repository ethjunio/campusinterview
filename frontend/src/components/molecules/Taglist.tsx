import React, { FC, useState, useCallback, useEffect } from "react";
import c from "classnames";
import { Tag } from "@/components/atoms/Tag";

export type Tag = {
  id: number | string;
  name: string;
};

type TagListProps = {
  name?: string;
  activeTags?: Tag[];
  tags: Tag[];
  onSelected?: (tags: string[]) => void;
  tw?: string;
  multi?: boolean;
};

export const TagList: FC<TagListProps> = ({
  name,
  activeTags = [],
  tags,
  onSelected,
  tw,
  multi = true,
}) => {
  const [selected, setSelected] = useState(activeTags);
  useEffect(() => {
    activeTags.length && setSelected(activeTags);
  }, [activeTags]);

  const select = useCallback(
    (tag) => {
      let next;
      if (selected.map(({ id }) => id).includes(tag.id)) {
        next = selected.filter(({ id }) => id !== tag.id);
      } else {
        next = multi ? selected.concat(tag) : [tag];
      }
      setSelected(next);
      onSelected && onSelected(next);
    },
    [selected, onSelected],
  );

  const cn = c('hstack hstack-2 flex-wrap -mt-4', tw, {
    'hstack-2': onSelected,
    'hstack-4': !onSelected,
  });

  return (
    <div id={name} className={cn}>
      {tags?.map((tag) => (
        <Tag
          selectable={!!onSelected}
          key={tag.id}
          tw="mt-4"
          active={!!selected.find((t) => tag.id === t?.id)}
          onClick={() => {
            !!onSelected && select(tag);
          }}>
          {tag.name}
        </Tag>
      ))}
    </div>
  );
};
