import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import React from "react";

type EntityHeaderProps = {
  title?: string;
  description?: string;
  newButtonLabel?: string;
  isCreated?: boolean;
  disabled?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

export const EntityHeader = ({
  title,
  description,
  newButtonHref,
  newButtonLabel,
  isCreated,
  disabled,
  onNew,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="font-semibold md:text-xl text-lg">{title}</h1>

        {description && (
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {onNew && !newButtonHref && (
        <Button disabled={isCreated || disabled} size="sm" onClick={onNew}>
          <PlusIcon className="size-4" />
          {newButtonLabel}
        </Button>
      )}

      {!onNew && newButtonHref && (
        <Button size="sm" asChild>
          <Link href={newButtonHref} prefetch>
            <PlusIcon className="size-4" />
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  );
};

type EntityContainerProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  search: React.ReactNode;
  pagination: React.ReactNode;
};

export const EntityContainer = ({
  children,
  header,
  search,
  pagination,
}: EntityContainerProps) => {
  return (
    <div className="p-4 h-full md:px-10 md:py-6">
      <div className="mx-auto max-w-7xl flex flex-col gap-y-8 w-full h-full">
        {header}

        <div className="flex flex-col gap-y-4 h-full">
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  );
};
