import InterviewSlotsListItem from './InterviewSlotsListItem';


export interface InterviewsSlotsListProps {
  candidateRoomsList?: Array<any>;
  roomsOptions?: Array<any>;
  timeBlockPreferenceOptions?: Array<any>;
  onChangeTimePreference?: Function;
  onChangeRoom?: Function;
}

const InterviewsSlotsList: React.FC<InterviewsSlotsListProps> = ({
  candidateRoomsList,
  roomsOptions,
  timeBlockPreferenceOptions,
  onChangeTimePreference,
  onChangeRoom,
}) => {
  return (
    <div>
      <ul>
        {candidateRoomsList?.map((candidateRoom, index) => (
          <InterviewSlotsListItem
            key={index}
            item={candidateRoom}
            roomsOptions={roomsOptions}
            timeBlockPreferenceOptions={timeBlockPreferenceOptions}
            onChangeTimePreference={onChangeTimePreference}
            onChangeRoom={onChangeRoom}
          />
        ))}
      </ul>
    </div>
  );
};

export default InterviewsSlotsList;
