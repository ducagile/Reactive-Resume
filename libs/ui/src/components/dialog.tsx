/* eslint-disable tailwindcss/no-custom-classname */
import { X } from "@phosphor-icons/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@reactive-resume/utils";
import { forwardRef } from "react";

export const Dialog = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogPortal = (props: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal {...props} />
);

DialogPortal.displayName = DialogPrimitive.Portal.displayName;

export const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "bg-[rgba(0, 0, 0.5)] fixed inset-0 z-50 backdrop-blur-[2px] !duration-200 ease-in data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

type DialogContentProps = {
  sidePosition?: boolean;
  classNameOverlay?: string;
} & React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

export const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  // React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
  DialogContentProps
>(({ children, sidePosition = false, classNameOverlay = "", ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay className={classNameOverlay} />
    <DialogPrimitive.Content
      ref={ref}
      // forceMount
      // data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-1 data-[state=closed]:zoom-out-95
      className={cn(
        "bg-darkModalBg fixed gap-4 border !duration-200 focus:outline-none focus:ring-1 focus:ring-secondary focus:ring-offset-1  sm:rounded-sm",
        // className,
        sidePosition
          ? "w-[calc(100vw - 20px)] !top-0 right-0 z-50 h-screen p-6 text-lg !duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right xl:w-[1024px]"
          : "inset-0 z-50 m-auto !h-fit max-h-[88vh] w-fit max-w-4xl overflow-hidden !rounded-3xl p-8 ease-in data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[1.03] data-[state=open]:slide-in-from-top-1 md:w-full",
        // data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-105 data-[state=open]:slide-in-from-bottom-1/2 data-[state=open]:slide-in-from-right-1/2
        // data-[state=closed]:zoom-out-105 data-[state=closed]:fade-out-0
      )}
      {...props}
    >
      {children}
      {!sidePosition && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-3 text-left", className)} {...props} />
);

DialogHeader.displayName = "DialogHeader";

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3", className)}
    {...props}
  />
);

DialogFooter.displayName = "DialogFooter";

export const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-base font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));

DialogTitle.displayName = DialogPrimitive.Title.displayName;

export const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm leading-relaxed text-primary-accent", className)}
    {...props}
  />
));

DialogDescription.displayName = DialogPrimitive.Description.displayName;
