import Input from "./Input";
import Input2 from "./Input2";
import Password from "./Password";
import Textarea from "./Textarea";
import Textarea2 from "./Textarea2";

function FormControl(props) {
    const type = {
        "input" : <Input {...props} />,
        "input2" : <Input2 {...props} />,
        "textarea" : <Textarea {...props} />,
        "textarea2" : <Textarea2 {...props} />,
        "password" : <Password {...props} />,
    };
    return type[props.control] ?? "";
}

export default FormControl;