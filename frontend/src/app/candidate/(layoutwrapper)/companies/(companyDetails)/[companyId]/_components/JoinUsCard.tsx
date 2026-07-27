"use client"
import React, { FC } from 'react';
import { OverviewCard } from '@/components/molecules/OverviewCard';
import { TagList } from '@/components/molecules/Taglist';
import styles from './JoinUsCard.module.scss';
import { useTranslations } from 'next-intl';
import ProfileGrid from '@/app/candidate/(layoutwrapper)/profile/_components/ProfileGrid';
import c from 'classnames';
import useMobileDetect from '@/utils/useMobileDetect';
import DOMPurify from "dompurify";

export const JoinUsCard: FC<{ data: any }> = ({
    data
}) => {
    const t = useTranslations();
      const { currentDevice } = useMobileDetect();
      const isMobile = currentDevice.isMobile();

    return (
        <OverviewCard href="/company/profile/joinus">
            <OverviewCard.Title>{t('companies.joinus.title')}</OverviewCard.Title>
            {!true && (
                <OverviewCard.Action>{t('companies.joinus.edit')}</OverviewCard.Action>
            )}
            <OverviewCard.Body
                readonly={true}
                className={c(styles.body, 'mt-5 lg:mt-10')}>
                <ProfileGrid
                    name="joinus"
                    gridStyleLeft={{
                        gridTemplateColumns: '40% auto',
                        minWidth: isMobile ? '100%' : undefined,
                        maxWidth: isMobile ? '100%' : '80%',
                    }}
                    gridStyleRight={{ gridTemplateColumns: '0', width: 0 }}
                    left={[
                        {
                            title: t('companies.joinus.form-majors-label'),
                            text: data?.data?.fieldsOfStudy?.length ? (
                                <TagList tags={data?.data?.fieldsOfStudy} />
                            ) : "N/A",
                            under: isMobile,
                            name: 'fieldsOfStudy',
                            titleStyle: { marginBottom: isMobile ? 16 : 40 },
                            textStyle: { marginBottom: isMobile ? 16 : 40 },
                        },
                        {
                            title: t('companies.joinus.form-lookingFor-label'),
                            text: (
                                <div
                                    className="content max-w-screen-sm pr-9 xl:pr-40 font-bold normal wysiwyg"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(data?.data?.lookingFor || 'N/A'),
                                    }}
                                />
                            ),
                            under: isMobile,
                            name: 'lookingFor',
                            titleStyle: { marginBottom: isMobile ? 16 : 40 },
                            textStyle: { marginBottom: isMobile ? 16 : 40 },
                        },
                        {
                            title: t('companies.joinus.form-companyCulture-label'),
                            text: (
                                <div
                                    className="content max-w-screen-sm pr-9 xl:pr-40 font-extrabold wysiwyg text-slate-500"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(data?.data?.culture || 'N/A'),
                                    }}
                                />
                            ),
                            under: isMobile,
                            name: 'culture',
                            titleStyle: { marginBottom: isMobile ? 16 : 40 },
                            textStyle: { marginBottom: isMobile ? 16 : 40 },
                        },
                        {
                            title: t('companies.joinus.form-weOffer-label'),
                            text: (
                                <div
                                    className="content max-w-screen-sm pr-9 xl:pr-40 font-extrabold wysiwyg text-slate-500"
                                    dangerouslySetInnerHTML={{
                                        __html:DOMPurify.sanitize( data?.data?.weOffer || 'N/A'),
                                    }}
                                />
                            ),
                            under: isMobile,
                            name: 'weOffer',
                            titleStyle: { marginBottom: isMobile ? 16 : 40 },
                            textStyle: { marginBottom: isMobile ? 16 : 40 },
                        },
                        {
                            title: t('companies.joinus.form-positions-label'),
                            text: data?.data?.offeredPositionTypes?.length ? (
                                <TagList tags={data.data.offeredPositionTypes} />
                            ) : 'N/A',
                            under: isMobile,
                            name: 'offeredPositionTypes',
                            titleStyle: { marginBottom: isMobile ? 16 : 40 },
                            textStyle: { marginBottom: isMobile ? 16 : 40 },
                        },
                        {
                            title: t('companies.joinus.form-salary-label'),
                            text: data?.data?.startingSalary || 'N/A',
                            under: isMobile,
                            name: 'startingSalary',
                            titleStyle: { marginBottom: isMobile ? 16 : 40 },
                            textStyle: { marginBottom: isMobile ? 16 : 40 },
                        },
                    ]}
                />


            </OverviewCard.Body>
        </OverviewCard>
    );
};
