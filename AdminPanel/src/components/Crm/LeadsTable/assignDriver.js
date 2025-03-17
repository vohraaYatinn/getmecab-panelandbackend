import React from "react";
import { Modal, Button,Table } from "react-bootstrap";
import useAxios from '@/network/useAxios';
import { getBiddingData ,assignDriver} from '@/urls/urls';
import { useEffect, useState } from "react";
import ActionSheet from "@/components/ActionSheet/ActionSheet";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
const AssignDriver = ({ show,onHide, bookingId,actionError,actionResponse,actionSubmit }) => {
  const [alert, setAlert] = useState({ message: "", variant: "" });

    const [
        biddingResponse,
        biddingError,
        biddingLoading,
        biddingFetch,
      ] = useAxios();
 const [isModalOpen,setIsModalOpen] = useState(false)
 const [driverId,setDriverId] = useState(null)
const actionConfirm=()=>{
  actionSubmit(assignDriver({booking_id:bookingId,driver_id:driverId}))
}

useEffect(()=>{
if(actionResponse && actionResponse['error']){
  setAlert({ message: actionResponse['error'], variant: "danger" });
  setIsModalOpen(false)
  setDriverId(null)

}
},[actionResponse])
useEffect(()=>{
  console.log(actionError['message'])
  if(actionError && actionError['message']){
    setAlert({ message: actionError['message'], variant: "danger" });
    setIsModalOpen(false)
    setDriverId(null)
  }
},[actionError])

    useEffect(()=>{
if(bookingId){
    console.log(bookingId)
biddingFetch(getBiddingData({booking_id:bookingId}))
}
    },[bookingId])
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Bidding</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <AlertMessage
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "" })}
      />
            <Table className="align-middle">
                <thead>
                  <tr>
               
                    <th scope="col">Name</th>
                    <th scope="col">Bidding Price</th>
                    <th scope="col">Trip Fare</th>
                    <th scope="col">Total Trip</th>
                    <th scope="col">Raiting</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                {biddingResponse &&
      biddingResponse.slice(0, 10).map((defaultValue, i) => (
        <tr key={i}>
        

          <td>
            <b>{defaultValue.driver.user?.first_name || "N/A"}</b><br/> {defaultValue.driver.user?.email || "N/A"}<br/> {defaultValue.driver.user?.phone_number || "N/A"}
          </td>

         


          <td className="text-body">
           <b>{defaultValue.bid_amount || "N/A"}</b> 
          
          </td>

      

          <td className="text-body">
            {(defaultValue.booking.fare) || "N/A"}
          </td>

 


          <td className="text-body">
            {`${defaultValue.driver.total_trip} ` || "N/A"}
          </td>
          <td className="text-body">
            {`${defaultValue?.driver?.total_score/defaultValue?.driver?.total_ratings}` || "N/A"}
          </td>



  

          <td>
            <div className="d-flex align-items-center gap-1">
              <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
             onClick={()=>{
              setDriverId(defaultValue?.driver?.id)
setIsModalOpen(true)
            }}>
                <span className="material-symbols-outlined fs-16 text-primary">
                  Edit
                </span>
              </button>



            </div>
          </td>
        </tr>
      ))}
  </tbody>
              </Table>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onClose}>
                    Confirm
                </Button>
            </Modal.Footer> */}
            <ActionSheet
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={actionConfirm}
                title="Confirm Deletion"
                message="Are you sure you want to delete this item?"
                alert={alert}
                loading={biddingLoading}
            />
        </Modal>
    );
};

export default AssignDriver;
