import {createSignal, ParentProps} from 'solid-js';
import {Q_RadioGroup} from "../components/Radio";

// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function radioLayout(props: ParentProps) {
    const [values, setValues] = createSignal<any>("scales");

    const options = [
        { value: "scales", label: "Scales" },
        { value: "horns", label: "Horns1" },
        { value: "demo3", label: "Long Text Option Test" },
    ];
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Icon</h1>

            <h1 class="font-medium text-red-800 border-b"> Q_RadioGroup components</h1>
            <div class="flex flex-direction gap-12">
                <Q_RadioGroup
                    value={values()}
                    onValueChange={(v: any) => {
                        console.log("onValueChange", v);
                        setValues(v);
                    }}
                    options={options}
                    color="blue"
                />
                <Q_RadioGroup
                    value={values()}
                    onValueChange={(v: any) => {
                        console.log("onValueChange", v);
                        setValues(v);
                    }}
                    options={options}
                    color="green"
                />
            </div>
                <div class="flex flex-direction gap-12">
                <Q_RadioGroup
                    value={values()}
                    onValueChange={(v: any) => {
                        console.log("onValueChange", v);
                        setValues(v);
                    }}
                    options={options}
                    color="yellow"
                />
                <Q_RadioGroup
                    value={values()}
                    onValueChange={(v: any) => {
                        console.log("onValueChange", v);
                        setValues(v);
                    }}
                    options={options}
                    color="gray"
                />
                </div>
            <div class="flex flex-direction gap-12">
                <Q_RadioGroup
                    value={values()}
                    onValueChange={(v: any) => {
                        console.log("onValueChange", v);
                        setValues(v);
                    }}
                    options={options}
                    color="red"
                />
            </div>
        </main>
    );
}