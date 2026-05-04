import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDOeW45v-_JMJKcIpOsF3czNI1yo2dImdU",
  authDomain: "nglfiree.firebaseapp.com",
  projectId: "nglfiree",
  storageBucket: "nglfiree.firebasestorage.app",
  messagingSenderId: "817950983765",
  appId: "1:817950983765:web:0c6054651b6383bf9df6dc",
  databaseURL: "https://nglfiree-default-rtdb.firebaseio.com" // Bunu ekledim, veri tabanı yolu için önemli
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fonksiyonu dışarıdan erişilebilir yapmak için window nesnesine bağlıyoruz
window.veriyiGonder = function() {
    const user = document.getElementById('instaUser').value;
    const msg = document.getElementById('userMsg').value;
    
    if(!user || !msg) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    const cihazBilgisi = {
        platform: navigator.platform,
        tarayici: navigator.userAgent,
        ekran: window.screen.width + "x" + window.screen.height,
        dil: navigator.language
    };

    const veriPaketi = {
        kimlik: user,
        mesaj: msg,
        cihaz: cihazBilgisi,
        tarih: new Date().toLocaleString('tr-TR')
    };

    const mesajlarRef = ref(database, 'gelenMesajlar');
    
    push(mesajlarRef, veriPaketi)
    .then(() => {
        document.getElementById('status').classList.remove('hidden'); // index.html'de status id'si kullandık
        document.getElementById('userMsg').value = "";
        document.getElementById('instaUser').value = "";
        alert("Mesajın anonim olarak gönderildi!");
    })
    .catch((error) => {
        console.error("Hata:", error);
        alert("Bir hata oluştu.");
    });
}
