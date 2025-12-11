# Mobile Testing Guide

## Running the App on Your Local Network

### Step 1: Start the Development Server

Run the following command in your terminal:

```bash
npm run dev
```

The server will start and display:
- Local: `http://localhost:5173`
- Network: `http://YOUR_IP:5173`

### Step 2: Find Your Computer's IP Address

**Windows:**
1. Open Command Prompt or PowerShell
2. Run: `ipconfig`
3. Look for "IPv4 Address" under your active network adapter (usually starts with 192.168.x.x or 10.x.x.x)

**Mac/Linux:**
1. Open Terminal
2. Run: `ifconfig` or `ip addr`
3. Look for your local IP address (usually starts with 192.168.x.x or 10.x.x.x)

### Step 3: Connect Your Phone

1. Make sure your phone is connected to the **same Wi-Fi network** as your computer
2. Open your phone's browser (Chrome, Safari, etc.)
3. Enter the Network URL shown in your terminal (e.g., `http://192.168.1.100:5173`)
4. The app should load on your phone!

### Troubleshooting

**Can't access from phone?**
- Make sure both devices are on the same Wi-Fi network
- Check Windows Firewall - you may need to allow Node.js through the firewall
- Try disabling your VPN if you're using one
- Make sure the port 5173 is not blocked by your router

**Firewall Settings (Windows):**
1. Open Windows Defender Firewall
2. Click "Allow an app or feature through Windows Defender Firewall"
3. Find "Node.js" and check both "Private" and "Public" boxes
4. If Node.js isn't listed, click "Allow another app" and add it

**Alternative: Use ngrok (if local network doesn't work)**
```bash
npx ngrok http 5173
```
This will give you a public URL that works from anywhere.

## Mobile Features

The app is now fully responsive and optimized for mobile:
- ✅ Touch-friendly buttons (minimum 44px height)
- ✅ Responsive text sizes
- ✅ Optimized spacing for small screens
- ✅ Mobile-friendly search input
- ✅ Stacked layout on small screens
- ✅ Smooth touch interactions

Enjoy testing on your mobile device! 🎵📱

