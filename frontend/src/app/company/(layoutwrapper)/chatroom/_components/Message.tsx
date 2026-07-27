import { ReactNode } from 'react';
import { fromISOtoHourDate } from '@/utils/date';
import PlaceholderImage from '@/icons/ic-placeholder-profil.svg';


interface MessageDocument {
  id: number;
  messageId: number;
  docUrl: string;
}
export interface MessageProps {
  children?: ReactNode;
  date?: string;
  from?: string;
  photo?: string;
  attachment:MessageDocument[]
  pending:boolean
}


const imageExt = ['jpg','jpeg','png','gif','webp']
const videoExt = ['mp4','webm','ogg','mov']

function inferType(url: string): 'image'|'video'|'file' {
  
  const ext = url?.split('.').pop()?.toLowerCase()
  if (ext && imageExt.includes(ext)) return 'image'
  if (ext && videoExt.includes(ext)) return 'video'
  return 'file'
}

function fileNameFromUrl(url: string): string {
  return decodeURIComponent(url.split('/').pop() || '')
}

const Message: React.FC<MessageProps> = ({ children, date, from, photo,attachment ,pending}) => {
  const isMessageFromMe = from === 'company';
  const containerClass = isMessageFromMe
    ? 'flex justify-end mb-5 items-end'
    : 'flex mb-5 items-end';

  return (
    <div className={containerClass}>
       {!isMessageFromMe ? (
        <div className="flex-shrink-0 rounded-full w-6 h-6 mr-3">
          {photo ? (
            <img src={photo} alt="Profile" className="rounded-full w-full h-full" />
          ) : (
            <PlaceholderImage className="rounded-full w-full h-full" />
          )}
        </div>
      ) : null}

      <div className="bg-white pt-5 pb-5 pl-7 pr-7 rounded-lg max-w-xl whitespace-pre-line">
        {children}
        {attachment?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {attachment?.map((fileDetail:any) => {
              const type = inferType(fileDetail?.doc_url)
              const name = fileNameFromUrl(fileDetail?.doc_url)
              switch (type) {
                case 'image':
                  return (
                    <div
                    key={pending ? `refresh-1${fileDetail?.doc_url}` : `refresh-0${fileDetail?.doc_url}`}
                    className="w-48 h-48 overflow-hidden rounded-lg"
                   >
                    <img
                      key={fileDetail?.doc_url}
                      src={fileDetail?.doc_url}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                     </div>
                  )
                case 'video':
                  return (
                    <div
                    key={pending ? `refresh-1${fileDetail?.doc_url}` : `refresh-0${fileDetail?.doc_url}`}
                                 className="w-48 h-48 overflow-hidden rounded-lg"
                                >
                    <video
                      key={fileDetail?.doc_url}
                      controls
                      className="w-full h-full object-cover"
                    >
                      <source src={fileDetail?.doc_url}/>
                      Your browser doesn’t support video.
                    </video>
                    </div>
                  )
                case 'file':
                  return (
                    <a
                      key={fileDetail?.doc_url}
                      href={fileDetail?.doc_url}
                      download={name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-2 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <span className="underline">{name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </a>
                  )
              }
            })}
          </div>
        )}
        {date ? (
          <div className="text-right text-sm text-gray-400">
            {fromISOtoHourDate(date)}
          </div>
        ) : null}
      </div>
      {isMessageFromMe ? (
        photo ? (
          <img src={photo} alt="User" className="flex-shrink-0 rounded-full w-6 h-6 ml-3" />
        ) : (
          <PlaceholderImage className="flex-shrink-0 rounded-full w-6 h-6 ml-3" />
        )
      ) : null}
    </div>
  );
};

export default Message;
