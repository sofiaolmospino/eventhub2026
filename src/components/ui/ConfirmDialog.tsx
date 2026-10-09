import {Button} from "./Button.tsx";
import {Modal} from "./Modal.tsx";


type ConfirmDialogProps = {
    open: boolean;
    title: string;
    message: string;
    confirming?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmDialog(props: ConfirmDialogProps) {
    return (
        <Modal open={props.open} title={props.title} onClose={props.onCancel}>
            <p>{props.message}</p>
            <div className="modal__actions">
                <Button variant="secondary" onClick={props.onCancel}>Cancelar</Button>
                <Button variant="danger" loading={props.confirming} onClick={props.onConfirm}>
                    Eliminar
                </Button>
            </div>
        </Modal>
    );
}
