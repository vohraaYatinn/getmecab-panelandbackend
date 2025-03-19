from django.contrib import admin
from .models import Cab, Driver, Payment, Booking, User, Bidding, Coupon, CouponUsage, DriverRating,Vendor,VendorRequest

# Register models with the admin interface
admin.site.register(Cab)
admin.site.register(Driver)
admin.site.register(Payment)
admin.site.register(Booking)
admin.site.register(User)
admin.site.register(Bidding)
admin.site.register(Coupon)
admin.site.register(CouponUsage)
admin.site.register(DriverRating)
admin.site.register(Vendor)
admin.site.register(VendorRequest)

