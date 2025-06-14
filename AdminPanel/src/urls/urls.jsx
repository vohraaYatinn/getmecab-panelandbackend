/* eslint-disable */

import { HttpAxiosService } from './httpService';
import { Urls } from './constantsUrls.jsx';
import { test_url } from "../../src/config/environment.js"

const project = new HttpAxiosService(test_url);

export const login = (payload_data) => {
  return project.post(Urls.LOGIN , payload_data);
};
export const changePassword = (payload_data) => {
  return project.post(Urls.CHANGE_PASSWORD , payload_data);
};
export const getBookingsAdmin = (payload_data) => {
  return project.get(Urls.GET_BOOKINGS , payload_data);
};
export const getBookingsAdminAnalytics = (payload_data) => {
  return project.get(Urls.GET_BOOKINGS_ANALYTICS , payload_data);
};
export const getDriversAdmin = (payload_data) => {
  return project.get(Urls.GET_DRIVERS , payload_data);
};
export const getAllCabs = (payload_data) => {
  return project.get(Urls.GET_ALL_CABS , payload_data);
};
export const getBiddingData = (payload_data) => {
  return project.get(Urls.GET_BIDDING_DATA , payload_data);
};
export const getAllReviews = (payload_data) => {
  return project.get(Urls.GET_ALL_REVIEWS , payload_data);
};
export const getAllCoupons = (payload_data) => {
  return project.get(Urls.GET_ALL_COUPONS , payload_data);
};
export const addDriverAdmin = (payload_data) => {
  return project.multiPartFormData(Urls.ADD_DRIVERS , payload_data);
};
export const driverUpdateSubmitService = (payload_data) => {
  return project.post(Urls.DRIVER_UPDATE_SUBMIT , payload_data);
};
export const assignDriver = (payload_data) => {
  return project.post(Urls.ASSIGN_DRIVER , payload_data);
};
export const cabUpdateSubmit = (payload_data) => {
  return project.post(Urls.CAB_UPDATE_SUBMIT , payload_data);
};
export const addCouponAdmin = (payload_data) => {
  return project.post(Urls.ADD_COUPON , payload_data);
};
export const addCabAdmin = (payload_data) => {
  return project.multiPartFormData(Urls.ADD_CAB , payload_data);
};
export const deleteBooking = (payload_data) => {
  return project.post(Urls.DELETE_BOOKING , payload_data);
};
export const deleteCoupon = (payload_data) => {
  return project.post(Urls.DELETE_COUPON , payload_data);
};
export const changeBookingStatus = (payload_data) => {
  return project.post(Urls.CHANGE_BOOKING_STATUE , payload_data);
};

export const deleteDriver = (payload_data) => {
  return project.post(Urls.DELETE_DRIVER , payload_data);
};
export const deleteCab = (payload_data) => {
  return project.post(Urls.DELETE_CAB , payload_data);
};
export const deleteReview = (payload_data) => {
  return project.post(Urls.DELETE_REVIEW , payload_data);
};
export const getDashboardData = (payload_data) => {
  return project.get(Urls.DASHBOARD_DATA , payload_data);
};
export const getProfileData = (payload_data) => {
  return project.get(Urls.PROFILE_DATA , payload_data);
};
export const getVendors = (payload_data) => {
  return project.get(Urls.VENDORS, payload_data);
};

export const createVendor = (payload_data) => {
  return project.post(Urls.CREATE_VENDOR, payload_data);
};

export const createVendorRequest = (payload_data) => {
  return project.post(Urls.CREATE_VENDOR_REQUEST, payload_data);
};

export const getVendorRequests = (payload_data) => {
  return project.get(Urls.VENDOR_REQUESTS, payload_data);
};
export const getPendingVendorRequests = (payload_data) => {
  return project.get(Urls.PENDING_VENDOR_REQUESTS, payload_data);
};

export const vendorRequestAction = (payload_data) => {
  return project.post(Urls.VENDOR_REQUESTS_ACTION, payload_data);
}
export const cityAutocomplete = (payload_data) => {
  return project.get(Urls.CITY_AUTOCOMPLETE, payload_data);
}
export const calculateKmService = (payload_data) => {
  return project.get(Urls.CALCULATE_KM, payload_data);
}
export const bookingService = (payload_data) => {
  return project.post(Urls.BOOKING_SERVICE , payload_data);
}


