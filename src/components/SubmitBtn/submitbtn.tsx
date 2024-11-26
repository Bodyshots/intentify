import React from 'react'
import { Button } from '../ui/button'

interface SubmitBtnProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
  loadingSubmit: boolean;
  loadingText: string;
  baseText: string;
  btnClassName?: string
  onClickHandle?: React.MouseEventHandler<HTMLButtonElement>;
}

const SubmitBtn = ({ variant, loadingSubmit, loadingText, baseText, btnClassName, onClickHandle }: SubmitBtnProps) => {
  return (
    <Button variant={variant}
            type="submit"
            className={btnClassName}
            disabled={loadingSubmit}
            onClick={onClickHandle}>
            {loadingSubmit ? loadingText : baseText}
    </Button>
  )
}

export default SubmitBtn