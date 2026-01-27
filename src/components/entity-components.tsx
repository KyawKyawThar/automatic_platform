import {
  AlertTriangleIcon,
  Loader2Icon,
  PackageOpenIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import React from "react";
import { Input } from "./ui/input";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-row items-center justify-between gap-x-4">
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

interface EntitySearchProps {
  value: string;
  onChange: (input: string) => void;
  placeHolder?: string;
}

export const EntitySearch = ({
  value,
  onChange,
  placeHolder = "Search",
}: EntitySearchProps) => {
  return (
    <div className="relative ml-auto">
      <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="max-w-[200px] bg-background shadow-none border-border pl-8"
        placeholder={placeHolder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

interface EntityPaginationProps {
  page: number;
  totalPage: number;
  disable?: boolean;
  onPageChange: (page: number) => void;
}

export const EntityPagination = ({
  page,
  totalPage,
  disable,
  onPageChange,
}: EntityPaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-x-2 w-full">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPage || 1}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={page === 1 || disable}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}>
          Previous
        </Button>

        <Button
          disabled={!totalPage || page >= totalPage || disable}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPage, page + 1))}>
          Next
        </Button>
      </div>
    </div>
  );
};

interface StateViewProps {
  message?: string;
}

export const LoadingView = ({ message }: StateViewProps) => {
  return (
    <div className="flex items-center justify-center h-full flex-1 flex-col gap-y-4">
      <Loader2Icon className="size-6 animate-spin text-muted-foreground" />

      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

export const ErrorView = ({ message }: StateViewProps) => {
  return (
    <div className="flex items-center justify-center h-full flex-1 flex-col gap-y-4">
      <AlertTriangleIcon className="size-6 text-muted-foreground" />

      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

interface EmpyViewProps extends StateViewProps {
  onNew?: () => void;
}

export const EmptyView = ({ message, onNew }: EmpyViewProps) => {
  return (
    <Empty className="border border-dashed bg-white">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpenIcon />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>No Item</EmptyTitle>
      {!!message && <EmptyDescription>{message}</EmptyDescription>}

      {!!onNew && (
        <EmptyContent>
          <Button onClick={onNew}>Add Item</Button>
        </EmptyContent>
      )}
    </Empty>
  );
};

interface EntityListsProps<T> {
  items: T[];
  className?: string;
  emptyView?: React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const EntityList = <T,>({
  items,
  className,
  emptyView,
  getKey,
  renderItem,
}: EntityListsProps<T>) => {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="mx-auto max-w-sm">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn(className, "flex flex-col gap-y-4")}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

interface EntityItemProps {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  action?: React.ReactNode;
  isRemoving: boolean;
  className: string;
  onRemove?: () => void | Promise<void>;
}

export function EntityItems({
  href,
  title,
  subtitle,
  image,
  action,
  isRemoving,
  className,
  onRemove,
}: EntityItemProps) {}
