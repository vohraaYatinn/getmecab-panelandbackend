import re
from http.client import responses
from random import random
import requests
from django.contrib.auth import get_user_model
from django.core.serializers import serialize
from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from pymupdf import message
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from googlemaps import Client as GoogleMaps
from .models import Cab, Booking, Driver, Bidding, Payment, DriverRating, Coupon, CouponUsage, Vendor, VendorRequest
from .serializers import UserSerializer, SignupSerializer, CabSerializer, BookingSerializer, BiddingSerializer, \
    DriverSerializer, PaymentSerializer, CouponSerializer, OnlyBookingSerializer, BookingAdminSerializer, \
    DriverAdminSerializer, DriverRatingAdminSerializer, VendorRequestSerializer, VendorSerializer, \
    BookingDriverSerializer
from .pagination import CustomPagination

User = get_user_model()
gmaps = GoogleMaps(key="AIzaSyDwGmQUxPyvUDDbojzLfBG8Cqk3yrAG2gg")
from django.core.mail import send_mail
from django.conf import settings


def send_booking_email(receiver_email, booking_data):
    """
    Sends a booking confirmation email.

    :param receiver_email: Email of the customer
    :param booking_data: Dictionary containing booking details
    """
    try:
        subject = "Your Cab Booking Confirmation 🚖"
        message = f"""
        Dear {booking_data.get('user_name')},

        Your cab has been successfully booked! Here are the details:

        🚕 Cab: {booking_data.get('cab_name')}
        📍 Pickup Location: {booking_data.get('pickup_location')}
        📍 Drop Location: {booking_data.get('drop_location')}
        🗓️ Pickup Date & Time: {booking_data.get('pickup_date')}
        🚗 Trip Type: {booking_data.get('trip_type')}
        📏 Distance: {booking_data.get('trip_km')} km
        💰 Fare: ₹{booking_data.get('fare')}

        Thank you for choosing our cab service! Safe travels! ✨

        Best regards,  
        Cab Mate 🚖
        """

        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [receiver_email],
            fail_silently=False,
        )
        return {"success": True, "message": "Email sent successfully"}

    except Exception as e:
        return {"success": False, "error": str(e)}


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            request.data['username'] = 'customer' + str(len(list(User.objects.filter(role='customer')))+1)
            serializer = SignupSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "User created successfully"}, status=201)
            return Response(serializer.errors, status=400)

        except Exception as err:
            return Response({"error": str(err)}, status=500)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            phone_number = request.data.get("phone_number")
            user = User.objects.filter(phone_number=phone_number).first()
            if user and user.check_password(request.data.get("password")):
                refresh = RefreshToken.for_user(user)
                return Response(data={"access": str(refresh.access_token), "refresh": str(refresh)},status=200)
            return Response({"error": "Invalid credentials"}, status=401)

        except Exception as err:
            return Response({"error": str(err)}, status=500)


class ResetPasswordView(APIView):
    permission_classes = [IsAuthenticated]  # Make sure user is authenticated

    def post(self, request):
        try:
            old_password = request.data.get("old_password")
            new_password = request.data.get("new_password")

            user = request.user  # Get the logged-in user

            if not user.check_password(old_password):
                return Response({"error": "Old password is incorrect"}, status=400)

            user.set_password(new_password)  # Set the new password
            user.save()

            return Response({'result':'success',"message": "Password updated successfully"}, status=200)

        except Exception as err:
            return Response({"error": str(err)}, status=500)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class CabAvailabilityView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            pickup = request.GET.get("pickup")
            drop = request.GET.get("drop")
            trip_type = request.GET.get("trip_type")
            pickup_date = request.GET.get("pickup_date_time")
            drop_date = request.GET.get("drop_date_time")
            pickup_time = request.GET.get("pickup_time")
            if not pickup:
                return Response({"error":'Please Fill Pickup Location'}, status=401)
            if not drop:
                return Response({"error":'Please Fill Drop Location'}, status=401)
            if not trip_type:
                return Response({"error":'Please Fill Tripe Type'}, status=401)
            if not pickup_date:
                return Response({"error":'Please Fill Pickup Date'}, status=401)
            # if not pickup_time:
            #     return Response({"message":'Please Fill Pickup Time'}, status=401)
            distance_data = gmaps.distance_matrix(pickup, drop)
            distance_km = round(distance_data["rows"][0]["elements"][0]["distance"]["value"] / 1000,2)

            available_cabs = Cab.objects.filter(is_available=True)
            if not available_cabs.exists():
                return Response({"error": "No cabs available"}, status=404)
            available_cabs = CabSerializer(available_cabs,many=True)
            available_cabs = available_cabs.data
            if trip_type == "round_trip":
                distance_km *= 2
            for cab in available_cabs:
                fare = distance_km * cab['price_per_km']


                cab["fare"]= round(fare,2)
                cab["trip_km"]= round(distance_km,2)


            return Response({"data":
                                 {
                                  'carData': available_cabs,
                                  'bookingData': {'pickup_location': pickup, 'drop_location': drop,
                                                  'trip_type': trip_type, 'pickup_date': pickup_date,
                                                  'drop_date':drop_date
                                                  }
                                  }

                             },status=200)

        except Exception as err:
            return Response({"error": str(err)}, status=500)

class BookCabView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        #user = request.user
        #userdata= request.data.get('formData')
        bookingData = request.data
        #cab_id = bookingData.get("cabid")
        pickup = bookingData.get("pick")
        drop = bookingData.get("drop")
        trip_type = bookingData.get("trip_type")
        pickup_date = bookingData.get("pick_time")
        drop_date = bookingData.get("drop_time",None)
        buy_cost=bookingData.get('buy_cost')
        customer_email=bookingData.get('email')
        customer_name=bookingData.get('customer_name')
        customer_number=bookingData.get('phone_number')
        fare=bookingData.get('fare')


        # distance_data = gmaps.distance_matrix(pickup, drop)
        # distance_km = round(distance_data["rows"][0]["elements"][0]["distance"]["value"] // 1000,2)
        # cab  = list(Cab.objects.filter(id=cab_id,is_available=True))
        # if not cab:
        #     return Response({'error': 'Cab Already Booked'}, status=400)
        # cab=cab[0]
        # fare = distance_km * cab.price_per_km
        # if trip_type == "round_trip":
        #     fare *= 2
        #     distance_km *= 2
        # distance_km=round(distance_km,2)
        # fare=round(fare,2)
        # user_data = {
        #     'username':'customer' + str(len(list(User.objects.filter(role='customer')))+1),
        #     'first_name':userdata.get('name'),
        #     'email':userdata.get('email'),
        #     'phone_number':userdata.get('phone'),
        #     'role':'customer',
        #     'password':'alkjaklsdjaskd',
        # }
        #
        # user = User.objects.filter(phone_number=userdata.get('phone'))
        # if not user:
        #     serializer = SignupSerializer(data=user_data)
        #     if serializer.is_valid():
        #         serializer.save()
        #     else:
        #         return Response({'error':serializer.errors},status=400)
        #     user = User.objects.filter(phone_number=userdata.get('phone'))





        booking = Booking.objects.create(customer_name=customer_name,
                                         customer_number=customer_number,
                                         customer_email=customer_email,
                                         pickup_location=pickup,
                                         drop_location=drop,
                                         trip_type=trip_type,
                                         pickup_date=pickup_date,
                                         drop_date= drop_date if drop_date else None,
                                         fare=fare,
                                         buy_cost=buy_cost)
        #payment= Payment.objects.create(booking=booking,amount_received=int(fare),net_amount=int(fare))
        # cab.is_available = False
        # cab.save()
        serializer = BookingSerializer(booking)

        return Response({ "booking": serializer.data,'message':'success'},status=200)

class CancelBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        booking_id = request.data.get("booking_id")
        booking = get_object_or_404(Booking, id=booking_id, user=request.user)
        booking.status = "Cancelled"
        booking.save()
        booking.cab.is_available = True
        booking.cab.save()
        return Response({"message": "Booking cancelled successfully"})

class BookingListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bookings = Booking.objects.filter(user=request.user)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)

class DriverOnboardingView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # if request.user.role != "admin":
        #     return Response({"error": "Only admins can onboard drivers"}, status=403)
        user_data = {
            'username': "DR"+request.data.get('phone_number'),
            'name':request.data.get('name'),
            'email':request.data.get('email'),
            'phone_number':request.data.get('phone_number'),
            'password':'default',
            'role':'driver',
            'first_name':request.data.get('name'),
        }
        if User.objects.filter(phone_number=user_data['phone_number']):
            return Response({'error': "This Mobile Number is Mapped Another Driver.", 'result': 'failure'},
                            status=400)
        if User.objects.filter(email=user_data['email']):
            return Response({'error': "This Email is Mapped Another Driver.", 'result': 'failure'},
                            status=400)
        if Driver.objects.filter(license_number=request.data.get('license_number')):
            return Response({'error': "This Licence is Mapped Another Driver.", 'result': 'failure'},
                            status=400)
        if Driver.objects.filter(aadhaar_doc=request.data.get('aadhaar_doc')):
            return Response({'error': "This Addhar No is Mapped Another Driver.", 'result': 'failure'},
                            status=400)

        serializer = SignupSerializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response({"error": "Phone number and Email should be unique"}, status=422)


        user = User.objects.filter(email=request.data.get('phone_number'))[0].id
        if not user:
            return Response(serializer.errors, status=400)
        request.data['user']= user
        serializer = DriverSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Driver onboarded successfully",'result':'success'}, status=201)
        return Response(serializer.errors, status=400)

class AvailableBookingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):




        open_bookings = Booking.objects.filter(bidding_status="open")
        serializer = BookingSerializer(open_bookings, many=True)
        return Response(serializer.data)

class PlaceBidView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != "driver":
            return Response({"error": "Only drivers can place bids"}, status=403)

        driver = get_object_or_404(Driver, user=request.user)
        booking_id = request.data.get("booking_id")
        bid_amount = request.data.get("bid_amount")
        if len(Bidding.objects.filter(booking=booking_id,driver=driver)) >0:
            return Response({"error": "For this booking bid already exists."}, status=403)

        if not driver.is_available:
            return Response({"error": "You have an ongoing booking"}, status=403)

        booking = get_object_or_404(Booking, id=booking_id, bidding_status="open")

        bid = Bidding.objects.create(booking=booking, driver=driver, bid_amount=bid_amount)
        return Response({"message": "Bid placed successfully", "bid_id": bid.id})

class AdminViewBids(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        booking_id =request.query_params.get('booking_id')
        bids = Bidding.objects.filter(booking_id=booking_id).select_related("driver", "booking")
        serializer = BiddingSerializer(bids, many=True)

        return Response(serializer.data)

class AssignDriverView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            # if request.user.role != "admin":
            #     return Response({"error": "Only admins can assign drivers"}, status=403)

            booking_id = request.data.get("booking_id")
            driver_id = request.data.get("driver_id")

            booking = Booking.objects.filter(id=booking_id, bidding_status="open")
            if not booking:
                return Response({"error": "For This Booking Driver has been assigned"}, status=200)
            driver = Driver.objects.filter(id=driver_id)
            if not driver:
                return Response({"error": "Driver has been asigned to another Booking"}, status=200)



            driver=driver[0]
            booking=booking[0]

            booking.driver = driver

            booking.status = 'driver assigned'
            booking.save()

            # driver.is_available = False
            # driver.save()

            return Response({"message": "Driver assigned successfully"},status=200)
        except Exception as e:
            return Response({"error": str(e),'result':'failuer'}, status=500)

class AddCabView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != "admin":
            return Response({"error": "Only admins can add cabs"}, status=403)

        serializer = CabSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Cab added successfully"}, status=201)
        return Response(serializer.errors, status=400)

class MarkTripCompletedView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != "driver":
            return Response({"error": "Only drivers can mark trips as completed"}, status=403)

        booking_id = request.data.get("booking_id")
        trip_km = request.data.get("trip_km")

        booking = get_object_or_404(Booking, id=booking_id, status="Booked")

        booking.status = "Completed"
        booking.trip_km = trip_km
        booking.save()

        # Create a pending payment entry for admin
        Payment.objects.create(booking=booking, driver=booking.cab.driver, amount=booking.fare, status="pending")

        # Mark driver as available for new trips
        booking.cab.driver.is_available = True
        booking.cab.driver.save()

        return Response({"message": "Trip marked as completed"})

class DriverTripSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "driver":
            return Response({"error": "Only drivers can view trip summary"}, status=403)

        driver = get_object_or_404(Driver, user=request.user)
        completed_trips = Booking.objects.filter(cab__driver=driver, status="Completed")

        total_trips = completed_trips.count()
        total_km = sum(trip.trip_km for trip in completed_trips)
        total_earning = sum(trip.fare for trip in completed_trips)

        return Response({
            "total_trips": total_trips,
            "total_km": total_km,
            "total_earning": total_earning
        })
class DriverPaymentOverviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "driver":
            return Response({"error": "Only drivers can view payments"}, status=403)

        driver = get_object_or_404(Driver, user=request.user)
        payments = Payment.objects.filter(booking__driver=driver)

        successful_payments = payments.filter(driver_payment_status="completed")
        pending_payments = payments.filter(driver_payment_status="pending")

        return Response({
            "successful_payments": PaymentSerializer(successful_payments, many=True).data,
            "pending_payments": PaymentSerializer(pending_payments, many=True).data
        })

class AdminPaymentOverviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "admin":
            return Response({"error": "Only admins can view payments"}, status=403)

        pending_payments = Payment.objects.filter(customer_payment_status="pending")
        pending_driver_payments = Payment.objects.filter(driver_payment_status="pending")

        return Response({
            "pending_customer_payments": PaymentSerializer(pending_payments, many=True).data,
            "pending_driver_payments": PaymentSerializer(pending_driver_payments, many=True).data
        })
class DriverTripSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "driver":
            return Response({"error": "Only drivers can view their trip summary"}, status=403)

        driver = get_object_or_404(Driver, user=request.user)
        completed_trips = Booking.objects.filter(driver=driver)
        driver_seralize_data=BookingDriverSerializer(completed_trips,many=True).data

        total_trips = completed_trips.count()
        total_km = sum(trip.trip_km for trip in completed_trips)
        total_earning = sum(Payment.objects.filter(booking__in=completed_trips).values_list("amount_to_pay", flat=True))

        return Response({
            "total_trips": total_trips,
            "total_km": total_km,
            "total_earning": total_earning,
            'data':driver_seralize_data
        })
def parse_date(date_str):
    """Helper function to parse date strings safely."""
    from datetime import datetime
    try:
        return datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S") if date_str else None
    except ValueError:
        return None

class AddCabView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        pattern = r"^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$"
        if not re.match(pattern, request.data.get('cab_number')):
          return Response({'error':"Invalid cab number format. Use format like MH12AB1234.", 'result': 'failure'}, status=400)

        if Cab.objects.filter(cab_number=request.data.get('cab_number')).exists():
            return Response({'error':"This cab number is already registered.",'result':'failure'}, status=400)

        serializer = CabSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'result':'success',"message": "Cab added successfully"}, status=201)
        return Response({'error':serializer.errors['cab_number']}, status=400)


class AddCoupon(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # if request.user.role != "admin":
        #     return Response({"error": "Only admins can add cabs"}, status=403)

        serializer = CouponSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Coupon added successfully"}, status=201)
        return Response(serializer.errors, status=400)


class DriverTripCompletionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != "driver":
            return Response({"error": "Only drivers can mark trips as completed"}, status=403)

        booking_id = request.data.get("booking_id")
        if not booking_id:
            return Response({"error": "Booking ID Not Found"}, status=403)


        booking = get_object_or_404(Booking, id=booking_id, driver=request.user.driver)

        if booking.status != "Booked":
            return Response({"error": "Trip is already completed or invalid"}, status=400)


        amount_to_pay = Bidding.objects.filter(booking=booking, driver=request.user.driver).first().bid_amount

        booking.status = "Completed"
        booking.cab.is_available = True
        booking.driver.is_available=True
        booking.save()
        payment = Payment.objects.filter(booking=booking)
        payment.amount_to_pay = amount_to_pay
        payment.net_amount = payment.amount_received - amount_to_pay
        payment.save()

        return Response({"message": "Trip marked as completed"})


class RateDriverAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user = request.user
        booking_id = request.data.get("booking_id")
        rating = request.data.get("rating")
        review = request.data.get("review", "")

        try:
            booking = Booking.objects.get(id=booking_id)
        except Booking.DoesNotExist:
            return Response({"error": "Invalid booking ID or unauthorized"}, status=400)

        # if not booking.is_completed:
        #     return Response({"error": "You can only rate a completed trip"}, status=400)

        if DriverRating.objects.filter(booking=booking).exists():
            return Response({"error": "You have already rated this trip"}, status=400)

        driver = booking.driver

        # Store the rating
        DriverRating.objects.create(driver=driver, customer=booking.user, booking=booking, rating=rating, review=review)

        # Update driver's total score and ratings count
        driver.total_score += rating
        driver.total_ratings += 1
        driver.save()

        return Response({"message": "Rating submitted successfully"}, status=201)


class DriverRatingsAPIView(APIView):
    def get(self, request, driver_id):
        try:
            driver = Driver.objects.get(id=driver_id)
        except Driver.DoesNotExist:
            return Response({"error": "Driver not found"}, status=404)

        ratings = DriverRating.objects.filter(driver=driver).order_by("-created_at")
        reviews = [
            {"customer": rating.customer.name, "rating": rating.rating, "review": rating.review, "created_at": rating.created_at.date()}
            for rating in ratings
        ]

        return Response({
            "driver_id": driver.id,
            "average_rating": driver.average_rating,
            "total_ratings": driver.total_ratings,
            "reviews": reviews
        })

# class GetAutoComplete(APIView):
#     permission_classes = [AllowAny]
#     def get(self,request):
#             query = request.GET.get("search", "")
#             if not query:
#                 return Response({"error": "Search query is required"}, status=400)
#
#             try:
#
#                 places_result = gmaps.places_autocomplete(query, types=["geocode"])
#                 city_names = [place["description"] for place in places_result]
#
#                 return Response({"cities": city_names}, status=200)
#             except Exception as e:
#                 return Response({"error": str(e)}, status=500)

class GetAutoComplete(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.GET.get("search", "")
        if not query:
            return Response({"error": "Search query is required"}, status=400)

        try:
            places_result = gmaps.places_autocomplete(query, types=["geocode"], components={"country": "IN"})
            city_names = [place["description"] for place in places_result]

            return Response({"cities": city_names}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class ApplyCouponAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user = request.user

        booking_id = request.data.get("booking_id")
        coupon_code = request.data.get("coupon_code")

        try:
            booking = Booking.objects.get(id=booking_id)
        except Booking.DoesNotExist:
            return Response({"error": "Invalid booking ID or unauthorized"}, status=400)

        user=booking.user
        cab=booking.cab
        # if booking.is_completed:
        #     return Response({"error": "Cannot apply a coupon to a completed booking"}, status=400)
        if coupon_code:
            try:
                coupon = Coupon.objects.get(code=coupon_code)
            except Coupon.DoesNotExist:
                return Response({"error": "Invalid coupon code"}, status=400)

            if not coupon.is_valid():
                return Response({"error": "Coupon is expired or inactive"}, status=400)

            # Check user usage
            usage, _ = CouponUsage.objects.get_or_create(user=user, coupon=coupon)
            if usage.usage_count >= coupon.usage_limit:
                return Response({"error": "Coupon usage limit reached"}, status=400)

            # Calculate discount
            discount_amount = round((booking.fare * coupon.discount_percentage) / 100)
            discount_amount = min(discount_amount, coupon.max_discount_amount)

            # Apply discount
            booking.discount_applied = discount_amount
            booking.final_fare = booking.fare - discount_amount


            usage.usage_count += 1
            usage.save()
        booking.status = 'booked'
        booking.save()
        serialize = BookingSerializer(booking)

        email_status = send_booking_email(
            receiver_email=user.email,
            booking_data={
                "user_name": user.first_name,
                "cab_name": cab.cab_name,
                "pickup_location": booking.pickup_location,
                "drop_location": booking.drop_location,
                "pickup_date": booking.pickup_date,
                "trip_type": booking.trip_type,
                "trip_km": booking.trip_km,
                "fare": booking.final_fare if booking.final_fare>0 else booking.fare ,
            }
        )
        return Response({
            "message": "Coupon applied successfully",
            #"discount_amount": discount_amount,
            "booking": serialize.data
        }, status=200)

class CheckCouponAPIView(APIView):
        permission_classes = [AllowAny]

        def post(self, request):
            user = request.user

            booking_id = request.data.get("booking_id")
            coupon_code = request.data.get("coupon_code")

            try:
                booking = Booking.objects.get(id=booking_id)
            except Booking.DoesNotExist:
                return Response({"error": "Invalid booking ID or unauthorized"}, status=400)

            user = booking.user
            # if booking.is_completed:
            #     return Response({"error": "Cannot apply a coupon to a completed booking"}, status=400)

            try:
                coupon = Coupon.objects.get(code=coupon_code)
            except Coupon.DoesNotExist:
                return Response({"error": "Invalid coupon code"}, status=400)

            if not coupon.is_valid():
                return Response({"error": "Coupon is expired or inactive"}, status=400)

            # Check user usage
            usage, _ = CouponUsage.objects.get_or_create(user=user, coupon=coupon)
            if usage.usage_count >= coupon.usage_limit:
                return Response({"error": "Coupon usage limit reached"}, status=400)

            # Calculate discount
            discount_amount = (booking.fare * coupon.discount_percentage) / 100
            discount_amount = min(discount_amount, coupon.max_discount_amount)

            # Apply discount
            booking.discount_applied = discount_amount
            booking.final_fare = booking.fare - discount_amount
            #booking.save()

            # Update usage count
            usage.usage_count += 1
            #usage.save()
            serialize = BookingSerializer(booking)
            return Response({
                "message": "Coupon applied successfully",
                "discount_amount": discount_amount,
                "booking": serialize.data
            }, status=200)


class CreateCouponAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CouponSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Coupon created successfully"}, status=201)
        return Response(serializer.errors, status=400)


class MyBookingAPIView(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        # user  = request.user
        booking = Booking.objects.filter().prefetch_related(Prefetch('ratings_booking'))
        data=[]
        if booking:

            serialize = OnlyBookingSerializer(booking,many=True)
            data = serialize.data
        return Response({"booking": data}, status=200)


class fetchAllBookings(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def get(self, request):
        try:
            bookings = Booking.objects.filter().select_related("driver", "vendor").order_by("-created_at")
            paginator = self.pagination_class()
            paginated_bookings = paginator.paginate_queryset(bookings, request)
            serializer = BookingAdminSerializer(paginated_bookings, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as err:
            return Response({"error": str(err)}, status=500)

class deleteBookings(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        try:
            id = request.data.get("id")
            if not id:
                raise Exception("Id is required")
            booking = Booking.objects.filter(id=id).delete()
            return Response({"result":"success" }, status=200)
        except Exception as err:
            return Response(str(err), 500)



class deleteCoupon(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        try:
            id = request.data.get("id")
            if not id:
                raise Exception("Id is required")
            booking = Coupon.objects.filter(id=id).delete()
            return Response({"result":"success" , "message": "Item Deleted Successfully"}, status=200)
        except Exception as err:
            return Response(str(err), 500)



class fetchAllBookingsAnalytics(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        try:
            bookingInititated = Booking.objects.filter(status="initiated").count()
            bookingConfirmed = Booking.objects.filter(status="booked").count()
            bookingOngoing = Booking.objects.filter(status="ongoing").count()
            bookingCompleted = Booking.objects.filter(status="completed").count()
            data = {
                "initiated":bookingInititated,
                "booked":bookingConfirmed,
                "ongoing":bookingOngoing,
                "completed":bookingCompleted,
            }
            return Response({"result":"success" , "data": data}, status=200)
        except Exception as err:
            return Response(str(err), 500)



class fetchAllDrivers(APIView):
    permission_classes = [AllowAny]

    def get(self,request):
        try:
            if request.user.role == "admin":
              drivers_data = Driver.objects.filter().select_related("user").order_by("-timestamp")
            if request.user.role == "vendor":
              drivers_data = Driver.objects.filter(vendor__user=request.user).select_related("user").order_by("-timestamp")
            data=[]
            if drivers_data:
                serialize = DriverAdminSerializer(drivers_data,many=True)
                data = serialize.data
            return Response({"result":"success" , "data": data}, status=200)
        except Exception as err:
            return Response(str(err), 500)



class fetchAllCabs(APIView):
    permission_classes = [AllowAny]
    pagination_class = CustomPagination

    def get(self, request):
        try:
            cabs = Cab.objects.all().order_by('-id')
            paginator = self.pagination_class()
            paginated_cabs = paginator.paginate_queryset(cabs, request)
            serializer = CabSerializer(paginated_cabs, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as err:
            return Response({"error": str(err)}, status=500)





class fetchAllReviews(APIView):
    permission_classes = [AllowAny]
    pagination_class = CustomPagination

    def get(self, request):
        try:
            reviews = DriverRating.objects.all().order_by('-id')
            paginator = self.pagination_class()
            paginated_reviews = paginator.paginate_queryset(reviews, request)
            serializer = DriverRatingAdminSerializer(paginated_reviews, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as err:
            return Response({"error": str(err)}, status=500)



class fetchAllCoupons(APIView):
    permission_classes = [AllowAny]
    pagination_class = CustomPagination

    def get(self, request):
        try:
            coupons = Coupon.objects.all().order_by('-id')
            paginator = self.pagination_class()
            paginated_coupons = paginator.paginate_queryset(coupons, request)
            serializer = CouponSerializer(paginated_coupons, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as err:
            return Response({"error": str(err)}, status=500)



class PhoneOtp(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request):
        try:
            data = request.data
            phone = data.get('phone', False)
            if len(phone) != 10:
                raise Exception("Please enter a valid phone number")
            url = 'https://cpaas.messagecentral.com/verification/v3/send'
            headers = {
                'authToken': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLURFQkUyQjY4OTM4NTRBRCIsImlhdCI6MTcyMjMyNDU4MCwiZXhwIjoxODgwMDA0NTgwfQ.ihHWg1LXsk1WCjmYiCb0fA6sYrbqUORZjsw-0kr90w662ZlW7UCbb_O5GWx9_7gnzWdTA3zoGgmc1p2tQ2B4mg'
            }
            params = {
                'countryCode': '91',
                'customerId': 'C-DEBE2B6893854AD',
                'flowType': 'SMS',
                'mobileNumber': phone
            }
            response = requests.post(url, headers=headers, params=params)
            if response.status_code != 200:
                raise Exception("Please wait 60 seconds before trying again.")
            return Response({"result" : "success", "data":response.json()}, 200)

        except Exception as err:
            return Response(str(err), 500)


class PhoneOtpVerify(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request):
        try:
            data = request.data
            phone = data.get('phone', False)
            verfication_code = data.get('verfication_code', False)
            otp_list = data.get('otp', False)
            otp = str(otp_list[0]) + str(otp_list[1]) + str(otp_list[2]) + str(otp_list[3])
            url = 'https://cpaas.messagecentral.com/verification/v3/validateOtp'
            headers = {
                'authToken': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLUZBNTY5QzEzODY0QjQ5OSIsImlhdCI6MTcyMDY3NzcwOSwiZXhwIjoxODc4MzU3NzA5fQ.IKzKR57hg8vdCQux-GnGbuxw1H9BMXxrrJOS_OwUl2TZ2XxDZpDof9wcvenw6yG2Ygjcpfr8dEMVizPZaWf-KA'
            }
            params = {
                'countryCode': '91',
                'mobileNumber': phone,
                'verificationId': verfication_code,
                'customerId': 'C-DEBE2B6893854AD',
                'code': otp
            }
            response = requests.get(url, headers=headers, params=params)
            if response.status_code != 200:
                raise Exception("The OTP is either invalid or has expired.")
            check_if_Valid_otp = response.json()['data']['verificationStatus'] == 'VERIFICATION_COMPLETED'
            user_req = User.objects.filter(phone_number="+91"+phone)
            if user_req:
                refresh = RefreshToken.for_user(user_req[0])
                return Response({"result" : "success", "data":check_if_Valid_otp, "user":True, "access": str(refresh.access_token), "refresh": str(refresh)}, 200)
            return Response({"result" : "success", "data":check_if_Valid_otp, "user":False}, 200)

        except Exception as err:
            return Response(str(err), 500)



class signupUser(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request):
        try:
            data = request.data
            full_name = data.get('fullName', False)
            email = data.get('email', False)
            phone = data.get('phoneNumber', False)

            user_req = User.objects.create(

            )
            check_if_Valid_otp='' # just to trmove error
            if user_req:
                refresh = RefreshToken.for_user(user_req)
                return Response({"result" : "success", "data":check_if_Valid_otp, "user":True, "access": str(refresh.access_token), "refresh": str(refresh)}, 200)
            return Response({"result" : "success", "data":check_if_Valid_otp, "user":False}, 200)

        except Exception as err:
            return Response(str(err), 500)

class changeBookingStatus(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        try:
            id = request.data.get("id")
            status = request.data.get("status")
            if not id:
                raise Exception("Id is required")
            if not status:
                raise Exception("Status is required")
            booking = Booking.objects.filter(id=id).first()
            if not  booking:
                raise Exception("Something Went Wrong")
            if booking:
                booking.status = status
                booking.save()
            return Response({"result":"success" }, status=200)
        except Exception as err:
            return Response({'error':str(err)}, 500)


class DriverUpdate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            id = request.data.get("id")
            name = request.data.get("name")
            email = request.data.get("email")
            phone_number = request.data.get("phone_number")
            aadhaar_number = request.data.get("aadhaar_number")
            license_number = request.data.get("license_number")

            if not id:
                return Response({"error": "Id is required"}, status=400)

            driver = Driver.objects.select_related("user").filter(id=id).first()

            if not driver:
                return Response({"error": "Driver not found"}, status=404)

            # Update driver fields
            driver.aadhaar_number = aadhaar_number
            driver.license_number = license_number
            driver.user.first_name = name  # Assuming `user` is a related model
            driver.user.email = email
            driver.user.phone_number = phone_number
            driver.user.save()  # Save related user model if necessary
            driver.save()

            return Response({"result": "success"}, status=200)
        except Exception as err:
            return Response({"error": str(err)}, status=500)

class CabUpdate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            id = request.data.get("id")
            data=request.data


            if not id:
                return Response({"error": "Id is required"}, status=400)

            cab = Cab.objects.filter(id=id).first()  # Use `.first()` to get a single object

            if not cab:
                return Response({"error": "Cab not found"}, status=404)

            cab.cab_number = data.get("cab_number", cab.cab_number)
            cab.cab_name = data.get("cab_name", cab.cab_name)
            cab.cab_type = data.get("cab_type", cab.cab_type)
            cab.price_per_km = data.get("price_per_km", cab.price_per_km)
            cab.is_available = data.get("is_available", cab.is_available)
            cab.one_year_from = parse_date(data.get("one_year_from")) or cab.one_year_from
            cab.one_year_to = parse_date(data.get("one_year_to")) or cab.one_year_to
            cab.five_year_from = parse_date(data.get("five_year_from")) or cab.five_year_from
            cab.five_year_to = parse_date(data.get("five_year_to")) or cab.five_year_to
            cab.fitness_year_from = parse_date(data.get("fitness_year_from")) or cab.fitness_year_from
            cab.fitness_year_to = parse_date(data.get("fitness_year_to")) or cab.fitness_year_to
            cab.insurance_year_from = parse_date(data.get("insurance_year_from")) or cab.insurance_year_from
            cab.insurance_year_to = parse_date(data.get("insurance_year_to")) or cab.insurance_year_to
            cab.pollutions_year_from = parse_date(data.get("pollutions_year_from")) or cab.pollutions_year_from
            cab.pollutions_year_to = parse_date(data.get("pollutions_year_to")) or cab.pollutions_year_to
            cab.fule = data.get("fule", cab.fule)


            cab.save()

            return Response({"result": "success"}, status=200)

        except Exception as err:
            return Response({"error": str(err)}, status=500)


class DeleteDriver(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            id = request.data.get("id")


            if  id:
                return Response({"error": "Id is required"}, status=400)

            driver = Driver.objects.select_related("user").filter(id=id).first()

            if not driver:
                return Response({"error": "Driver not found"}, status=404)



            driver.user.delete()
            driver.delete()

            return Response({"result": "success"}, status=200)
        except Exception as err:
            return Response({"error": str(err)}, status=500)


class DeleteCab(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            id = request.data.get("id")

            if not id:
                return Response({"error": "Id is required"}, status=400)

            cab = Cab.objects.filter(id=id).first()

            if not cab:
                return Response({"error": "Cab not found"}, status=404)

           


            cab.delete()

            return Response({"result": "success"}, status=200)

        except Exception as err:
            return Response({"error": str(err)}, status=500)


class DeleteReview(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            id = request.data.get("id")

            if not id:
                return Response({"error": "Id is required"}, status=400)

            dr = DriverRating.objects.filter(id=id).first()

            if not dr:
                return Response({"error": "Review not found"}, status=404)

            dr.delete()

            return Response({"result": "success"}, status=200)

        except Exception as err:
            return Response({"error": str(err)}, status=500)
class AdminDashboardData(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            total_booking=Booking.objects.all()
            purchased_booking= total_booking.filter(bidding_status='closed',status='not_started').count()
            pending_purchase= total_booking.filter(bidding_status='open',status='not_started')
            total_vendor=Vendor.objects.all().count()
            vendor_request= VendorRequest.objects.filter(status='pending').count()


            initiated_booking=BookingAdminSerializer(pending_purchase,many=True).data
            data = {
                "total_booking":total_booking.count(),
                "purchased_booking":purchased_booking,
                "pending_purchase":pending_purchase.count(),
                "pending_purchase_data":initiated_booking,
                'total_vendor':total_vendor,
                'vendor_request':vendor_request

            }
            return Response({"result":"success" , "data": data}, status=200)
        except Exception as err:
            return Response({"error": str(err)}, status=500)

class AdminProfileData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:


            data= {
                'phone_number':request.user.phone_number,
           'first_name':request.user.first_name,
           'email':request.user.email

            }
            return Response({"result":"success" , "data": data}, status=200)
        except Exception as err:
            return Response({"error": str(err)}, status=500)


class VendorBookingListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        try:

            user=request.user
            status = request.data.get('status')
            booking = Booking.objects.filter(status=status,vendor__user=user)
            serializer = BookingSerializer(booking, many=True)
            return Response({
                "result": "success",
                "data": serializer.data,

            }, status=200)
        except Exception as e:
            return Response({
                "result": "error",
                "message": str(e)
            }, status=500)


class CreateVendorView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            # Create vendor request
            vendor_request_data = {
                'vendor_name': request.data.get('vendor_name'),
                'phone_number': request.data.get('phone_number'),
                'email': request.data.get('email'),
                'company_name': request.data.get('company_name'),
                'pan_number': request.data.get('pan_number'),
                'gst_number': request.data.get('gst_number'),
                'status': 'approved' } # Directly approve since it's created by admin
            vendor_request_serializer = VendorRequestSerializer(data=vendor_request_data)
            if not vendor_request_serializer.is_valid():
                return Response({
                    "result": "error",
                    "message": "Invalid vendor request data",
                    "errors": vendor_request_serializer.errors
                }, status=400)
            
            vendor_request = vendor_request_serializer.save()
            
            # Generate vendor ID
            vendor_id = f"VENDOR{str(vendor_request.id).zfill(6)}"
            
            # Create user
            user = User.objects.create_user(
                username=vendor_request.email,
                email=vendor_request.email,
                password=request.data.get('password', 'default_password123')
            )
            
            # Create vendor
            vendor = Vendor.objects.create(
                vendor_id=vendor_id,
                vendor_request=vendor_request,
                user=user
            )
            
            return Response({
                "result": "success",
                "message": "Vendor created successfully",
                "data": {
                    "vendor_id": vendor_id,
                    "email": vendor_request.email
                }
            }, status=201)

        except Exception as e:
            return Response({
                "result": "error",
                "message": str(e)
            }, status=500)


class VendorListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            page = int(request.GET.get('page', 1))
            page_size = int(request.GET.get('page_size', 10))

            vendors = Vendor.objects.all().order_by('-created_at')
            total = vendors.count()

            start = (page - 1) * page_size
            end = start + page_size
            vendors = vendors[start:end]
            serializer = VendorSerializer(vendors, many=True)
            return Response({
                "result": "success",
                "data": serializer.data,
                "total": total

            }, status=200)
        except Exception as e:
            return Response({
                "result": "failure",
                "message": str(e)
            }, status=500)

class PendingVendorListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            page = int(request.GET.get('page', 1))
            page_size = int(request.GET.get('page_size', 10))

            pending_vendors = VendorRequest.objects.all().order_by('-created_at')
            total = pending_vendors.count()

            start = (page - 1) * page_size
            end = start + page_size
            pending_vendors = pending_vendors[start:end]
            serializer = VendorRequestSerializer(pending_vendors, many=True)
            return Response({
                "result": "success",
                "data": serializer.data,
                "total": total

            }, status=200)
        except Exception as e:
            return Response({
                "result": "failure",
                "message": str(e)
            }, status=500)


class VendorRequestActionView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            request_id = request.data.get('request_id')
            action = request.data.get('action')  # 'approve' or 'reject'

            if not request_id or not action:
                return Response({
                    "result": "error",
                    "message": "Request ID and action are required"
                }, status=400)
            vendor_request = VendorRequest.objects.get(id=request_id)

            if action == 'approve':

                vendor_id = f"VENDOR{str(vendor_request.id).zfill(6)}"


                user = User.objects.create_user(
                    username=vendor_id,
                    email=vendor_request.email,
                    password=request.data.get('password', 'default_password123'),
                    role='vendor'
                )


                Vendor.objects.create(
                    user=user,
                    company_name=vendor_request.company_name,
                    pan_number=vendor_request.pan_number,
                    gst_number=vendor_request.gst_number
                )

                vendor_request.status = 'approved'
                vendor_request.save()

                return Response({
                    "result": "success",
                    "message": "Vendor request approved successfully",
                    "data": {
                        "vendor_id": vendor_id,
                        "email": vendor_request.email
                    }
                }, status=200)

            elif action == 'reject':
                vendor_request.status = 'rejected'
                vendor_request.save()

                return Response({
                    "result": "success",
                    "message": "Vendor request rejected successfully"
                }, status=200)

            else:
                return Response({
                    "result": "error",
                    "message": "Invalid action"
                }, status=400)

        # except VendorRequest.DoesNotExist:
        #     return Response({
        #     "result": "error",
        #     "message": "Vendor request not found"
        # }, status=404)
        #
        except Exception as e:
            return Response({
            "result": "error",
            "message": str(e)
          }, status=500)

class VendorRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        try:
            email=request.data.get('email',None)
            phone_number=request.data.get('phone_number',None)


            if User.objects.filter(email=email):
                raise Exception('Email already linked to another vendor')
            if User.objects.filter(phone_number=phone_number):
                raise Exception('Phone Number already linked to another vendor')
            if VendorRequest.objects.filter(email=email , status='pending'):
                raise Exception('Already active vendor request with this email')
            if VendorRequest.objects.filter(phone_number=phone_number ,status='pending'):
                raise Exception('Already active vendor request with this number')


            serializer = VendorRequestSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response({
                    "result": "success",
                    "message": "Vendor request submitted successfully",

                }, status=201)
            return Response({
                "result": "failure",
                "message": "Invalid data",

            }, status=400)
        except Exception as e:
            return Response({
                "result": "failure",
                "message": str(e)
            }, status=500)


class CreateBookingView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        try:
            serializer = BookingSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'message': 'Booking created successfully',
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED)
            return Response({
                'error': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                "result": "error",
                "message": str(e)
            }, status=500)

class StartTrip(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            booking_id=request.data.get('booking_id')
            if booking_id:
                obj = Booking.objects.get(id=booking_id)
                if obj.status != 'not_started':
                    return Response({
                        "result": "error",
                        "message": 'Ride Can not be started in current state'
                    }, status=200)

                obj.status='started'
                obj.save()
                return Response({
                    'message': 'Trip Started Succesfully',

                }, status=status.HTTP_200_CREATED)

        except Exception as e:
            return Response({
                "result": "error",
                "message": str(e)
            }, status=500)


class EndTrip(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            booking_id = request.data.get('booking_id')
            if booking_id:
                obj = Booking.objects.get(id=booking_id)
                if obj.status != 'started':
                    return Response({
                        "result": "error",
                        "message": 'Ride Can not be Ended in current state'
                    }, status=200)

                obj.status = 'end'
                obj.save()
                return Response({
                    'message': 'Trip Ended Succesfully',

                }, status=status.HTTP_200_CREATED)

        except Exception as e:
            return Response({
                "result": "error",
                "message": str(e)
            }, status=500)

class DriverProfile(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        try:
            obj=Driver.objects.get(user=request.user)
            serialize_data=DriverSerializer(obj).data
            return Response({
                'data': serialize_data
            }, status=200)
        except Exception as e:
            return Response({
                "result": "error",
                "message": str(e)
            }, status=500)

class DriverProfileEdit(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        try:
            data=request.data
            user=request.user
            obj=Driver.objects.get(user=user)
            if data('full_name'):
                obj.first_name=data('first_name')
            if data('phone_number'):
                    obj.first_name = data('phone_number')
            if data('email'):
                    obj.first_name = data('email')

            if data('photo'):
                    obj.first_name = data('photo')
            obj.save()
            return Response({
            'message': 'Profile Edit Succesfully',

          }, status=status.HTTP_200_CREATED)

        except Exception as e:
           return Response({
            "result": "error",
            "message": str(e)
        }, status=500)

class BookingSingal(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        try:
            booking_id=request.query_params.get('booking_id')
            obj=Booking.objects.get(id=booking_id)
            serialize_data=BookingSerializer(obj).data
            return Response({
                'data': serialize_data
            }, status=200)
        except Exception as e:
            return Response({
                "result": "error",
                "message": str(e)
            }, status=500)

class VendorList(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        try:

            obj=Vendor.objects.all()
            serialize_data=VendorSerializer(obj,many=True).data
            return Response({
                'data': serialize_data
            }, status=200)
        except Exception as e:
            return Response({
                "result": "error",
                "message": str(e)
            }, status=500)


class BuyBooking(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        try:
            booking_id=request.data.get('booking_id')
            if  not booking_id:
                return Response({
                    "result": "error",
                    "message": 'Booking Id Missing'
                }, status=500)
            user=request.user
            vendor=Vendor.object.get(user=user)
            booking=Booking.object.get(id=booking_id)
            if not vendor or not booking:
                return Response({
                    "result": "error",
                    "message": 'Vendor or Booking Missing'
                }, status=500)
            booking.bidding_status='closed'
            booking.vendor=vendor
            booking.save()
            return Response({
                    'message':'Booking Buyed Succesfully'
                }, status=200)
        except Exception as e:
            return Response({
                "result": "error",
                "message": str(e)
            }, status=500)


class VendorBookedBooking(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        try:
            user=request.user

            obj=Booking.objects.get(vendor__user=user)
            serialize_data=BookingSerializer(obj).data
            return Response({
                'data': serialize_data
            }, status=200)
        except Exception as e:
            return Response({
                "result": "error",
                "message": str(e)
            }, status=500)

class VendorProfile(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        try:
            obj=Vendor.objects.get(user=request.user)
            serialize_data=VendorSerializer(obj).data
            return Response({
                'data': serialize_data
            }, status=200)
        except Exception as e:
            return Response({
                "result": "error",
                "message": str(e)
            }, status=500)