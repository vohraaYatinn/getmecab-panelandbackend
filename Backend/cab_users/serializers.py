from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Cab, Booking, Bidding, Driver, Payment, Coupon, DriverRating, VendorRequest, Vendor

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "phone_number"]

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", 'email',"phone_number","role",'phone_number','first_name']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cab
        fields = "__all__"

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'customer_name', 'customer_number', 'customer_email', 
                 'pickup_location', 'drop_location', 'trip_type', 'pickup_date', 
                 'drop_date', 'trip_km', 'fare', 'buy_cost', 'status', 'bidding_status']
        
    def validate(self, data):
        if data.get('trip_type') == 'round' and not data.get('drop_date'):
            raise serializers.ValidationError("Drop date is required for round trips")
        if data.get('pickup_date') and data.get('drop_date') and data['drop_date'] <= data['pickup_date']:
            raise serializers.ValidationError("Drop date must be after pickup date")
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "phone_number", "role", "first_name"]

class DriverSerializer(serializers.ModelSerializer):
    user=UserSerializer()
    class Meta:
        model = Driver
        fields = "__all__"

    vendor = serializers.PrimaryKeyRelatedField(queryset=Vendor.objects.all())


class DriverAdminSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Driver
        fields = "__all__"



class BiddingSerializer(serializers.ModelSerializer):
    driver = DriverSerializer()
    booking = BookingSerializer()
    class Meta:

        model = Bidding
        fields = "__all__"


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"
class DriverRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverRating
        fields = "__all__"


class OnlyBookingSerializer(serializers.ModelSerializer):
    ratings_booking = DriverRatingSerializer(many=True)
    class Meta:
        model = Booking
        fields = "__all__"

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields="__all__"


class BookingAdminSerializer(serializers.ModelSerializer):
    # driver = DriverSerializer()
    # user = UserSerializer()
    class Meta:
        model = Booking
        fields = "__all__"
class BookingDriverSerializer(serializers.ModelSerializer):
    driver = DriverSerializer()
    user = UserSerializer()
    class Meta:
        model = Booking
        fields = "__all__"


class DriverRatingAdminSerializer(serializers.ModelSerializer):
    driver = DriverSerializer()
    customer = UserSerializer()
    booking = BookingSerializer()
    class Meta:
        model = DriverRating
        fields = "__all__"

class VendorRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorRequest
        fields = '__all__'
        read_only_fields = ('status', 'created_at', 'updated_at')

class VendorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Vendor
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class PaymentSerializer(serializers.ModelSerializer):
    vendor=VendorSerializer()
    booking=BookingSerializer()
    class Meta:
        model = Payment
        fields = "__all__"


class BookingWithDriverSerializer(serializers.ModelSerializer):
    driver = DriverSerializer()
    class Meta:
        model = Booking
        fields = "__all__"