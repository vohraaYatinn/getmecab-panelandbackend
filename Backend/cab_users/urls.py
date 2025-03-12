from django.urls import path
from .views import SignupView, LoginView, UserDetailView, CabAvailabilityView, BookCabView, CancelBookingView, \
    BookingListView, AvailableBookingsView, PlaceBidView, DriverOnboardingView, AdminViewBids, AssignDriverView, \
    DriverTripCompletionView, DriverPaymentOverviewView, DriverTripSummaryView, AddCabView, AdminPaymentOverviewView, \
    RateDriverAPIView, DriverRatingsAPIView, GetAutoComplete, ApplyCouponAPIView, CheckCouponAPIView, MyBookingAPIView, \
    PhoneOtp, PhoneOtpVerify, signupUser, fetchAllBookings, fetchAllDrivers, fetchAllCabs, fetchAllReviews, \
    fetchAllCoupons, fetchAllBookingsAnalytics, AddCoupon, deleteBookings, deleteCoupon, changeBookingStatus, \
    DriverUpdate, CabUpdate, DeleteDriver, DeleteCab, CreateBookingView, VendorRequestView, VendorRequestActionView, \
    VendorListView, CreateVendorView, VendorBookingListView

urlpatterns = [
    #users
    path("signup/", SignupView.as_view()),
    path("login/", LoginView.as_view()),
    path("user/", UserDetailView.as_view()),
    
    path("cab-availability/", CabAvailabilityView.as_view()),
    path("create-booking/", BookCabView.as_view()),
    path("cancel-booking/", CancelBookingView.as_view()),
    path("bookings/", BookingListView.as_view()),
    path("city-autocomplete",GetAutoComplete.as_view()),
    path("apply-coupon/",ApplyCouponAPIView.as_view()),
    path("check-coupon/",CheckCouponAPIView.as_view()),
    path("fetch-all-booking/",fetchAllBookings.as_view()),
    path("delete-booking/",deleteBookings.as_view()),
    path("delete-coupon/",deleteCoupon.as_view()),
    path("change-booking-status/",changeBookingStatus.as_view()),


    path("fetch-all-booking-analytics/",fetchAllBookingsAnalytics.as_view()),
    path("fetch-all-drivers/",fetchAllDrivers.as_view()),
    path("my-booking/",MyBookingAPIView.as_view()),
    path("fetch-all-cabs/",fetchAllCabs.as_view()),
    path("fetch-all-reviews/",fetchAllReviews.as_view()),
    path("fetch-all-coupons/",fetchAllCoupons.as_view()),

    #driver
    path("available-bookings/", AvailableBookingsView.as_view()),
    path("place-bid/", PlaceBidView.as_view()),
    path("complete-trip/", DriverTripCompletionView.as_view()),
    path("trip-summary/", DriverTripSummaryView.as_view()),
    path("driver-payment-overview/", DriverPaymentOverviewView.as_view()),
    path("rate-driver/",RateDriverAPIView.as_view()),
    path("driver-rateing/",DriverRatingsAPIView.as_view()),
    path("otp-send/",PhoneOtp.as_view()),
    path("otp-verify/",PhoneOtpVerify.as_view()),
    path("signup-user/",signupUser.as_view()),
    path("driver-update-submit/",DriverUpdate.as_view()),
    path("cab-update-submit/",CabUpdate.as_view()),
    path("delete-driver/",DeleteDriver.as_view()),
    path("delete-cab/",DeleteCab.as_view()),



    #admin
    path("onboard-driver/", DriverOnboardingView.as_view()),
    path("view-bids/", AdminViewBids.as_view()),
    path("assign-driver/", AssignDriverView.as_view()),
    path("add-cab/", AddCabView.as_view()),
    path("add-coupon/", AddCoupon.as_view()),
    path("admin-payment-overview/", AdminPaymentOverviewView.as_view()),
    path('create-bookingsds/', CreateBookingView.as_view(), name='create-booking'),

    # Vendor management
    path('vendor-requests/', VendorRequestView.as_view()),
    path('vendor-requests/action/', VendorRequestActionView.as_view()),
    path('vendors/', VendorListView.as_view()),
    path('create-vendors/', CreateVendorView.as_view()),
    path('vendor-booking/', VendorBookingListView.as_view()),


]
