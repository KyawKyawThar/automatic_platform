"use client";

import { NodeToolbar, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Settings2Icon, Trash2Icon } from "lucide-react";

interface WorkflowNodeProps {
  children: React.ReactNode;
  showToolbar?: boolean;
  name?: string;
  description?: string;
  onDelete?: () => void;
  onSettings?: () => void;
}

export function WorkflowNode({
  children,
  showToolbar = true,
  name,
  description,
  onDelete,
  onSettings,
}: WorkflowNodeProps) {
  return (
    <>
      {showToolbar && (
        <NodeToolbar>
          <Button size="sm" variant="ghost" onClick={onSettings}>
            <Settings2Icon className="size-4" />
          </Button>

          <Button size="sm" variant="ghost" onClick={onDelete}>
            <Trash2Icon className="size-4" />
          </Button>
        </NodeToolbar>
      )}
      {children}

      {name && (
        <NodeToolbar
          position={Position.Bottom}
          isVisible
          className="text-center max-w-[200px]">
          <p className="font-medium">{name}</p>

          {description && (
            <p className="text-muted-foreground truncate text-sm">
              {description}
            </p>
          )}
        </NodeToolbar>
      )}
    </>
  );
}
