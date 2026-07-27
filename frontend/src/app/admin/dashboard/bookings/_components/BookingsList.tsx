"use client";
import { ListItem } from "@/components/molecules/ListItem";
import DeleteIcon from "@/icons/ic-delete.svg";
import { IconButton, Button } from "@/components/atoms/Button";
import { useTranslations } from "next-intl";
import Select from "react-select";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetBookingsDropdownListQuery,
  useGetBookingsListQuery,
} from "@/hooks/admin/bookings/useGetBookingsListQuery";
import AcceptIcon from "@/icons/ic-accept.svg";
import CompanyIcon from "@/icons/ic-company.svg";
import c from "classnames";
import { useDeleteBookingsListMutation } from "@/hooks/admin/bookings/useDeleteBookingsListMutation";
import { useApproveBookingsListMutation } from "@/hooks/admin/bookings/useApprovedBooking";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

interface CompanyBookingRoom {
  roomBookCount: number;
}

interface Room {
  id: number;
  name: string;
  availableCount: number;
  maxCountPerCompany: number;
  price: string;
  CompanyBookingRoom: CompanyBookingRoom;
}
interface Booking {
  id: string;
  roomBookCount: number;
  bookingProcessState: string;
  roomType: {
    availableCount: number;
    id: number;
    maxCountPerCompany: number;
    name: string;
    price: string;
  };
  rooms: Room[];
  additionalServices: {
    availableCount: number;
    id: number;
    name: string;
    price: string;
  }[];
}
const BookingsList = () => {
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [searchData, setSearchData] = useState<any>([]);
  const { data, isPending } = useGetBookingsListQuery(
    {},
    searchTerm?.value || "",
  );
  const { data: options } = useGetBookingsDropdownListQuery();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (options?.data) {
      const searchData = options?.data?.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setSearchData(searchData);
    }
  }, [options?.data]);

  const onSearchChange = (selectedOption: any) => {
    setSearchTerm(selectedOption);
  };

  const deletebookingsListMutation = useDeleteBookingsListMutation({
    onSuccess: () => {
      toast.success("Booking data deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bookingsList"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const { mutate: approveBookingsList } = useApproveBookingsListMutation({
    onSuccess: () => {
      toast.success("Booking data approved successfully");
      queryClient.invalidateQueries({ queryKey: ["bookingsList"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "An error occurred");
    },
  });
  const router = useRouter();

  const t = useTranslations();
  console.log(data, "DATA");
  return (
    <div>
      <h1>{t("admin.bookings-title")}</h1>

      <Select
        className="mt-8 max-w-sm mb-4 cursor-pointer"
        isSearchable
        isClearable
        classNamePrefix="react-select"
        options={searchData}
        placeholder={t("admin.bookings.search-for-company")}
        onChange={onSearchChange}
        value={searchTerm}
        menuPortalTarget={typeof window !== "undefined" ? document.body : null} // 👈 render to body
        menuPosition="fixed" // 👈 avoid clipping
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // 👈 ensure on top
        }}
      />
      <ul className="space-y-4 relative z-50">
        {(data?.data || []).map(
          ({
            id,
            company: { name, id: id1 },
            bookingProcessState,
            roomBookCount,
            roomType,
            additionalServices = [],
            billingEmail,
            companyId,
            rooms,
            bookings,
          }: {
            id: number;
            company: { name: string; id: string };
            bookingProcessState: any;
            roomBookCount: any;
            roomType: any;
            billingEmail: string;
            additionalServices: { name: string }[];
            companyId: string;
            rooms: Room[];
            bookings: Booking[];
          }) => {
            return (
              <div
                key={id}
                onClick={() => {
                  router.push(`/admin/dashboard/bookings/${id1}`);
                }}
                className="relative z-50"
              >
                <ListItem loading={isPending} id={id?.toString()}>
                  <ListItem.Image Placeholder={CompanyIcon} src="" alt="" />
                  <ListItem.Title>{name}</ListItem.Title>
                  <ListItem.Body>
                    <div>
                      {bookings?.length > 0 &&
                        bookings.map((item: Booking, index: number) => (
                          <div className="flex justify-end items-start">
                            <div className="w-[150px]">
                              <div key={item?.id}>
                                {item?.rooms?.length ? (
                                  item.rooms.map((x, i) => (
                                    <div className="flex items-center">
                                      <div
                                        className="whitespace-nowrap w-[100px]"
                                        key={i}
                                      >
                                        {x?.name ? x.name : "Rooms"}:
                                      </div>
                                      <span className="font-extrabold ml-2 text-lg">
                                        {x.CompanyBookingRoom?.roomBookCount}
                                      </span>
                                    </div>
                                  ))
                                ) : item?.roomType ? (
                                  <div className="whitespace-nowrap">
                                    {item.roomType?.name
                                      ? item.roomType.name
                                      : "Rooms"}
                                    :
                                    <span className="font-extrabold ml-2 text-lg">
                                      {item.roomBookCount}
                                    </span>
                                  </div>
                                ) : null}
                              </div>
                              <div className="flex-col" key={index}>
                                {item?.additionalServices?.map((services) => (
                                  <div
                                    key={id}
                                    // className={c({
                                    //   "ml-2": index === 1,
                                    // })}
                                  >
                                    {services?.name}
                                    {index === 0 ? "," : null}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <ListItem.Actions>
                              <div className="flex space-x-2">
                                <IconButton
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const confirm = window?.confirm(
                                      "are you sure you want to delete this booking?",
                                    );

                                    if (confirm) {
                                      deletebookingsListMutation.mutate({
                                        id: item?.id?.toString(),
                                      });
                                    }
                                  }}
                                  tw="p-1"
                                  variant="link"
                                  icon={
                                    <DeleteIcon className="w-6 h-6 fill-current text-danger" />
                                  }
                                />
                                {item?.bookingProcessState !== "approved" && (
                                  <>
                                    <IconButton
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (item?.id) {
                                          approveBookingsList(
                                            item?.id.toString(),
                                          );
                                        } else {
                                          toast.error("Invalid ID");
                                        }
                                      }}
                                      tw="p-1"
                                      variant="link"
                                      icon={
                                        <AcceptIcon className="w-6 h-6 fill-current text-info" />
                                      }
                                    />
                                  </>
                                )}
                              </div>
                            </ListItem.Actions>
                          </div>
                        ))}
                    </div>
                  </ListItem.Body>
                </ListItem>
              </div>
            );
          },
        )}
      </ul>

      {/* <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                <div className="flex items-start justify-between">
                  <Dialog.Title className="text-lg font-semibold">
                    {selectedRow?.name}
                  </Dialog.Title>
                  <button
                    className="rounded p-1 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    <XMark className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 text-sm">
                  <span className="font-medium">Registration email:</span>{' '}
                  {selectedRow?.billingEmail || '—'}
                </div>

                <div className="mt-6">
                  <h4 className="mb-2 text-sm font-semibold">
                    Company Participants
                  </h4>

                  {row.company.participants.length ? (
                    <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                      {row.company.participants.map((p) => (
                        <li key={p.id} className="px-4 py-3 text-sm">
                          <p className="font-medium">{p.fullName}</p>
                          <p className="text-gray-600">{p.email}</p>
                          {p.phone && (
                            <p className="text-gray-600">{p.phone}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm italic text-gray-500">
                      No participants found
                    </p>
                   )} 
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root> */}
    </div>
  );
};

export default BookingsList;
