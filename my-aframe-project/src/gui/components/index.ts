import modelViewer from "./model-loader";
import modelItem from "./model-item";
import shipPart from "./ship-part";
import ship from "./ship";
export default function () {
    ship();
    shipPart();
    modelViewer();
    modelItem();
}