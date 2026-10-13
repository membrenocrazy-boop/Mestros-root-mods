// ==========================================
// FRIDA IL2CPP RUNTIME BRIDGE SCRIPT
// ==========================================

import "frida-il2cpp-bridge";

Il2Cpp.perform(() => {
    console.log("[+] Frida IL2CPP Bridge initialized successfully!");
    console.log("[+] Unity Version Detected: " + Il2Cpp.unityVersion);

    try {
        const assembly = Il2Cpp.domain.assembly("Assembly-CSharp");
        console.log("[+] Attached to Assembly-CSharp domain.");
    } catch (e) {
        console.log("[-] Warning attaching to Assembly-CSharp: " + e.message);
    }
});
