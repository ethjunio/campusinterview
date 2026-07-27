import InterviewSlotsListItem from './InterviewSlotsListItem';

export interface InterviewsSlotsListProps {
  timeSlots?: Array<any>;
  selectOptions?: Array<any>;
  onChange?: Function;
}

const InterviewsSlotsList: React.FC<InterviewsSlotsListProps> = ({
  timeSlots = [],
  selectOptions = [],
  onChange,
}) => {
  return (
    <div>
      <ul>
        {timeSlots.map((slot, index) => (
          <InterviewSlotsListItem
            key={index}
            item={slot}
            selectOptions={selectOptions[index]}
            onChange={onChange}
          />
        ))}
      </ul>
    </div>
  );
};

export default InterviewsSlotsList;
