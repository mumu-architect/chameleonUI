import * as Toast from "@solidiom/toast"
import {createEffect, type ParentProps} from "solid-js"
import {Q_Toast} from "../components/Toast";

export default function toastLayout(props: ParentProps) {
    const toaster = Toast.createToaster({ max: 5, defaultDuration: 1000 })
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Icon</h1>
            <h1 class="font-medium text-red-800 border-b"> Q_Toast components</h1>
            <div >
                <button class="font-bold"
                    onClick={() =>
                        toaster.toast({
                            title: "Saved",
                            description: "Your changes have been saved.",
                        })
                    }
                >
                    Show toast
                </button>
            </div>

            <div>

                {/* 放在根最外层，全局只渲染一次 */}
                {/*<Q_Toast toaster={toaster} color={"blue"} />*/}
                {/*<Q_Toast toaster={toaster} color={"green"} />*/}
                {/*<Q_Toast toaster={toaster} color={"yellow"} />*/}
                {/*<Q_Toast toaster={toaster} color={"gray"} />*/}
                <Q_Toast toaster={toaster} color={"red"} position={"top-right"} />
                {/* 测试按钮 */}
                <button class="font-bold"
                    onClick={() => {
                        toaster.toast({
                            title: "Operation successful",
                            description: "Data saved!",
                        });
                    }}
                >
                    Show Toast
                </button>
            </div>

        </main>
    );
}
