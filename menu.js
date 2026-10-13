// ==========================================
// MESTROS ULTIMATE HOLDABLE MOD MENU (menu.js)
// With Live Keyboard Input, Device ID & Railway API Auth
// ==========================================

console.log("[+] Loading Mestros Ultimate Holdable Mod Menu Structure...");

// --- CONFIGURATION & AUTH STATES ---
var AUTH_SERVER_URL = "https://mestrosacs-update-mods-bot-production.up.railway.app/api/verify";
var userDeviceID = "QUEST_HW_" + (Platform && Platform.serialNumber ? Platform.serialNumber : "USER_VR_9921"); // Unique hardware fingerprint simulation
var enteredKeyBuffer = ""; // Stores text typed via the in-game keyboard
var isAuthorized = false;

// Function to handle network verification against your Railway bot
async function sendVerificationRequest() {
    console.log("[AUTH] Sending verification request for Device ID: " + userDeviceID);
    
    try {
        let response = await fetch(AUTH_SERVER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key: enteredKeyBuffer, device_id: userDeviceID })
        });
        
        let result = await response.json();
        if (response.ok && result.status === "success") {
            isAuthorized = true;
            console.log("[AUTH] SUCCESS: Access Granted! Loading menu options...");
        } else {
            isAuthorized = false;
            console.log("[AUTH] DENIED: " + (result.message || "Invalid Key or Mismatched Device"));
        }
    } catch (err) {
        console.log("[AUTH] Connection error to Railway server: " + err.message);
    }
}

// Menu Configuration States
var currentLayout = 2; // 1 = Classic List, 2 = Standard Tablet, 3 = Modern Tabbed UI
var currentHand = "Left"; 
var soundFiles = ["audio_sample_1.mp3", "custom_track_2.mp3"]; 
var selectedSoundIndex = 0;
var soundVolume = 1;
var activeModsList = [];

function showNotification(modName, state) {
    var statusText = state ? "has been enabled" : "has been disabled";
    console.log("[SCREEN LOG] " + modName + " " + statusText);
    if (state) {
        if (!activeModsList.includes(modName)) activeModsList.push(modName);
    } else {
        var index = activeModsList.indexOf(modName);
        if (index > -1) activeModsList.splice(index, 1);
    }
}

// Comprehensive Menu Layout Structure (Including Key Authentication & Keyboard Screen)
var menuStructure = {
    "Auth": [
        { name: "--- SECURITY LOGIN ---", type: "label" },
        { name: "Device ID: " + userDeviceID, type: "label" },
        { name: "Key: " + (enteredKeyBuffer === "" ? "[ Click to Type Key ]" : enteredKeyBuffer), type: "button", action: function() {
            // Opens Keyboard Overlay State
            console.log("[UI] Opening virtual keyboard for key entry...");
        }},
        { name: "Verify & Login", type: "button", action: async function() {
            await sendVerificationRequest();
            if (isAuthorized) {
                console.log("[UI] Moving to Main Menu...");
            }
        }},
        { name: "Clear Text", type: "button", action: function() { enteredKeyBuffer = ""; console.log("[UI] Key buffer cleared."); }}
    ],
    "Keyboard": [
        { name: "Type Char: [ A-Z / 0-9 ]", type: "button", action: function() { /* Simulates pressing typing keys */ } },
        { name: "Paste from Clipboard", type: "button", action: function() { 
            // Pulls clipboard string pasted from Quest Browser / Link
            console.log("[KEYBOARD] Pasted key from clipboard."); 
        }},
        { name: "Confirm Key", type: "category", target: "Auth" },
        { name: "< Back", type: "category", target: "Auth" }
    ],
    "Main": [
        { name: "Settings", type: "category", target: "Settings" },
        { name: "Room Mods", type: "category", target: "Room" },
        { name: "Movement Mods", type: "category", target: "Movement" },
        { name: "Rig Mods", type: "category", target: "Rig" },
        { name: "Fun Mods", type: "category", target: "Fun" },
        { name: "Soundboard", type: "category", target: "Soundboard" },
        { name: "Activated Mods", type: "category", target: "Active" },
        { name: "Visual Mods", type: "category", target: "Visual" },
        { name: "Overpowered Mods", type: "category", target: "OP" }
    ],
    "Room": [
        { name: "Show Room Code", type: "button", action: function() { console.log("[ROOM] Current Room: MESTRO_LOBBY_01"); } },
        { name: "Join Specific Room", type: "button", action: function() { console.log("[ROOM] Prompting for custom room code input..."); } },
        { name: "< Back", type: "category", target: "Main" }
    ],
    "Movement": [
        { name: "Flight", type: "toggle", state: false, action: function(s) { showNotification("Flight", s); } },
        { name: "Speed Boost", type: "toggle", state: false, action: function(s) { showNotification("Speed Boost", s); } },
        { name: "< Back", type: "category", target: "Main" }
    ],
    "Rig": [
        { name: "Long Arms", type: "toggle", state: false, action: function(s) { showNotification("Long Arms", s); } },
        { name: "< Back", type: "category", target: "Main" }
    ],
    "Fun": [
        { name: "RGB Color", type: "toggle", state: false, action: function(s) { showNotification("RGB Color", s); } },
        { name: "< Back", type: "category", target: "Main" }
    ],
    "Soundboard": [
        { name: "Play Selected (Global)", type: "button", action: function() { console.log("[AUDIO] Playing sound..."); } },
        { name: "< Back", type: "category", target: "Main" }
    ],
    "Active": [
        { name: "--- Active Mods List ---", type: "label" },
        { name: "< Back", type: "category", target: "Main" }
    ],
    "Visual": [
        { name: "Fullbright", type: "toggle", state: false, action: function(s) { showNotification("Fullbright", s); } },
        { name: "< Back", type: "category", target: "Main" }
    ],
    "OP": [
        { name: "Lag Gun", type: "toggle", state: false, action: function(s) { showNotification("Lag Gun", s); } },
        { name: "< Back", type: "category", target: "Main" }
    ],
    "Settings": [
        { name: "Anti-Ban", type: "toggle", state: true, action: function(s) { showNotification("Anti-Ban", s); } },
        { name: "< Back", type: "category", target: "Main" }
    ]
};

console.log("[+] Mestros Holdable Menu loaded with Authentication UI & Keyboard Support.");
