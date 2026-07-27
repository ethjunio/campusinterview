import React, { useEffect, useState } from "react"; 
import { Button } from "@/components/atoms/Button";
import Select from "react-select";
import { useTranslations } from "next-intl";
import { useGetCandidateByIdQuery } from "@/hooks/admin/useGetInterviewListQuery";
import {
  useGetCompanyAllInteviewRooms,
} from "@/hooks/company/interviews/useGetInterviewListQuery";
import { useUpdateCompanyInterviewMutation } from "@/hooks/company/interviews/useUpdateCompanyInterviewTimeRoomMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGetTimeBlockPreferenceTypesQuery } from '@/hooks/company/interviews/useGetTimeBlockPreferenceTypesQuery';

interface SlotEditSectionProps {
  slotId: number;
  page: number;
  onClose: () => void;
}

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#3B82F6" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #3B82F6" : null,
    "&:hover": {
      borderColor: "#3B82F6",
    },
    minHeight: "40px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3B82F6"
      : state.isFocused
      ? "#DBEAFE"
      : "white",
    color: state.isSelected ? "white" : "black",
    padding: 10,
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#6B7280",
  }),
};

const SlotEditSection: React.FC<SlotEditSectionProps> = ({
  slotId,
  page,
  onClose,
}) => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const [rooms, setRooms] = useState<any>([]);
  const [interviewRoom, setInterviewRoom] = useState<any>(null);

  const [preferenceOptions, setPreferenceOptions] = useState<any>([]);
  const [selectedPreference, setSelectedPreference] = useState<any>(null);

  const { data } = useGetCandidateByIdQuery({}, String(slotId));
  const { data: interviewRoomsData } = useGetCompanyAllInteviewRooms();
  const { data: getTimeBlockPreferenceTypes } = useGetTimeBlockPreferenceTypesQuery();

  const updateInterview = useUpdateCompanyInterviewMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyInterviewSchedule", page],
      });
      toast.success("Interview slots updated successfully");
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const handlePreferenceChange = (selected: any) => {
    setSelectedPreference(selected);
  };

  const handleRoomChange = (selected: any) => {
    setInterviewRoom(selected);
  };

  const handleSubmit = () => {
    if (slotId)
      updateInterview.mutate({
        id: String(slotId), 
        payload: {
          timeBlockPreferenceId: selectedPreference?.value ?? null, // ✅ send id
          interviewRoomId: interviewRoom?.value ?? null,           // ✅ send id
        },
      });
  };

  useEffect(() => {
    if (interviewRoomsData?.data) {
      const formatedData = interviewRoomsData?.data?.map((room: any) => ({
        value: room.id,   // ✅ keep id in value
        label: room.name,
      }));
      setRooms(formatedData);
    }
  }, [interviewRoomsData?.data]);

  useEffect(() => {
    if (getTimeBlockPreferenceTypes?.data) {
      const formatedData = getTimeBlockPreferenceTypes?.data?.map((pref: any) => ({
        value: pref.id,   // ✅ keep id in value
        label: pref.name,
      }));
      setPreferenceOptions(formatedData);
    }

    if (data?.data?.timeBlock) {
      setSelectedPreference({
        value: data?.data?.timeBlock?.id,
        label: data?.data?.timeBlock?.name,
      });
    }

    if (data?.data?.interviewRoom) {
      setInterviewRoom({
        value: data?.data?.interviewRoom?.id,
        label: data?.data?.interviewRoom?.name,
      });
    }
  }, [getTimeBlockPreferenceTypes?.data, data?.data]);

  return (
    <div>
      <h1 className="text-black mb-3">Update slot</h1>

      <div className="text-black font-bold">Time Preference</div>
      <Select
        options={preferenceOptions}
        onChange={handlePreferenceChange}
        value={selectedPreference}
        styles={customStyles}
      />

      <div className="text-black font-bold mt-10">Interview Room</div>
      <Select
        options={rooms}
        onChange={handleRoomChange}
        value={interviewRoom}
        styles={customStyles}
      />

      <div className="flex justify-end gap-3 mt-4">
        <Button
          variant="primary-light"
          onClick={onClose}
          disabled={updateInterview.isPending}
        >
          Cancel
        </Button>
        <Button
          variant="primary-light"
          onClick={handleSubmit}
          disabled={updateInterview.isPending}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default SlotEditSection;
