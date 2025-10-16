import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="pastel">
        <body className="antialiased min-h-screen bg-base-100">
          <div className="flex flex-col min-h-screen">
            {/* Navbar container with subtle shadow and border */}
            <header className="sticky top-0 z-30 bg-base-100/95 backdrop-blur-sm border-b border-base-200">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center gap-2">
                    <SignedOut>
                      <SignInButton mode="modal" className="btn btn-ghost" />
                      <SignUpButton mode="modal" className="btn btn-primary ml-2 hover:btn-primary-focus transition-colors" />
                    </SignedOut>
                    
                      <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
              </div>
            </header>
            
            {/* Main content */}
            <main className="flex-1">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </div>
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
