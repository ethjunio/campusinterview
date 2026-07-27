import React, { FC, useCallback, useState } from 'react';
import IconPlus from '@/icons/ic-plus.svg';
import IconMinus from '@/icons/ic-minus.svg';
import { Button } from '@/components/atoms/Button';

type Props = {
  initial?: number;
  min?: number;
  max?: number;
  onCountChange: (count: number) => void;
};
export const Counter: FC<Props> = ({
  initial = 0,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  onCountChange,
}) => {
  const [count, setCount] = useState(initial);
  const onAdd = useCallback(() => {
    count < max && setCount(count + 1);
    onCountChange(count + 1);
  }, [count, onCountChange]);
  const onSubtract = useCallback(() => {
    min < count && setCount(count - 1);
    onCountChange(count - 1);
  }, [count, onCountChange]);

  return (
    <div className="flex flex-shrink justify-between items-center">
      <div className="hstack hstack-3 text-center items-start">
        <Button
          disabled={count === min}
          onClick={onSubtract}
          tw="bg-image-none bg-primary-light bg- w-9 h-9 flex p-0 items-center justify-center rounded-md min-h-full">
          <IconMinus className="text-white fill-current w-4 h-4" />
        </Button>
        <div className="w-9 h-9 flex items-center justify-center rounded-md bg-dark-softer">
          {count}
        </div>
        <Button
          disabled={count === max}
          onClick={onAdd}
          tw="bg-image-none bg-primary-light w-9 h-9 p-0 flex items-center justify-center rounded-md min-h-full">
          <IconPlus className="text-white fill-current w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
