import React, { useState, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";

const items = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: `Item ${index + 1}`,
  image: "https://via.placeholder.com/300x200", // Thay bằng URL ảnh/video
}));

const ResponsiveSwiper = () => {
  const swiperRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - swiperRef.current.offsetLeft);
    setScrollLeft(swiperRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - swiperRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Độ nhạy khi kéo
    swiperRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <Box
      ref={swiperRef}
      sx={{
        display: "flex",
        overflowX: "scroll",
        scrollSnapType: "x mandatory",
        scrollBehavior: "smooth",
        gap: 2,
        cursor: isDragging ? "grabbing" : "grab", // UX khi kéo
        "&::-webkit-scrollbar": { display: "none" }, // Ẩn scrollbar
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
          <img
            src={item.image}
            alt={item.title}
            draggable={false} // Ngăn kéo ảnh
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
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
                <PlayCircleOutlineIcon />
              </IconButton>
              <IconButton color="inherit">
                <DownloadIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ResponsiveSwiper;
