import type { ParentProps } from 'solid-js';
import {Icon} from "@iconify-icon/solid";

// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function dashboardLayout(props: ParentProps) {
    const img={
        imgUrl:"./image/man.jpg",
        imgAlt: "me"
    }
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Dashboard</h1>
            <div class=" min-h-screen p-3 font-inter">
                <div class="mx-auto max-w-full">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div class="bg-white rounded-xl p-5 border border-slate-200 card-shadow hover:shadow-md transition-shadow duration-200">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-700">
                                    <Icon icon="ic:sharp-family-restroom" width="50" />
                                </div>
                                <div>
                                    <p class="text-slate-500 text-sm mb-1">User count:</p>
                                    <p class="text-2xl font-bold text-slate-800">30000 people</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-5 border border-slate-200 card-shadow hover:shadow-md transition-shadow duration-200">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-700">
                                    <Icon icon="iconmind:active-users-duotone-bold" width="50" />
                                </div>
                                <div>
                                    <p class="text-slate-500 text-sm mb-1">Daily Active Users:</p>
                                    <p class="text-2xl font-bold text-slate-800">300 people</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-5 border border-slate-200 card-shadow hover:shadow-md transition-shadow duration-200">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-700">
                                    <Icon icon="pinhead:person-driving-motorboat-on-water" width="50" />
                                </div>
                                <div>
                                    <p class="text-slate-500 text-sm mb-1">Weekly Active User:</p>
                                    <p class="text-2xl font-bold text-slate-800">30000 people</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-5 border border-slate-200 card-shadow hover:shadow-md transition-shadow duration-200">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-700">
                                    <Icon icon="pinhead:person-boarding-steam-train-on-railway-track" width="50" />
                                </div>
                                <div>
                                    <p class="text-slate-500 text-sm mb-1">Monthly Active User:</p>
                                    <p class="text-2xl font-bold text-slate-800">300 people</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        <div class="bg-white rounded-xl p-6 border border-slate-200 card-shadow hover:shadow-md transition-shadow duration-200">
                            <div class="h-56 w-full bg-slate-50 rounded-lg flex items-end justify-around px-4 py-6">
                                <div class="w-8 bg-slate-300 rounded-t-md h-20"></div>
                                <div class="w-8 bg-slate-400 rounded-t-md h-36"></div>
                                <div class="w-8 bg-slate-500 rounded-t-md h-44"></div>
                                <div class="w-8 bg-slate-400 rounded-t-md h-28"></div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-6 border border-slate-200 card-shadow hover:shadow-md transition-shadow duration-200">
                            <div class="h-56 w-full bg-slate-50 rounded-lg flex items-center justify-center">
                                <div class="w-40 h-40 rounded-full border-[12px] border-slate-300 relative">
                                    <div class="absolute inset-0 rounded-full border-[12px] border-slate-600 border-l-transparent border-b-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div  class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">

                        <div class="bg-white rounded-xl p-6 border border-slate-200 card-shadow hover:shadow-md transition-shadow duration-200">
                            <div class="flex gap-6 mb-8">
                                <div class="w-60 h-60 rounded-lg overflow-hidden bg-slate-100 shadow-sm">
                                    <img src={img.imgUrl} alt={img.imgAlt} class="w-full h-full object-cover"/>
                                </div>
                                <div class="flex-1 flex flex-col justify-between py-1">
                                    <p class="text-slate-700 pb-1 border-b border-slate-200">Full name: Wang Wei</p>
                                    <p class="text-slate-700 pb-1 border-b border-slate-200">Wechat: mumuago</p>
                                    <p class="text-slate-700 pb-1 border-b border-slate-200">Email: 1211884772@qq.com</p>
                                    <p class="text-slate-700 pb-1 border-b border-slate-200">Introduction: I have a great passion for software technology.I enjoy reading various books.</p>
                                </div>
                            </div>
                            <div class="space-y-5">
                                <div class="flex items-center gap-3">
                                    <span class="text-slate-800 font-medium w-7">1.</span>
                                    <div class="flex-1 border-b border-slate-300"></div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-slate-800 font-medium w-7">2.</span>
                                    <div class="flex-1 border-b border-slate-300">I have a product called  "Chameleon-UI" front-end UI framework.</div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-slate-800 font-medium w-7">3.</span>
                                    <div class="flex-1 border-b border-slate-300">I have the QPHP MVC framework product.</div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-slate-800 font-medium w-7">4.</span>
                                    <div class="flex-1 border-b border-slate-300">I have the QFS distributed file storage system product.</div>
                                </div>
                            </div>
                        </div>


                        <div class="bg-white rounded-xl p-6 border border-slate-200 card-shadow hover:shadow-md transition-shadow duration-200">

                            <div class="flex gap-6 mb-8">
                                <div class="w-60 h-60 rounded-lg overflow-hidden bg-slate-100 shadow-sm">
                                    <img src={img.imgUrl} alt={img.imgAlt} class="w-full h-full object-cover"/>
                                </div>
                                <div class="flex-1 flex flex-col justify-between py-1">
                                    <p class="text-slate-700 pb-1 border-b border-slate-200">Full name: Wang Wei</p>
                                    <p class="text-slate-700 pb-1 border-b border-slate-200">Wechat: mumuago</p>
                                    <p class="text-slate-700 pb-1 border-b border-slate-200">Email: 1211884772@qq.com</p>
                                    <p class="text-slate-700 pb-1 border-b border-slate-200">Introduction: I have a great passion for software technology.I enjoy reading various books.</p>
                                </div>
                            </div>
                            <div class="space-y-5">
                                <div class="flex items-center gap-3">
                                    <span class="text-slate-800 font-medium w-7">1.</span>
                                    <div class="flex-1 border-b border-slate-300">I have a great passion for software technology.I enjoy reading various books.</div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-slate-800 font-medium w-7">2.</span>
                                    <div class="flex-1 border-b border-slate-300">I have a product called  "Chameleon-UI" front-end UI framework.</div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-slate-800 font-medium w-7">3.</span>
                                    <div class="flex-1 border-b border-slate-300">I have the QPHP MVC framework product.</div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-slate-800 font-medium w-7">4.</span>
                                    <div class="flex-1 border-b border-slate-300">I have the QFS distributed file storage system product.</div>
                                </div>
                            </div>
                        </div>

                </div>
            </div>

        </main>
    );
}