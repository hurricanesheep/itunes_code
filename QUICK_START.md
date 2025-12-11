# 🚀 Quick Start Guide - iTunes Song Search App

## 📋 How to Start the Application

### **Step 1: Open Terminal/Command Prompt**

- **Windows**: Press `Win + R`, type `cmd` or `powershell`, press Enter
- **Or**: Right-click in the project folder and select "Open in Terminal"

### **Step 2: Navigate to Project Directory**

```bash
cd C:\Users\User\Downloads\Test\itunes-search-app
```

**Or if you're already in the Test folder:**
```bash
cd itunes-search-app
```

### **Step 3: Start the Development Server**

```bash
npm run dev
```

### **Step 4: Open in Browser**

After running `npm run dev`, you'll see output like:

```
VITE v7.2.7  ready in 750 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Open your browser and go to:** `http://localhost:5173/` (or the port shown)

---

## 🎯 Complete Step-by-Step Instructions

### **Method 1: Using Command Line (Recommended)**

1. **Open PowerShell or Command Prompt**
   - Press `Windows Key + X`
   - Select "Windows PowerShell" or "Terminal"

2. **Navigate to the project:**
   ```powershell
   cd C:\Users\User\Downloads\Test\itunes-search-app
   ```

3. **Start the server:**
   ```powershell
   npm run dev
   ```

4. **Wait for the server to start** (you'll see "ready" message)

5. **Open your browser** and visit: `http://localhost:5173/`

### **Method 2: Using VS Code**

1. **Open the project folder in VS Code**
   - File → Open Folder → Select `itunes-search-app`

2. **Open Terminal in VS Code**
   - Press `` Ctrl + ` `` (backtick) or
   - View → Terminal

3. **Run the command:**
   ```bash
   npm run dev
   ```

4. **Click the localhost link** that appears in the terminal

---

## 📝 Available Commands

### **Development Commands:**

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests with UI
npm run test:ui
```

### **What Each Command Does:**

- **`npm run dev`** - Starts the development server (use this to run the app)
- **`npm run build`** - Creates an optimized production version
- **`npm run preview`** - Preview the production build locally
- **`npm run test`** - Run unit tests

---

## 🔧 Troubleshooting

### **Problem: "npm: command not found"**

**Solution:** Install Node.js
- Download from: https://nodejs.org/
- Install the LTS version
- Restart your terminal

### **Problem: "Port already in use"**

**Solution:** The port might be in use. Vite will automatically try another port (like 5174, 5175, etc.)
- Check the terminal output for the new port number
- Use that port in your browser

### **Problem: "Cannot find module"**

**Solution:** Install dependencies first:
```bash
npm install
```

### **Problem: Server won't start**

**Solution:** 
1. Make sure you're in the correct directory (`itunes-search-app`)
2. Check if `node_modules` folder exists
3. If not, run `npm install` first

---

## 🌐 Accessing the Application

Once the server is running:

1. **Local Access:**
   - Open browser: `http://localhost:5173/`
   - Or the port shown in terminal

2. **Network Access (on same WiFi):**
   - Look for "Network:" in terminal output
   - Use that IP address from other devices

---

## 🛑 How to Stop the Server

**Press `Ctrl + C` in the terminal** where the server is running

---

## 📚 Project Structure

```
itunes-search-app/
├── src/              # Source code
├── public/           # Static files
├── package.json      # Dependencies
└── vite.config.ts    # Configuration
```

---

## ✅ Quick Checklist

- [ ] Node.js is installed (`node --version`)
- [ ] Navigated to project directory
- [ ] Dependencies installed (`npm install` - if first time)
- [ ] Server started (`npm run dev`)
- [ ] Browser opened to `http://localhost:5173/`

---

## 🎓 Learning Tips

1. **Keep the terminal open** - You'll see errors and logs there
2. **Check the browser console** - Press F12 to see JavaScript logs
3. **Hot Reload** - Changes to code automatically refresh the browser
4. **Read the terminal output** - It shows helpful information

---

## 💡 Pro Tips

- **First time?** Run `npm install` before `npm run dev`
- **Port conflicts?** Vite will automatically use the next available port
- **Want to see API calls?** Open browser DevTools (F12) → Network tab
- **Testing?** Use `npm run test` to run unit tests

---

## 🆘 Need Help?

1. Check the terminal for error messages
2. Check browser console (F12) for JavaScript errors
3. Make sure all dependencies are installed
4. Verify you're in the correct directory

---

**Happy Coding! 🎵✨**
