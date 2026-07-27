import Link from 'next/link';
import ArrowRightIcon from '@/icons/ic-arrow-right.svg';
import { useState } from 'react';

import { getStateBadge } from '@/utils/interview';
export interface CandidateProps {
  candidateId: string;
  photo: string;
  title: string;
  description: any;
  isFavorite: boolean;
  interviewStatus: string;
}

const Candidate: React.FC<CandidateProps> = ({
  candidateId,
  photo,
  title,
  description,
  interviewStatus,
}) => {
  const [disableLink, setDisableLink] = useState(false);

  function handleLink(event) {
    if (disableLink) {
      event.preventDefault();
    }
  }

  const stateBadge = getStateBadge(interviewStatus);

  return (
    <a
      className="text-black w-36"
      href={`/company/talent-pool/${candidateId}`}
      onClick={handleLink}>
      <div
        style={{ height: '200px' }}
        className="flex flex-col bg-white rounded-lg w-36 ">
        <div
          className="flex justify-center"
          style={{
            backgroundImage: `url(${photo})`,
            backgroundSize: '150px auto',
            minHeight: '92px',
          }}>
          {/* <img className="w-full h-24" src={photo} /> */}
        </div>
        <div className="relative">
          <hr />
          <div
            style={{ top: '-20px', right: '4px', zIndex: 10 }}
            className="absolute"
            onPointerDown={() => {
              setDisableLink(true);
            }}>
            {interviewStatus ? stateBadge : null}
          </div>
        </div>
        <div className="p-3 h-full relative">
          <div className="text-sm text-black font-bold mb-2 truncate">
            {title}
          </div>
          <div className="">{description}</div>
          <div style={{ bottom: '12px', right: '15px' }} className="absolute">
            {/* <Link href={`/company/candidate/${candidateId}`}> */}
              <ArrowRightIcon className="text-primary-light stroke-current stroke-3 fill-current w-3 h-3" />
            {/* </Link> */}
          </div>
        </div>
      </div>
    </a>
  );
};

export default Candidate;
