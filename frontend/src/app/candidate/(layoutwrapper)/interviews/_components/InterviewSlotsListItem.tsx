import { useState, useEffect } from 'react';
import DeclineIcon from '@/icons/ic-decline.svg';
import AcceptIcon from '@/icons/ic-accept.svg';
import WaitingListIcon from '@/icons/ic-waitinglist.svg';

export interface InterviewSlotsListItemProps {
  item?: any;
  selectOptions?: Array<any>;
  onChange?: Function;
}

const InterviewSlotsListItem: React.FC<InterviewSlotsListItemProps> = ({
  item,
  selectOptions,
  onChange,
}) => {
  const [selectValue, setSelectValue] = useState(
    item.timeSlotPreferenceType.id,
  );

  useEffect(() => {
    setSelectValue(item.timeSlotPreferenceType.id);
  }, [item, item.timeSlotPreferenceType.id]);

  function initIconsMap() {
    const iconsMap = new Map();
    const iconClass = 'w-6 h-6 mr-3';

    iconsMap.set('Optimal time', <AcceptIcon className={iconClass} />);
    iconsMap.set('Suboptimal time', <WaitingListIcon className={iconClass} />);
    iconsMap.set('Non-optimal time', <DeclineIcon className={iconClass} />);
    return iconsMap;
  }

  const iconsMap = initIconsMap();

  function getIcon() {
    return iconsMap.get(item.timeSlotPreferenceType.name);
  }

  return (
    <div className="w-full bg-white flex rounded-md mb-4 lg:mb-2 justify-between flex-col lg:flex-row">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="bg-gray-100 p-5 rounded-l-md w-full lg:w-40 flex justify-center">
          {item.timeSlot.timeRange}
        </div>
        <div className="p-5 flex">
          {getIcon()} Slot {item.timeSlot.id}
        </div>
      </div>
      <div className="p-5 self-center lg:self-end">
        <select
          name="timeSlotType"
          className="bg-white rounded w-40"
          value={selectValue}
          onChange={(evt) => {
            const selectedValue = selectOptions?.find(
              (item) => item.value == evt.target.value,
            );
            onChange && onChange(item, selectedValue);
            setSelectValue(evt.target.value);
          }}>
          {selectOptions?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InterviewSlotsListItem;
