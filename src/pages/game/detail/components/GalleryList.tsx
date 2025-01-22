import DownloadIcon from "@mui/icons-material/Download";
import { Box, IconButton, Typography } from "@mui/material";
import { useRef, useState } from "react";

const items = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: `Item ${index + 1}`,
  value: "https://www.youtube.com/embed/PFr6jO_RHb4?si=kXo46VNWVTHYKwwf", // Thay bằng URL ảnh/video
}));

const ResponsiveSwiper = () => {
  const swiperRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const velocityRef = useRef(0); // Lưu tốc độ kéo

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollStart(swiperRef.current.scrollLeft);
    swiperRef.current.style.scrollSnapType = "none"; // Tắt snap khi kéo
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const x = e.pageX;
    const walk = x - startX; // Khoảng cách chuột kéo
    swiperRef.current.scrollLeft = scrollStart - walk; // Cập nhật scrollLeft theo khoảng cách kéo

    // Tính tốc độ (velocity)
    velocityRef.current = walk - velocityRef.current; // Tính sự thay đổi vị trí chuột
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Hiệu ứng quán tính
    // const velocity = velocityRef.current;
    // let inertiaDistance = velocity; // Điều chỉnh gia tốc (quãng đường thêm)
    // let newScrollLeft = swiperRef.current.scrollLeft - inertiaDistance;

    // Tạo hiệu ứng mượt
    // const smoothScroll = () => {
    //   if (Math.abs(inertiaDistance) < 1) {
    //     swiperRef.current.style.scrollSnapType = "block"; // Bật lại snap sau khi trượt xong
    //     return;
    //   }

    //   inertiaDistance *= 0.9; // Giảm dần quãng đường (ma sát)
    //   swiperRef.current.scrollLeft = newScrollLeft;
    //   newScrollLeft -= inertiaDistance;

    //   requestAnimationFrame(smoothScroll); // Gọi lại liên tục để tạo hiệu ứng
    // };

    // smoothScroll();
  };

  return (
    <Box sx={{
      px: '16px',
    }}>
      <Typography variant="h4" marginBottom={2} sx={{ fontWeight: 700 }}>
        Videos
      </Typography>
      <Box
        ref={swiperRef}
        sx={{
          display: "flex",
          overflowX: "scroll",
          scrollSnapType: "block",
          scrollBehavior: "auto",
          gap: 2,
          cursor: isDragging ? "grabbing" : "grab",
          "&::-webkit-scrollbar": { display: "none" },
          mx: '-16px',
          px: '16px',
          overscrollBehaviorX: 'contain'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              flex: "0 0 calc(33.33% - 16px)", // Desktop: 3 sản phẩm
              maxWidth: "calc(33.33% - 16px)",
              scrollSnapAlign: "start",
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "#000",
              position: "relative",
              "@media (max-width: 900px)": {
                flex: "0 0 calc(50% - 16px)", // Tablet: 2 sản phẩm
                maxWidth: "calc(50% - 16px)",
              },
              "@media (max-width: 600px)": {
                flex: "0 0 100%", // Mobile: 1 sản phẩm
                maxWidth: "100%",
              },
            }}
          >
            <iframe
              src={item.value}
              title="YouTube video player"
              width="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                padding: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2">{item.title}</Typography>
              <Box>
                <IconButton color="inherit">
                  <DownloadIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ResponsiveSwiper;
