"use client";
import { ProfileForm } from "@/components/organisms/form/ProfileForm";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCreateCompanyParticipantsdataMutation } from "@/hooks/company/onboarding/useCreateCompanyParticipantsdataMutation";
import { Button, IconButton } from "@/components/atoms/Button";
import Delete from "@/icons/ic-delete.svg";
import Plus from "@/icons/ic-plus.svg";
import { useGetCompanyGeneralDataQuery } from "@/hooks/company/onboarding/useGetCompanyGeneralDataQuery";
import Switch from 'react-switch';
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";



const ParticipantFeatures = ({ button }: { button?: any }) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetCompanyGeneralDataQuery();
  const createParticipantMutation = useCreateCompanyParticipantsdataMutation({
    onSuccess: () => {
      toast.success("Data saved successfully");
    },
    onError: (error: any) => {
      console.log(error,"error")
      toast.error(error?.response?.data?.message);
    },
  });

  const [formData, setFormData] = useState([{id:"", fullName: "", position: "" ,email:"",password:"", attending:  false,
  attendanceSlot: "",areDailyNotificationsEnabled:false,userId:""}]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [initialData, setInitialData] = useState<string>("");
  const [hasChanges, setHasChanges] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);


  useEffect(() => {
    if (data?.participants) {
      console.log(data.participants,"data.participants")
      const initialFormValues = data.participants.map((item: any) => ({
        id:item?.id||"",
        fullName: item.fullName || "",
        position: item.position || "",
        email:item.email || "",
        password: "",
        attending: item.attending || false,
        attendanceSlot:item.attendanceSlot || "",
        userId:item.userId || "",

        areDailyNotificationsEnabled:item?.areDailyNotificationsEnabled||false
      }));
      setFormData(initialFormValues);
      setInitialData(JSON.stringify(initialFormValues)); // 💡 Set snapshot here
    } else {
      const defaultVal = [{id:"", fullName: "", position: "",email:"",password:"", attending:  false,userId:"",
      attendanceSlot: "",areDailyNotificationsEnabled:false }];
      setFormData(defaultVal);
      setInitialData(JSON.stringify(defaultVal)); // 💡 Even empty default should be captured
    }
  }, [data?.participants]);


  useEffect(() => {
    if (!initialData) return;
    const current = JSON.stringify(formData);
    setHasChanges(current !== initialData);
  }, [formData, initialData]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  useEffect(() => {
    const originalPush = router.push;
    router.push = (path, ...args) => {
      if (hasChanges && typeof path === "string" && path !== pathname) {
        setNextPath(path);
        setShowDialog(true);
        return;
      }
      return originalPush(path, ...args);
    };
    return () => {
      router.push = originalPush;
    };
  }, [hasChanges, pathname]);

  const handleInputChange = (index: number, field: string, value: string|boolean) => {
    const updatedData = [...formData];
    // @ts-ignore
    updatedData[index][field] = value;
    setFormData(updatedData);
  };

  const handleAddParticipant = () => {
    setFormData([...formData, { id:"",fullName: "", position: "",email:"",password:"" , attending:  false,userId:"",
    attendanceSlot: "",areDailyNotificationsEnabled:false}]);
  };

  const handleRemoveParticipant = (index: number) => {
    const updatedData = [...formData];
    updatedData.splice(index, 1);
    setFormData(updatedData);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setHasChanges(false);

const invalidParticipant = formData.find(
  (item) => item.attending && !item.attendanceSlot
);

if (invalidParticipant) {
  alert("Please select attendance slot for all attending participants.");
  setIsSubmitting(false);
  return;
}
const invalidPasswordOldUser = formData.find(
  (item) => !item.userId && !item.password
);

if (invalidPasswordOldUser) {
  alert("Please enter password for all new users.");
  setIsSubmitting(false);
  return;
}
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const invalidPasswordUser = formData.find((item) => {
    const trimmedPassword = item?.password?.trim();

    // If password is entered, it must match regex
    if (trimmedPassword && !passwordRegex.test(trimmedPassword)) {
      return true;
    }

    return false;
  });

  if (invalidPasswordUser) {
    alert("Password must be at least 8 characters, include uppercase, lowercase and a number.");
    setIsSubmitting(false);
    return;
  }


  const payload = formData.map(({ userId, ...item }) => ({
    ...item,
    password: item?.password?.trim() === "" ? null : item?.password,
    id: item?.id === "" ? null : item?.id,
    attendanceSlot:
      item?.attendanceSlot === ""
        ? null
        : item?.attending
        ? item?.attendanceSlot
        : null,
  }));
// console.log(payload,"payloadkkk")
    await createParticipantMutation.mutateAsync(payload);
    setTimeout(() => {
      if (button !== "save") {
        router.push("/company/overview");
      }
    }, 0);
    
  };
  
  return (
    <div>
      <ProfileForm>
        <div className="flex justify-between items-center max-w-full xl:max-w-md mb-10">
          <div><h1 className="">{t("companies.participants.title")}</h1></div>
          <div>
          <Button onClick={handleSubmit}>
            {button === "save" ? "Save" : "Complete registration"}
          </Button>
          </div>
        </div>
        <div className="mb-10 lead-text">
          {t("companies.onboarding.step-participants-lead")}.
        </div>

        <div className="max-w-1/2">
          {formData.map((participant, index) => (
            <div key={index}>
              <div className="flex flex-col lg:flex-row">
                <div className="flex-grow max-w-screen-full lg:max-w-screen-md vstack vstack-1">
                  <label className="general-text mb-1">
                    {t("companies.participants.form-fullName-label")}
                  </label>
                  <input
                    type="text"
                    value={participant.fullName}
                    onChange={(e) =>
                      handleInputChange(index, "fullName", e.target.value)
                    }
                    placeholder={t(
                      "companies.participants.form-fullName-placeholder"
                    )}
                  />
                  <div className="h-8"></div>
                  <label className="general-text mb-1">
                    {t("companies.participants.form-position-label")}
                  </label>
                  <input
                    type="text"
                    value={participant.position}
                    onChange={(e) =>
                      handleInputChange(index, "position", e.target.value)
                    }
                    placeholder={t(
                      "companies.participants.form-position-placeholder"
                    )}
                    className="mb-4"
                  />
                   <label className="general-text mb-1">
                    {t("companies.participants.form-email-label")}
                  </label>
                  <input
                    type="text"
                    value={participant.email}
                    onChange={(e) =>{
                      // if(!isValidEmail(e?.target?.value?.trim())){
                      handleInputChange(index, "email", e.target.value)
                      // }
                    }
                    }
                    placeholder={t(
                      "companies.participants.form-email-placeholder"
                    )}
                    className="mb-4"
                  />
                <div className="flex flex-col gap-4">  
                  <label className="general-text ">
  {t("companies.participants.form-password-label")}
</label>

<input
  type="text"
  value={participant.password || ""}
  onChange={(e) => {
    handleInputChange(index, "password", e.target.value);
  }}
  placeholder={t("companies.participants.form-password-placeholder")}
/>
</div>
<div className="flex justify-between gap-4 mt-6">
  <label className="general-text mb-1 mt-4">
    {t("companies.participants.form-attending-label")}
  </label>

  <div className="mt-4 flex items-center gap-2">
    {/* <Switch
      checked={!!participant.areDailyNotificationsEnabled}
      onCheckedChange={(v) =>
        handleInputChange(index, "areDailyNotificationsEnabled", v)
      }
      aria-label="Enable daily notifications"
    /> */}
     <Switch
                onChange={(val) =>
                  handleInputChange(index, "attending", val)
                }
                checked={participant.attending}
                className="react-switch pr-4"
                onColor="#1968FF"
                onHandleColor="#18A3FA"
                handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={15}
                width={40}
              />
    {/* <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-muted"
            aria-label="What does this do?"
          >
            <Info className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent 
              className="z-[9999] max-w-xs rounded border border-gray-200 bg-white p-2 text-sm text-gray-900 shadow-lg"
        >
          .
        </TooltipContent>
      </Tooltip>
    </TooltipProvider> */}
  </div>
 
</div>
{participant?.attending &&
<div className="flex flex-col gap-4 mt-6">
<label className="general-text mb-1">
  {t("companies.participants.form-attendanceSlot-label")}
</label>
  <select
  name="attendanceSlot"
  value={participant.attendanceSlot || ""}
  onChange={(e) =>
    handleInputChange(index, "attendanceSlot", e.target.value)
  }
>
  <option value="" disabled>
    {t("companies.participants.form-attendanceSlot-placeholder")}
  </option>

  <option value="morning">Morning</option>
  <option value="afternoon">Afternoon</option>
  <option value="whole day">Whole Day</option>
</select>
  </div>
}
                  <div className="flex justify-between gap-4 mt-6">
  <label className="general-text mb-1 mt-4">
    {t("companies.participants.form-enable-notification")}
  </label>

  <div className="mt-4 flex items-center gap-2">
    {/* <Switch
      checked={!!participant.areDailyNotificationsEnabled}
      onCheckedChange={(v) =>
        handleInputChange(index, "areDailyNotificationsEnabled", v)
      }
      aria-label="Enable daily notifications"
    /> */}
     <Switch
                onChange={(val) =>
                  handleInputChange(index, "areDailyNotificationsEnabled", val)
                }
                checked={participant.areDailyNotificationsEnabled}
                className="react-switch pr-4"
                onColor="#1968FF"
                onHandleColor="#18A3FA"
                handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={15}
                width={40}
              />
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-muted"
            aria-label="What does this do?"
          >
            <Info className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent 
              className="z-[9999] max-w-xs rounded border border-gray-200 bg-white p-2 text-sm text-gray-900 shadow-lg"
        >
          Sends daily notifications to this participant when enabled.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</div>
                </div>
                {/* Render the remove button only for participants after the first one */}
                {index > 0 && (
                  <IconButton
                    tw="rounded lg:ml-24 p-2 self-center lg:self-start w-auto absolute left-1/2 "
                    variant="outline"
                    onClick={() => handleRemoveParticipant(index)}
                    icon={<Delete className="lg:ml-4 h-4 w-4 fill-current" />}
                  >
                    {t("candidate.miscs.button-remove")}
                  </IconButton>
                )}
              </div>
              <hr className="mt-[4.5rem] mb-[2.5rem]" />
            </div>
          ))}
          <div className="flex justify-center lg:justify-end">
            <IconButton
              tw="rounded p-2"
              variant="outline"
              onClick={handleAddParticipant}
              icon={<Plus className="lg:ml-4 h-4 w-4 fill-current" />}
            >
              {t("companies.participants.add-participant")}
            </IconButton>
          </div>
         
        </div>
      </ProfileForm>
      {showDialog && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <p className="text-lg font-medium mb-4">
              You have unsaved changes. Are you sure you want to leave this page?
            </p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowDialog(false)} className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">
                Stay
              </button>
              <button
                onClick={() => {
                  setShowDialog(false);
                  setHasChanges(false);
                  setTimeout(() => {
                    if (nextPath) router.push(nextPath);
                  }, 0);
                }}
                className="px-4 py-2 text-sm bg-red text-white rounded hover:bg-red-600"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantFeatures;
