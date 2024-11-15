"use client";

import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@radix-ui/react-label';
import { useTheme } from 'next-themes';

const ThemeSettings = () => {
  const { setTheme, theme } = useTheme();

  return (<>
    <h2 className="text-4xl pt-4">Theme Preferences</h2>
      <p className="text-muted-foreground pt-2 pb-4">Choose the default theme for how Intentify looks for you.</p>
    <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="light" id="r1" 
                          onClick={() => setTheme('light')} 
                          checked={theme === 'light'}/>
          <Label htmlFor="r1">Light</Label>
        </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="dark" id="r2" 
                        onClick={() => setTheme("dark")}
                        checked={theme === 'dark'}/>
        <Label htmlFor="r2">Dark</Label>
      </div>
    </RadioGroup>
    </>)
}

export default ThemeSettings;