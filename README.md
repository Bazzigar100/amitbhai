# Free Fire Tournament — Local Setup & QR instructions

This is a lightweight static app. I polished the UI, added responsive header, improved form UX and a QR payment modal.

Important: place your real payment QR image in the `assets` folder so the app uses it:

PowerShell (run from the project root):

```powershell
# create assets folder (if missing) and copy the image into assets/qr.jpg
New-Item -ItemType Directory -Path .\assets -Force
Copy-Item -Path "C:\Users\LENOVO\Pictures\WhatsApp Image 2025-10-29 at 17.53.57_d3abf413.jpg" -Destination ".\assets\qr.jpg" -Force
```

If you don't copy your image, the app will use `assets/qr-placeholder.svg` as a fallback.

Default UPI ID used by the app: `9454881411@fam` (the Copy button in the payment modal will copy this value).

Customer care: 9453219874 — visible in the payment modal and footer.

Optional helper script
----------------------
There is a PowerShell helper script `copy-qr.ps1` you can run from the project root which creates `assets\` and copies the QR image from your Pictures folder into `assets\qr.jpg`.

Run it like this from PowerShell (project root):

```powershell
.\copy-qr.ps1
```

How to run locally (simple):

Use any static server. If you have Python installed, run this from project folder:

```powershell
# python 3.x
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Notes & next steps:
- For real payments consider integrating a payment gateway backend (Razorpay/Stripe) and never store API secrets in client-side JS.
- If you want, I can add a nicer favicon, replace the SVG placeholder with a real image, or wire up a mini backend to record payments.
