"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Select from "react-select";
import { Button } from "@/components/atoms/Button";
import {
  useGetTimeSlotsQuery,
  useGetInterViewRoomsQuery,
} from "@/hooks/admin/useGetInterviewListQuery";
import { useGetCompaniesListQuery } from "@/hooks/admin/useGetCompaniesListQuery";
import { useGetCandidatesListQuery } from "@/hooks/admin/useGetCandidatesListQuery";
import { useCreateInterviewMutation } from "@/hooks/admin/useDeleteInterviewList";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import IconInfo from "@/icons/ic-info.svg";
import * as Tooltip from "@radix-ui/react-tooltip";

const CreateInterview = () => {
  const t = useTranslations();
  const router = useRouter();
  const { data: timeSlotsData } = useGetTimeSlotsQuery();
  const { data: companyList } = useGetCompaniesListQuery();
  const { data: candidateList } = useGetCandidatesListQuery();
  const [companyName, setCompanyName] = useState<any>([]);
  const [selectedCompany, setSelectedComapny] = useState<any>(null);
  const [options, setOptions] = useState<any>([]); // Options for React-Select
  const [selectedOption, setSelectedOption] = useState<any>(null); // Selected value
  const [rooms, setRooms] = useState<any>([]);
  const [interviewRoom, setInterviewRoom] = useState<any>(null);
  const [candidateName, setCandidateName] = useState<any>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [interviewLocation, setInterviewLocation] = useState<any>("");

  const createInterview = useCreateInterviewMutation({
    onSuccess: () => {
      toast.success("Interview created successfully");
      router.push("/admin/dashboard/interviews");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  useEffect(() => {
    if (companyList) {
      const companyData = companyList?.data?.map((e) => {
        return {
          value: e.id,
          label: e.name,
        };
      });
      setCompanyName(companyData);
    }
  }, [companyList?.data]);

  useEffect(() => {
    if (candidateList) {
      const candidateData = candidateList?.data?.map((e) => {
        return {
          value: e.id,
          label: e.firstName + " " + e.lastName,
        };
      });
      setCandidateName(candidateData);
    }
  }, [candidateList?.data]);

  const { data: interviewRoomsData } = useGetInterViewRoomsQuery(
    {},
    selectedCompany?.value
  );

  useEffect(() => {
    if (interviewRoomsData?.data) {
      const formatedData = interviewRoomsData?.data?.map((room: any) => ({
        value: room.id,
        label: room.name,
      }));
      setRooms(formatedData);
    } else {
      setRooms([]);
    }

    if (timeSlotsData?.data) {
      const formatedData = timeSlotsData?.data?.map((timeSlot: any) => ({
        value: timeSlot.id,
        label: timeSlot.timeRange,
      }));
      setOptions(formatedData);
    } else {
      setRooms([]);
    }
  }, [interviewRoomsData?.data, timeSlotsData?.data]);

  const handleChange = (selected: any) => {
    setSelectedOption(selected);
  };

  const handleRoomChange = (selected: any) => {
    setInterviewRoom(selected);
  };
  const handleChangeCompany = (selected: any) => {
    setSelectedComapny(selected);
    setInterviewRoom(null);
  };

  const handleChangeCandidate = (selected: any) => {
    setSelectedCandidate(selected);
  };
  const handleSubmit = () => {
    const data = {
      candidateId: selectedCandidate?.value,
      companyId: selectedCompany?.value,
      timeSlot: { id: selectedOption?.value },
      interviewRoom: { id: interviewRoom?.value },
      interviewLocation,
    };
    createInterview.mutate(data);
  };

  return (
    <div>
      <div className="flex">
      <h1>{t("admin.interviews.create-interview.title")}</h1>
      <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div
                style={{ height: "38px", width: "38px" }}
                className=" flex items-center justify-center mx-0.5 cursor-pointer relative "
              >
                <IconInfo
                  className="w-5 h-5 text-primary-light fill-current mb-0.5"
                  style={{ marginRight: "1px" }}
                />
              </div>
            </Tooltip.Trigger>

            <Tooltip.Portal>
              <Tooltip.Content
                side="top" // top, right, bottom, left
                sideOffset={6} // gap from trigger
                className="px-2 py-1 bg-gray-100 text-gray-900 text-sm rounded"
              >
                Once you’ve selected all fields, the Save button will become
                active.
                <Tooltip.Arrow className="fill-gray-900" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
        </div>
      <div className="w-1/4 text-[#34323e]">
        <div className="font-bold mt-10">Company</div>
        <Select
          options={companyName}
          onChange={handleChangeCompany}
          value={selectedCompany}
        />
        <div className="font-bold mt-10">Candidate</div>
        <Select
          options={candidateName}
          onChange={handleChangeCandidate}
          value={selectedCandidate}
        />
        <div className="font-bold mt-10">Time slot</div>
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
      </div>
      <div className="flex gap-4">
        <Button
          disabled={
            !selectedCandidate?.value ||
            !selectedCompany?.value ||
            !selectedOption?.value ||
            !interviewRoom?.value
          }
          tw="mt-4"
          variant="primary-light"
          onClick={handleSubmit}
        >
          {" "}
          Save
        </Button>
        
      </div>
    </div>
  );
};

export default CreateInterview;
