import { useModalOperation } from "../../utils/component-utils/modalOperation";
import Button from "./Button"

export default function PanelWrapper() {
    const foo = useModalOperation();
    
    return (
        <div>
            <h1>Minecraft Creative Studio v0.0.1.1</h1>
            <Button onClick={() => foo("Hello World", 0)}>Feature Toggle</Button>
        </div>
    );
}