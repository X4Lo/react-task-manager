import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmButtonText?: string;
    cancelButtonText?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    onOpenChange,
    title,
    message,
    onConfirm,
    confirmButtonText = "Confirm",
    cancelButtonText = "Cancel",
}: ConfirmationDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-4 mt-4">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        {cancelButtonText}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        {confirmButtonText}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationDialog;