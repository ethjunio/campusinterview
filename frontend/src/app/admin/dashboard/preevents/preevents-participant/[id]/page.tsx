"use client";
import { BackLink } from "@/components/atoms/BackLink";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ListItem } from "@/components/molecules/ListItem";
import PlaceholderImage from "@/icons/ic-placeholder-profil.svg";
import IconInformation from "@/icons/ic-info_blue.svg";
import { Checkbox } from "@/components/molecules/form/Checkbox";
import { Formik, Form, FieldArray } from "formik";
import { Button } from "@/components/atoms/Button";
import take from "lodash/fp/take";
import sort from "lodash/fp/sortBy";
import { useQueryClient } from "@tanstack/react-query";
import { useGetPreeventsByIdQuery } from "@/hooks/admin/eventpreevents/useGetPreeventsByIdQuery";
import { useCreateInviteParticipantsInAdminMutation } from "@/hooks/admin/preevents/useCreateInviteParticipantsInAdminMutation";

const PreeventParticipants = () => {
  const t = useTranslations("companies");
  const params = useParams();
  const { id } = params;
  const queryClient = useQueryClient();

  const { data: preevent, isLoading } = useGetPreeventsByIdQuery(id);
  const inviteParticipantsMutation =
    useCreateInviteParticipantsInAdminMutation();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const participants = preevent?.data;
  const initialValues = {
    participants: [],
    action: null,
  };

  const isDeadlineOver =
    new Date() > new Date(preevent?.data?.registrationDeadline);

  let subtitleTranslate = "pre-event.participant-list.pre-deadline.subtitle";
  let infoTextTranslate = "pre-event.participant-list.pre-deadline.info-text";
  if (isDeadlineOver) {
    subtitleTranslate = "pre-event.participant-list.post-deadline.subtitle";
    infoTextTranslate = "pre-event.participant-list.post-deadline.info-text";
  }

  if (participants && participants.length > 0) {
    if (participants[0].state === "invited") {
      subtitleTranslate = "pre-event.participant-list.post-invite.subtitle";
      infoTextTranslate = "pre-event.participant-list.post-invite.info-text";
    }
  }

  return (
    <main className="flex-grow bg-light-softer h-screen">
      <div className="flex flex-col lg:flex-row flex-grow w-full">
        <section className="bg-light-softer flex-grow w-full lg:w-2/3 py-8 px-2 xl:px-8">
          <div className="max-w-screen-lg mb-8">
            <BackLink href="/admin/dashboard/preevents">Back to Event</BackLink>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { resetForm }) => {
              const invitedParticipants: any[] = [];

              participants.forEach((participant, index) => {
                if (values.participants[index]?.isInvited) {
                  // invitedParticipants.push({
                  //   id: participant.id,
                  //   state: values.action === "invite" ? "invited" : "declined",
                  // });
                  invitedParticipants.push(participant.id);
                }
              });
              if (id) {
                inviteParticipantsMutation.mutate(
                  {
                    preeventId: Number(id),
                    participantIdsArr: invitedParticipants,
                    action: values.action,
                  },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["preeventsListById", id],
                      });
                    },
                  },
                );
                resetForm();
              }
            }}
          >
            {(formikProps) => (
              <div className="max-w-screen-lg space-y-8">
                <h1>{t("pre-event.participant-list.title")}</h1>
                <h3>{t(subtitleTranslate)}</h3>
                {(!participants || participants.length === 0) && (
                  <p>{t("pre-event.participant-list.none-participants")}</p>
                )}
                <Form>
                  <FieldArray name="participants">
                    {(formik) => {
                      const noneSelected =
                        !formik.form.values.participants.find(
                          (participant: any) => participant?.isInvited,
                        );

                      return (
                        <div>
                          {!isLoading &&
                            participants?.map(
                              (
                                {
                                  id,
                                  state,
                                  candidate,
                                }: {
                                  id: string;
                                  state: string;
                                  candidate: {
                                    id: string;
                                    firstName: string;
                                    lastName: string;
                                    imageUrlSmall: string;
                                    education: {
                                      id: string;
                                      university: { name: string };
                                      educationLevel: { name: string };
                                      major: { name: string };
                                    }[];
                                  };
                                },
                                index: number,
                              ) => {
                                let status;
                                if (state === "invited") status = "arranged";
                                if (state === "declined") status = "rejected";
                                return (
                                  <div className="mt-2" key={index}>
                                    <ListItem
                                      loading={isLoading}
                                      key={id}
                                      id={candidate.id.toString()}
                                      type="candidate"
                                    >
                                      <ListItem.Image
                                        Placeholder={PlaceholderImage}
                                        alt={`${candidate.firstName} ${candidate.lastName}`}
                                        src={candidate.imageUrlSmall}
                                        interviewStatus={status}
                                        responsive
                                      />
                                      <ListItem.Title responsive>
                                        {candidate.firstName}{" "}
                                        {candidate.lastName}
                                      </ListItem.Title>
                                      <ListItem.Body>
                                        <div className="flex w-full xl:items-center xl:flex-row flex-col">
                                          <div className="truncate w-44 xl:w-full xl:whitespace-pre-wrap hidden sm:block mr-0 xl:mr-16">
                                            {take(
                                              2,
                                              sort(
                                                "startDate",
                                                candidate.education,
                                              ),
                                            ).map(
                                              ({
                                                id,
                                                university,
                                                educationLevel,
                                                major,
                                              }) => (
                                                <div
                                                  key={id}
                                                  className="truncate xxl:overflow-normal xxl:break-normal general-text"
                                                >
                                                  {university?.name} -{" "}
                                                  {educationLevel?.name} in{" "}
                                                  {major?.name}
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                      </ListItem.Body>
                                      <ListItem.Actions>
                                        {state === "applied" ? (
                                          <div onClick={handleClick}>
                                            <Checkbox
                                              name={`participants[${index}].isInvited`}
                                              thick
                                              className="mt-6"
                                            ></Checkbox>
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                      </ListItem.Actions>
                                    </ListItem>
                                  </div>
                                );
                              },
                            )}
                          {noneSelected ? null : (
                            <Button
                              tw="px-8 mt-8"
                              type="submit"
                              onClick={() => {
                                formikProps.setFieldValue("action", "invite");
                                formikProps.submitForm();
                              }}
                            >
                              {t(
                                "pre-event.participant-list.post-deadline.invite-button-text",
                              )}
                            </Button>
                          )}
                          {noneSelected ? null : (
                            <Button
                              tw="px-8 mt-8 ml-4"
                              type="submit"
                              variant="transparent"
                              onClick={() => {
                                formikProps.setFieldValue("action", "decline");
                                formikProps.submitForm();
                              }}
                            >
                              {t(
                                "pre-event.participant-list.post-deadline.decline-button-text",
                              )}
                            </Button>
                          )}
                        </div>
                      );
                    }}
                  </FieldArray>
                </Form>
              </div>
            )}
          </Formik>
        </section>

        <section className="w-full lg:w-1/3 px-4 lg:px-8 py-10 bg-white h-screen ">
          <div className="flex items-center mb-5">
            <IconInformation className="w-8 h-8 mr-2 text-primary-light fill-current" />
            <h2>{t("pre-event.participant-list.info-title")}</h2>
          </div>
          <p className="lead-text">{t(infoTextTranslate)}</p>
        </section>
      </div>
    </main>
  );
};

export default PreeventParticipants;
