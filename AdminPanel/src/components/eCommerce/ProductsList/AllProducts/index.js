"use client";

import { Table } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";
import SearchForm from "../SearchForm";
import { useState, useEffect } from 'react';
import EditCab from "./EditCab";
import ActionSheet from "@/components/ActionSheet/ActionSheet";
import {test_url_images } from "../../../../config/environment"
import { deleteCab } from "@/urls/urls";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import useAxios from "@/network/useAxios";


const AllProducts = (data,setFetchNew) => {
//  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [isModalOpenAction, setIsModalOpenAction] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleMessage, setTitleMessage] = useState({title:'', message:''});
  const [cabId, setCabId] = useState(null);
  const [formData, setFormData] = useState({
    id:'',
    cab_number: "",
    cab_name: "",
    cab_type: "SUV",
    price_per_km: "",
    is_available: true,
  });
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [Select_driver_id,setSelect_driver_id] = useState(null)
  const [cabDeleteRespnse,cabDeleteError,cabDeleteLoading,cabDeleteSubmit] = useAxios();
  const actionConfirm = () =>{
    cabDeleteSubmit(deleteCab({id:Select_driver_id}))
  }
  useEffect(()=>{
    if(cabDeleteRespnse['result'] == 'success'){
      setAlert({ message: cabDeleteRespnse['result'], variant: "success" });
      setIsModalOpenAction(false);
      setSelect_driver_id(null)
      setFetchNew(true)
    }
  },[cabDeleteRespnse])
  useEffect(()=>{
    if(cabDeleteError && cabDeleteError['message']){
      setAlert({ message: cabDeleteError['message'], variant: "danger" });
      setIsModalOpenAction(false);
    }
  },[cabDeleteError])
  useEffect(()=>{
    console.log("console",tableData)
  },[tableData])
  useEffect(() => {
    if (data) {
      setTableData(data.data || []);
      setTotalPages(data.total_pages || 1);
      setTotalItems(data.count || 0);
      setCurrentPage(data.current_page || 1);
    }
  }, [data]);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchData(newPage);
    }
  };




  const openModal = (value) => {
    setFormData(value);
    setShowModal(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
          <AlertMessage
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "" })}
      />
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-lg-4 mb-3">
       

        <Link
          href="/cabs/create-cab/"
          className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
        >
          <span className="py-sm-1 d-block">
            <i className="ri-add-line d-none d-sm-inline-block fs-18"></i>
            <span>Add Cab</span>
          </span>
        </Link>
      </div>
      <div className="default-table-area all-products">
        <div className="table-responsive">
          <Table className="align-middle">
            <thead>
              <tr>
                <th scope="col">ID</th> 
                <th scope="col">Cab Image</th>
                <th scope="col">Cab Number</th>
                <th scope="col">Cab Name</th>
                <th scope="col">Cab Type</th>
                <th scope="col">Price Per Km</th>
                <th scope="col">Availability</th>
                <th scope="col">Timestamp</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {tableData && tableData?.data?.map((value, i) => (
                <tr key={i}>
                  <td>{value.id}</td>
                  <td>
            <img
              src={`${test_url_images}${value.photo}`}  // Assuming 'photo' contains the image URL
            alt="Vehicle"
            style={{ width: "80px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
          />
        </td>
                  <td>{value.cab_number}</td>
                  <td>{value.cab_name}</td>
                  <td>{value.cab_type}</td>
                  <td>{value.price_per_km} ₹</td>
                  <td>
                    <span
                      className={`badge bg-opacity-10 p-2 fs-12 fw-normal text-capitalize ${
                        value.is_available ? "text-success" : "text-danger"
                      }`}
                    >
                      {value.is_available ? "Available" : "Not Available"}
                    </span>
                  </td>
                  <td>{new Date(value.timestamp).toLocaleString()}</td>
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      {/* <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                        <span className="material-symbols-outlined fs-16 text-primary">
                          visibility
                        </span>
                      </button> */}

                      <button
                        className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                        onClick={() => {
                          openModal(value);
                          setTitleMessage({
                            title: 'Edit Cab',
                            message: "Are you sure you want to edit this cab detail?"
                          });
                        }}
                      >
                        <span className="material-symbols-outlined fs-16 text-body">
                          edit
                        </span>
                      </button>


                      <button
                        className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                        onClick={() => {
                          setIsModalOpenAction(true);
                          setSelect_driver_id(value.id)
                          setTitleMessage({
                            title: 'Delete Cab',
                            message: "Are you sure you want to delete this cab ?"
                          });
                        }}
                      >
                        <span className="material-symbols-outlined fs-16 text-body">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />

      {showModal && (
        <EditCab
          show={showModal}
          handleClose={() => setShowModal(false)}
          formData={formData}
          setFormData={setFormData}
          setAlert={setAlert} 
          alert={alert}
        />
        
      )}
            <ActionSheet
                isOpen={isModalOpenAction}
                onClose={() => setIsModalOpenAction(false)}
                onConfirm={actionConfirm}
                title="Edit Cab"
                message="Are you sure you want to edit cab detail?"
                alert={alert}
                loading={cabDeleteLoading}
            />
    </>
  );
};

export default AllProducts;
