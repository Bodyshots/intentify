"use client";

import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@radix-ui/react-label';
import { useTheme } from 'next-themes';
import { ThemeConstants } from '@/constants/theme';

const ThemeSettings = () => {
  const { setTheme, theme } = useTheme();

  return (<>
    <h2 className="text-4xl pt-4">Theme Preferences</h2>
      <p className="text-muted-foreground pt-2 pb-4">Choose the default theme for how Intentify looks for you.</p>
    <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={ThemeConstants.light} id="r1" 
                          onClick={() => setTheme(ThemeConstants.light)} 
                          checked={theme === ThemeConstants.light}/>
          <Label htmlFor="r1">Light</Label>
        </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={ThemeConstants.dark} id="r2" 
                        onClick={() => setTheme(ThemeConstants.dark)}
                        checked={theme === ThemeConstants.dark}/>
        <Label htmlFor="r2">Dark</Label>
      </div>
    </RadioGroup>
    </>)
}

export default ThemeSettings;