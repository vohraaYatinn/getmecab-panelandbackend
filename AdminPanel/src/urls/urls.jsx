/* eslint-disable */

import { HttpAxiosService } from './httpService';
import { Urls } from './constantsUrls.jsx';
import { test_url } from "../../src/config/environment.js"
import { BOOKING_URLS } from './constantsUrls';
import axios from 'axios';

const project = new HttpAxiosService(test_url);

//booking management
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
  return project.post(Urls.ADD_DRIVERS , payload_data);
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
  return project.post(Urls.ADD_CAB , payload_data);
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

export const BookingService = {
    createBooking: async (bookingData) => {
        try {
            const response = await axios.post(BOOKING_URLS.CREATE_BOOKING, bookingData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to create booking' };
        }
    },

    fetchAllBookings: async () => {
        try {
            const response = await axios.get(BOOKING_URLS.FETCH_ALL_BOOKINGS);
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to fetch bookings' };
        }
    },

    deleteBooking: async (id) => {
        try {
            const response = await axios.post(BOOKING_URLS.DELETE_BOOKING, { id });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to delete booking' };
        }
    },

    changeBookingStatus: async (id, status) => {
        try {
            const response = await axios.post(BOOKING_URLS.CHANGE_BOOKING_STATUS, { id, status });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to change booking status' };
        }
    }
};



