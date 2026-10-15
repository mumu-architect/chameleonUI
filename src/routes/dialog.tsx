import {createSignal, ParentProps} from "solid-js";
import * as Dialog from "@solidiom/dialog"
import * as AlertDialog from "@solidiom/alert-dialog"
import {Q_AlertDialog} from "../components/AlterDialog";
import {Q_Dialog} from "../components/Dialog";
import {Q_Input} from "../components/Input";
import {Q_Button} from "../components/Button";
import {Q_Col, Q_Row} from "../components/Layout";
import {Q_RadioGroup} from "../components/Radio";
import {Q_CheckboxGroup} from "../components/Checkbox";

export default function dialogLayout(props: ParentProps) {
    const [open, setOpen] = createSignal(false);

    const handleDelete = () => {
        console.log("Account deleted");
        setOpen(false);
    };


    const [openDialog, setOpenDialog] = createSignal(false);

    // 表单字段signal
    const [userName, setUserName] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [gender, setGender] = createSignal<any>("1");

    const genderOptions = [
        { value: "1", label: "Male " },
        { value: "2", label: "Female" },
    ];
    const [hobby, setHobby] = createSignal<string[]>([]);
    const hobbyOptions = [
        { value: "1", label: "Male " },
        { value: "2", label: "Female" },
        { value: "3", label: "Female" },
        { value: "4", label: "Female" },
        { value: "5", label: "Female" },
        { value: "6", label: "Female" },
        { value: "7", label: "Female" },
    ];
    const handleSubmit=()=>{
        console.log("Account deleted");
        const formData = {
            userName: userName(),
            password: password(),
            gender:gender(),
            hobby:hobby(),
        };
        console.log(formData);
        //提交数据到服务器端
        setOpen(false);
        return false
    }
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Dialog</h1>
            <h1 class="font-medium text-red-800 border-b"> Dialog</h1>
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
            <h1 class="font-medium text-red-800 border-b"> AlertDialog</h1>
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
            <h1 class="font-medium text-red-800 border-b"> Q_Dialog components</h1>
            <div>
                <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
                    <Dialog.Trigger>
                        <div class="font-bold cursor-pointer">Open Dialog</div>
                    </Dialog.Trigger>

                    <Q_Dialog
                        open={openDialog}
                        setOpen={setOpenDialog}
                        title="Delete your account?"
                        description="This action cannot be undone. All your data will be permanently removed."
                        class={"w-[720px] max-w-[92vw] max-h-[85vh]"}
                    >
                        <form onSubmit={handleSubmit}>
                            <Q_Row class="mb-3">
                                <Q_Col span={6}>
                                    <label for={"userName"}>UserName:</label>
                                </Q_Col>
                                <Q_Col span={18} >
                                    <Q_Input id={"userName"}  name={"userName"} type={"text"} value={userName()} onChangeValue={(val) => setUserName(val)} required={true} placeholder={"userName"}></Q_Input>
                                </Q_Col>
                            </Q_Row>
                            <Q_Row class="mb-3">
                                <Q_Col span={6}>
                                    <label for={"password"}>Password:</label>
                                </Q_Col>
                                <Q_Col span={18} >
                                    <Q_Input id={"password"} name={"password"} type={"password"} value={password()} onChangeValue={(val) => setPassword(val)} required={true} placeholder={"password"}></Q_Input>
                                </Q_Col>
                            </Q_Row>
                            <Q_Row class="mb-3">
                                <Q_Col span={6}>
                                    <label for={"gender"}>Gender:</label>
                                </Q_Col>
                                <Q_Col span={18} >
                                    <Q_RadioGroup
                                        value={gender()}
                                        onValueChange={(v: any) => {
                                            console.log("onValueChange", v);
                                            setGender(v);
                                        }}
                                        options={genderOptions}
                                        color="blue"
                                    />
                                </Q_Col>
                            </Q_Row>
                            <Q_Row class="mb-3">
                                <Q_Col span={6}>
                                    <label for={"hobby"}>Hobby:</label>
                                </Q_Col>
                                <Q_Col span={18} >
                                    <Q_CheckboxGroup
                                        value={hobby()}
                                        onValueChange={(v) => {
                                            console.log("onValueChange", v);
                                            setHobby(v);
                                        }}
                                        options={hobbyOptions}
                                        color="blue"
                                    />
                                </Q_Col>
                            </Q_Row>
                            <div class="flex justify-end gap-3 mt-6">
                            <Q_Button type={"button"} variant="danger"  onClick={() => setOpenDialog(false)}>Cancel</Q_Button>
                            <Q_Button type={"submit"} variant="danger" >Submit</Q_Button>
                            </div>
                        </form>
                    </Q_Dialog>
                </Dialog.Root>
            </div>
        </main>
    );
}
