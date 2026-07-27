import CompanyListItem from './CompanyListItem';

export interface CompanyListProps {
  data: any;
  loading: boolean;
}

const CompanyList: React.FC<CompanyListProps> = ({ data, loading }) => {
  return (
    <ul className="space-y-3 h-full mt-4 overflow-y-auto">
      {data?.map(({ company, id } : {company:any, id:any}) => (
        <CompanyListItem
          key={`company-list-item-${id}`}
          company={company}
          id={id}
          loading={loading}
          showMail={true}
          showStatus={true}
        />
      ))}
    </ul>
  );
};

export default CompanyList;
