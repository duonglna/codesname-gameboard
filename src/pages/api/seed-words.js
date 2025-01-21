import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const WORDS = [
    // Động vật
    "Chó sói", "Hổ mang", "Cá sấu", "Chim én", "Bò sát",
    "Rắn hổ", "Cá voi", "Lợn rừng", "Thỏ trắng", "Chuột cống",
    
    // Thực vật
    "Hoa sen", "Cây tre", "Cỏ xanh", "Lúa mì", "Hoa hồng",
    "Rau muống", "Quả mít", "Lá dong", "Cây đa", "Mía đường",
    
    // Địa điểm
    "Hà Nội", "Sài Gòn", "Đà Lạt", "Vịnh Hạ", "Nha Trang",
    "Hội An", "Biển Đông", "Vườn quốc", "Phú Quốc", "Cao Bằng",
    
    // Đồ vật
    "Bàn ghế", "Quạt máy", "Đèn pin", "Bếp ga", "Xe máy",
    "Gương soi", "Cầu thang", "Máy tính", "Điện thoại", "Sách vở",
    
    // Khái niệm
    "Tự do", "Yêu thương", "Tình bạn", "Gia đình", "Niềm vui",
    "Hạnh phúc", "Cảm xúc", "Thời gian", "Khó khăn", "Sự thật",
    
    // Nghề nghiệp
    "Giáo viên", "Bác sĩ", "Kỹ sư", "Thợ mộc", "Ca sĩ",
    "Nhà báo", "Thư ký", "Công nhân", "Phi công", "Nông dân",
    
    // Hoạt động
    "Chơi bóng", "Đá banh", "Học bài", "Lái xe", "Nấu ăn",
    "Đọc sách", "Xem phim", "Nghe nhạc", "Thể dục", "Đi chơi"
  ];
  

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

    try {
        const inserts = WORDS.map((word) => ({ word }));
        const { error } = await supabase.from('words').insert(inserts);

        if (error) throw error;

        res.status(200).json({ message: 'Words seeded successfully' });
    } catch (error) {
        console.error('Error seeding words:', error);
        res.status(500).json({ error: 'Failed to seed words' });
    }
}
