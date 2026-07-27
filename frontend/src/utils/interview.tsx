import DeclineIcon from "@/icons/ic-decline.svg";
import AcceptIcon from "@/icons/ic-accept.svg";
import HelpIcon from "@/icons/ic-state-open.svg";
import WaitingListPlaceIcon from "@/icons/ic-waitinglist_yellow.svg";
import WaitingListIcon from "@/icons/ic-waitinglist.svg";

export function getStateBadge(state: string) {
  let icon;

  icon = <HelpIcon className="w-6 h-6 m-2 fill-current" />;
  switch (state) {
    case "requested": {
      icon = <HelpIcon className="w-6 h-6 m-2 fill-current" />;
      break;
    }
    case "waitingList": {
      icon = <WaitingListIcon className="w-6 h-6 m-2 fill-current" />;
      break;
    }
    case "arranged": {
      icon = <AcceptIcon className="w-6 h-6 m-2 fill-current" />;
      break;
    }
    case "rejected": {
      icon = <DeclineIcon className="w-6 h-6 m-2 fill-current" />;
      break;
    }
    case "waitingListPlace": {
      icon = <WaitingListPlaceIcon className="w-6 h-6 m-2 fill-current" />;
      break;
    }
  }
  return icon;
}
