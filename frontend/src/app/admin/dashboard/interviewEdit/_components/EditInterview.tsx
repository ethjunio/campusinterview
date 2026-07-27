"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms/Button";
import {
  useGetCandidateByIdQuery,
  useGetTimeSlotsQuery,
  useGetInterViewRoomsQuery,
} from "@/hooks/admin/useGetInterviewListQuery";
import { useUpdateInterviewMutation } from "@/hooks/admin/useDeleteInterviewList";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const defaultInitialValues = {
  id: null,
  candidate: { id: "", firstName: "", lastName: "" },
  company: { id: "", name: "" },
  timeSlot: { value: "", label: "" },
  interviewRoom: { value: "", label: "" },
};

type Props = {
  enableReinitialize?: boolean;
  initialValues?: typeof defaultInitialValues;
};

const EditInterview = () => {
  const t = useTranslations();
  const { id } = useParams();
  const pathName = usePathname();
  const companyId = pathName?.split("/")[5];
  const queryClient = useQueryClient();
  const { data } = useGetCandidateByIdQuery({}, id as string);
  const { data: timeSlotsData } = useGetTimeSlotsQuery();
  const { data: interviewRoomsData } = useGetInterViewRoomsQuery(
    {},
    companyId as string
  );
  const [options, setOptions] = useState<any>([]); // Options for React-Select
  const [selectedOption, setSelectedOption] = useState<any>(null); // Selected value
  const [rooms, setRooms] = useState<any>([]);
  const [interviewRoom, setInterviewRoom] = useState<any>(null);
  const [interviewLocation, setInterviewLocation] = useState<any>("");

  useEffect(() => {
    if (timeSlotsData?.data) {
      const formatedData = timeSlotsData?.data?.map((timeSlot: any) => ({
        value: timeSlot.id,
        label: timeSlot.timeRange,
      }));
      setOptions(formatedData);
    }
    if (data?.data?.timeSlot) {
      setSelectedOption({
        value: data?.data?.timeSlot?.id,
        label: data?.data?.timeSlot?.timeRange,
      });
    }

    if (data?.data?.interviewRoom) {
      setInterviewRoom({
        value: data?.data?.interviewRoom?.id,
        label: data?.data?.interviewRoom?.name,
      });
    }

    if(data?.data?.interviewLocation){
      setInterviewLocation(data?.data?.interviewLocation);
    }
  }, [timeSlotsData?.data, data?.data?.timeSlot]);

  useEffect(() => {
    if (interviewRoomsData?.data) {
      const formatedData = interviewRoomsData?.data?.map((room: any) => ({
        value: room.id,
        label: room.name,
      }));
      setRooms(formatedData);
    }
  }, [interviewRoomsData?.data]);

  const handleChange = (selected: any) => {
    setSelectedOption(selected);
  };

  const handleRoomChange = (selected: any) => {
    setInterviewRoom(selected);
  };

  const updateInterview = useUpdateInterviewMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidateById", id] });
      toast.success("Interview data updated successfully");
    },
    onError: (error:any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const handleSubmit = () => {
    const data = {
      id: id,
      timeSlot: { id: selectedOption?.value },
      interviewRoom: { id: interviewRoom?.value },
      interviewLocation,
    };
    updateInterview.mutate(data);
  };

  return (
    <div className="max-w-xl">
      <div className="space-y-4 mb-6">
        <div className="font-bold">
          {t("admin.interviews.edit-interview.candidate-title")}
        </div>
        <div className="mt-2 text-lg">
          {data?.data?.Candidate?.firstName} {data?.data?.Candidate?.lastName}
        </div>
        <div className="font-bold">
          {t("admin.interviews.edit-interview.company-title")}
        </div>
        <div className="mt-2 text-lg">{data?.data?.company?.name}</div>
      </div>

      <div className="font-bold">Time slot</div>
      <Select
        options={options}
        onChange={handleChange}
        value={selectedOption}
      />
      <div className="font-bold mt-10">Interview Room</div>
      <Select
        options={rooms}
        onChange={handleRoomChange}
        value={interviewRoom}
      />
      <div className="font-bold mt-10">Interview Location</div>
      <input
        className="form-input block w-full border-[1px] border-solid border-gray-500 rounded"
        name="candidateName"
        value={interviewLocation}
        onChange={(event) => {
          setInterviewLocation(event.target.value);
        }}
      ></input>
      <Button tw="mt-4" variant="primary-light" onClick={handleSubmit}>
        {" "}
        Save
      </Button>
    </div>
  );
};

export default EditInterview;
