import components from "./components";
export const AFRAME: any = (window as any).AFRAME || {}

let registered: any = {}
export default async function gui() {
    if (registered['registered']) {
        return;
    }
    components();
    registered['registered'] = true;
}