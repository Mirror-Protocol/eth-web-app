import { FC } from "react"
import ReactModal from "react-modal"
import styles from "./Modal.module.scss"

ReactModal.setAppElement("#meth")

const Modal: FC<Modal> = ({ isOpen, close, children }) => (
  <ReactModal
    className={styles.modal}
    overlayClassName={styles.overlay}
    isOpen={isOpen}
    onRequestClose={close}
  >
    {children}
  </ReactModal>
)

export default Modal
