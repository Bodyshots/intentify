import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import SubmitBtn from '@/components/SubmitBtn/submitbtn';
import { OtherConstants } from '@/constants/other';
import { useAppDispatch } from '@/redux/store';
import { deleteConversation } from '@/redux/slices/convoSlice';
import getCSRF from '@/lib/GetCSRF';
import { useAppSelector } from '@/redux/store';

interface DeleteConvoBtnProps {
  convo_id: number;
}

const DeleteConvoBtn = ({ convo_id }: DeleteConvoBtnProps) => {
  const dispatch = useAppDispatch();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const csrfToken = getCSRF();
  const user_id = useAppSelector((state) => state.userID_persist.user_id);

  async function deleteConvo(convo_id: number) {
    setLoadingSubmit(true);
    dispatch(deleteConversation({ user_id, convo_id, csrfToken }))
    .finally(() => setLoadingSubmit(false));
  }

  return (
    <div className="convo_delete w-1/6 text-sm flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"destructive"}>Delete</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Delete Conversation</DialogTitle>
            <DialogDescription className="text-base">
              Are you sure you want to delete this conversation? You won't be able to
              recover it once deleted.
            </DialogDescription>
          </DialogHeader>
          <SubmitBtn
            variant={"destructive"}
            baseText={OtherConstants.DELETE_CONVO}
            loadingText={OtherConstants.DELETE_LOAD}
            loadingSubmit={loadingSubmit}
            onClickHandle={() => deleteConvo(convo_id)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DeleteConvoBtn