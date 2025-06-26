import React from 'react'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export const EyeIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

export const EyeOffIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M3 3l18 18" />
    <path d="M10.477 6.477A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7-.732 2.331-2.17 4.298-4.093 5.621M6.343 6.343C4.17 7.97 2.726 10.08 2.458 12c1.274 4.057 5.064 7 9.542 7 1.27 0 2.496-.235 3.618-.66" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

export const ShoppingBagIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M6 2l1 4h10l1-4" />
    <path d="M3 6h18v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
)

export const SearchIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

export const PlusIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export const HistoryIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a8 8 0 101.49-9" />
  </svg>
)

export const UserIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21v-2a6.5 6.5 0 0113 0v2" />
  </svg>
)

export const LogOutIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

export const CheckIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <polyline points="5 13 9 17 19 7" />
  </svg>
)

export const ChevronRightIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
)
