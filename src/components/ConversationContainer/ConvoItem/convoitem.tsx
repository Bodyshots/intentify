import React from 'react';
import Link from 'next/link';
import DeleteConvoBtn from './DeleteConvoBtn/deleteconvobtn';
import { Conversation } from '@/redux/slices/types';

interface ConvoItemProps {
  convo: Conversation;
  index: number;
}

const ConvoItem = ({ convo, index }: ConvoItemProps) => {
  return (
    <div
      key={convo.id}
      className="p-6 py-3 flex flex-row gap-4 justify-between items-center border-b border-x border-gray-300"
    >
      <span className="convo_index text-sm flex-shrink-0 w-1/6">{index + 1}</span>

      {/* Date */}
      <span className="convo_date w-1/6 text-sm flex-shrink-0">{convo.created_at}</span>

      {/* URLs */}
      <div className="convo_urls w-1/6 text-sm flex-shrink-0">
        {convo.URLs.map((url, index) => (
          <u key={index} className="block">
            <Link
              className="hover:text-custom_green_hover dark:hover:text-muted-foreground transition-colors break-words"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {url}
            </Link>
          </u>
        ))}
      </div>

      {/* Role */}
      <span className="convo_role w-1/6 text-sm flex-shrink-0">{convo.role}</span>

      {/* Predicted Intention */}
      <span className="convo_intent w-1/6 text-sm overflow-hidden break-words">
        {convo.intent}
      </span>

      {/* Delete Button */}
      <DeleteConvoBtn convo_id={convo.id}/>
    </div>
  );
};

export default ConvoItem;
