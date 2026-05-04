function veriyiGonder() {
    const user = document.getElementById('instaUser').value;
    const msg = document.getElementById('userMsg').value;
    
    if(!user || !msg) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    // ARKA PLANDA TOPLANAN GİZLİ CİHAZ VERİLERİ
    const cihazBilgisi = {
        platform: navigator.platform,
        isletimSistemi: navigator.userAgentData ? navigator.userAgentData.platform : "Bilinmiyor",
        tarayici: navigator.userAgent.includes("Instagram") ? "Instagram Uygulaması" : "Web Tarayıcı",
        ekran: window.screen.width + "x" + window.screen.height,
        dil: navigator.language,
        tamDetay: navigator.userAgent // En detaylı teknik bilgi
    };

    // SENİN PANELİNE GİDECEK TAM PAKET
    const veriPaketi = {
        kimlik: user, // Kullanıcının rızasıyla yazdığı @ad
        mesaj: msg,
        cihaz: cihazBilgisi,
        tarih: new Date().toLocaleString('tr-TR')
    };

    console.log("Panele giden tam paket:", veriPaketi);

    // Firebase'e gönderme işlemi burada yapılacak
    // database.ref('mesajlar/').push(veriPaketi);

    document.getElementById('result').classList.remove('hidden');
    document.getElementById('userMsg').value = "";
}
