import React from "react";
import { Modal, Button } from "react-bootstrap";
import AlertMessage from "../AlertMessage/AlertMessage";

const ActionSheet = ({ isOpen, onClose, onConfirm, title, message,alert,loading }) => {
    return (
        <>

        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <AlertMessage
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "" })}
      />
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm} disabled={loading}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};

export default ActionSheet;
