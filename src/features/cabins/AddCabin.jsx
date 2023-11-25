import Button from "../../ui/Button";
import CreateEditCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateEditCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
