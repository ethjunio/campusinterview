import CandidateListItem from "../../chatroom/_components/CandidateListItem";

export interface CandidateListProps {
  data: any;
  loading: boolean;
  checkbox?: boolean;
  checkboxOnClick?: Function;
  selected?: Array<any>;
}

const CandidateList: React.FC<CandidateListProps> = ({
  data,
  loading,
  checkbox,
  checkboxOnClick,
  selected,
}) => {
  return (
    <ul className="space-y-3 h-full mt-4">
      {data?.map(({ candidate, id } : {candidate:any, id:any}) => (
        <CandidateListItem
          key={`candidate-list-item-${id}`}
          candidate={candidate}
          id={id}
          loading={loading}
          showMail={true}
          checkbox={checkbox}
          checkboxOnClick={checkboxOnClick}
          selected={selected}
        />
      ))}
    </ul>
  );
};

export default CandidateList;
