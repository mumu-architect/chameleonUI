import type {Accessor, Setter} from "solid-js";
import * as Dialog from "@solidiom/dialog";
import {JSX} from "@solidjs/web";

type ConfirmDialogProps = {
    open?: Accessor<boolean> | undefined
    setOpen?: Setter<boolean>;
    defaultOpen?: boolean;
    title: string;
    description?: string;
    // cancelText?: string;
    // confirmText?: string;
    // onConfirm: () => void;
    children?: JSX.Element;
    class?: string;
};

export function Q_Dialog(props: ConfirmDialogProps) {
    // const confirm=props.onConfirm
    // confirm()
    return (
            <Dialog.Root
                defaultOpen={props.defaultOpen ?? false}
                open={props.open}
                onOpenChange={(open) => {
                    props.setOpen?.(open);
                }
            }>
                {/*<Dialog.Trigger><div class="font-bold">Open dialog</div></Dialog.Trigger>*/}
                <Dialog.Portal>
                    <Dialog.Backdrop class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-150
                 data-[closed]:opacity-0 data-[open]:opacity-100"/>
                    <Dialog.Content  class={`fixed left-1/2 top-1/2 z-50 w-96 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl ${props.class}`}>
                        <Dialog.Title><div class="font-bold">{props.title}</div></Dialog.Title>
                        <Dialog.Description>{props.description}</Dialog.Description>
                        {props.children}
                        {/*<div class="flex justify-end gap-3 mt-6">*/}
                        {/*    <Dialog.Close><div class="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">Cancel</div></Dialog.Close>*/}
                        {/*    <Dialog.Close><div class="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">Confirm</div></Dialog.Close>*/}
                        {/*</div>*/}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
    );
}
