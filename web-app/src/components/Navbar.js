// We're using Next.js's built-in Image and Link components.
// - `next/image` optimizes images (responsive sizes, lazy loading, etc.).
// - `next/link` enables client-side navigation (faster route transitions).
import Image from 'next/image';
import Link from 'next/link';

// The Navbar component is a small, reusable header that uses Tailwind CSS
// utility classes and DaisyUI component classes (daisyUI is a set of
// prebuilt component styles on top of Tailwind).

export default function Navbar() {
  // Accessibility note: <header> is the appropriate landmark for site
  // navigation. If you add a <nav> element inside, consider adding
  // `aria-label` or `role="navigation"` for clarity.
  return (
    <header className="w-full">
      {/*
        `.navbar` is a daisyUI helper class that provides a horizontal layout
        with sensible spacing. `bg-base-100` comes from DaisyUI's color
        palette and maps to the site's base background color.
      */}
      <div className="navbar bg-base-100">

        {/* Left section: logo + brand name
            - `flex-1` makes this section take all available horizontal space
              which pushes the other groups to the right.
            - Using a Link around the logo lets users click the brand to go
              back to the homepage.
        */}
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-3">
            {/*
              Use the `Image` component from Next.js. The `src` points to
              `/public/file.svg` (public files are served from the root).
              width/height give the intrinsic size; Image will handle
              optimization. `alt` provides accessible text for screen readers.
            */}
            <Image src="/file.svg" alt="PeoplePulse logo" width={36} height={36} />

            {/* Brand text
                - `font-semibold` makes the text a bit bolder.
                - `text-lg` sets a readable size for the site title.
            */}
            <span className="font-semibold text-lg">PeoplePulse</span>
          </Link>
        </div>

        {/* Center / links section (hidden on small screens)
            - `hidden md:flex` hides this group on mobile (`md` breakpoint
              and up it becomes a flex container).
            - `gap-6` adds horizontal spacing between items.
            - We use `btn btn-ghost` (daisyUI classes) to make link-like
              buttons that don't have filled backgrounds.
        */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="#" className="btn btn-ghost">Jobs</Link>
          <Link href="#" className="btn btn-ghost">Price</Link>
        </div>

        {/* Right section: authentication actions
            - `flex-none` keeps this section only as wide as its contents.
            - `gap-2` gives small spacing between the two action buttons.
            - `btn btn-ghost` for a subtle sign-in action; `btn btn-primary`
              for a stronger call-to-action (Sign up).
        */}
        <div className="flex-none gap-2">
          <Link href="/signin" className="btn btn-ghost">Sign in</Link>
          <Link href="/signup" className="btn btn-primary">Sign up</Link>
        </div>
      </div>
    </header>
  );
}

/*
  How to adapt this file:
  - Replace `/file.svg` with your logo file. Put images in `public/` for
    simple access via `/your-file.ext`.
  - Change labels (Jobs/Price) and href values to real routes when you
    implement those pages.
  - To add a mobile menu, you can add a hamburger button that toggles a
    dropdown. DaisyUI provides dropdown/menu components that integrate well
    with this layout.
  - If you prefer not to use Next's Image component for simple SVGs, you
    can inline the SVG or use a regular <img src="/file.svg" /> tag.

  Common responsive tweaks:
  - Swap `hidden md:flex` to `hidden lg:flex` to keep the center links
    hidden until larger screens.
  - Add `px-4` or `container mx-auto` to constrain content width.

  Accessibility tips:
  - Ensure `alt` text is descriptive for logos used as links.
  - If the navbar contains only icons, provide visually-hidden text or
    aria-labels.
*/
