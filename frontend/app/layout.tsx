import { SidebarTrigger, SidebarProvider } from '@//components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar/appsidebar'
import { Gabarito } from 'next/font/google'
import { ThemeProvider } from '../components/ThemeProvider/themeprovider'
import { ModeToggle } from '../components/ModeToggle/modetoggle'
import { AuthProvider } from '@/contexts/AuthContext'
import { ReduxProvider } from '@/redux/reduxprovider'
import { Toaster, toast } from 'sonner'
import './globals.css'

export const metadata = {
  title: 'Intentify',
  description: 'Generated by create next app',
}

const gabarito = Gabarito({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={gabarito.className}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        >
      <AuthProvider>
      <SidebarProvider>
      <ReduxProvider>
        <AppSidebar/>
        <ModeToggle/>
        <SidebarTrigger style={{marginRight: "1em"}}/>
        <Toaster richColors position="bottom-center"/>
        {children}
      </ReduxProvider>
      </SidebarProvider>
      </AuthProvider>
      </ThemeProvider>
      </body>
    </html>
  )
}
