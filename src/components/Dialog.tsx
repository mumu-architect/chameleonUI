import type {Accessor, Setter} from "solid-js";
import * as Dialog from "@solidiom/dialog";
import {JSX} from "@solidjs/web";
import {Q_Col, Q_Row} from "./Layout";
import {Icon} from "@iconify-icon/solid";
import {Q_Button} from "./Button";

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
                } }
            >
                {/*<Dialog.Trigger><div class="font-bold">Open dialog</div></Dialog.Trigger>*/}
                <Dialog.Portal>
                    <Dialog.Backdrop class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-150
                 data-[closed]:opacity-0 data-[open]:opacity-100"/>
                    <Dialog.Content  class={`fixed pt-6 left-1/2 top-1/2 z-50 w-96 -translate-x-1/2 -translate-y-1/2 bg-white  rounded-lg shadow-xl ${props.class}`}>
                        <Dialog.Title>
                            <div class="font-bold mb-3 border-b-1 pl-3 pe-3 ">
                            <Q_Row>
                                <Q_Col span={20}>{props.title}</Q_Col>
                                <Q_Col span={4}><div class={"text-end justify-center"} onClick={() => props.setOpen?.(false)}><Icon  icon="ant-design:close-circle-twotone"  width="28" height="28"/></div></Q_Col>
                            </Q_Row>
                            </div>
                        </Dialog.Title>
                        <Dialog.Description class={props.description?"pl-5 pe-5":"disabled"}>{props.description}</Dialog.Description>
                        <div class="pt-3 pb-3 pl-5 pe-5">
                        {props.children}
                        </div>
                        {/*<div class="flex justify-end gap-3 mt-6">*/}
                        {/*    <Q_Button type={"button"} variant="danger"  onClick={() => setOpenDialog(false)}>Cancel</Q_Button>*/}
                        {/*    <Q_Button type={"submit"} variant="danger" >Submit</Q_Button>*/}
                        {/*    <Dialog.Close><div class="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">Cancel</div></Dialog.Close>*/}
                        {/*    <Dialog.Close><div class="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">Confirm</div></Dialog.Close>*/}
                        {/*</div>*/}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
    );
}
