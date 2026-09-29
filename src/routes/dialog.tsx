import {createSignal, ParentProps} from "solid-js";
import * as Dialog from "@solidiom/dialog"
import * as AlertDialog from "@solidiom/alert-dialog"
import {Q_AlertDialog} from "../components/AlterDialog";

export default function dialogLayout(props: ParentProps) {
    const [open, setOpen] = createSignal(false);

    const handleDelete = () => {
        console.log("Account deleted");
        setOpen(false);
    };
    return (
        <main class="flex-1 overflow-auto p-6 border-t-0 border ">
            <h1>Dialog</h1>
            <div>
                <Dialog.Root>
                    <Dialog.Trigger><div class="font-bold">Open dialog</div></Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Backdrop class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-150
                 data-[closed]:opacity-0 data-[open]:opacity-100"/>
                        <Dialog.Content  class="fixed left-1/2 top-1/2 z-50 w-96 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl">
                            <Dialog.Title><div class="font-bold">Dialog title</div></Dialog.Title>
                            <Dialog.Description>Explain the decision or next step.</Dialog.Description>
                            <div class="flex justify-end gap-3 mt-6">
                                <Dialog.Close><div class="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">Cancel</div></Dialog.Close>
                                <Dialog.Close><div class="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">Confirm</div></Dialog.Close>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
            <div>
                <AlertDialog.Root defaultOpen={false} onOpenChange={(open) => console.log(open)}>
                    <AlertDialog.Trigger><div class="font-bold">Delete Account</div></AlertDialog.Trigger>

                    <AlertDialog.Portal>
                        <AlertDialog.Content class="fixed left-1/2 top-1/2 z-50 w-96 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl">
                            <AlertDialog.Title><div class="font-bold">Delete your account?</div></AlertDialog.Title>
                            <AlertDialog.Description>
                                This action cannot be undone. All your data will be permanently removed.
                            </AlertDialog.Description>

                            <div class="flex justify-end gap-3">
                                <AlertDialog.Cancel>
                                    <div class="px-3 py-1.5 border rounded hover:bg-gray-100">Cancel</div>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action  onAction={() => console.log("Account deleted")}>
                                    <div class="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">Delete</div>
                                </AlertDialog.Action>
                            </div>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            </div>
            <h1 class="font-medium text-red-800 border-b"> Q_AlertDialog components</h1>
            <div>
                <AlertDialog.Root open={open} onOpenChange={setOpen}>
                    <AlertDialog.Trigger>
                        <div class="font-bold cursor-pointer">Delete Account</div>
                    </AlertDialog.Trigger>

                    <Q_AlertDialog
                        open={open}
                        setOpen={setOpen}
                        title="Delete your account?"
                        description="This action cannot be undone. All your data will be permanently removed."
                        confirmText="Delete"
                        cancelText="Cancel"
                        onConfirm={handleDelete}
                    />
                </AlertDialog.Root>
            </div>
        </main>
    );
}
