"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2, Loader2 } from "lucide-react";

interface ConfirmDeleteProps {
  title?: string;
  description?: string;
  onConfirm: () => Promise<void> | void;
  triggerLabel?: string;
  triggerIconOnly?: boolean;
}

export function ConfirmDelete({
  title = "Konfirmasi Hapus Data",
  description = "Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.",
  onConfirm,
  triggerLabel = "Hapus",
  triggerIconOnly = false,
}: ConfirmDeleteProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {triggerIconOnly ? (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-stone-400 hover:text-crimson-400 hover:bg-crimson-600/15 rounded-md"
            title={triggerLabel}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="h-8 gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{triggerLabel}</span>
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span>Menghapus...</span>
              </>
            ) : (
              <span>Ya, Hapus Data</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
