import {createMemo, createSignal, For, onCleanup, ParentProps} from 'solid-js';
import Q_Textarea from "../components/Textarea";

export default function textareaLayout(props: ParentProps) {

    const [msg, setMsg] = createSignal("");

    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Form</h1>

            <h1 class="font-medium text-red-800 border-b">Switch components</h1>

            <div class="flex flex-direction gap-12">
                <Q_Textarea
                    ariaLabel="Message"
                    value={msg()}
                    onChange={setMsg}
                    placeholder="Please enter content"
                    color="blue"
                />
            </div>
            <div class="flex flex-direction gap-12">
                <Q_Textarea
                    ariaLabel="Message"
                    value={msg()}
                    onChange={setMsg}
                    placeholder="Please enter content"
                    color="green"
                />
            </div>
            <div class="flex flex-direction gap-12">
                <Q_Textarea
                    ariaLabel="Message"
                    value={msg()}
                    onChange={setMsg}
                    placeholder="Please enter content"
                    color="yellow"
                />
            </div>
            <div class="flex flex-direction gap-12">
                <Q_Textarea
                    ariaLabel="Message"
                    value={msg()}
                    onChange={setMsg}
                    placeholder="Please enter content"
                    color="gray"
                />
            </div>
            <div class="flex flex-direction gap-12">
                <Q_Textarea
                    ariaLabel="Message"
                    value={msg()}
                    onChange={setMsg}
                    placeholder="Please enter content"
                    color="red"
                />
            </div>
        </main>
);
}