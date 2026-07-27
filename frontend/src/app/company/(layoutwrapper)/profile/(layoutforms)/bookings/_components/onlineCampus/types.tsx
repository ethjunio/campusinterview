export interface GetRoomTypes_getRoomTypes {
    __typename: 'RoomType';
    id: number;
    name: string;
    availableCount: number;
    price: number;
    maxCountPerCompany: number;
    remaining: number;
    count: number;
    currentPrice: number;
  }
  export type BookingPageProps = {
    bookings: GetCompanyBookings_bookings[];
    skipServices: boolean;
  };

  export interface GetCompanyBookings_bookings {
    __typename: 'CompanyBooking';
    id: number;
    bookingProcessState: BookingProcessStateType | null;
    roomBookCount: number | null;
    roomType: GetCompanyBookings_bookings_roomType | null;
    additionalServices:
      | (GetCompanyBookings_bookings_additionalServices | null)[]
      | null;
  }

  export enum BookingProcessStateType {
    approved = 'approved',
    requested = 'requested',
  }
  export interface GetCompanyBookings_bookings_roomType {
    __typename: 'RoomType';
    id: number;
    name: string;
    availableCount: number;
    price: number;
    count: number;
    remaining: number;
  }  

  export interface GetCompanyBookings_bookings_additionalServices {
    __typename: 'AdditionalServiceType';
    id: number;
    name: string;
    availableCount: number;
    price: number;
    selected: boolean;
    remaining: number;
  }
  export interface GetRoomTypes {
    getRoomTypes: GetRoomTypes_getRoomTypes[];
  }

  export interface GetCompanyBookingState_getCompanyBookings {
    __typename: 'CompanyBooking';
    id: number;
    bookingProcessState: BookingProcessStateType | null;
  }
  
  export interface GetCompanyBookingState {
    getCompanyBookings: (GetCompanyBookingState_getCompanyBookings | null)[];
  }

  export interface GetAdditionalServiceTypes_getAdditionalServiceTypes {
    __typename: 'AdditionalServiceType';
    id: number;
    name: string;
    availableCount: number;
    price: number;
    selected: boolean;
    remaining: number;
  }
  
  export interface GetAdditionalServiceTypes {
    getAdditionalServiceTypes: GetAdditionalServiceTypes_getAdditionalServiceTypes[];
  }

  export type RoomType = 'premium' | 'economy' | 'workshop';

  export interface GetSummary_rooms {
    __typename: 'RoomType';
    id: number;
    price: number;
    name: string;
    count: number;
    currentPrice: number;
  }

  export interface GetSummary_services {
    __typename: 'AdditionalServiceType';
    id: number;
    price: number;
    name: string;
    selected: boolean;
  }

  export interface GetSummary_billingAddress {
    __typename: 'CompanyBookingBillingAddress';
    billingName: string;
    billingEmail: string | null;
    salutation: string | null;
    firstName: string;
    lastName: string;
    streetAddress: string;
    additionalAddress: string | null;
    postBox: string | null;
    postCode: string;
    city: string;
    country: string;
    invoiceNumber: string | null;
  }
  

  export interface GetSummary {
    rooms: GetSummary_rooms[];
    services: GetSummary_services[];
    billingAddress: GetSummary_billingAddress | null;
  }
  
  export interface GetSummary_rooms {
    __typename: 'RoomType';
    id: number;
    price: number;
    name: string;
    count: number;
    currentPrice: number;
  }
  
  
