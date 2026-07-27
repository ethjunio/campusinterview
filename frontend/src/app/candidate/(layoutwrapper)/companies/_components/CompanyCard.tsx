import Link from 'next/link';
import FavoriteIcon from '@/icons/ic-favorite2.svg';
import FavoriteFullIcon from '@/icons/ic-favorite_full.svg';
import ArrowRightIcon from '@/icons/ic-arrow-right.svg';
import { IconButton } from '@/components/atoms/Button';
import { useState } from 'react';
import { useCreateAddRemoveCompanyFavoutiteMutation } from '@/hooks/student/companymgmt/useCreateAddRemoveCompanyFavoutiteMutation';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
export interface CompanyCardProps {
    companyId: string;
    photo: string;
    title: string;
    description: any;
    isFavorite: boolean;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
    companyId,
    photo,
    title,
    description,
    isFavorite = false,
}) => {

    const [disableLink, setDisableLink] = useState(false);
    const queryClient = useQueryClient();
    const CreateAddRemoveCompanyFavMutation = useCreateAddRemoveCompanyFavoutiteMutation({
        onSuccess: (msg: any) => {
            queryClient.invalidateQueries({ queryKey: ["getCompanyList"] });
            toast.success(msg?.message);
            setDisableLink(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message);
        },
    });

    function handleLink(event) {
        if (disableLink) {
            event.stopPropagation();
        }
    }

    return (
        <a
            className="text-black w-40"
            href={`/candidate/companies/${companyId}`}
            onClick={handleLink}>
            <div
                style={{ height: 200 }}
                className="flex flex-col bg-white rounded-lg w-40">
                <div className="flex justify-center pt-4 pb-6">
                    <img className="w-auto h-12" src={photo} />
                </div>
                <div className="relative">
                    <hr />
                    <div
                        style={{ top: '-20px', right: '4px', zIndex: 10 }}
                        className="absolute"
                        onPointerDown={() => {
                            setDisableLink(true);
                        }}>
                        <IconButton
                            onClick={(event) => {
                                event.stopPropagation();
                                CreateAddRemoveCompanyFavMutation.mutate({ companyId });
                                setDisableLink(false);
                                
                            }}
                            tw="p-2 mr-1"
                            variant="link"
                            icon={
                                isFavorite ? (
                                    <FavoriteFullIcon className="w-4 h-4 fill-current" />
                                ) : (
                                    <FavoriteIcon className="w-4 h-4 fill-current" />
                                )
                            }
                        />
                    </div>
                </div>
                <div className="p-3 h-full relative">
                    <div className="text-sm text-black font-bold mb-2">{title}</div>
                    <div>{description}</div>
                    <div style={{ bottom: '12px', right: '15px' }} className="absolute">
                        <Link href={`/candidate/companies/${companyId}`}>
                            <ArrowRightIcon className="text-primary-light stroke-current stroke-3 fill-current w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default CompanyCard;
