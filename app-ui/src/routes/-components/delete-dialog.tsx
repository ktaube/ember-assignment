import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTRPC } from "@/trpc-client";
import { useMutation } from "@tanstack/react-query";

interface DeleteDialogProps {
  id: number | null;
  onClose: () => void;
  title?: string;
  description?: string;
}

export function DeleteDialog({
  id,
  onClose,
  title = "Are you sure?",
  description = "This action cannot be undone. This will permanently delete this item.",
}: DeleteDialogProps) {
  const trpc = useTRPC();

  const deleteItem = useMutation(
    trpc.addresses.deleteAddress.mutationOptions()
  );

  const onDelete = () => {
    if (!id) return;
    deleteItem.mutate({ id });
  };

  return (
    <AlertDialog open={!!id} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={onDelete}
            disabled={deleteItem.isPending}
          >
            {deleteItem.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
