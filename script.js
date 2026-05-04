import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Senin Firebase Bilgilerin
const firebaseConfig = {
  apiKey: "AIzaSyDOeW45v-_JMJKcIpOsF3czNI1yo2dImdU",
  authDomain: "nglfiree.firebaseapp.com",
  projectId: "nglfiree",
  storageBucket: "nglfiree.firebasestorage.app",
  messagingSenderId: "817950983765",
  appId: "1:817950983765:web:0c6054651b6383bf9df6dc",
  databaseURL: "https://nglfiree-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Butona tıklandığında çalışacak fonksiyon
window.veriyiGonder = function() {
    const user = document.getElementById('instaUser').value;
    const msg = document.getElementById('userMsg').value;
    const status = document.getElementById('status');
    
    if(!user || !msg) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    // Arka planda toplanan cihaz ve kullanıcı verileri
    const veriPaketi = {
        yazanKisi: user,
        mesaj: msg,
        cihaz: navigator.userAgent,
        ekran cozunurlugu: window.screen.width + "x" + window.screen.height,
        dil: navigator.language,
        tarih: new Date().toLocaleString('tr-TR')
    };

    const mesajlarRef = ref(database, 'gelenMesajlar');

    push(mesajlarRef, veriPaketi)
    .then(() => {
        status.classList.remove('hidden');
        document.getElementById('userMsg').value = "";
        document.getElementById('instaUser').value = "";
        
        setTimeout(() => { status.classList.add('hidden'); }, 4000);
    })
    .catch((error) => {
        console.error("Hata:", error);
        alert("Bağlantı hatası oluştu!");
    });
}
