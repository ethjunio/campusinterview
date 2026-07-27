"use client"
import { ListItem } from '@/components/molecules/ListItem';
import Preevent from '@/icons/ic-presentation.svg';
import { fromISOtoDateStatic } from '@/utils/date';
import { Button } from '@/components/atoms/Button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useQueryClient } from "@tanstack/react-query";
import { useGetCompanyPreeventListQuery } from '@/hooks/company/preevents/useGetCompanyPreeventListQuery';
import { useState } from 'react';
import { Modal } from '@/components/organisms/modal/Modal';
import { useRouter } from 'next/navigation';

export const PreeventCompanyList = () => {

    const { data, isPending } = useGetCompanyPreeventListQuery()
     const [modalStatus, setModalStatus] = useState(true);
      const router = useRouter();

    const t = useTranslations();

    const toggleModal = () => {
        setModalStatus((prevState) => {
          return !prevState;
        });
      };

    return (
        <div className='mt-20 ml-8 mr-8'>
            <h1 className="mb-8">{t('admin.preevents-title')}</h1>
            <ul className="space-y-4 ">
                {data?.data?.length > 0  ? (<>{(data?.data || []).map(
                    ({
                        id,
                        imageUrl,
                        title,
                        eventDate,
                        eventTime,
                        maxParticipants,
                        address,
                    }: any) => {
                        return (
                            <ListItem key={id} id={id} loading={isPending}>
                                <ListItem.Image Placeholder={Preevent} src={imageUrl} alt="" />
                                <ListItem.Title>{title}</ListItem.Title>
                                <ListItem.Body>
                                    <div className="grid grid-cols-2 space-x-4 justify-start opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto">
                                        <div className="space-y-2">
                                            <div className="general-text-sm">
                                                {t('admin.preevent-list.list-date-title')}:{' '}
                                                {fromISOtoDateStatic(eventDate)}
                                            </div>
                                            <div className="general-text-sm">
                                                Event time:{' '}
                                                {eventTime}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="general-text-sm">
                                                {t('admin.preevent-list.list-maxParticipants-title')}:{' '}
                                                {maxParticipants}
                                            </div>
                                            <div className="general-text-sm">
                                                {t('admin.preevent-list.list-address-title')}: {address}
                                            </div>
                                        </div>
                                    </div>
                                </ListItem.Body>
                                <ListItem.Actions>
                                    <div className="flex space-x-2">
                                        <Link href={`/company/pre-event/preevent-form?id=${id}`}>
                                            <Button variant="outline" onClick={(e) => e.stopPropagation()}>
                                                {t('admin.preevent-list.list-editButton-label')}
                                            </Button>
                                        </Link>
                                    </div>
                                </ListItem.Actions>
                            </ListItem>
                        );
                    },
                )}</>) :(
                    <>
                    <div className='mt-52'></div>
                      <Modal
                        modalStatus={modalStatus}
                        title={t('companies.pre-event.no-preevent-dialog.title')}
                        description={t('companies.pre-event.no-preevent-dialog.text')}
                        textFirstBtn={t('companies.pre-event.no-preevent-dialog.button-text')}
                        onClickFirstBtn={() => {
                          router.push('/company/profile/bookings');
                        }}
                        toggleModal={toggleModal}
                        backgroundColor="bg-gradient-135-modal"
                      />
                    </>
                  )}
             
            </ul>
        </div>
    );
};
