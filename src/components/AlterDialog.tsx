import * as AlertDialog  from "@solidiom/alert-dialog";
import type { Accessor, Setter } from "solid-js";

type ConfirmDialogProps = {
    open?: Accessor<boolean> | undefined
    setOpen?: Setter<boolean>;
    defaultOpen?: boolean;
    title: string;
    description: string;
    cancelText?: string;
    confirmText?: string;
    onConfirm: () => void;
};

export function Q_AlertDialog(props: ConfirmDialogProps) {
    return (
        <AlertDialog.Root
            defaultOpen={props.defaultOpen ?? false}
            open={props.open}
            onOpenChange={(open) => {
                props.setOpen?.(open);
            }}
        >
            {/* Trigger不写在组件内部，外部自己放触发按钮 */}
            <AlertDialog.Portal>
                <AlertDialog.Content class="fixed left-1/2 top-1/2 z-50 w-96 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl">
                    <AlertDialog.Title>
                        <div class="font-bold text-lg">{props.title}</div>
                    </AlertDialog.Title>

                    <AlertDialog.Description class="mt-2 text-gray-600 text-sm">
                        {props.description}
                    </AlertDialog.Description>

                    <div class="flex justify-end gap-3 mt-6">
                        <AlertDialog.Cancel>
                            <div class="px-3 py-1.5 border rounded hover:bg-gray-100">
                                {props.cancelText ?? "Cancel"}
                            </div>
                        </AlertDialog.Cancel>

                        <AlertDialog.Action onAction={props.onConfirm}>
                            <div class="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">
                                {props.confirmText ?? "Delete"}
                            </div>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}
