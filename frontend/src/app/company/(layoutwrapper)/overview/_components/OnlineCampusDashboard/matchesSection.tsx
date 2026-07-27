"use client";
import { useGetCompanyArrangedInterviewQuery } from "@/hooks/company/matching/useGetCompanyArrangedInterviewQuery";
import { useGetCountMatchesPerRoomQuery } from "@/hooks/company/matching/useGetCountMatchesPerRoom";
import { ArrowLeft, ArrowRight, MessagesSquare, Plus } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export interface InterviewArrangement {
  id: number;
  state: string;
  companyId: string;
  candidateId: string;
  timeBlockPreferenceId: number;
  interviewRoomId: number;
  company: Company;
  candidate: Candidate;
  timeBlockPreference: TimeBlockPreference;
  interviewRoom: InterviewRoom;
}

export interface Company {
  id: string;
  name: string;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  imageUrlSmall: string;
  education: Education[];
}

export interface Education {
  id: number;
  candidateId: string;
  universityId: number;
  otherUniversity: string | null;
  educationLevelId: number;
  fieldOfStudyId: number;
  otherMajor: string | null;
  specializationId: number | null;
  otherSpecialization: string | null;
  startDate: string;
  endDate: string;
  averageGrade: string | null;
  university: University;
  educationLevel: EducationLevel;
  major: Major;
}

export interface University {
  id: number;
  name: string;
}

export interface EducationLevel {
  id: number;
  name: string;
}

export interface Major {
  id: number;
  name: string;
}

export interface TimeBlockPreference {
  id: number;
  name: string;
}

export interface InterviewRoom {
  id: number;
  name: string;
  companyId: string;
  slot: number;
  companyBookingId: number;
}

interface matchesRoomtype {
  id: number;
  name: string;
  match_count: string;
}

const MatchesSection = () => {
  const rooms = [1, 2, 3, 4];

  const { data: arrangedData } = useGetCompanyArrangedInterviewQuery();
  const { data: matchesData } = useGetCountMatchesPerRoomQuery();

  // /company/matchMgmt/getMatchCountPerRoom
  const emptySlots = Array(
    9 - (arrangedData?.data?.length ? arrangedData?.data?.length : 0)
  ).fill(null);

  return (
    <section className="w-full sm:p-2">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold !text-[24px] leading-[36px] text-[#101828] font-thin">
          Matches
        </h2>

        <p className="mt-1 text-base text-gray-500 !text-[16px] leading-[24px] !text-[#4A5565] font-normal">
          Find your meetings and room assignments below.
        </p>
      </div>

      {/* Main layout */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* LEFT SIDE */}
        {/* LEFT SIDE */}
        {matchesData?.data?.length ? (
          <div className="relative w-full overflow-hidden">
            {/* LEFT BUTTON */}
            <button className="room-prev absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-gray-100 text-primaryPurple p-2 rounded-full">
              <ArrowLeft size={18} />
            </button>

            {/* RIGHT BUTTON */}
            <button className="room-next absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-gray-100 text-primaryPurple p-2 rounded-full">
              <ArrowRight size={18} />
            </button>

            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={20}
              navigation={{
                prevEl: ".room-prev",
                nextEl: ".room-next",
              }}
              className="px-8"
            >
              {matchesData?.data?.map((room: matchesRoomtype) => {
                const matchCount = Number(room.match_count);
                const filledSlots = Array(matchCount).fill(null);
                const emptySlots = Array(8 - matchCount).fill(null);

                return (
                  <SwiperSlide key={room.id}>
                    <Link
                      href="/company/interviews"
                      className="grid grid-cols-3 gap-4 max-h-[218px] w-full"
                    >
                      {filledSlots.map((_, index: number) => (
                        <div
                          key={`filled-${index}`}
                          className="flex items-center justify-center gap-2
              h-[62px]
              rounded-2xl bg-primaryPurple text-white font-semibold"
                        >
                          <MessagesSquare size={22} />
                          {index + 1}
                        </div>
                      ))}

                      {emptySlots.map((_, i) => (
                        <div
                          key={i}
                          className="h-[62px] rounded-2xl bg-gray-300"
                        />
                      ))}
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        ) : (
          <div className=" flex items-center justidy-center mx-auto text-primaryPurple">
            No rooms booked
          </div>
        )}

        {/* RIGHT SIDE */}
        <Link
          href="/company/profile/bookings/rooms"
          className="relative min-h-[260px] rounded-3xl border border-primaryPurple overflow-hidden flex items-center justify-center"
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-60 blur-sm p-4">
            <div className="grid grid-cols-3 gap-5 h-full">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[65px] rounded-xl bg-gray-300 w-full"
                />
              ))}
            </div>
          </div>

          {/* Foreground */}
          <div className="relative z-10 flex flex-col items-center text-center ">
            <Plus size={32} className="text-primaryPurple mb-2" />
            <p className="text-primaryPurple font-semibold text-lg text-[20px] leading-[26px] text-[#6858FB]">
              Book an <br /> additional room
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default MatchesSection;
