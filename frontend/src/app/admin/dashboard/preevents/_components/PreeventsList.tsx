"use client"
import { ListItem } from '@/components/molecules/ListItem';
import DeleteIcon from '@/icons/ic-delete.svg';
import Preevent from '@/icons/ic-presentation.svg';
import { fromISOtoDateStatic } from '@/utils/date';
import { IconButton, Button } from '@/components/atoms/Button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useGetPreeventsListQuery } from '@/hooks/admin/eventpreevents/useGetPreeventsListQuery';
import { useDeletePreeventsListMutation } from '@/hooks/admin/eventpreevents/useDeletePreeventsListMutation';
import { toast } from 'sonner';
import { useQueryClient } from "@tanstack/react-query";

export const PreeventsList = () => {

  const { data, isPending } = useGetPreeventsListQuery()

  const queryClient = useQueryClient();

  const deletePreeventListMutation = useDeletePreeventsListMutation(
    {
      onSuccess: () => {
        toast.success("Preevents data deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["preeventsList"] });
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    }
  )

  const t = useTranslations();

  return (
    <div>
      <ul className="space-y-4">
        {(data?.data || []).map(
          ({
            id,
            company: { name },
            title,
            eventDate,
            maxParticipants,
            address,
            participants,
          }: any) => {
            // let participantsNumberTranslate =
            //   'admin.preevent-list.list-appliedParticipants-title';

            // if (participants && participants.length > 0) {
            //   if (participants[0].state === 'invited') {
            //     participantsNumberTranslate =
            //       'admin.preevent-list.list-invitedParticipants-title';
            //   }
            // }

            // Calculate counts for each participant state
            const invitedCount = participants.filter(p => p.state === 'invited').length;
            const appliedCount = participants.filter(p => p.state === 'applied').length;
            const declinedCount = participants.filter(p => p.state === 'declined').length;
            const totalCount = participants.length;

            return (
              <ListItem key={id} loading={isPending}>
                <ListItem.Image Placeholder={Preevent} src="" alt="" />
                <ListItem.Title>{title}</ListItem.Title>
                <ListItem.Body>
                  <div className="grid grid-cols-2 space-x-4 justify-start">
                    <div className="space-y-2">
                      <div className="general-text-sm">
                        {t('admin.preevent-list.list-company-title')}: {name}
                      </div>
                      <div className="general-text-sm">
                        {t('admin.preevent-list.list-date-title')}:{' '}
                        {fromISOtoDateStatic(eventDate)}
                      </div>
                    <div className="general-text-sm">
                      {t('admin.preevent-list.list-address-title')}: {address}
                    </div>
                    </div>
                    <div className="space-y-2">
                      {/* Show all three participant counts */}
                      <div className="general-text-sm">
                        {t('admin.preevent-list.list-invitedParticipants-title')}: {invitedCount}
                      </div>
                      <div className="general-text-sm">
                        {t('admin.preevent-list.list-declinedParticipants-title')}: {declinedCount}
                      </div>
                      <div className="general-text-sm font-medium">
                      {t('admin.preevent-list.list-appliedParticipants-title')}: {totalCount}
                      </div>
                      <div className="general-text-sm">
                      {t('admin.preevent-list.list-maxParticipants-title')}:{' '}
                      {maxParticipants}
                    </div>
                    </div>
                  </div>
                </ListItem.Body>
                <ListItem.Actions>
                  <div className="flex space-x-2">
                    <Link href={`/admin/dashboard/preevents/preevents-participant/${id}`}>
                      <Button variant="outline">
                        {t('admin.preevent-list.list-of-participants')}
                      </Button>
                    </Link>
                    <Link href={`/admin/dashboard/preevents/preevents-form?id=${id}`}>
                      <Button variant="outline">
                        {t('admin.preevent-list.list-editButton-label')}
                      </Button>
                    </Link>
                    <IconButton
                      onClick={() => {
                        const confirm = window?.confirm(
                          'Are you sure you want to delete this event? This action is ireversible!',
                        );
                        if (confirm) {
                          deletePreeventListMutation.mutate({ id })
                        }
                      }}
                      tw="p-1"
                      variant="link"
                      icon={
                        <DeleteIcon className="w-6 h-6 fill-current text-danger" />
                      }
                    />
                  </div>
                </ListItem.Actions>
              </ListItem>
            );
          },
        )}
      </ul>
    </div>
  );
};
