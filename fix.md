## fix that are need

1.  Enrollment fix
    1.1 "servicesWithFullAccess" and "servicesWithLimitedAccess" need to create a new componenet for this
    "label": "LABEL_REPEATED",
    "type": "TYPE_STRING"

            This componet has to take mutiple string and add it to item on giving enter

2.  Shared kiosk mode.
    2.1 same as 1.1 for field "restrictedManagedGuestSessionExtensionCleanupExemptList"

3.  Other settings
    3.1 same as 1.1 for field "usbDetachableAllowlist" , "deviceAllowedBluetoothServices","deviceLoginScreenAutoSelectCertificateForUrls","deviceWebBasedAttestationAllowedUrls","deviceAuthenticationUrlBlocklis".

4.  Sign-in settings
    4.1 same as 1.1 for filed "userAllowlist" abd "loginVideoCaptureAllowedUrls"
    4.2 fix the json for the timeWindows with repated filed

5.  User and device reporting
    5.2 same as 1.1 for the field "emailsToNotify"
