/* eslint-disable */
export class Urls {
    static API_PREFIX = '';
    static LOGIN = Urls.API_PREFIX + 'login/';
    static CHANGE_PASSWORD= Urls.API_PREFIX + 'change-password/'
    //booking manage
    static GET_BOOKINGS = Urls.API_PREFIX + 'fetch-all-booking/';
    static GET_BOOKINGS_ANALYTICS = Urls.API_PREFIX + 'fetch-all-booking-analytics/';
    static DELETE_BOOKING = Urls.API_PREFIX + 'delete-booking/';
    static CHANGE_BOOKING_STATUE = Urls.API_PREFIX + 'change-booking-status/';
    static DASHBOARD_DATA = Urls.API_PREFIX + 'admin-dashboard-data/';
    static PROFILE_DATA = Urls.API_PREFIX + 'admin-profile-data/';

    //drivers
    static GET_DRIVERS = Urls.API_PREFIX + 'fetch-all-drivers/';
    static ADD_DRIVERS = Urls.API_PREFIX + 'onboard-driver/';
    static DRIVER_UPDATE_SUBMIT = Urls.API_PREFIX + 'driver-update-submit/';
    static ASSIGN_DRIVER = Urls.API_PREFIX + 'assign-driver/';
    static DELETE_DRIVER = Urls.API_PREFIX + 'delete-driver/';
    //get all cabs
    static GET_ALL_CABS = Urls.API_PREFIX + 'fetch-all-cabs/';
    static ADD_CAB = Urls.API_PREFIX + 'add-cab/';
    static CAB_UPDATE_SUBMIT = Urls.API_PREFIX + 'cab-update-submit/';
    static DELETE_CAB = Urls.API_PREFIX + 'delete-cab/';
    static DELETE_REVIEW = Urls.API_PREFIX + 'delete-review/';
    static GET_BIDDING_DATA = Urls.API_PREFIX + 'view-bids/';

    //get all reviews
    static GET_ALL_REVIEWS = Urls.API_PREFIX + 'fetch-all-reviews/';

    //get all coupons
    static GET_ALL_COUPONS = Urls.API_PREFIX + 'fetch-all-coupons/';
    static ADD_COUPON = Urls.API_PREFIX + 'add-coupon/';
    static DELETE_COUPON = Urls.API_PREFIX + 'delete-coupon/';

    //vendor
    static CREATE_BOOKING = Urls.API_PREFIX + 'bookings/create/';

    // Vendor management
    static VENDOR_REQUESTS = Urls.API_PREFIX + 'vendor-requests/';
    static PENDING_VENDOR_REQUESTS = Urls.API_PREFIX + 'get-pending-vendors/';
    static VENDOR_REQUESTS_ACTION = Urls.API_PREFIX + 'vendor-requests-action/';
    static VENDORS = Urls.API_PREFIX + 'get-vendors/';
    static CREATE_VENDOR = Urls.API_PREFIX + 'create-vendors/';
    static CREATE_VENDOR_REQUEST = Urls.API_PREFIX + 'create-vendor-requests/';
    static BOOKING_SERVICE = Urls.API_PREFIX + 'create-booking/';
    static CITY_AUTOCOMPLETE = Urls.API_PREFIX + 'city-autocomplete/';
    static CALCULATE_KM = Urls.API_PREFIX + 'calculate-km/';



}
