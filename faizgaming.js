// Link Gist Raw milik Suhana
const U = "https://gist.githubusercontent.com/DimazGeboyz/dec7e6abaa5eb6de7525c724be98beb8/raw/9b468e9d130440f7c0bafe6955ae91fcb2d9b1af/faizgaming.user.js";

// Ganti Key penyimpanan (K) agar QuanX mendownload ulang file yang baru
const K = "faiz_final_work_v9"; 

let c = $prefs.valueForKey(K);
let b = $response.body;
let h = $response.headers;

const f = d => {
    if (!b || !h) return $done({});
    
    // Hapus proteksi keamanan website target agar script bisa masuk (Inject)
    Object.keys(h).forEach(k => {
        if (/content-security-policy|x-frame-options/i.test(k)) delete h[k];
    });
    
    h['Cache-Control'] = 'no-cache';
    
    // Inject script SET KB BY OJENG ke dalam tag <head> website
    $done({ body: b.replace(/<head>/i, `<head><script>${d}</script>`), headers: h });
};

if (c) {
    // Jika script sudah ada di memori, langsung jalankan
    f(c);
} else {
    // Jika belum ada (pertama kali), download dari GitHub Gist
    $task.fetch({ url: U }).then(response => {
        if (response.body) {
            $prefs.setValueForKey(response.body, K);
            f(response.body);
            console.log("SET KB BY OJENG: Script berhasil di-download dan disimpan.");
        } else {
            $done({});
        }
    }, reason => {
        console.log("SET KB BY OJENG: Gagal download dari GitHub.");
        $done({});
    });
}
