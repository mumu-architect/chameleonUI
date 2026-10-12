import {createSignal, ParentProps} from 'solid-js';
import {Q_Select} from "../components/Select";

// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function selectLayout(props: ParentProps) {
    const [selectVal, setSelectVal] = createSignal<string | undefined>();

    const selectOptions = [
        { value: "0", label: "Please choose" },
        { value: "scales", label: "Scales" },
        { value: "horns", label: "Horns1" },
        { value: "other", label: "Other Item" },
    ];
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Icon</h1>

            <h1 class="font-medium text-red-800 border-b"> Q_RadioGroup components</h1>
            <div class="flex flex-direction gap-12">
                <Q_Select
                    value={selectVal()}
                    onValueChange={(v) => {
                        console.log("onValueChange", v);
                        setSelectVal(v);
                    }}
                    options={selectOptions}
                    placeholder="请选择项目"
                    //自定义宽度
                    widthClass="w-40"
                />
                <Q_Select
                    value={selectVal()}
                    onValueChange={(v) => {
                        console.log("onValueChange", v);
                        setSelectVal(v);
                    }}
                    options={selectOptions}
                    placeholder="请选择项目"
                    //自定义宽度
                    widthClass="w-60"
                    color="green"
                />
            </div>
            <div class="flex flex-direction gap-12">
                <Q_Select
                    value={selectVal()}
                    onValueChange={(v) => {
                        console.log("onValueChange", v);
                        setSelectVal(v);
                    }}
                    options={selectOptions}
                    placeholder="请选择项目"
                    //自定义宽度
                    widthClass="w-60"
                    color="yellow"
                />
                <Q_Select
                    value={selectVal()}
                    onValueChange={(v) => {
                        console.log("onValueChange", v);
                        setSelectVal(v);
                    }}
                    options={selectOptions}
                    placeholder="请选择项目"
                    //自定义宽度
                    widthClass="w-60"
                    color="gray"
                />
            </div>
            <div class="flex flex-direction gap-12">
                <Q_Select
                    value={selectVal()}
                    onValueChange={(v) => {
                        console.log("onValueChange", v);
                        setSelectVal(v);
                    }}
                    options={selectOptions}
                    placeholder="请选择项目"
                    //自定义宽度
                    widthClass="w-60"
                    color="red"
                />
            </div>
        </main>
    );
}