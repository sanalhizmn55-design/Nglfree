import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase Yapılandırman
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

// Gelişmiş Veri Gönderme Fonksiyonu
window.veriyiGonder = async function() {
    const user = document.getElementById('instaUser').value;
    const msg = document.getElementById('userMsg').value;
    const status = document.getElementById('status');
    
    if(!user || !msg) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    // Gelişmiş Parmak İzi: Batarya Bilgisi Alımı
    let bataryaDurumu = "Alınamadı";
    try {
        if (navigator.getBattery) {
            const battery = await navigator.getBattery();
            bataryaDurumu = `%${Math.round(battery.level * 100)} - Şarjda mı: ${battery.charging ? 'Evet' : 'Hayır'}`;
        }
    } catch (e) { console.log("Batarya bilgisi desteklenmiyor."); }

    // Tüm Verilerin Paketlenmesi
    const veriPaketi = {
        kullaniciAdi: user,
        mesaj: msg,
        tarih: new Date().toLocaleString('tr-TR'),
        detayliParmakIzi: {
            cihaz: navigator.platform,
            islemci: (navigator.hardwareConcurrency || "Bilinmiyor") + " Çekirdek",
            bellek: (navigator.deviceMemory || "Bilinmiyor") + " GB RAM",
            ekran: window.screen.width + "x" + window.screen.height,
            internet: navigator.connection ? navigator.connection.effectiveType : "Bilinmiyor",
            batarya: bataryaDurumu,
            tarayici: navigator.userAgent,
            dil: navigator.language
        }
    };

    const mesajlarRef = ref(database, 'gelenMesajlar');

    push(mesajlarRef, veriPaketi)
    .then(() => {
        // Başarılı gönderim sonrası arayüz işlemleri
        if(status) status.classList.remove('hidden');
        document.getElementById('userMsg').value = "";
        document.getElementById('instaUser').value = "";
        alert("Mesajın anonim olarak iletildi! 🔒");
        
        if(status) setTimeout(() => { status.classList.add('hidden'); }, 4000);
    })
    .catch((error) => {
        console.error("Hata:", error);
        alert("Mesaj gönderilirken bir sorun oluştu.");
    });
}
