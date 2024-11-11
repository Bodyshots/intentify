import './settingscard.css'
import '../../app/globals.css'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const SettingsCard = () => {
  return (
    <div className="settings_container bg-background px-10 py-8 rounded-2xl">
      <h1 className="text-6xl">Settings</h1>
      <h2 className="text-4xl pt-4">Theme Preferences</h2>
      <p className="text-muted-foreground pt-2 pb-4">Choose the default theme for how Intentify looks for you.</p>
        <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Light</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Dark</Label>
        </div>
      </RadioGroup>
      <h2 className="text-4xl py-4">My Account</h2>
      <div className="flex flex-col gap-2 w-7/12">
        <Label htmlFor="email" className="text-xl">Email</Label>
        <p className="text-muted-foreground pt-2 pb-4">Change the email address associated with this account.</p>
        <Input id="current_email" placeholder="Current email"/>
        <Input id="new_email" placeholder="New email"/>
      </div>
      <Button className="p-4 my-4 hover:bg-custom_green_hover dark:hover:bg-muted-foreground">Save changes</Button>
      <div className="flex flex-col gap-2 w-7/12">
        <Label htmlFor="password" className="text-xl">Password</Label>
        <p className="text-muted-foreground pt-2 pb-4">Change the password used to sign into your account.</p>
        <Input id="password" placeholder="Current password"/>
        <Input id="new_password" placeholder="New password"/>
      </div>
      <Button className="p-4 my-4 hover:bg-custom_green_hover dark:hover:bg-muted-foreground">Save changes</Button>
      <div className="flex flex-col gap-4">
        <Label htmlFor="delete_acc" className="text-xl">Delete your account</Label>
        <p className="text-muted-foreground pb-4">You won't be able to recover account once you delete it.</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete my account</Button>
        </DialogTrigger>
          <DialogContent>
          <DialogHeader className="flex flex-col text-left ">
            <DialogTitle className="text-2xl">Delete my account</DialogTitle>
            <DialogDescription className="text-base">
              Are you sure? Remember, you won't be able to recover your account once you delete it.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" type="submit">Yes, delete my account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
