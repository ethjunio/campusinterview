import { useEffect, useState } from 'react';
import NewMessage from './NewMessage'

export interface NewMessagesProps {
  photo: string;
  canChat: boolean;
  selectedId: string;
  pending:boolean
  setPending:(args:boolean)=>void
}

const NewMessages: React.FC<NewMessagesProps> = ({
  photo,
  canChat,
  selectedId,
  pending,
   setPending
}) => {
  const [textIndex, setTextIndex] = useState<number>(-1);
  const [texts, setTexts] = useState<{ selectedId: string; text: string }[]>([]);

  useEffect(() => {
    const foundTextIndex = texts.findIndex(
      (text) => text.selectedId === selectedId,
    );
    if (foundTextIndex === -1) {
      const newTexts = [...texts];
      newTexts.push({ selectedId: selectedId, text: '' });
      setTexts(newTexts);
      setTextIndex(newTexts.length - 1);
    } else {
      setTextIndex(foundTextIndex);
    }
  }, [selectedId]);

  function handleChange(value: string) {
    const newTexts = [...texts];

    newTexts[textIndex].text = value;
    setTexts(newTexts);
  }

  return (
    <NewMessage
      photo={photo}
      canChat={canChat}
      onChange={handleChange}
      text={textIndex !== null && texts[textIndex] ? texts[textIndex].text : ''}
      selectedId={selectedId}
      pending={pending}
      setPending ={setPending}
    />
  );
};

export default NewMessages;
