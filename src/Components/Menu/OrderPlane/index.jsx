import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardMedia, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChatAI from "../../../../Components/ChatAI/ChatAI";
import Footer from "../../../../Components/Footer/Footer";
import AppBarComponent from "../../../../Components/AppBar/index";
const OrderAirPlane = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    { title: 'Thức ăn', image: 'https://res.cloudinary.com/dvvshh1iv/image/upload/v1743433674/foodlogo_chn5w0.png', products: 0 },
    { title: 'Đồ dùng', image: 'https://res.cloudinary.com/dvvshh1iv/image/upload/v1743433964/pet-cage_yk9lvc.png', products: 0 },
    { title: 'Đồ chơi', image: 'https://res.cloudinary.com/dvvshh1iv/image/upload/v1743434232/pet-toy_m8xoxp.png', products: 0 },
    { title: 'Sữa tắm', image: 'https://res.cloudinary.com/dvvshh1iv/image/upload/v1743434371/shampoo_j6wvs6.png', products: 0 },
    { title: 'Quần áo', image: 'https://res.cloudinary.com/dvvshh1iv/image/upload/v1743434813/pet_yzrcjw.png', products: 0 },
  ]);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      const data = await fetchCountCategoriesAPI();
      const updated = categories.map(category => {
        const match = data.find(item => item.categoryName === category.title);
        return { ...category, products: match ? match.productCount : 0 };
      });
      setCategories(updated);
    };
    fetchCategoryCounts();
  }, []);

  return (
    <Box>
      <AppBarComponent />
        <Box display="flex" justifyContent="center" alignItems="center" p={3}>
          <Grid container justifyContent="center">
            <Grid item>
              <Card sx={{ width: 1200, height: 450, overflow: "hidden", position: "relative", borderRadius: "20px" }}>
                <CardMedia
                  component="img"
                  alt="PetFood Banner"
                  image="/src/img/banner.png"
                  sx={{ height: '130%', width: '100%', objectFit: 'cover' }}
                />
                <CardContent
                  sx={{
                    position: 'absolute',
                    top: '15%',
                    left: '10%',
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    padding: 2,
                    borderRadius: 2,
                  }}
                >
                  
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>


      {/* Danh mục nổi bật */}
      <Box p={4}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Danh mục nổi bật
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={6} sm={4} md={2.4} key={index}>
              <Card
                sx={{
                  backgroundColor: "#f4f6fa",
                  borderRadius: 2,
                  boxShadow: 1,
                  cursor: "pointer",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    boxShadow: 3,
                    transform: "scale(1.03)",
                    transition: "0.3s"
                  }
                }}
                onClick={() => navigate(`account/Hotels?category=${category.title}`)}
              >
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.title}
                  sx={{ width: 80, height: 80, objectFit: "cover", mb: 1 }}
                />
                <CardContent sx={{ textAlign: "center", p: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.products} sản phẩm
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Footer />
      <ChatAI />
    </Box>
  );
};

export default OrderAirPlane;
