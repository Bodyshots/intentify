"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { ThemeConstants } from "@/constants/theme"
import './modetoggle.css'

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (theme === ThemeConstants.dark ?
    <Button
      onClick={() => setTheme(ThemeConstants.light)} 
      className="mode_btn opacity-50 hover:opacity-100">
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
    :
    <Button
      onClick={() => setTheme(ThemeConstants.dark)} 
      className="mode_btn">
      <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    </Button>
  )
}
