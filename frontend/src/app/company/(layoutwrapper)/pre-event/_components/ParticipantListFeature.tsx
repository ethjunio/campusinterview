"use client";
import { useTranslations } from "next-intl";
import { ListItem } from "@/components/molecules/ListItem";
import PlaceholderImage from "@/icons/ic-placeholder-profil.svg";
import IconInformation from "@/icons/ic-info_blue.svg";
import sort from "lodash/fp/sortBy";
import take from "lodash/fp/take";
import { Checkbox } from "@/components/molecules/form/Checkbox";
import { Formik, Form, FieldArray } from "formik";
import { Button } from "@/components/atoms/Button";
import { useGetPreeventDetailDataQuery } from "@/hooks/company/preevents/useGetPreeventDetailDataQuery";
import { useCreateInviteParticipantsMutation } from "@/hooks/company/preevents/useCreateInviteParticipantsMutation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const ParticipantListFeature = () => {
  const t = useTranslations("companies");
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const queryClient = useQueryClient();

  const { data: preevent, isLoading } = useGetPreeventDetailDataQuery(id || "");


  const inviteParticipantsMutation = useCreateInviteParticipantsMutation({
    onSuccess: (success: any) => {
      queryClient.invalidateQueries({ queryKey: ["getPreEventDetail", id] });
      toast.success(success?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const participants = preevent?.data?.participants ?? [];
  const isDeadlineOver = new Date() > new Date(preevent?.data?.registrationDeadline);


  // Categorize participants
  const appliedParticipants = participants.filter((p: any) => p.state === "applied");
  const invitedParticipants = participants.filter((p: any) => p.state === "invited");
  const declinedParticipants = participants.filter((p: any) => p.state === "declined");

  // Logic for subtitles and info texts
  let subtitleTranslate = "pre-event.participant-list.pre-deadline.subtitle";
  let infoTextTranslate;

  // if(!isDeadlineOver) {
  //   if(appliedParticipants.length > 0) {
  //     infoTextTranslate = "pre-event.participant-list.pre-deadline.info-text";
  //   }
  // }

  if (isDeadlineOver) {
    if (participants.length > 0) {
      subtitleTranslate = "pre-event.participant-list.post-deadline.subtitle";
      infoTextTranslate = "pre-event.participant-list.post-deadline.info-text";
    }
  } else {
    if (participants.length > 0) {
      infoTextTranslate = "pre-event.participant-list.pre-deadline.info-text";
    }
  }

  interface Participant {
    isInvited?: boolean;
    id:number
  }
  const initialValues: { participants: Participant[]; action: string | null } = {
    participants: participants.map((item:Participant) => ({ isInvited: false ,id:item?.id})),
    action: null,
  };

  if (isLoading) return
  return (
    <div className="flex flex-col lg:flex-row flex-grow w-full">
      <section className="bg-light-softer flex-grow w-full lg:w-2/3 py-16 px-4 xl:px-8">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            const invitedParticipantsIds = participants
              .filter((_: any, index: number) => values.participants[index]?.isInvited)
              .map((participant: { id: string }) => participant.id);

            inviteParticipantsMutation.mutate({
              preeventId: preevent.data.id,
              participantIdsArr: invitedParticipantsIds,
              action: values.action,
            });

            resetForm();
          }}
        >
          {(formikProps) => (
            <div className="max-w-screen-lg space-y-8">
              <h1>{t("pre-event.participant-list.title")}</h1>
              <h3>{t("pre-event.participant-list.pre-deadline.subtitle")}</h3>

              {/* {participants.length === 0 && (
                <p>{t("pre-event.participant-list.none-participants")}</p>
              )} */}

              <Form>
                <FieldArray name="participants">
                  {(formik) => {
                    const noneSelected = !formik.form.values.participants.find((p: any) => p?.isInvited);
                    const idToIndex: Record<number, number> = {};
    const all = formik?.form?.values?.participants as Array<{ id: number }>;
    for (let i = 0; i < all?.length; i++) {
      idToIndex[all[i]?.id] = i;
    }
                    const renderParticipants = (list: any[], allowCheckbox: boolean = false) =>
                      list.map(({ id, state, candidate }: any) => {
                        const status =
                          state === "invited" ? "arranged" :
                          state === "declined" ? "rejected" : undefined;
                    
                        // Use the original index from the full participants array
                        const formIndex = idToIndex[id];
        if (formIndex === undefined) return null;
                    
                        return (
                          <div className="mt-2" key={id}>
                            <ListItem loading={isLoading} id={candidate.id.toString()} type="candidate">
                              <ListItem.Image
                                Placeholder={PlaceholderImage}
                                alt={`${candidate.firstName} ${candidate.lastName}`}
                                src={candidate.imageUrlSmall}
                                interviewStatus={status}
                                responsive
                              />
                              <ListItem.Title responsive>
                                {candidate.firstName} {candidate.lastName}
                              </ListItem.Title>
                              <ListItem.Body>
                                <div className="flex w-full xl:items-center xl:flex-row flex-col">
                                  <div className="truncate w-44 xl:w-full xl:whitespace-pre-wrap hidden sm:block mr-0 xl:mr-16">
                                    {take(2, sort("startDate", candidate.education)).map(
                                      ({ id, university, educationLevel, major }: any) => (
                                        <div key={id} className="truncate general-text">
                                          {university?.name} - {educationLevel?.name} in {major?.name}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </ListItem.Body>
                              <ListItem.Actions>
                                {allowCheckbox ? (
                                  <div onClick={(e) => e.stopPropagation()}>
                                    <Checkbox
                                      name={`participants[${formIndex}].isInvited`}
                                      thick
                                      className="mt-6"
                                      disabled={!isDeadlineOver}
                                    />
                                  </div>
                                ) : null}
                              </ListItem.Actions>
                            </ListItem>
                          </div>
                        );
                      })

                    return (
                      <>
                        {/* Applied participants (for invite/decline) */}
                        {/* {appliedParticipants.length > 0 && (
                          <div className="space-y-4">
                            <h2 className="text-lg font-semibold mt-8">Applied</h2>
                            {renderParticipants(appliedParticipants, true)}
                          </div>
                        )} */}
                        {/* Applied participants (for invite/decline) */}
                        {appliedParticipants.length > 0 ? (
                          <div className="space-y-4">
                            <h2 className="text-lg font-semibold mt-8">Applied</h2>
                            {renderParticipants(appliedParticipants, true)}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <h2 className="text-lg font-semibold mt-8">Applied</h2>
                            <p className="mt-8">No one is in applied state currently.</p>
                          </div>
                        )}

                        {/* Invited participants */}
                        {invitedParticipants.length > 0 ? (
                          <div className="space-y-4">
                            <h2 className="text-lg font-semibold mt-8">Invited</h2>
                            {renderParticipants(invitedParticipants)}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <h2 className="text-lg font-semibold mt-8">Invited</h2>
                            <p className="mt-8">No one is in invited state currently.</p>
                          </div>
                        )}

                        {/* Declined participants */}
                        {declinedParticipants.length > 0 ? (
                          <div className="space-y-4">
                            <h2 className="text-lg font-semibold mt-8">Declined</h2>
                            {renderParticipants(declinedParticipants)}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <h2 className="text-lg font-semibold mt-8">Declined</h2>
                            <p className="mt-8">No one is in declined state currently.</p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        {appliedParticipants.length > 0 && (
                          <>
                            {!noneSelected ? (
                              <div className="flex flex-wrap gap-4 mt-8">
                                <Button
                                  tw="px-8"
                                  type="submit"
                                  onClick={() => {
                                    formikProps.setFieldValue("action", "invite");
                                    formikProps.submitForm();
                                  }}
                                >
                                  {t("pre-event.participant-list.post-deadline.invite-button-text")}
                                </Button>

                                <Button
                                  tw="px-8"
                                  type="submit"
                                  variant="transparent"
                                  onClick={() => {
                                    formikProps.setFieldValue("action", "decline");
                                    formikProps.submitForm();
                                  }}
                                >
                                  {t("pre-event.participant-list.post-deadline.decline-button-text")}
                                </Button>
                              </div>
                            ) : null}
                          </>
                        )}
                      </>
                    );
                  }}
                </FieldArray>
              </Form>
            </div>
          )}
        </Formik>
      </section>

      {/* Information Section */}
      <section className="w-full lg:w-1/3 px-4 lg:px-8 py-10 bg-white">
        <div className="flex items-center mb-5">
          <IconInformation className="w-8 h-8 mr-2 text-primary-light fill-current" />
          <h2>{t("pre-event.participant-list.info-title")}</h2>
        </div>
        {infoTextTranslate && (<p className="lead-text">{t(infoTextTranslate)}</p>)}
        {/* <p className="lead-text">{t("pre-event.participant-list.pre-deadline.info-text")}</p>
        <p className="lead-text">{t("pre-event.participant-list.post-deadline.info-text")}</p> */}
        <p className="lead-text">This list shows you all of the applied candidates to your Event.</p>
        {/* <p>{t("pre-event.participant-list.post-decline.info-text")}</p> */}
      </section>
    </div>
  );
};