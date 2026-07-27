import React, { FC } from 'react';
import flatMap from 'lodash/fp/flatMap';
import { CardList, CardItem } from '@/components/molecules/CardList';
// import {
  
// } from './constants';
import { useTranslations } from 'next-intl';
import { useGetCompanyBookingsQuery } from '@/hooks/company/bookings/useGetCompanyBookingsQuery';
import { roomIdToTitle,
  roomIdToIcon,
  serviceIdToIcon,
  serviceIdToTitle,} from './constants';

interface Booking {
  roomType?: {
    id: number;
  };
  roomBookCount: number;
  additionalServices: { id: number }[];
}
interface BookingEntry {
  rooms: Array<{
    id: number;
    CompanyBookingRoom?: { roomBookCount: number | null };
  }>;
  additionalServices: Array<{ id: number }>;
}
interface AdditionalService {
  id: number;
  name: string;
  availableCount: number;
  price: string;
}

interface RoomType {
  id: number;
  name: string;
  availableCount: number;
  maxCountPerCompany: number;
  price: string;
}

interface Company {
  id: string;
  userId: string;
  imageUrlLarge: string;
  imageUrlMedium: string;
  imageUrlSmall: string;
  name: string;
  website: string;
  onboardingState: string;
  corporateActivity: string;
  description: string;
  philosophy: string;
  swissOfficeLocation: string;
  headquarterLocation: string;
  swissEmployeeCount: number;
  worldEmployeeCount: number;
  shareOfGraduates: string;
  lookingFor: string;
  culture: string;
  weOffer: string;
  startingSalary: string;
  approved: boolean;
  registrationDate: string; // ISO date string
  mainLanguageId: string;
  interviewSlots: number;
  areDailyNotificationsEnabled: boolean;
  keepProfile: boolean;
  user_id: string;
}

 interface BookingDetails {
  id: number;
  roomBookCount: number;
  price: string;
  billingName: string;
  billingEmail: string;
  salutation: string | null;
  firstName: string;
  lastName: string;
  streetAddress: string;
  additionalAddress: string;
  postBox: string;
  postCode: string;
  city: string;
  country: string;
  invoiceNumber: string;
  bookingProcessState: string;
  companyId: string;
  roomTypeId: number;
  additionalServices: AdditionalService[];
  roomType: RoomType;
  company: Company;
  rooms: any[];  // replace `any` with a more specific type if known
}
function getBooking(bookings: BookingDetails[] = []) {
  // 1) flatten real rooms or fallback to roomType (or nothing)
  const allRooms = bookings.flatMap(b => {
    if (b.rooms?.length) {
      return b.rooms;
    } else if (b.roomType) {
      return [{
        id: b.roomType.id,
        CompanyBookingRoom: { roomBookCount: b.roomBookCount }
      }];
    } else {
      // no rooms and no roomType → skip
      return [];
    }
  });

  // 2) aggregate counts
  const roomCounts = allRooms.reduce<Record<number, { id: number; count: number }>>(
    (acc, { id, CompanyBookingRoom }) => {
      const cnt = CompanyBookingRoom?.roomBookCount ?? 0;
      if (!acc[id]) acc[id] = { id, count: 0 };
      acc[id].count += cnt;
      return acc;
    },
    {}
  );

  // 3) pick out each type (or default-zero)
  const getType = (tid: number) =>
    roomCounts[tid] ?? { id: tid, count: 0 };

  const economyRoom  = getType(1);
  const businessRoom = getType(2);
  const workshopRoom = getType(3);

  // 4) flatten services safely
  const services = bookings.flatMap(b =>
    b.additionalServices?.map(s => ({ id: s.id })) ?? []
  );

  return { economyRoom, businessRoom, workshopRoom, services };
}
const List: FC<{
  loading: boolean;
  economyRoom: Partial<{
    id: number;
    count: number;
  }>;
  businessRoom: Partial<{
    id: number;
    count: number;
  }>;
  workshopRoom: Partial<{
    id: number;
    count: number;
  }>;
  services: { id: number }[];
}> = ({ loading, economyRoom, businessRoom, workshopRoom, services }) => {
  const t = useTranslations();
const serviceCounts = services.reduce((acc, { id }) => {
  acc[id] = (acc[id] || 0) + 1;
  return acc;
}, {} as Record<number, number>);

// 2. Convert to an array of unique services with counts
const aggregatedServices = Object.entries(serviceCounts).map(
  ([id, count]) => ({
    id: Number(id),
    count,
  })
);
  return (
    <CardList>
      {economyRoom.id && economyRoom.count !=0 && (
        <CardItem loading={loading}>
          <CardItem.Icon>{roomIdToIcon[economyRoom.id as keyof typeof roomIdToIcon]}</CardItem.Icon>
          <CardItem.Title>
          { economyRoom.count } {roomIdToTitle[economyRoom.id as keyof typeof roomIdToTitle]}
          </CardItem.Title>
        </CardItem>
      )}
      {/* {businessRoom.id &&  businessRoom.count !=0 &&(
        <CardItem loading={loading}>
          <CardItem.Icon>{roomIdToIcon[businessRoom.id as keyof typeof roomIdToIcon]}</CardItem.Icon>
          <CardItem.Title>
             {businessRoom.count} { roomIdToTitle[businessRoom.id as keyof typeof roomIdToTitle] }
            {t(roomIdToTitle[businessRoom.id], { count: businessRoom.count })}
          </CardItem.Title>
        </CardItem>
      )} */}
      {workshopRoom.id && workshopRoom.count !=0 && (
        <CardItem loading={loading}>
          <CardItem.Icon>{roomIdToIcon[workshopRoom.id as keyof typeof roomIdToIcon]}</CardItem.Icon>
          <CardItem.Title>
            { workshopRoom.count } { roomIdToTitle[workshopRoom.id as keyof typeof roomIdToTitle] }
            {/* {t(roomIdToTitle[workshopRoom.id], { count: workshopRoom.count })} */}
          </CardItem.Title>
        </CardItem>
      )}
      {aggregatedServices.map((service) => (
        <CardItem key={service.id} loading={loading}>
          <CardItem.Icon>{serviceIdToIcon[service.id as keyof typeof serviceIdToIcon]}</CardItem.Icon>
          <CardItem.Title>{service?.count}  {t(serviceIdToTitle[service.id as keyof typeof serviceIdToTitle])}</CardItem.Title>
        </CardItem>
      ))}
    </CardList>
  );
};

export const OnlineBookingOverview = () => {
  const t = useTranslations('companies');

  const { data, isLoading } = useGetCompanyBookingsQuery();

  const approved = getBooking(
    data?.data?.filter(
      (el: { bookingProcessState: string }) => el.bookingProcessState === "approved",
    ),
  );

  const requested = getBooking(
    data?.data?.filter(
      (el: { bookingProcessState: string }) => el.bookingProcessState === "requested",
    ),
  );


  return (
    <>
      {((requested.economyRoom.count ?? 0) > 0 ||
        (requested.businessRoom.count ?? 0) > 0 ||
        (requested.workshopRoom.count ?? 0) > 0 ||
        requested.services.length > 0) && (
          <>
            <div className="vstack vstack-2">
              <h4>{t('bookings.booking-overview.requested-title')}</h4>
              <List loading={isLoading} {...requested} />
              {/* <p>{t('bookings.booking-overview.requested-confirmation-text')}</p> */}
            </div>
            <hr />
          </>
        )}
      {(approved.economyRoom.count ?? 0) > 0 ||
        (approved.businessRoom.count ?? 0) > 0 ||
        (approved.workshopRoom.count ?? 0) > 0 ||
        approved.services.length > 0 ? (
        <div className="vstack vstack-2">
          {((approved.economyRoom.count ?? 0) > 0 ||
            (approved.businessRoom.count ?? 0) > 0 ||
            (approved.workshopRoom.count ?? 0) > 0 && (
              // <h4>{t('bookings.booking-overview.approved-title')}</h4>
              <></>
            ))}
          <List loading={isLoading} {...approved} />
        </div>
      ) : (
        <h4>{t('bookings.booking-overview.not-approved-text')}</h4>
      )}
    </>
  );
};
