import React, { useEffect, useRef, useState } from "react";
import c from "classnames";
import { Button } from "@/components/atoms/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import IconSend from "@/icons/ic-send.svg";
import IconPaperclip from "@/icons/ic-upload.svg";

import PlaceholderImage from "@/icons/ic-placeholder-profil.svg";
import { useWebSocket } from "@/hooks/socket/useWebsocket";
import useAuthStore from "@/app/store/authStore";
import { ChangeEvent } from "cleave.js/react/props";
import { axiosInstance } from "@/utils/axios";
import { toast } from "sonner";
export interface NewMessageProps {
  photo: string;
  canChat: boolean;
  onChange: Function;
  text: string;
  selectedId: string;
  pending: boolean;
  setPending: (args: boolean) => void;
}
const MAX_ROWS = 8;
const COLS = 150;

interface Props {
  file: File;
  onRemove: () => void;
}

const AttachmentCardBase: React.FC<Props> = ({ file, onRemove }) => {
  const [preview, setPreview] = useState<string>();

  // createObjectURL ONCE ─────────────────────────────
  useEffect(() => {
    const url = URL.createObjectURL(file);

    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  return (
    <div
      className="relative max-w-[160px] rounded-md overflow-hidden
                    border bg-white/70 backdrop-blur-sm"
    >
      {isImage && preview && (
        <img src={preview} alt={file.name} className=" w-full h-24" />
      )}
      {isVideo && preview && (
        <video src={preview} className=" w-full h-24" muted loop playsInline />
      )}
      {!isImage && !isVideo && (
        <div className="flex items-center justify-center w-full h-24 text-sm p-2">
          📄 {file.name}
        </div>
      )}

      <div className="px-2 py-1 text-xs truncate bg-white">{file.name}</div>

      <button
        onClick={onRemove}
        className="absolute top-1 right-1 bg-black text-white rounded-full
                   w-5 h-5 text-xs flex items-center justify-center shadow-md"
      >
        ✕
      </button>
    </div>
  );
};
const AttachmentCard = React.memo(
  AttachmentCardBase,
  (prev, next) => prev.file === next.file,
);
const NewMessage: React.FC<NewMessageProps> = ({
  photo,
  canChat,
  onChange,
  text,
  selectedId,
  pending,
  setPending,
}) => {
  const t = useTranslations("companies");
  const router = useRouter();
  const [rows, setRows] = useState(1);
  //   const me = useMeQ();
  const inputEl: any = useRef<HTMLTextAreaElement>(null);
  const searchParams = useSearchParams();
  const candidateId = searchParams.get("candidateId");
  const [files, setFiles] = useState<File[]>([]);

  //   const [sendMessage] = useSendMessage();
  const cols = 150;

  useEffect(() => {
    if (inputEl.current) {
      inputEl?.current?.focus();
    }
  }, [selectedId]);

  // function handleSendMessage() {
  //   // sendMessage({
  //   //   variables: {
  //   //     input: {
  //   //       candidateId: candidateId.toString(),
  //   //       companyId: me.data?.me.companyId,
  //   //       content: text,
  //   //     },
  //   //   },
  //   // });
  //   console.log("sendd message clicked")

  //   onChange('');
  //   setRows(1);
  // }

  // const userId = 'df4344aa-89c8-4a12-8909-933f4f4b5d15';

  const { user } = useAuthStore();

  const userId = user?.companyId;
  const { sendMessage } = useWebSocket(userId,candidateId);
  const { sendMessageAwait } = useWebSocket(userId,candidateId);

  const handleSendMessage = async () => {
    if (!text.trim() && !(files.length > 0)) return;

    let fileMeta: { url: any; name: string; mime: string }[] = [];
    let fileMetaName: string[] = [];
    setPending(true);
    if (files?.length) {
      try {
        fileMeta = await Promise.all(
          files.map(async (f) => ({
            url: f,
            name: f.name,
            mime: f.type,
          })),
        );
        files?.map((f: any) => {
          fileMetaName?.push(f?.name);
        });
      } catch (e) {
        console.error(e);
        return;
      }
    }

    // receiverId: '6894bcf5-4a31-49c6-a55c-0997d189d45d',

    if (files?.length) {
      const messagePayload = {
        type: "send_message",
        receiverId: candidateId,
        sentBy: "company",
        content: text ? text : null,
        contentType: "file",
        fileNo: files?.length,
        fileNames: fileMetaName,
      };

      const reply = await sendMessageAwait(messagePayload);
      uploadMessageDocs(reply, files);
    } else {
      const messagePayload = {
        type: "send_message",
        receiverId: candidateId,
        sentBy: "company",
        content: text,
      };
      sendMessage(messagePayload);
      setPending(false);
    }

    onChange("");
    setRows(1);
    // console.log('msg finally sent')
  };

  function doResize() {
    const maxrows = 8;
    const newCols = cols;

    const arraytxt = text.split("\n");
    let newRows = arraytxt.length;

    for (let i = 0; i < arraytxt.length; i++)
      newRows += arraytxt[i].length / newCols;

    if (newRows > maxrows) newRows = maxrows;

    setRows(Math.floor(newRows));
  }
  const MAX_FILES = 5;
  function useFilePicker(maxBytes = 10 * 1024 * 1024) {
    // const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const list = e.target.files;
      if (!list || !list.length) return;

      const accepted: File[] = [];
      for (const f of Array.from(list)) {
        if (f.size > maxBytes) {
          toast?.warning(`${f.name} is larger than 10 MB – skipped.`);
          continue;
        }
        accepted.push(f);
      }
      if (accepted.length) {
        setErr(null);
        setFiles((prev) => {
          const already = prev.length;
          const slotsLeft = MAX_FILES - already;

          if (slotsLeft <= 0) {
            // toast?.warning(`You can only upload up to ${MAX_FILES} files.`);
            return prev;
          }

          // only take as many as will fit
          const toAdd = accepted.slice(0, slotsLeft);

          if (toAdd.length < accepted.length) {
            toast?.warning(
              `You had ${accepted.length} valid file(s), but only ${slotsLeft} slot(s) left—extra files were skipped.`,
            );
          }

          return [...prev, ...toAdd];
        });
      }
      // always reset the input so the same file can be picked again
      e.target.value = "";
    };

    const clear = (index?: number) =>
      setFiles((prev) =>
        index === undefined ? [] : prev.filter((_, i) => i !== index),
      );

    return { err, onFileChange, clear };
  }

  async function uploadMessageDocs(reply: any, filesMap: any): Promise<any> {
    const form = new FormData();

    reply.files?.forEach((item: any, idx: any) => {
      const filename = item.doc_url.split("/").pop()!;
      const file = filesMap[idx];
      if (!file) {
        console.warn(`No File found for ${filename}`);
        return;
      }
      form.append(`files[${idx}][id]`, String(item.id));

      form.append(`files[${idx}][document]`, file, filename);
    });

    const response = await axiosInstance.post(
      "/common/uploadMessageDoc",
      form,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    setFiles([]);
    setPending(false);
    return response.data;
  }
  const { err: fileErr, onFileChange, clear: clearFile } = useFilePicker();
  const cn = c(
    "flex-1 w-full border-2 border-gray-300 text-black pl-5 pt-2 pb-2 resize-none mr-4",
  );
  const textAreaClass = c(
    "flex-1 w-full border-2 border-gray-300 text-black pl-5 pt-2 pb-2 resize-none mr-4",
    { "rounded-md": rows > 1, "rounded-full": rows <= 1 },
  );

  const resize = () => {
    const lines = text.split("\n");
    let newRows = lines.length;
    lines.forEach((l) => (newRows += l.length / COLS));
    if (newRows > MAX_ROWS) newRows = MAX_ROWS;
    setRows(Math.floor(newRows));
  };

  return (
    <div className="w-full flex my-2 lg:my-5 items-center">
      {/* Avatar */}
      <div className="flex-shrink-0 rounded-full w-10 h-10 mr-4">
        {photo ? (
          <img
            src={photo}
            alt="Profile"
            className="rounded-full w-full h-full"
          />
        ) : (
          <PlaceholderImage className="rounded-full w-full h-full" />
        )}
      </div>

      <div className="flex-1 relative">
        {/* WRAPPER that mimics a bubble */}
        <div className="border-2 border-gray-300 rounded-md py-0.5 px-3 md:pr-12 relative bg-white mr-3">
          {/* TEXTAREA */}
          <textarea
            ref={inputEl}
            className="w-full resize-none bg-transparent outline-none text-black max-h-[160px] overflow-y-auto border-none
            
            focus:outline-none 
          
            focus:ring-0 
           
            focus:border-gray-600
            
            "
            placeholder={
              canChat || !pending ? "Type a message…" : "Chat is disabled."
            }
            disabled={!canChat || pending}
            rows={rows}
            cols={COLS}
            value={text}
            onChange={(e) => {
              onChange(e.target.value);

              // autoResizeTextarea();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            onKeyUp={resize}
          />

          {/* PREVIEW INSIDE BUBBLE (but above textarea) */}
          {files.length > 0 && (
            <div className="flex gap-3 flex-wrap mt-2">
              {files.map((f, idx) => (
                <AttachmentCard
                  key={f.name + idx}
                  file={f}
                  onRemove={() => clearFile(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* {fileErr && <span className="text-xs text-red-600 mr-4">{fileErr}</span>} */}

      {/* ATTACH button */}
      <label
        className={c(
          "cursor-pointer mr-2 border-2 border-gray-300 rounded-md p-3 pr-3 relative bg-white",
          { "opacity-50": !canChat },
        )}
      >
        <input
          type="file"
          multiple // 👈 allow many
          className="hidden"
          disabled={!canChat || pending}
          onChange={onFileChange}
          accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.*"
        />
        <IconPaperclip className="w-6 h-6 text-gray-600" />
        {/* <div
      className="w-6 h-6 text-gray-600"
      >
        +
      </div> */}
      </label>

      {/* SEND button desktop */}
      <div className="hidden sm:block">
        <Button
          variant="primary-light"
          disabled={!canChat || pending}
          onClick={handleSendMessage}
        >
          {t("chatroom.send-message")}
        </Button>
      </div>

      {/* SEND icon mobile */}
      <div className="block sm:hidden">
        <IconSend
          className="w-6 h-6 text-primary-light fill-current"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default NewMessage;
