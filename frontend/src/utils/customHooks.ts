"use client"
import { useGetLandingPageDataQuery } from "@/hooks/visitors/useGetLandingPageDataQuery";
import { useEffect, useState } from "react";


function calculateEventPhase(data: any, isLoading: boolean) {
  if (isLoading || !data) return undefined;

  const today = new Date();
  const eventPhase = {
    publishedSchedule: !!data?.data.areInterviewsPublished,
    areParticipantsNotified: !!data?.data.areParticipantsNotified,
    postMatching: false,
    matching: false,
    companyBooking: false,
    candidateRegistration: false,
    companyRegistration: false,
  };

  // Post Matching Phase
  if (
    new Date(new Date(data?.data.matchingCloseDate).getTime() + 86400000) <= today
  ) {
    eventPhase.postMatching = true;
  }

  // Matching Phase
  if (
    new Date(data?.data.matchingOpenDate) <= today &&
    new Date(new Date(data?.data.matchingCloseDate).getTime() + 86400000) >= today
  ) {
    eventPhase.matching = true;
  }

  // Company Booking Phase
  if (
    new Date(data?.data.registrationOpenDate) <= today &&
    new Date(new Date(data?.data.companyBookingCloseDate).getTime() + 86400000) >= today
  ) {
    eventPhase.companyBooking = true;
  }

  // Candidate Registration Phase
  if (
    new Date(data?.data.registrationOpenDate) <= today &&
    new Date(new Date(data?.data.candidateRegistrationCloseDate).getTime() + 86400000) >= today
  ) {
    eventPhase.candidateRegistration = true;
  }

  // Company Registration Phase
  if (
    new Date(data?.data.registrationOpenDate) <= today &&
    new Date(new Date(data?.data.companyRegistrationCloseDate).getTime() + 86400000) >= today
  ) {
    eventPhase.companyRegistration = true;
  }

  return eventPhase;
}

// Hook to fetch and process event phase data
export function useEventPhase() {
  const { data, isLoading } = useGetLandingPageDataQuery();
  const eventPhase = calculateEventPhase(data, isLoading);

  return { eventPhase, isLoading };
}


// Hook to manage sidebar status
const SIDEBAR_EVENT = 'sidebarStatusChange';

export function useSidebarStatus() {
  const [sidebarStatus, setStatus] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedStatus = localStorage.getItem('sidebarStatus');
      return savedStatus ? savedStatus === 'true' : false;
    }
    return false;
  });

  useEffect(() => {
    const handleStatusChange = (e: CustomEvent) => {
      setStatus(e.detail.status);
    };

    window.addEventListener(SIDEBAR_EVENT, handleStatusChange as EventListener);
    
    return () => {
      window.removeEventListener(SIDEBAR_EVENT, handleStatusChange as EventListener);
    };
  }, []);

  const setSidebarStatus = (status: boolean) => {
    setStatus(status);
    localStorage.setItem('sidebarStatus', String(status));
    window.dispatchEvent(new CustomEvent(SIDEBAR_EVENT, { 
      detail: { status } 
    }));
  };

  return { sidebarStatus, setSidebarStatus };
}
