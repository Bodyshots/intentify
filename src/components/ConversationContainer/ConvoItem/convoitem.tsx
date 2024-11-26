import React from 'react';
import { Conversation } from '@/redux/slices/convoSlice';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ConvoItemProps {
  convo: Conversation;
}

const ConvoItem: React.FC<ConvoItemProps> = ({ convo }) => {
  return (
    <div
      key={convo.id}
      className="p-2 py-3 flex flex-row gap-4 justify-between items-center border-b border-gray-300"
    >
      {/* Date */}
      <span className="convo_date w-1/5 text-sm flex-shrink-0">{convo.created_at}</span>

      {/* URLs */}
      <div className="convo_urls w-1/5 text-sm flex-shrink-0">
        {convo.URLs.map((url, index) => (
          <u key={index} className="block">
            <a
              className="hover:text-custom_green_hover dark:hover:text-muted-foreground transition-colors break-words"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {url}
            </a>
          </u>
        ))}
      </div>

      {/* Role */}
      <span className="convo_role w-1/5 text-sm flex-shrink-0">{convo.role}</span>

      {/* Predicted Intention */}
      <span className="convo_intent w-1/5 text-sm overflow-hidden break-words">
        {convo.intent}
      </span>

      {/* Delete Button */}
      <div className="convo_delete w-1/5 text-sm flex justify-center">
        <Button variant={"destructive"}>Delete</Button>
      </div>
    </div>
  );
};

export default ConvoItem;
