'use client';

import cn from 'classnames';
import { forwardRef } from 'react';

export const Button = forwardRef(
  ({ variant = 'secondary', size = 'm', className, withAnimatedBorders, ...props }, ref) => {
    const commonProps = {
      ...props,
      className: cn(
        {
          'bg-secondary': variant === 'secondary',
          'hover:bg-secondaryHover transition-colors text-textPrimary':
            variant === 'secondary' && !props.disabled,
          'text-textSecondary': variant === 'secondary' && props.disabled,
          'bg-transparent hover:bg-transparent': variant === 'transparent',
        },
        {
          'py-1 px-2 gap-1 text-xs leading-4': size === 'xs',
          'py-1 px-3 gap-2 text-sm leading-5': size === 's',
          'py-1.5 px-3 gap-2 text-sm leading-5': size === 'm',
          'py-1.5 px-3 gap-2 text-base leading-6': size === 'l',
          'py-2 px-3 gap-2 text-base leading-6': size === 'xl',
        },
        'inline-flex items-center justify-center',
        'rounded-lg',
        'font-medium',
        'select-none',
        'outline-none',
        'focus-visible:ring-2',
        props.disabled && 'cursor-default',
        props.disabled ? 'ring-outlineDisabled' : 'ring-outlineActive',
        withAnimatedBorders && 'glowing-orders !rounded-[26px]',
        className
      ),
    };

    return <button {...commonProps} ref={ref} />;
  }
);

Button.displayName = Button.name;
