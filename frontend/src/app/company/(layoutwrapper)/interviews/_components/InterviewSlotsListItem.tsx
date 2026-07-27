import { useState, useEffect } from 'react';
import PlaceholderImage from '@/icons/ic-placeholder-profil.svg';

export interface InterviewSlotsListItemProps {
  item?: any;
  roomsOptions?: Array<any>;
  timeBlockPreferenceOptions?: Array<any>;
  onChangeTimePreference?: Function;
  onChangeRoom?: Function;
}

const InterviewSlotsListItem: React.FC<InterviewSlotsListItemProps> = ({
  item,
  roomsOptions,
  timeBlockPreferenceOptions,
  onChangeTimePreference,
  onChangeRoom,
}) => {
  const [roomsSelectValue, setRoomsSelectValue] = useState(item.interviewRoom);
  const [timeBlockSelectValue, setTimeBlockSelectValue] = useState(
    item.timeBlockPreference,
  );
  const cn = 'bg-white rounded-md w-40';

  //Make this data dynamic currently its static
  const eventPhase = {
    publishedSchedule: false,
    areParticipantsNotified: false,
    postMatching: false,
    matching: false,
    companyBooking: false,
    candidateRegistration: false,
    companyRegistration: false,
  };

  useEffect(() => {
    setRoomsSelectValue(item?.interviewRoom);
  }, [item, item.interviewRoom]);

  useEffect(() => {
    setTimeBlockSelectValue(item?.timeBlockPreference);
  }, [item, item.timeBlockPreference]);

  return (
    <div className="w-full bg-white flex rounded-md mb-4 lg:mb-2  justify-between flex-col lg:flex-row">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="bg-gray-100 lg:bg-white p-5 rounded-l-md w-full lg:w-40 flex-col flex items-center">
        
        {item?.photo ? (
           <img 
           src={item.photo}
           className="flex-shrink-0 rounded-full w-24 lg:w-16 h-24 lg:h-16"
         />
        ) : (
          <PlaceholderImage className="flex-shrink-0 rounded-full w-24 lg:w-16 h-24 lg:h-16" />
        )}
         
          <div className="flex lg:hidden lg:ml-10 text-xl mt-2">
            {item.name}
          </div>
        </div>
        <div className="hidden lg:flex text-xl my-2 lg:my-0">{item.name}</div>
      </div>
      <div className="flex items-center p-5 flex-col lg:flex-row">
        <div className="w-40 flex justify-end mb-4 lg:mb-0 mr-0 lg:mr-4">
          <select
            name="timeBlockPreference"
            value={timeBlockSelectValue}
            className={cn}
            disabled={false}
            onChange={(evt) => {
              onChangeTimePreference &&
                onChangeTimePreference(evt.target.value, item.id);
            }}>
            {timeBlockPreferenceOptions?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-40 flex justify-end">
          <select
            name="interviewRoom"
            value={roomsSelectValue}
            className={cn}
            disabled={false}
            onChange={(evt) => {
              onChangeRoom && onChangeRoom(evt.target.value, item.id);
              // setSelectValue(evt.target.value);
            }}>
            {roomsOptions?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default InterviewSlotsListItem;
