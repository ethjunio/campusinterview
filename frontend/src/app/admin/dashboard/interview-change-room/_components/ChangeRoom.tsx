"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Select from "react-select";
import { Button } from "@/components/atoms/Button";
import { useGetCompaniesListQuery } from "@/hooks/admin/useGetCompaniesListQuery";
import {
  useGetInterViewRoomsQuery,
  useGetCompanyNamesWithContactQuery,
} from "@/hooks/admin/useGetInterviewListQuery";
import { useUpdateChatRoomsMutation } from "@/hooks/admin/useDeleteInterviewList";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ChangeRoom = () => {
  const t = useTranslations();
  const { data: companyNamesWithContact } =
    useGetCompanyNamesWithContactQuery();
  const queryClient = useQueryClient();
  const [companyName, setCompanyName] = useState<any>([]);
  const [selectedCompany, setSelectedComapny] = useState<any>(null);
  const [rooms, setRooms] = useState<any>([]);

  useEffect(() => {
    if (companyNamesWithContact) {
      const companyNames = companyNamesWithContact?.company?.map(
        (company: { name: string; id: string }) => {
          return {
            label: company.name,
            value: company.id,
          };
        }
      );
      setCompanyName(companyNames);
    }
  }, [companyNamesWithContact]);

  const updateChatRoom = useUpdateChatRoomsMutation({
    onSuccess: () => {
      toast.success("Interview created successfully");
      queryClient.invalidateQueries({ queryKey: ["companyNamesWithContact"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const { data: interviewRoomsData } = useGetInterViewRoomsQuery(
    {},
    selectedCompany?.value
  );
  const handleRoomNameChange = (id: string, name: string) => {
    setRooms((prevRooms: any) => {
      const roomIndex = prevRooms.findIndex((room: any) => room.id === id);
      if (roomIndex !== -1) {
        const updatedRooms = [...prevRooms];
        updatedRooms[roomIndex] = { id, name };
        return updatedRooms;
      }
      // Add the new room to the array
      return [...prevRooms, { id, name }];
    });
  };
  useEffect(() => {
    setRooms([]); // Clear the rooms array
  }, [selectedCompany]);

  const handleChangeCompany = (selected: any) => {
    setSelectedComapny(selected);
  };

  const handleSubmit = () => {
    const data = {
      companyId: selectedCompany.value,
      interviewRooms: rooms,
    };
    updateChatRoom.mutate(data);
  };

  return (
    <div>
      <div>
        <h1>{t("admin.interviews.change-rooms.title")}</h1>

        <div className="mt-8 items-baseline justify-start w-1/4">
          <Select
            options={companyName}
            onChange={handleChangeCompany}
            value={selectedCompany}
          />
        </div>
        {Array.isArray(interviewRoomsData?.data) &&
        interviewRoomsData?.data.length > 0
          ? interviewRoomsData?.data.map((room: any) => (
              <div
                className="mt-8 items-baseline justify-start w-1/4"
                key={room.id}
              >
                <div className="font-bold mt-10 text-dark text-[12px]">
                  Current Room Name: Room {room.name}
                </div>
                <input
                  className="border border-gray-300 rounded p-2 w-full"
                  type="text"
                  placeholder="Room Name"
                  // value={interviewRoom || ""}
                  // onChange={(e: any) => setInterviewRoom(e.target.value)}
                  value={rooms.find((r: any) => r.id === room.id)?.name || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleRoomNameChange(room.id, e.target.value)
                  }
                />
              </div>
            ))
          : selectedCompany && (
              <div className="mt-4">This company has no rooms.</div>
            )}
        <Button tw="mt-4" variant="primary-light" onClick={handleSubmit}>
          {" "}
          Save
        </Button>
      </div>
    </div>
  );
};

export default ChangeRoom;
