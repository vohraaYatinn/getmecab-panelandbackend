import datetime

from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.core.exceptions import ValidationError


class User(AbstractUser):
    CUSTOMER = "customer"
    DRIVER = "driver"
    ADMIN = "admin"
    VENDOR='vendor'

    ROLE_CHOICES = [('admin', 'Admin'), ('driver', 'Driver'), ('customer', 'Customer'),('vendor','Vendor')]

    email = models.EmailField(null=True)
    phone_number = models.CharField(max_length=10, unique=True,null=False)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=VENDOR)

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = ["username"]



    @property
    def average_rating(self):
        if self.total_ratings == 0:
            return None
        return round(self.total_score / self.total_ratings, 1)




class VendorRequest(models.Model):
    vendor_name = models.CharField(max_length=100,default=None)
    phone_number = models.CharField(max_length=15, )
    email = models.EmailField()
    company_name = models.CharField(max_length=100)
    pan_number = models.CharField(max_length=10,)
    gst_number = models.CharField(max_length=15, )
    status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.vendor_name} - {self.company_name}"

class Vendor(models.Model):
    company_name = models.CharField(max_length=100)
    pan_number = models.CharField(max_length=10)
    gst_number = models.CharField(max_length=15)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    balance =models.IntegerField(default=0)

class Driver(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={"role": "driver"})
    aadhaar_number = models.CharField(max_length=20, unique=True,null=True)
    license_number = models.CharField(max_length=20, unique=True, null=True)
    city = models.CharField(max_length=100,default='')
    state = models.CharField(max_length=100,default='')
    aadhaar_doc = models.FileField(upload_to="aadhaar_docs/", null=True)
    license_doc = models.FileField(upload_to="license_docs/", null=True)
    is_available = models.BooleanField(default=True)
    total_ratings = models.PositiveIntegerField(default=0)
    total_score = models.PositiveIntegerField(default=0)
    total_trip= models.PositiveIntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
    photo = models.ImageField(upload_to='driver_photo/',null=True)
    vendor= models.ForeignKey(Vendor,on_delete=models.CASCADE, related_name="vendor")

class Cab(models.Model):
    SUV = 'SUV'
    SEDAN = 'SEDAN'

    CAB_TYPE_CHOICES = [(SUV, "SUV"), (SEDAN, "SEDAN")]
    cab_number = models.CharField(max_length=20, unique=True)
    cab_name = models.CharField(max_length=20,default='')
    cab_type = models.CharField(max_length=20, choices=CAB_TYPE_CHOICES)
    price_per_km = models.IntegerField(default=0)
    is_available = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    one_year_from=models.DateTimeField(null=True)
    one_year_to=models.DateTimeField(null=True)
    five_year_from=models.DateTimeField(null=True)
    five_year_to=models.DateTimeField(null=True)
    fitness_year_from=models.DateTimeField(null=True)
    fitness_year_to=models.DateTimeField(null=True)
    insurance_year_from=models.DateTimeField(null=True)
    insurance_year_to=models.DateTimeField(null=True)
    pollutions_year_from=models.DateTimeField(null=True)
    pollutions_year_to=models.DateTimeField(null=True)
    fule=models.CharField(max_length=20)
    vendor= models.ForeignKey(Vendor,on_delete=models.CASCADE, related_name="vendor")

class Booking(models.Model):
    one_way='one_way'
    round_trip='round_trip'
    TRIP_TYPE_CHOICES = [(one_way,'one_way'),(round_trip,'round_trip')]

    customer_name = models.CharField(max_length=100)
    customer_number = models.CharField(max_length=15)
    customer_email = models.EmailField(max_length=100, blank=True, null=True)
    pickup_location = models.CharField(max_length=255)
    drop_location = models.CharField(max_length=255)
    trip_type = models.CharField(max_length=20, choices=TRIP_TYPE_CHOICES)
    special_requirements = models.CharField(max_length=200, default='')
    vehicle_type = models.CharField(max_length=200, default='')
    pickup_date = models.DateTimeField(default=None)
    drop_date = models.DateTimeField(null=True, blank=True)
    trip_km = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    fare = models.DecimalField(max_digits=10, decimal_places=2)
    buy_cost = models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
    status = models.CharField(max_length=20, default='not_started')
    bidding_status = models.CharField(max_length=20, default='open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    vendor= models.ForeignKey(Vendor,on_delete=models.CASCADE, related_name="booking_vendor",null=True, blank=True)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE,null=True, blank=True)
    created_by = models.ForeignKey(User,on_delete=models.CASCADE)
    isAdmin=models.BooleanField()
    carrier=models.BooleanField()
    driver_allowance=models.BooleanField()
    tax_included=models.BooleanField()
    toll_included=models.BooleanField()



    def clean(self):
        if not self.customer_number or len(self.customer_number) < 10:
            raise ValidationError('Please provide a valid phone number')
        if self.trip_type == 'round' and not self.drop_date:
            raise ValidationError('Drop date is required for round trips')
        if self.pickup_date and self.drop_date and self.drop_date <= self.pickup_date:
            raise ValidationError('Drop date must be after pickup date')
        if self.fare <= 0:
            raise ValidationError('Fare must be greater than 0')
        if self.buy_cost and self.buy_cost <= 0:
            raise ValidationError('Buy cost must be greater than 0')

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-created_at']


class Bidding(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name="bids")
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

class Payment(models.Model):
    credit = "credit"
    debit = "debit"

    PAYMENT_STATUS_CHOICES = [
        (credit, "credit"),
        (debit, "debit"),
    ]

    booking = models.OneToOneField(Booking, on_delete=models.CASCADE)
    vendor = models.OneToOneField(Vendor,on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_type = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES)



class DriverRating(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name="ratings")
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE,related_name="ratings_booking")
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    review = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('driver', 'customer', 'booking')  # Prevent duplicate ratings for the same booking
class Coupon(models.Model):
    code = models.CharField(max_length=20, unique=True)  # Unique coupon code
    discount_percentage = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)])  # Discount %
    max_discount_amount = models.DecimalField(max_digits=10, decimal_places=2)  # Max discount allowed
    valid_from = models.DateTimeField()  # Start date
    valid_until = models.DateTimeField()  # Expiry date
    is_active = models.BooleanField(default=True)  # Status
    usage_limit = models.PositiveIntegerField(default=1)  # How many times a user can use it
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid(self):
        now = datetime.datetime.now()
        return True #self.is_active and self.valid_from <= now <= self.valid_until and self.usage_limit>0



class CouponUsage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE)
    usage_count = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('user', 'coupon')  # Ensure a user-coupon pair is unique

