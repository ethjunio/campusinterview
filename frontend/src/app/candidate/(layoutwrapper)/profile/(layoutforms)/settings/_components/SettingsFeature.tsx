"use client"
import { useCreateSettingsMutation } from '@/hooks/student/profilemgmt/useCreateSettingsMutation';
import { useGetSettingsQuery } from '@/hooks/student/profilemgmt/useGetSettingsQuery';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';
import Switch from 'react-switch';
import { toast } from 'sonner';

export const SettingsFeature: FC = ({}) => {

  const t = useTranslations();
  const [settings, setSettings] = useState({
    areMatchingNotificationsEnabled: false,
    areChatNotificationsEnabled: false,
    keepProfile: false,
  });

  const createSettingsMutation  = useCreateSettingsMutation()

  const { data: settingsData, isLoading } = useGetSettingsQuery();

  console.log('settingsData', settingsData);

   // Sync settings with API response
   useEffect(() => {
    if (settingsData) {
      setSettings({
        areMatchingNotificationsEnabled:
          settingsData?.data?.areMatchingNotificationsEnabled ?? false,
        areChatNotificationsEnabled:
          settingsData?.data?.areChatNotificationsEnabled ?? false,
        keepProfile: settingsData?.data?.keepProfile ?? false,
      });
    }
  }, [settingsData]);

  async function handleSettingsChange(name: string, value: boolean) {
    // update state
    setSettings({
      ...settings,
      [name]: value,
    });

       // Trigger API call to update settings in the database
       try {
        await createSettingsMutation.mutateAsync({
          [name]: value,
        });
        toast.success("Data saved successfully");
        // console.log(`Setting "${name}" updated to ${value}`);
      } catch (error) {
       toast.error(error?.response?.data?.message);
      }
  }

  return (
    <>
      <h1>{t('candidate.settings.title')}</h1>
      {/* <span className="danger-text">{error}</span> */}
      {!isLoading && (
        <>
          <div className="space-y-6 mt-8">
            <div className="flex space-x-2">
              <Switch
                onChange={(val) =>
                  handleSettingsChange('areMatchingNotificationsEnabled', val)
                }
                checked={settings.areMatchingNotificationsEnabled}
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
              <div>{t('candidate.settings.matching-notifications')}</div>
            </div>
            <div className="flex space-x-2">
              <Switch
                onChange={(val) =>
                  handleSettingsChange('areChatNotificationsEnabled', val)
                }
                checked={settings.areChatNotificationsEnabled}
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
              <div>{t('candidate.settings.chat-notifications')}</div>
            </div>
            <div className="flex space-x-2">
              <Switch
                onChange={(val) => handleSettingsChange('keepProfile', val)}
                checked={settings.keepProfile}
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
              <div>{t('candidate.settings.keep-profile')}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
